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
      id: "5511977689294@c.us"
    },
    contactList: [],
    recentContactList: [],
    messageList: [],
    whatsappMessages: [],
    currentChatRoom: "",
    opponentUser: null,
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
    client.registerConnectHandler(this.handleConnection);
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
    this.setState({ contactList: contacts });
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
    let { id, eurl, name } = this.state.currentUser;
    let { currentChatRoom, opponentUser } = this.state;
    if (currentChatRoom === "") return;
    const { message: { conversation }} = message;
    if (!conversation) return;

    sendNewMessage({
        chatId: currentChatRoom,
        text: conversation,
        contactId: message.key.fromMe ? id : message.key.remoteJid,
        time: new Date(),
        eurl,
        name
      }).then(data => {
        this.setState(
          {
            messageList: [...data.data]
          },
          () => {
            this.bottomRef.scrollTop = 9999999999999;
          }
        );
      });
  }

  handleContactClick = contactId => {
    if (isMobile()) this.toggleSidenav();
    console.log('contactId', contactId);
    
    this.setState({
      currentChatRoom: '123',
      messageList: [],
      contactId
    }, () => {
      this.bottomRef.scrollTop = 9999999999999;
    });
    const user = {
      ...this.state.users[contactId],
      status: 'Online',
      avatar: 'assets/faces/default-avatar.png'
    };
    console.log('user', user);
    this.setState({ opponentUser: user });
  
    // getContactById(contactId).then(({ data }) => {
    //   console.log('open user', data);
    //   this.setState({
    //     opponentUser: { ...data }
    //   });
    // });
    getChatRoomByContactId(this.state.currentUser.id, contactId).then(
      ({ data }) => {
        let { chatId, messageList, recentListUpdated } = data;

        this.setState(
          {
            currentChatRoom: chatId,
            messageList
          },
          () => {
            this.bottomRef.scrollTop = 9999999999999;
          }
        );
        if (recentListUpdated) {
          this.updateRecentContactList();
        }
      }
    );
  };

  handleMessageSend = message => {
    let { id } = this.state.currentUser;
    let { currentChatRoom, opponentUser } = this.state;
    if (currentChatRoom === "") return;
    const newMsg = {
      jid: opponentUser.jid,
      text: message
    };
    console.log('newMsg', newMsg);
    this.state.client.message(newMsg);
    // sendNewMessage({
    //   chatId: currentChatRoom,
    //   text: message,
    //   contactId: id,
    //   time: new Date()
    // }).then(data => {
    //   this.setState(
    //     {
    //       messageList: [...data.data]
    //     },
    //     () => {
    //       this.bottomRef.scrollTop = 9999999999999;
    //     }
    //   );

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

  render() {
    let {
      currentUser,
      contactList,
      recentContactList,
      messageList,
      opponentUser,
      currentChatRoom
    } = this.state;

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
                contactList={contactList}
                recentContactList={recentContactList}
                handleContactClick={this.handleContactClick}
                handleOpenContactList={this.handleOpenContactList}
                handleCloseContactList={this.handleCloseContactList}
              />
            </MatxSidenav>
            <MatxSidenavContent>
              <ChatContainer
                id={currentUser.id}
                opponentUser={opponentUser}
                messageList={messageList}
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
