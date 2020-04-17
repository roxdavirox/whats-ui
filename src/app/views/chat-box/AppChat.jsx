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
import BootstrapStep from './BootstrapStep';
import apiWebsocket from './WebSocketClient';

const HOST_WS = '';

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
    currentChatRoom: "",
    opponentUser: null,
    open: true,
    bootstrapStep: null,
    qrcode: null,
    bootstrapSteps: [
      new BootstrapStep({
        websocket: apiWebsocket,
        texts: {
            handling: "Connecting to API...",
            success: "Connected to API after %1 ms. Click to let API connect to backend.",
            failure: "Connection to API failed: %1. Click to try again.",
            connLost: "Connection to API closed. Click to reconnect."
        },
        actor: websocket => {
          websocket.initialize(
            HOST_WS,
            "client", {
              func: window.WebSocket,
              getOnMessageData: msg => {
                // console.log('msg.data', msg.data);
                return msg.data;
              }
            }
          );
          websocket.onClose(() => {
            console.log('close socket connection')
          });
        },
        request: {
          type: "waitForMessage",
          condition: obj => obj.type == "connected"
        }
      }),
      new BootstrapStep({
        websocket: apiWebsocket,
        texts: {
            handling: "Connecting to backend...",
            success: "Connected API to backend after %1 ms. Click to let backend connect to WhatsApp.",
            failure: "Connection of API to backend failed: %1. Click to try again.",
            connLost: "Connection of API to backend closed. Click to reconnect."
        },
        actor: websocket => {
            websocket.waitForMessage({
                condition: obj => obj.type == "resource_gone"  &&  obj.resource == "backend",
                keepWhenHit: false
            }).then(() => {
                websocket.apiConnectedToBackend = false;
                websocket.backendConnectedToWhatsApp = false;
            });
        },
        request: {
            type: "call",
            callArgs: { command: "api-connectBackend" },
            successCondition: obj => obj.type == "resource_connected"  &&  obj.resource == "backend",
            successActor: websocket => websocket.apiConnectedToBackend = true
        }
      }),
      new BootstrapStep({
        websocket: apiWebsocket,
        texts: {
            handling: "Connecting to WhatsApp...",
            success: "Connected backend to WhatsApp after %1 ms. Click to generate QR code.",
            failure: "Connection of backend to WhatsApp failed: %1. Click to try again.",
            connLost: "Connection of backend to WhatsApp closed. Click to reconnect."
        },
        actor: websocket => {
            websocket.waitForMessage({
                condition: obj => obj.type == "resource_gone"  &&  obj.resource == "whatsapp",
                keepWhenHit: false
            }).then(() => {
                websocket.backendConnectedToWhatsApp = false;
            });
        },
        request: {
            type: "call",
            callArgs: { command: "backend-connectWhatsApp" },
            successCondition: obj => obj.type == "resource_connected"  &&  obj.resource == "whatsapp",
            successActor: (websocket, obj) => websocket.backendConnectedToWhatsApp = true,
            timeoutCondition: websocket => websocket.apiConnectedToBackend				//condition for the timeout to be possible at all (if connection to backend is closed, a timeout for connecting to WhatsApp shall not override this issue message)
        }
    }),
      new BootstrapStep({
        websocket: apiWebsocket,
        texts: {
            handling: "Generating QR code...",
            success: "Generated QR code after %1 ms.",
            failure: "Generating QR code failed: %1. Click to try again."
        },
        request: {
            type: "call",
            callArgs: { command: "backend-generateQRCode" },
            successCondition: obj => obj.type == "generated_qr_code"  &&  obj.image,
            successActor: (websocket, {image}) => {
            this.setState({ qrcode: image });
  
            websocket.waitForMessage({
              condition: obj => obj.type == "whatsapp_message_received"  &&  obj.message,
              keepWhenHit: true
            }).then(whatsAppMessage => {
                const { data } = whatsAppMessage;
                const { type } = data;
                if (type !== 'whatsapp_message_received') return;
                const [tag] = data.message;
                if (tag !== 'action') return;
                const msgs = data.message[2];
                if (!msgs) return;
                console.log('data.message', data.message);
                msgs.forEach(m => {
                  if (!m.message) return;
                  const { message } = m;
                  if (!message.conversation) return;
                  const { conversation } = message;
                  this.setState({
                    messageList: [...this.state.messageList, conversation]
                  });
                  console.log('conversation:', conversation);
                });
  
            }).run();
          },
          timeoutCondition: websocket => websocket.backendConnectedToWhatsApp
        }
      })
    ]
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

    await delayIt(1000)(() => {
      const stepOne = this.state.bootstrapSteps[0];
      stepOne.run(10000).then(() => console.log('stepOne ok'));
    });
    await delayIt(1000)(() => {
      const stepTwo = this.state.bootstrapSteps[1];
      stepTwo.run(10000).then(() => console.log('stepTwo ok'));
    })
    await delayIt(1000)(() => {
      const stepThree = this.state.bootstrapSteps[2];
      stepThree.run(10000).then(() => console.log('stepThree ok'));
    })

    this.updateRecentContactList();
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

    getContactById(contactId).then(({ data }) => {
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
