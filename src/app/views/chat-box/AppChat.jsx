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
      name: 'Davi'
    },
    contactList: [],
    recentContactList: [],
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
    // getContactById(id).then(data => {
    //   this.setState({
    //     open: !isMobile(),
    //     currentUser: {
    //       ...data.data
    //     }
    //   }, () => {
    //     console.log('currentUser', this.state.currentUser);
    //   });
    // });
    // getAllContact(this.state.currentUser.id).then(data =>
    //   this.setState({ contactList: [...data.data] })
    // );
    const { client } = this.state;
    const connectedUser = {
      userId: 'a069df2c-8abe-45a1-9e15-d5d3d62b5044',
      ownerId: '8d4693dd-2fe3-41a5-913f-6e43118a70ee'
    };
    client.registerConnectHandler(this.handleConnection, connectedUser);
    client.registerContactsHandler(this.handleReceiveContacts);
    client.registerMessageHandler(this.handleReceivedMessage);
    client.registerUserMetadata(this.handleUserInfo);
    this.updateRecentContactList();
  }

  componentWillUnmount = () => {
    const { client } = this.state;
    if (!client) return;
    client.close();
  }

  handleUserInfo = dataUser => {
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

  handleReceiveContacts = contacts => {
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
    const { contactId } = message;
    if (!message.message.conversation) return;
    const { contacts } = this.state;
    const contact = contacts[contactId];
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
    // sendNewMessage({
    //     chatId: currentChatRoom,
    //     text: conversation,
    //     senderId: message.key.fromMe ? jid : message.key.remoteJid,
    //     time: new Date(),
    //     eurl,
    //     name
    //   }).then(data => {
    //     console.log('response new message:', data);
    //     this.setState(
    //       {
    //         messageList: [...data.data]
    //       },

    //     );
    //   });
  }

  handleContactClick = contactId => {
    // utilizar apenas o contact id
    // armazenando os contatos eu consigo pegar todas informações
    // através do contact, como chats e mensagens que estão dentro de chats
    // contact: { chats: { messages: [] } }
    if (isMobile()) this.toggleSidenav();
    console.log('contactId', contactId);
    
    // this.setState({
    //   currentChatRoom: '123',
    //   messageList: [],
    //   contactId
    // }, () => {
    //   this.bottomRef.scrollTop = 9999999999999;
    // });
    const { contacts } = this.state;
    const currentContact = {
      ...contacts[contactId],
      avatar: 'assets/faces/default-avatar.png'
    };
    this.setState({ contactId }, () => {
      this.bottomRef.scrollTop = 9999999999999;
    });
  
    // getContactById(contactId).then(({ data }) => {
    //   console.log('open user', data);
    //   this.setState({
    //     opponentUser: { ...data }
    //   });
    // });
    // getChatRoomByContactId(this.state.currentUser.id, contactId).then(
    //   ({ data }) => {
    //     let { chatId, messageList, recentListUpdated } = data;

    //     this.setState(
    //       {
    //         currentChatRoom: chatId,
    //         messageList
    //       },
    //       () => {
    //         this.bottomRef.scrollTop = 9999999999999;
    //       }
    //     );
    //     if (recentListUpdated) {
    //       this.updateRecentContactList();
    //     }
    //   }
    // );
    this.handleCloseContactList();
  };

  handleMessageSend = message => {
    // let { jid } = this.state.currentUser;
    const currentContact = this.getCurrentContact();
    const newMsg = {
      jid: currentContact.jid,
      text: message,
      time: new Date()
    };
    console.log('mensagem enviada', newMsg);
    this.state.client.message(newMsg);
    // sendNewMessage({
    //   chatId: currentChatRoom,
    //   text: message,
    //   contactId: jid,
    //   time: new Date()
    // }).then(data => {
    //   this.setState(
    //     {
    //       messageList: [...data.data]
    //     },
    //     () => {
    //       this.bottomRef.scrollTop = 9999999999999;
    //     }
    //   )
    // });

    //   // bot message
    //   setTimeout(() => {
    //     sendNewMessage({
    //       chatId: currentChatRoom,
    //       text: `Hi, I'm ${opponentUser.name}. Your imaginary friend.`,
    //       contactId: opponentUser.id,
    //       time: new Date()
    //     }).then(data => {
    //       this.setState(
    //         {
    //           messageList: [...data.data]
    //         },
    //         () => {
    //           this.bottomRef.scrollTop = 9999999999999;
    //         }
    //       );
    //     });
    //   }, 750);
    //   // bot message ends here
    // });
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
      recentContactList,
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
                recentContactList={recentContactList}
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
