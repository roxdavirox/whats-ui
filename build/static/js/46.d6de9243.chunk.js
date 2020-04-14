(this["webpackJsonpmatx-react"]=this["webpackJsonpmatx-react"]||[]).push([[46],{1263:function(e,t,a){"use strict";var n=a(3),r=a(4),c=a(1),o=a.n(c),i=(a(0),a(7)),s=a(10),l=a(32),m=o.a.forwardRef((function(e,t){var a=e.absolute,c=void 0!==a&&a,s=e.classes,l=e.className,m=e.component,d=void 0===m?"hr":m,u=e.flexItem,h=void 0!==u&&u,p=e.light,f=void 0!==p&&p,b=e.orientation,g=void 0===b?"horizontal":b,v=e.role,E=void 0===v?"hr"!==d?"separator":void 0:v,x=e.variant,y=void 0===x?"fullWidth":x,N=Object(r.a)(e,["absolute","classes","className","component","flexItem","light","orientation","role","variant"]);return o.a.createElement(d,Object(n.a)({className:Object(i.default)(s.root,l,"fullWidth"!==y&&s[y],c&&s.absolute,h&&s.flexItem,f&&s.light,{vertical:s.vertical}[g]),role:E,ref:t},N))}));t.a=Object(s.a)((function(e){return{root:{height:1,margin:0,border:"none",flexShrink:0,backgroundColor:e.palette.divider},absolute:{position:"absolute",bottom:0,left:0,width:"100%"},inset:{marginLeft:72},light:{backgroundColor:Object(l.d)(e.palette.divider,.08)},middle:{marginLeft:e.spacing(2),marginRight:e.spacing(2)},vertical:{height:"100%",width:1},flexItem:{alignSelf:"stretch",height:"auto"}}}),{name:"MuiDivider"})(m)},1283:function(e,t,a){"use strict";var n=a(4),r=a(3),c=a(1),o=a.n(c),i=(a(0),a(7)),s=a(10),l=a(542),m=a(14),d=o.a.forwardRef((function(e,t){var a=e.children,c=e.classes,s=e.className,d=e.color,u=void 0===d?"default":d,h=e.component,p=void 0===h?"button":h,f=e.disabled,b=void 0!==f&&f,g=e.disableFocusRipple,v=void 0!==g&&g,E=e.focusVisibleClassName,x=e.size,y=void 0===x?"large":x,N=e.variant,C=void 0===N?"round":N,w=Object(n.a)(e,["children","classes","className","color","component","disabled","disableFocusRipple","focusVisibleClassName","size","variant"]);return o.a.createElement(l.a,Object(r.a)({className:Object(i.default)(c.root,s,"round"!==C&&c.extended,"large"!==y&&c["size".concat(Object(m.a)(y))],b&&c.disabled,{primary:c.primary,secondary:c.secondary,inherit:c.colorInherit}[u]),component:p,disabled:b,focusRipple:!v,focusVisibleClassName:Object(i.default)(c.focusVisible,E),ref:t},w),o.a.createElement("span",{className:c.label},a))}));t.a=Object(s.a)((function(e){return{root:Object(r.a)({},e.typography.button,{boxSizing:"border-box",minHeight:36,transition:e.transitions.create(["background-color","box-shadow","border"],{duration:e.transitions.duration.short}),borderRadius:"50%",padding:0,minWidth:0,width:56,height:56,boxShadow:e.shadows[6],"&:active":{boxShadow:e.shadows[12]},color:e.palette.getContrastText(e.palette.grey[300]),backgroundColor:e.palette.grey[300],"&$focusVisible":{boxShadow:e.shadows[6]},"&:hover":{backgroundColor:e.palette.grey.A100,"@media (hover: none)":{backgroundColor:e.palette.grey[300]},"&$disabled":{backgroundColor:e.palette.action.disabledBackground},textDecoration:"none"},"&$disabled":{color:e.palette.action.disabled,boxShadow:e.shadows[0],backgroundColor:e.palette.action.disabledBackground}}),label:{width:"100%",display:"inherit",alignItems:"inherit",justifyContent:"inherit"},primary:{color:e.palette.primary.contrastText,backgroundColor:e.palette.primary.main,"&:hover":{backgroundColor:e.palette.primary.dark,"@media (hover: none)":{backgroundColor:e.palette.primary.main}}},secondary:{color:e.palette.secondary.contrastText,backgroundColor:e.palette.secondary.main,"&:hover":{backgroundColor:e.palette.secondary.dark,"@media (hover: none)":{backgroundColor:e.palette.secondary.main}}},extended:{borderRadius:24,padding:"0 16px",width:"auto",minHeight:"auto",minWidth:48,height:48,"&$sizeSmall":{width:"auto",padding:"0 8px",borderRadius:17,minWidth:34,height:34},"&$sizeMedium":{width:"auto",padding:"0 16px",borderRadius:20,minWidth:40,height:40}},focusVisible:{},disabled:{},colorInherit:{color:"inherit"},sizeSmall:{width:40,height:40},sizeMedium:{width:48,height:48}}}),{name:"MuiFab"})(d)},1309:function(e,t,a){"use strict";var n=a(3),r=a(4),c=a(1),o=a.n(c),i=(a(0),a(7)),s=a(10),l=a(80),m=Object(l.a)(o.a.createElement("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person");var d=o.a.forwardRef((function(e,t){var a=e.alt,c=e.children,s=e.classes,l=e.className,d=e.component,u=void 0===d?"div":d,h=e.imgProps,p=e.sizes,f=e.src,b=e.srcSet,g=e.variant,v=void 0===g?"circle":g,E=Object(r.a)(e,["alt","children","classes","className","component","imgProps","sizes","src","srcSet","variant"]),x=null,y=function(e){var t=e.src,a=e.srcSet,n=o.a.useState(!1),r=n[0],c=n[1];return o.a.useEffect((function(){if(t||a){c(!1);var e=!0,n=new Image;return n.src=t,n.srcSet=a,n.onload=function(){e&&c("loaded")},n.onerror=function(){e&&c("error")},function(){e=!1}}}),[t,a]),r}({src:f,srcSet:b}),N=f||b,C=N&&"error"!==y;return x=C?o.a.createElement("img",Object(n.a)({alt:a,src:f,srcSet:b,sizes:p,className:s.img},h)):null!=c?c:N&&a?a[0]:o.a.createElement(m,{className:s.fallback}),o.a.createElement(u,Object(n.a)({className:Object(i.default)(s.root,s.system,s[v],l,!C&&s.colorDefault),ref:t},E),x)}));t.a=Object(s.a)((function(e){return{root:{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none"},colorDefault:{color:e.palette.background.default,backgroundColor:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[600]},circle:{},rounded:{borderRadius:e.shape.borderRadius},square:{borderRadius:0},img:{width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4},fallback:{width:"75%",height:"75%"}}}),{name:"MuiAvatar"})(d)},2007:function(e,t,a){"use strict";a.r(t);var n=a(8),r=a(12),c=a(31),o=a(30),i=a(46),s=a(47),l=a(48),m=a(1),d=a.n(m),u=a(1194),h=a(333),p=a(20),f=a.n(p),b=function(e){return f.a.get("/api/chat/contacts",{data:e})},g=function(e){return f.a.get("/api/chat/contacts/recent",{data:e})},v=function(e,t){return f.a.get("/api/chat/chat-room",{data:{currentUser:e,contactId:t}})},E=function(e){return f.a.post("/api/chat/add",e)},x=a(1309),y=a(1125),N=Object(y.a)({avatar:{height:"40px",width:"40px"},status_circle:{position:"absolute",height:"14px",width:"14px",borderRadius:"7px",bottom:"0px",right:"-3px",border:"2px solid white"}})((function(e){var t=e.src,a=e.status,n=e.classes;return d.a.createElement("div",{className:"chat-avatar position-relative"},d.a.createElement(x.a,{className:n.avatar,src:t}),d.a.createElement("div",{className:"".concat(n.status_circle," ").concat("online"===a?"bg-primary":"bg-error")}))})),C=a(1260),w=a.n(C),j=a(1263),k=a(1937),S=function(e){var t=e.currentUser,a=e.contactList,n=void 0===a?[]:a,r=e.recentContactList,c=void 0===r?[]:r,o=e.handleContactClick;return d.a.createElement("div",{className:"chat-sidenav bg-default"},d.a.createElement("div",{className:"chat-sidenav__topbar flex items-center h-56 px-4 bg-primary"},d.a.createElement(N,{src:t.avatar,status:t.status}),d.a.createElement("h5",{className:"ml-4 whitespace-pre mb-0 font-medium text-18 text-white"},t.name)),d.a.createElement(w.a,{className:"chat-contact-list position-relative h-400"},c.map((function(e,t){return d.a.createElement("div",{onClick:function(){return o(e.id)},key:t,className:"flex items-center p-4 cursor-pointer  gray-on-hover"},d.a.createElement(N,{src:e.avatar,status:e.status}),d.a.createElement("div",{className:"pl-4"},d.a.createElement("p",{className:"m-0"},e.name),d.a.createElement("p",{className:"m-0 text-muted"},Object(k.a)(new Date(e.lastChatTime).getTime(),"MMMM dd, yyyy"))))})),d.a.createElement(j.a,null),n.map((function(e,t){return d.a.createElement("div",{onClick:function(){return o(e.id)},key:t,className:"flex items-center px-4 py-1 cursor-pointer  gray-on-hover"},d.a.createElement(N,{src:e.avatar,status:e.status}),d.a.createElement("div",{className:"pl-4"},d.a.createElement("p",null,e.name)))}))))},R=a(71),O=a(1134),L=a(1200),I=a(1272),U=a(389),z=a(1283),M=function(){return d.a.createElement("div",{className:"empty-message-circle bg-default flex justify-center items-center"},d.a.createElement(L.a,{color:"primary"},"chat"))},T=a(72),_=a(16),D=a.n(_),B=function(e){var t=e.id,a=e.toggleSidenav,n=e.currentChatRoom,r=e.opponentUser,c=e.messageList,o=void 0===c?[]:c,i=e.setBottomRef,s=e.handleMessageSend,l=d.a.useState(""),u=Object(R.a)(l,2),p=u[0],f=u[1];return d.a.createElement("div",{className:"chat-container flex-column position-relative"},d.a.createElement("div",{className:"chat-container__topbar flex items-center justify-between p-1 bg-primary"},d.a.createElement("div",{className:"flex items-center"},d.a.createElement("div",{className:"show-on-mobile"},d.a.createElement(O.a,{onClick:a},d.a.createElement(L.a,{className:"text-white"},"short_text"))),d.a.createElement("div",{className:"hide-on-mobile"},d.a.createElement("div",{className:"pl-3"})),r&&d.a.createElement(m.Fragment,null,d.a.createElement(N,{src:r.avatar,status:r.status}),d.a.createElement("h5",{className:"ml-4 whitespace-pre mb-0 font-medium text-18 text-white"},r.name))),d.a.createElement(h.g,{menuButton:d.a.createElement(O.a,null,d.a.createElement(L.a,{className:"text-white"},"more_vert"))},d.a.createElement(I.a,{className:"flex items-center"},d.a.createElement(L.a,{className:"mr-4"},"account_circle")," Contact"),d.a.createElement(I.a,{className:"flex items-center"},d.a.createElement(L.a,{className:"mr-4"},"volume_mute")," Mute"),d.a.createElement(I.a,{className:"flex items-center"},d.a.createElement(L.a,{className:"mr-4"},"delete")," Clear Chat"))),d.a.createElement(w.a,{containerRef:function(e){i(e)},className:"chat-message-list flex-grow position-relative"},""===n&&d.a.createElement("div",{className:"flex-column justify-center items-center h-full"},d.a.createElement(M,null),d.a.createElement("p",null,"Select a contact")),o.map((function(e,a){return d.a.createElement("div",{className:"flex items-start px-4 py-3",key:D.a.generate()},d.a.createElement(N,{src:e.avatar,status:e.status}),d.a.createElement("div",{className:"ml-4"},d.a.createElement("p",{className:"text-muted m-0 mb-2"},e.name),d.a.createElement("div",{className:"px-4 py-2 mb-2 list__message ".concat(t===e.contactId?"bg-primary text-white":"bg-paper")},d.a.createElement("span",{className:"whitespace-pre-wrap"},e.text)),d.a.createElement("small",{className:"text-muted mb-0"},Object(T.d)(new Date(e.time))," ago")))}))),d.a.createElement(j.a,null),""!==n&&d.a.createElement("div",{className:"flex items-center px-4 py-2"},d.a.createElement(U.a,{label:"Type your message here*",value:p,onChange:function(e){return f(e.target.value)},onKeyDown:function(e){"Enter"!==e.key||e.shiftKey||(""!==(p=p.trim())&&s(p),f(""))},fullWidth:!0,multiline:!0,rows:1,variant:"outlined"}),d.a.createElement("div",null,d.a.createElement(z.a,{onClick:function(){""!==p.trim()&&s(p),f("")},color:"primary",className:"ml-4"},d.a.createElement(L.a,null,"send")))))},F=function(e){function t(){var e,a;Object(c.a)(this,t);for(var o=arguments.length,l=new Array(o),m=0;m<o;m++)l[m]=arguments[m];return(a=Object(i.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(l)))).state={currentUser:{id:"7863a6802ez0e277a0f98534"},contactList:[],recentContactList:[],messageList:[],currentChatRoom:"",opponentUser:null,open:!0},a.bottomRef=d.a.createRef(),a.updateRecentContactList=function(){var e=a.state.currentUser.id;g(e).then((function(e){a.setState({recentContactList:Object(r.a)(e.data)})}))},a.scrollToBottom=function(){a.bottomRef.current.scrollIntoView({behavior:"smooth"})},a.handleContactClick=function(e){Object(T.f)()&&a.toggleSidenav(),b(e).then((function(e){var t=e.data;a.setState({opponentUser:Object(n.a)({},t)})})),v(a.state.currentUser.id,e).then((function(e){var t=e.data,n=t.chatId,r=t.messageList,c=t.recentListUpdated;a.setState({currentChatRoom:n,messageList:r},(function(){a.bottomRef.scrollTop=9999999999999})),c&&a.updateRecentContactList()}))},a.handleMessageSend=function(e){var t=a.state.currentUser.id,n=a.state,c=n.currentChatRoom,o=n.opponentUser;""!==c&&E({chatId:c,text:e,contactId:t,time:new Date}).then((function(e){a.setState({messageList:Object(r.a)(e.data)},(function(){a.bottomRef.scrollTop=9999999999999})),setTimeout((function(){E({chatId:c,text:"Hi, I'm ".concat(o.name,". Your imaginary friend."),contactId:o.id,time:new Date}).then((function(e){a.setState({messageList:Object(r.a)(e.data)},(function(){a.bottomRef.scrollTop=9999999999999}))}))}),750)}))},a.setBottomRef=function(e){a.bottomRef=e},a.toggleSidenav=function(){return a.setState({open:!a.state.open})},a}return Object(l.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e,t=this,a=this.state.currentUser.id;b(a).then((function(e){t.setState({open:!Object(T.f)(),currentUser:Object(n.a)({},e.data)})})),(e=this.state.currentUser.id,f.a.get("/api/chat/contacts/all",{data:e})).then((function(e){return t.setState({contactList:Object(r.a)(e.data)})})),this.updateRecentContactList()}},{key:"render",value:function(){var e=this.state,t=e.currentUser,a=e.contactList,n=e.recentContactList,r=e.messageList,c=e.opponentUser,o=e.currentChatRoom;return d.a.createElement("div",{className:"m-sm-30"},d.a.createElement("div",{className:"mb-sm-30"},d.a.createElement(h.a,{routeSegments:[{name:"Chat"}]})),d.a.createElement(u.a,{elevation:6},d.a.createElement(h.k,null,d.a.createElement(h.j,{width:"230px",open:this.state.open,toggleSidenav:this.toggleSidenav},d.a.createElement(S,{currentUser:t,contactList:a,recentContactList:n,handleContactClick:this.handleContactClick})),d.a.createElement(h.l,null,d.a.createElement(B,{id:t.id,opponentUser:c,messageList:r,currentChatRoom:o,setBottomRef:this.setBottomRef,handleMessageSend:this.handleMessageSend,toggleSidenav:this.toggleSidenav})))))}}]),t}(m.Component);t.default=F}}]);