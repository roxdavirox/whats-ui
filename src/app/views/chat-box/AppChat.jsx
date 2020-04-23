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

const HOST_WS = `ws://${process.env.HOST_WS || 'localhost' }:2019`;

const delayIt = time => fn => new Promise((resolve, _) =>
    setTimeout(
      () => { fn(); resolve(); },
      time
    )
  )

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
    client: socket()
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
    getAllContact(this.state.currentUser.id).then(data =>
      this.setState({ contactList: [...data.data] })
    );
    const { client } = this.state;
    client.registerConnectHandler(this.handleConnection);
    client.registerQrcodeHandler(this.handleQrcode)
    this.updateRecentContactList();
  }

  handleQrcode = qrcode => {
    this.setState({ qrcode });
  }

  handleConnection = () => {
    console.log('connectado!');
    this.setState({ isConnected: true });
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

  handleContactClick = contactId => {
    if (isMobile()) this.toggleSidenav();
    console.log('contactId', contactId);
    if (!this.state.whatsappMessages) return;
    const openUserId = '7863a6802ez0e277a0f98534';

    this.setState({
      currentChatRoom: '123',
      messageList: [],
      contactId
    }, () => {
      this.bottomRef.scrollTop = 9999999999999;
    })
    getContactById(contactId).then(({ data }) => {
      console.log('open user', data);
      this.setState({
        opponentUser: { ...data }
      });
    });
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

      // bot message
      setTimeout(() => {
        sendNewMessage({
          chatId: currentChatRoom,
          text: `Hi, I'm ${opponentUser.name}. Your imaginary friend.`,
          contactId: opponentUser.id,
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
      }, 750);
      // bot message ends here
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
    console.log('this.whatsappMessages', this.state.whatsappMessages);

    console.log('messageList', messageList);
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
              {this.state.qrcode 
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
