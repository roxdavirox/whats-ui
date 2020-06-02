import React, { Component } from "react";
import { Card } from "@material-ui/core";
import {
  Breadcrumb,
  MatxSidenavContainer,
  MatxSidenav,
  MatxSidenavContent
} from "matx";
import ChatSidenav from "./ChatSidenav";
import ChatContainer from "./ChatContainer";
import { isMobile } from "utils";
import socket from './socket';
import TransferListDialog from './TransferListDialog';
import SaveContactDialog from './SaveContactDialog';
import LocalStorageService from '../../services/localStorageService';

class AppChat extends Component {
  state = {
    currentUser: LocalStorageService.getItem('auth_user'),
    contactList: [],
    recentChats: [],
    messageList: [],
    whatsappMessages: [],
    currentChatRoom: "",
    currentChatId: "1d339707-076d-4659-8147-dd6f84876f66",
    currentContact: null,
    contactId: '',
    open: true,
    bootstrapStep: null,
    client: socket(),
    chats: {},
    users: [],
    openContactList: false,
    openTransferList: false,
    openSaveContact: false,
    fetchedMessages: {}
  };

  bottomRef = React.createRef();

  async componentDidMount() {
    const { client, currentUser } = this.state;
    client.registerConnectHandler(this.handleConnection, currentUser);
    client.registerChatHandler(this.handleReceiveChats);
    client.registerContactsHandler(this.handleReceiveContacts);
    client.registerMessageHandler(this.handleReceivedMessage);
    client.registerTransferUsers(this.handleReceiveTransferUsers);
    client.registerTransferContact(this.handleReceiveContact);
    client.registerReceiveContactMessages(this.handleReceiveContactMessages);
    this.updateRecentContactList();
  }

  componentDidUpdate = () => {
    this.bottomRef.scrollTop = 9999999999;
  }

  componentWillUnmount = () => {
    const { client } = this.state;
    if (!client) return;
    client.disconnect();
    this.setState({ client: null });
  }

  handleReceiveTransferUsers = transferUsers => {
    this.setState({ users: transferUsers });
  }

  handleReceiveChats = chats => {
    if(!chats) return;
    console.log('chats recebidos: ', chats);
    const { contacts } = this.state;
    const chatsWithContact = chats.map(chat => ({ 
      contact: contacts[chat.contactId], 
      ...chat 
    }));
    this.setState({ recentChats: chatsWithContact });
  }

  handleReceiveContacts = contacts => {
    console.log('contacts', contacts);
    const contactsObject = contacts.reduce((obj, contact) => ({
      ...obj,
      [contact.id]: { ...contact, status: 'Online',  chat: { messages: [] } }
    }), {});
    this.setState({ contacts: contactsObject });
  }

  handleConnection = () => {
    console.log('[client] connectado!');
    this.setState({ isConnected: true });
  }

  updateRecentContactList = () => {
    // let { id } = this.state.currentUser;
    // getRecentContact(id).then(data => {
    //   this.setState({
    //     recentContactList: [...data.data]
    //   });
    // });
  };

  scrollToBottom = () => {
    if (!this.bottomRef.current) return;
    this.bottomRef.current.scrollIntoView({ behavior: "smooth" });
  };

  handleReceivedMessage = message => {
    console.log('mensagem recebida:', message);
    const { contactId, userId, ownerId, chatId, key } = message;
    if (!message.message.conversation) return;
    const { contacts } = this.state;
    
    const contactNotExists = !contacts[contactId];
    if (contactNotExists) {
      console.log('contactNotExists', contactNotExists);
      const { recentChats } = this.state;
      const phone = key.remoteJid.split('@')[0];

      const _contact = {
        id: contactId,
        eurl: 'assets/faces/default-avatar.pngj',
        status: 'Online',
        name: phone,
        userId,
        ownerId,
        jid: key.remoteJid
      };
      this.setState({
        recentChats: [...recentChats, { 
          id: chatId, 
          contactId, 
          userId, 
          ownerId,
          contact: _contact
        }],
        contacts: { 
          ...this.state.contacts, 
          [contactId]: { ..._contact, chat: { messages: [message] }}
        }
      }, () => {
        this.scrollToBottom();
      });
      return;
    }
    const defaultContact = { chat: { messages: []} };
    const contact = contacts[contactId] || defaultContact;
    
    const { chat: { messages } } = contact;
    const newMessages = [...messages, message];
    const updatedContact = {
      ...contact,
      chat: {
        ...contact.chat,
        messages: newMessages
      }
    };
    this.setState({
      contacts: {
        ...contacts,
        [contactId]: updatedContact
      }
    },
      () => {
        this.scrollToBottom();
      }
    );

  }

  handleReceiveContactMessages = ({ messages, contactId }) => {
    console.log('fetched messages', messages);
    if (!messages.length) return;
    const { contacts } = this.state;
    const contact = contacts[contactId];
    if (!contact) return;
    this.setState({
      contacts: { 
        ...contacts,
        [contactId]: {
          ...contact,
          chat: {
            messages
          }
        }
    }});
  }

  handleContactClick = contactId => {
    if (isMobile()) this.toggleSidenav();
    const { fetchedMessages } = this.state;
    const messageStatus = fetchedMessages[contactId] || { fetched: false };
    console.log('messageStatus', messageStatus);
    if (!messageStatus.fetched) {
      this.state.client.requestContactMessages(contactId);
      this.setState({ 
        fetchedMessages: { 
          ...fetchedMessages, 
          [contactId]: { fetched: true }
        }
      }, () => {
        this.bottomRef.scrollTop = 9999999999;
      });
    }

    this.setState({ contactId, currentChatRoom: null }, () => {
      this.bottomRef.scrollTop = 9999999999;
    });
    this.handleCloseContactList();
  };

  handleMessageSend = message => {
    const { client, recentChats } = this.state;
    const currentContact = this.getCurrentContact();
    const chat = recentChats.find(c => c.contactId === currentContact.id);
    if(!chat) return;
    const newMsg = {
      contactId: currentContact.id,
      jid: currentContact.jid,
      text: message,
      time: new Date(),
      chatId: chat.id
    };
    console.log('mensagem enviada', newMsg);
    client.sendMessage(newMsg);
  };

  setBottomRef = ref => {
    console.log('ref', ref);
    this.bottomRef = ref;
  };

  toggleSidenav = () => this.setState({ open: !this.state.open });
  
  handleOpenTransferList = () => this.setState({ openTransferList: true });
  handleCloseTransferList = () => this.setState({ openTransferList: false });
  handleSelectTransferContact = (selectedUserId) => {
    console.log('transferir para:', selectedUserId);
    const { contacts, contactId, fetchedMessages } = this.state;
    if (!contacts[contactId]) return;
    const filteredRecentChats = this.state.recentChats.filter(recentChat => recentChat.contactId !== contactId);
    delete contacts[contactId];
    delete fetchedMessages[contactId];
    this.state.client
      .transferContact({
        contactId, 
        userId: selectedUserId,
      });
    this.setState({
      contacts,
      fetchedMessages,
      currentChatRoom: "",
      recentChats: filteredRecentChats
    });
  }
  handleReceiveContact = ({ chat, contact }) => {
    console.log('contact recebido: ', contact);
    if (!contact || !chat) return;
    this.setState({ 
      contacts: { 
        ...this.state.contacts, 
        [contact.id]: { 
          ...contact, 
          chat: { 
            messages: []
          }
        }
      },
      contactId: contact.id,
      recentChats: [...this.state.recentChats, { 
        id: chat.id, 
        contactId: contact.id, 
        userId: contact.userId, 
        ownerId: contact.ownerId,
        contact: {
          ...contact,
          eurl: 'assets/faces/default-avatar.pngj',
          status: 'Online',
        }
      }],
    });
  }

  handleSaveContact = contactName => {
    if (!contactName) return;
    const { client, contactId, contacts, recentChats } = this.state;
    console.log('recentChats', recentChats);
    console.log('this contact id', contactId);
    const updatedRecentChats = recentChats.reduce((acc, crr) => 
      [...acc, { 
          ...crr,
          contact: crr.contactId === contactId 
            ? { ...crr.contact, name: contactName, short: contactName, notify: contactName }
            : crr.contact
        }
      ], []);
    
    client.saveContact({ contactId, name: contactName });
    this.setState({
      contacts: {
        ...contacts,
        [contactId]: { ...contacts[contactId], name: contactName, short: contactName }
      },
      recentChats: updatedRecentChats
    });
  }

  handleOpenContactList = () => this.setState({ openContactList: true });
  handleCloseContactList = () => this.setState({ openContactList: false });
  handleOpenSaveContact = () => this.setState({ openSaveContact: true });
  handleCloseSaveContact = () => this.setState({ openSaveContact: false });

  getCurrentContact = () => {
    const { contacts = {}, contactId = {} } = this.state;
    if (!contactId) return {}
    if (!contacts) return {}
    return contacts[contactId] || {};
  }
  render() {
    let {
      currentUser,
      contacts,
      recentChats,
      currentChatRoom
    } = this.state;
    const currentContact = this.getCurrentContact();
    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: "Chat" }]} />
        </div>
        <Card elevation={6}>
          <MatxSidenavContainer>
            <MatxSidenav
              width="230px"
              open={this.state.open}
              toggleSidenav={this.toggleSidenav}
            >
              <ChatSidenav
                currentUser={currentUser}
                openContactList={this.state.openContactList}
                contactList={contacts}
                recentChats={recentChats}
                handleContactClick={this.handleContactClick}
                handleCloseContactList={this.handleCloseContactList}
              />
            </MatxSidenav>
            {this.state.openTransferList && 
              <TransferListDialog 
                  users={this.state.users}
                  onSelect={this.handleSelectTransferContact}
                  open={this.state.openTransferList}
                  onClose={this.handleCloseTransferList} 
                />
            }
            {this.state.openSaveContact && 
              <SaveContactDialog 
                  open={this.state.openSaveContact}
                  onSave={this.handleSaveContact}
                  onClose={this.handleCloseSaveContact}
                />
            }
            <MatxSidenavContent>
              <ChatContainer
                handleOpenTransferList={this.handleOpenTransferList}
                onSaveDialogOpen={this.handleOpenSaveContact}
                currentUser={currentUser}
                currentContact={currentContact}
                currentChatRoom={currentChatRoom}
                setBottomRef={this.setBottomRef}
                handleMessageSend={this.handleMessageSend}
                toggleSidenav={this.toggleSidenav}
              />
            </MatxSidenavContent>
          </MatxSidenavContainer>
        </Card>
      </div>
    );
  }
}

export default AppChat;
