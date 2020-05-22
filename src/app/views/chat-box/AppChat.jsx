import React, { Component } from "react";
import { Card } from "@material-ui/core";
import {
  Breadcrumb,
  MatxSidenavContainer,
  MatxSidenav,
  MatxSidenavContent
} from "matx";
import {
  getAllContact,
  getRecentContact,
  sendNewMessage,
  getContactById,
  getChatRoomByContactId
} from "./ChatService";
import ChatSidenav from "./ChatSidenav";
import ChatContainer from "./ChatContainer";
import { isMobile } from "utils";
import socket from './socket';
import Qrcode from 'qrcode.react';

function byTime( a, b ) {
  if ( parseInt(a.time) < parseInt(b.time) ){
    return 1;
  }
  if ( parseInt(a.time) > parseInt(b.time) ){
    return -1;
  }
  return 0;
}

class AppChat extends Component {
  state = {
    currentUser: {
      id: "a069df2c-8abe-45a1-9e15-d5d3d62b5044",
      ownerId: '8d4693dd-2fe3-41a5-913f-6e43118a70ee',
      name: 'Davi'
    },
    contactList: [],
    recentChats: [],
    messageList: [],
    whatsappMessages: [],
    currentChatId: "1d339707-076d-4659-8147-dd6f84876f66",
    currentContact: null,
    contactId: '',
    open: true,
    bootstrapStep: null,
    client: socket(),
    chats: {},
    users: [],
    openContactList: false
  };

  bottomRef = React.createRef();

  async componentDidMount() {
    let { id } = this.state.currentUser;

    const { client, currentUser } = this.state;
    client.registerConnectHandler(this.handleConnection, currentUser);
    client.registerChatHandler(this.handleReceiveChats);
    client.registerContactsHandler(this.handleReceiveContacts);
    client.registerMessageHandler(this.handleReceivedMessage);
    client.registerUserMetadata(this.handleReceiveUserMetadata);
    this.updateRecentContactList();
  }

  componentWillUnmount = () => {
    const { client } = this.state;
    if (!client) return;
    client.disconnect();
    this.setState({ client: null });
  }

  handleReceiveUserMetadata = dataUser => {
    if(!dataUser) return;
    console.log('dataUser', dataUser);
    this.setState({
      currentUser: {
        name: dataUser.name,
        id: dataUser.id,
        eurl: dataUser.eurl
      }
    })
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
    this.bottomRef.current.scrollIntoView({ behavior: "smooth" });
  };

  handleReceivedMessage = message => {
    console.log('mensagem recebida:', message);
    const { contactId, userId, ownerId, chatId } = message;
    if (!message.message.conversation) return;
    const { contacts } = this.state;
    
    const contactNotExists = !contacts[contactId];
    if (contactNotExists) {
      const { recentChats } = this.state;
      this.setState({ 
        recentChats: [...recentChats, { id: chatId, contactId, userId, ownerId }]
      });
    }

    const contact = contacts[contactId] || { chat: { messages: []} };
    
    const { chat: { messages } } = contact;
    const newMessages = [...messages, message];
    const updatedContact = {
      ...contact,
      chat: {
        ...contact.chat,
        messages: newMessages
      }
    };
    console.log('updatedContact', updatedContact);
    this.setState({
      contacts: {
        ...contacts,
        [contactId]: updatedContact
      }
    },
      () => {
        this.bottomRef.scrollTop = 9999999999999;
      }
    );

  }

  handleContactClick = contactId => {
    // utilizar apenas o contact id
    // armazenando os contatos eu consigo pegar todas informações
    // através do contact, como chats e mensagens que estão dentro de chats
    // contact: { chats: { messages: [] } }
    if (isMobile()) this.toggleSidenav();
    console.log('contactId', contactId);
    this.setState({ contactId }, () => {
      this.bottomRef.scrollTop = 9999999999999;
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
    client.message(newMsg);
  };

  setBottomRef = ref => {
    this.bottomRef = ref;
  };

  toggleSidenav = () => this.setState({ open: !this.state.open });
  
  handleOpenContactList = () => this.setState({ openContactList: true });
  handleCloseContactList = () => this.setState({ openContactList: false });
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
    console.log('currentContact', currentContact);
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
                handleOpenContactList={this.handleOpenContactList}
                handleCloseContactList={this.handleCloseContactList}
              />
            </MatxSidenav>
            <MatxSidenavContent>
              <ChatContainer
                id={currentUser.id}
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
