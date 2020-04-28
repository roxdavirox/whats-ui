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
      id: "7863a6802ez0e277a0f98534"
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
    qrcode: null,
    client: socket(),
    chats: {},
    users: []
  };

  bottomRef = React.createRef();

  async componentDidMount() {
    let { id } = this.state.currentUser;
    getContactById(id).then(data => {
      this.setState({
        open: !isMobile(),
        currentUser: {
          ...data.data
        }
      });
    });
    // getAllContact(this.state.currentUser.id).then(data =>
    //   this.setState({ contactList: [...data.data] })
    // );
    const { client } = this.state;
    client.registerConnectHandler(this.handleConnection);
    client.registerQrcodeHandler(this.handleQrcode);
    client.registerChatHandler(this.handleChats, this.handleChat);
    client.registerHandler(this.handleReceivedMessage, this.handleRethink);
    this.updateRecentContactList();
  }

  handleRethink = data => {
    console.log('data rethink:', data);
  }

  handleQrcode = qrcode => {
    console.log('[client] qrcode:', qrcode);
    this.setState({ qrcode });
  }

  handleConnection = () => {
    console.log('[client] connectado!');
    this.setState({ isConnected: true });
  }

  handleChat = chat => {
    console.log('chat', chat);

    const chats = { ...this.state.chats, [chat.jid]: chat };
    const contactList = Object.values(chats)
      .map(({ user }) => ({
        id: user.jid,
        name: user.name,
        time: user.time
      }))
      .sort(byTime);

    this.setState({ 
      chats,
      contactList
    });
  }

  handleChats = chats => {
    console.log('chats', chats);
    const contacts = chats
      .map(({ user }) => ({
        id: user.jid,
        name: user.name,
        time: user.time
      }))
      .sort(byTime);
    console.log('sorted contacts', contacts);
    const users = chats.map(({ user }) => user);
    console.log('users', users);
    this.setState({
      chats, contactList: [...contacts], 
      qrcode: null,
      users
    });
  }

  updateRecentContactList = () => {
    let { id } = this.state.currentUser;
    getRecentContact(id).then(data => {
      this.setState({
        recentContactList: [...data.data]
      });
    });
  };

  scrollToBottom = () => {
    this.bottomRef.current.scrollIntoView({ behavior: "smooth" });
  };

  handleReceivedMessage = message => {
    console.log('mensagem recebida:', message);
    let { id } = this.state.currentUser;
    let { currentChatRoom, opponentUser } = this.state;
    if (currentChatRoom === "") return;

    sendNewMessage({
        chatId: currentChatRoom,
        text: message.text,
        contactId: message.jid,
        time: new Date()
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
    
    const openUserId = '7863a6802ez0e277a0f98534';

    this.setState({
      currentChatRoom: '123',
      messageList: [],
      contactId
    }, () => {
      this.bottomRef.scrollTop = 9999999999999;
    });
    const user = {
      ...this.state.chats[contactId].user,
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
    console.log('message', message);
    this.state.client.message({
      jid: opponentUser.jid,
      text: message
    });
    sendNewMessage({
      chatId: currentChatRoom,
      text: message,
      contactId: id,
      time: new Date()
    }).then(data => {
      this.setState(
        {
          messageList: [...data.data]
        },
        () => {
          this.bottomRef.scrollTop = 9999999999999;
        }
      );

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
    });
  };

  setBottomRef = ref => {
    this.bottomRef = ref;
  };

  toggleSidenav = () => this.setState({ open: !this.state.open });

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
                contactList={contactList}
                recentContactList={recentContactList}
                handleContactClick={this.handleContactClick}
              />
            </MatxSidenav>
            <MatxSidenavContent>
              {this.state.qrcode && this.state.isConnected
                ? <Qrcode value={this.state.qrcode} />
                : <ChatContainer
                      id={currentUser.id}
                      opponentUser={opponentUser}
                      messageList={messageList}
                      currentChatRoom={currentChatRoom}
                      setBottomRef={this.setBottomRef}
                      handleMessageSend={this.handleMessageSend}
                      toggleSidenav={this.toggleSidenav}
                    />
                }
            </MatxSidenavContent>
          </MatxSidenavContainer>
        </Card>
      </div>
    );
  }
}

export default AppChat;
