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
import WebSocketClient from './WebSocketClient';

const HOST_WS = `ws://${process.env.HOST_WS || 'localhost' }:2019`;
const apiWebsocket = new WebSocketClient();

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
                if (msg.data.includes(`"message":["action"`)){
                  var index = msg.data.indexOf(',');
                  var data = msg.data.substring(index+1);
                  let dataJson = JSON.parse(data);
                  // console.log('dataJson::::', dataJson);
                }
                if (typeof msg.data === 'string' && msg.data.includes(`"type":"chat"`)) {
                  const mapContact = arr => { 
                    const [_, chatInfo] = arr;
                    const contact = {
                        id: chatInfo.jid.split('@')[0],
                        name: chatInfo.name
                    }
                    return contact;
                  };

                  const convertChatsToContacts = chats => chats.map(mapContact)
                
                  const computeContacts = _data => cb => {
                    const index = _data.indexOf(',');
                    const jsonObject = JSON.parse(_data.substring(index +1));
                    const { message } = jsonObject;
                    const { type } = message[1];
                    if (type !== 'chat') return {};
                    const chats = message[2];
                    return cb(chats);
                  }
                  const contacts = computeContacts(msg.data)(convertChatsToContacts);
                  this.setState({
                    contactList: [...contacts, ...this.state.contactList]
                  });
                  // console.log('contacts:', contacts);
                }
                const [tag, ...restMsg] = msg.data.split(',');
                if (!restMsg) return msg.data;
                const jsonObj = JSON.parse(restMsg);
                if (!jsonObj.message) return msg.data;
                const { message } = jsonObj;
                const isConnected = message[0] === 'Conn';
                if (isConnected) {
                  this.setState({ qrcode: null });
                }
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
                // console.log('whatsAppMessage', whatsAppMessage);
                if (type !== 'whatsapp_message_received') return;
                const whatsAppMessageStr = JSON.stringify(whatsAppMessage);
                if (typeof whatsAppMessageStr === 'string' && whatsAppMessageStr.includes('E2E_ENCRYPTED')) {
                  // mensagens dos contatos, sem exibir as minhas
                  console.log('E2E:::::', whatsAppMessage);
                  const { data: { message } } = whatsAppMessage;
                  const messages = message[2];
                  if (!messages) return;
                  const [e2e, ...restMsgs] = messages;
                  if (!JSON.stringify(e2e).includes('E2E')) return;
                  this.setState({
                    whatsappMessages: [...this.state.whatsappMessages, ...restMsgs]
                  });
                }
                const [tag] = data.message;
                if (tag !== 'action') return;
                const msgs = data.message[2];
                if (!msgs) return;
                
                function mapConversation(messages) {
                  var mapChat = data => ({ 
                    contactId: data.key.remoteJid.split('@')[0],
                    text: data.message.conversation,
                  });
                  var filterChat = msg => {
                    console.log('msg', msg)
                    return !Object.keys(msg).includes('participant')
                  };
                  return messages.filter(filterChat).map(mapChat);
                }
              
                var computeConversations = object => cb => {
                  if (!object.data.message) return { err: 'error msg' };
                  if (!Object.values(object.data.message).length) {
                    return { err: 'nao tem message '};
                  }
                  var { message } = object.data;
                  var messages = message[2];
                  return cb(messages)
                }

                // const chats = computeConversations(whatsAppMessage)(mapConversation);
                // console.log('##', chats);
                // msgs.forEach(m => {
                //   if (!m.message) return;
                //   const { message } = m;
                //   if (!message.conversation) return;
                //   const { conversation } = message;
                //   this.setState({
                //     messageList: [...this.state.messageList, conversation]
                //   });
                //   console.log('conversation:', conversation);
                // });
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
      stepThree.run(10000).then(() => {
        console.log('stepThree ok');
      });
    })
    await delayIt(2000)(() => {
      console.log('gerando qrcode...[#]');
      const qrCodeStep = this.state.bootstrapSteps[3];
      qrCodeStep.run(2000).then(() => {
        console.log('last step');
        this.setState({ isLastStep: true });
      })
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
    console.log('contactId', contactId);
    if (!this.state.whatsappMessages) return;
    console.log('this.whatsappMessages', this.state.whatsappMessages);
    const contactMessages = this.state.whatsappMessages
      .filter(wm => wm.key && JSON.stringify(wm).includes('conversation'))
      .filter(m => m.key.remoteJid.includes(contactId))  
      .map(msg => ({
        contactId,
        text: msg.message.conversation
      }));
    console.log('contactMessages', contactMessages);
    this.setState({
      currentChatRoom: '123',
      messageList: contactMessages
    }, () => {
      this.bottomRef.scrollTop = 9999999999999;
    })
    getContactById(contactId).then(({ data }) => {
      console.log('open user', data);
      this.setState({
        opponentUser: { ...data }
      });
    });
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
                ? <img src={this.state.qrcode} alt="qr code"/>
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
