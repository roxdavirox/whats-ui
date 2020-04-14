(this["webpackJsonpmatx-react"]=this["webpackJsonpmatx-react"]||[]).push([[30],{1333:function(e,t,a){"use strict";var n=a(71),l=a(1),r=a.n(l),c=a(1134),o=a(1929),s=a(1200),i=a(1993),m=a(1189),u=a(10),d=a(0),p=a.n(d),b=a(40),g=a(96),E=!1;t.a=Object(u.a)({},{withTheme:!0})(Object(b.b)((function(e){return{settings:e.layout.settings,getCartList:p.a.func.isRequired,deleteProductFromCart:p.a.func.isRequired,updateCartAmount:p.a.func.isRequired,cartList:e.ecommerce.cartList,user:e.user}}),{getCartList:g.l,deleteProductFromCart:g.j,updateCartAmount:g.p})((function(e){var t=e.container,a=e.theme,l=e.settings,u=e.cartList,d=void 0===u?[]:u,p=e.getCartList,b=e.deleteProductFromCart,g=e.updateCartAmount,h=e.user,f=r.a.useState(!1),y=Object(n.a)(f,2),v=y[0],N=y[1];function x(){N(!v)}E||(p(h.userId),E=!0);var S=a.palette;return r.a.createElement(m.a,{theme:l.themes[l.activeTheme]},r.a.createElement(c.a,{onClick:x,style:{color:"light"===S.type?S.text.secondary:S.text.primary}},r.a.createElement(o.a,{color:"secondary",badgeContent:d.length},r.a.createElement(s.a,null,"shopping_cart"))),r.a.createElement(i.a,{container:t,variant:"temporary",anchor:"right",open:v,onClose:x,ModalProps:{keepMounted:!0}},r.a.createElement("div",{className:"mini-cart"},r.a.createElement("div",{className:"cart__topbar flex items-center p-1 mb-2 pl-4"},r.a.createElement(s.a,{color:"primary"},"shopping_cart"),r.a.createElement("h5",{className:"ml-2 my-0 font-medium"},"Cart")),d.map((function(e){return r.a.createElement("div",{key:e.id,className:"mini-cart__item flex items-center justify-between py-2 px-2"},r.a.createElement("div",{className:"flex flex-column mr-2"},r.a.createElement(c.a,{size:"small",onClick:function(){return g(h.userId,e.id,e.amount+1)}},r.a.createElement(s.a,{className:"cursor-pointer"},"keyboard_arrow_up")),r.a.createElement(c.a,{disabled:!(e.amount-1),size:"small",onClick:function(){return g(h.userId,e.id,e.amount-1)}},r.a.createElement(s.a,{className:"cursor-pointer"},"keyboard_arrow_down"))),r.a.createElement("div",{className:"mr-2"},r.a.createElement("img",{src:e.imgUrl,alt:e.title})),r.a.createElement("div",{className:"mr-2 text-center"},r.a.createElement("h6",{className:"m-0 mb-1"},e.title),r.a.createElement("small",{className:"text-muted"},"$",e.price," x ",e.amount)),r.a.createElement(c.a,{size:"small",onClick:function(){return b(h.userId,e.id)}},r.a.createElement(s.a,{fontSize:"small"},"clear")))})))))})))},1417:function(e,t,a){"use strict";var n=a(71),l=a(1),r=a.n(l),c=a(1134),o=a(1929),s=a(1200),i=a(1993),m=a(1194),u=a(1197),d=a(59),p=a(1189),b=a(10),g=a(72),E=a(0),h=a.n(E),f=a(40),y=a(185);t.a=Object(b.a)({},{withTheme:!0})(Object(f.b)((function(e){return{getNotification:h.a.func.isRequired,deleteNotification:h.a.func.isRequired,deleteAllNotification:h.a.func.isRequired,notifications:e.notifications,settings:e.layout.settings}}),{getNotification:y.g,deleteNotification:y.f,deleteAllNotification:y.e})((function(e){var t=e.container,a=e.theme,l=e.settings,b=e.notifications,E=void 0===b?[]:b,h=e.getNotification,f=e.deleteAllNotification,y=e.deleteNotification,v=r.a.useState(!1),N=Object(n.a)(v,2),x=N[0],S=N[1];function k(){x||h(),S(!x)}var j=a.palette;return r.a.createElement(p.a,{theme:l.themes[l.activeTheme]},r.a.createElement(c.a,{onClick:k,style:{color:"light"===j.type?j.text.secondary:j.text.primary}},r.a.createElement(o.a,{color:"secondary",badgeContent:5},r.a.createElement(s.a,null,"notifications"))),r.a.createElement(i.a,{width:"100px",container:t,variant:"temporary",anchor:"right",open:x,onClose:k,ModalProps:{keepMounted:!0}},r.a.createElement("div",{className:"notification"},r.a.createElement("div",{className:"notification__topbar flex items-center p-4 mb-4"},r.a.createElement(s.a,{color:"primary"},"notifications"),r.a.createElement("h5",{className:"ml-2 my-0 font-medium"},"Notifications")),E.map((function(e){return r.a.createElement("div",{key:e.id,className:"notification__card position-relative"},r.a.createElement(c.a,{size:"small",className:"delete-button bg-light-gray mr-6",onClick:function(){return y(e.id)}},r.a.createElement(s.a,{className:"text-muted",fontSize:"small"},"clear")),r.a.createElement(d.a,{to:"/".concat(e.path),onClick:k},r.a.createElement(m.a,{className:"mx-4 mb-6",elevation:3},r.a.createElement("div",{className:"card__topbar flex items-center justify-between p-2 bg-light-gray"},r.a.createElement("div",{className:"flex items-center"},r.a.createElement("div",{className:"card__topbar__button"},r.a.createElement(s.a,{className:"card__topbar__icon",fontSize:"small",color:e.icon.color},e.icon.name)),r.a.createElement("span",{className:"ml-4 font-medium text-muted"},e.heading)),r.a.createElement("small",{className:"card__topbar__time text-muted"},Object(g.d)(new Date(e.timestamp))," ago")),r.a.createElement("div",{className:"px-4 pt-2 pb-4"},r.a.createElement("p",{className:"m-0"},e.title),r.a.createElement("small",{className:"text-muted"},e.subtitle)))))})),!!E.length&&r.a.createElement("div",{className:"text-center"},r.a.createElement(u.a,{onClick:f},"Clear Notifications")))))})))},1418:function(e,t,a){"use strict";var n=a(21),l=a(8),r=a(1),c=a.n(r),o=a(1260),s=a.n(o),i=a(65),m=a(40),u=a(0),d=a.n(u),p=a(348),b=a(333),g=a(103);t.a=Object(i.g)(Object(m.b)((function(e){return{setLayoutSettings:d.a.func.isRequired,settings:e.layout.settings}}),{setLayoutSettings:g.d})((function(e){return c.a.createElement(r.Fragment,null,c.a.createElement(s.a,{options:{suppressScrollX:!0},className:"scrollable position-relative"},e.children,c.a.createElement(b.o,{navigation:p.a})),c.a.createElement("div",{onClick:function(){return function(t){var a=e.settings,r=e.setLayoutSettings,c=a.activeLayout+"Settings",o=a[c];r(Object(l.a)({},a,Object(n.a)({},c,Object(l.a)({},o,{leftSidebar:Object(l.a)({},o.leftSidebar,{},t)}))))}({mode:"close"})},className:"sidenav__overlay"}))})))},1419:function(e,t,a){"use strict";var n=a(1),l=a.n(n),r=a(1189),c=a(10),o=a(1978),s=a(1450),i=a(1197),m=a(40);t.a=Object(c.a)({},{withTheme:!0})(Object(m.b)((function(e){return{settings:e.layout.settings}}),{})((function(e){var t=e.theme,a=e.settings,n=a.themes[a.footer.theme]||t;return l.a.createElement(r.a,{theme:n},l.a.createElement(o.a,{color:"primary",position:"static"},l.a.createElement(s.a,{className:"footer flex items-center"},l.a.createElement("div",{className:"flex items-center container w-full"},l.a.createElement("a",{href:"https://github.com/uilibrary/matx-react",target:"_blank",className:"mr-2"},l.a.createElement(i.a,{variant:"contained"},"Download Free version")),l.a.createElement("a",{href:"https://material-ui.com/store/items/matx-pro-react-dashboard-template/"},l.a.createElement(i.a,{variant:"contained",color:"secondary"},"Get MatX Pro")),l.a.createElement("span",{className:"m-auto"}),l.a.createElement("p",{className:"m-0"},"Design and Developed by ",l.a.createElement("a",{href:"http://ui-lib.com"},"UI Lib"))))))})))},1420:function(e,t,a){"use strict";var n=a(1),l=a.n(n),r=a(40),c=a(103),o=a(1199),s=a(1134),i=a(1200),m=a(1283),u=a(10),d=a(55),p=a(0),b=a.n(p),g=a(72),E=Object(u.a)((function(e){return{toggle:{position:"fixed",right:"-30px",bottom:"20px",zIndex:9999,transition:"all 0.15s ease","&.open":{right:"10px"}}}}),{withTheme:!0})(Object(r.b)((function(e){return{settings:e.layout.settings,setLayoutSettings:b.a.func.isRequired}}),{setLayoutSettings:c.d})((function(e){var t=e.classes,a=e.settings,r=e.setLayoutSettings,c=Object(o.a)("(max-width:767px)"),u=function(){r(Object(d.merge)({},a,{secondarySidebar:{open:!a.secondarySidebar.open}}))};return Object(n.useEffect)((function(){r(Object(d.merge)({},a,{secondarySidebar:{open:!c}}))}),[c,r]),l.a.createElement("div",{className:t.toggle+" "+Object(g.a)({open:a.secondarySidebar.open})},a.secondarySidebar.open&&l.a.createElement(s.a,{onClick:u,size:"small","aria-label":"toggle"},l.a.createElement(i.a,null,"arrow_right")),!a.secondarySidebar.open&&l.a.createElement(m.a,{variant:"extended",size:"small",color:"primary","aria-label":"add",className:"pr-9",onClick:u},l.a.createElement(i.a,null,"arrow_left")))}))),h=a(31),f=a(30),y=a(46),v=a(47),N=a(48),x=a(59),S=a(65),k=a(8),j=a(71),O=a(1315),C=a(1197),w=a(241),_=a(1994),D=a(1129),L=a(1131),T=a(1285),z=a(1196),R=a(1453),P=a(1189),I=a(1260),q=a.n(I),F=a(1317),M=a(1335),U=a(1195),A=a(344),B=a(1929),W=Object(u.a)((function(e){return{badge:{top:"0",right:"0",height:"32px",width:"32px",borderRadius:"50%"}}}))(B.a),X=["purple1","purple2","blue","purpleDark1","purpleDark2","blueDark"],H=["whitePurple","whiteBlue","slateDark1","slateDark2","purpleDark1","purpleDark2","blueDark"],G=["whitePurple","whiteBlue","slateDark1","slateDark2","purpleDark1","purpleDark2","blueDark"],J=["/assets/images/sidebar/sidebar-bg-dark.jpg","/assets/images/sidebar/sidebar-bg-light.jpg"],$=function(e){var t=e.settings,a=e.handleChange,r=e.handleControlChange;return l.a.createElement(n.Fragment,null,l.a.createElement("div",{className:"mb-4 mx-3"},l.a.createElement("div",{className:"text-muted mb-4"},"Sidebar theme"),l.a.createElement("div",{className:"colors"},H.map((function(e,n){return l.a.createElement(O.a,{key:n,title:e,placement:"top"},l.a.createElement("div",{className:"color",onClick:function(){return a("layout1Settings.leftSidebar.theme",e)},style:{backgroundColor:A.a[e].palette.primary.main}},t.layout1Settings.leftSidebar.theme===e&&l.a.createElement(i.a,null,"done"),l.a.createElement("div",{className:t.themes[e].palette.type})))})))),l.a.createElement("div",{className:"mb-8 mx-3"},l.a.createElement("div",{className:"text-muted mb-4"},"Topbar theme"),l.a.createElement("div",{className:"colors"},G.map((function(e,n){return l.a.createElement(O.a,{key:n,title:e,placement:"top"},l.a.createElement("div",{className:"color",onClick:function(){return a("layout1Settings.topbar.theme",e)},style:{backgroundColor:A.a[e].palette.primary.main}},t.layout1Settings.topbar.theme===e&&l.a.createElement(i.a,null,"done"),l.a.createElement("div",{className:t.themes[e].palette.type})))})))),l.a.createElement("div",{className:"mx-3 mb-6"},l.a.createElement(D.a,{component:"fieldset"},l.a.createElement(L.a,{component:"legend"},"Sidebar mode"),l.a.createElement(F.a,{"aria-label":"Sidebar",name:"leftSidebar",value:t.layout1Settings.leftSidebar.mode,onChange:r("layout1Settings.leftSidebar.mode")},l.a.createElement(z.a,{value:"full",control:l.a.createElement(M.a,null),label:"Full"}),l.a.createElement(z.a,{value:"close",control:l.a.createElement(M.a,null),label:"Close"}),l.a.createElement(z.a,{value:"compact",control:l.a.createElement(M.a,null),label:"Compact"})))),l.a.createElement("div",{className:"mb-8 mx-3"},l.a.createElement("div",{className:"text-muted mb-8"},"Sidebar background image"),l.a.createElement("div",{className:"layout-boxes sidebar-bg"},l.a.createElement(U.a,{container:!0,spacing:3},J.map((function(e,n){return l.a.createElement(U.a,{item:!0,lg:4,key:n},l.a.createElement(W,{color:"primary",className:"layout-box mr-4",badgeContent:l.a.createElement(i.a,null,"done"),invisible:t.layout1Settings.leftSidebar.bgImgURL!==e},l.a.createElement(w.a,{onClick:function(){return a("layout1Settings.leftSidebar.bgImgURL",e)},className:"h-160"},l.a.createElement("img",{src:e,alt:""}))))}))))),l.a.createElement("div",{className:"mx-3 mb-6"},l.a.createElement(D.a,{component:"fieldset"},l.a.createElement(L.a,{component:"legend"},"Topbar"),l.a.createElement(T.a,null,l.a.createElement(z.a,{control:l.a.createElement(R.a,{checked:Object(d.get)(t.layout1Settings.topbar,"show"),onChange:r("layout1Settings.topbar.show")}),label:"Show"}),l.a.createElement(z.a,{control:l.a.createElement(R.a,{checked:Object(d.get)(t.layout1Settings.topbar,"fixed"),onChange:r("layout1Settings.topbar.fixed")}),label:"Fixed"})))))},K=function(e){var t=e.settings,a=e.handleChange,r=e.handleControlChange;return l.a.createElement(n.Fragment,null,l.a.createElement("div",{className:"mb-4 mx-3"},l.a.createElement("div",{className:"text-muted mb-4"},"Topbar theme"),l.a.createElement("div",{className:"colors"},Object.keys(A.a).map((function(e,n){return l.a.createElement(O.a,{key:n,title:e,placement:"top"},l.a.createElement("div",{className:"color",onClick:function(){return a("layout2Settings.topbar.theme",e)},style:{backgroundColor:A.a[e].palette.primary.main}},t.layout2Settings.topbar.theme===e&&l.a.createElement(i.a,null,"done"),l.a.createElement("div",{className:t.themes[e].palette.type})))})))),l.a.createElement("div",{className:"mb-4 mx-3"},l.a.createElement("div",{className:"text-muted mb-4"},"Navbar theme"),l.a.createElement("div",{className:"colors"},Object.keys(A.a).map((function(e,n){return l.a.createElement(O.a,{key:n,title:e,placement:"top"},l.a.createElement("div",{className:"color",onClick:function(){return a("layout2Settings.navbar.theme",e)},style:{backgroundColor:A.a[e].palette.primary.main}},t.layout2Settings.navbar.theme===e&&l.a.createElement(i.a,null,"done"),l.a.createElement("div",{className:t.themes[e].palette.type})))})))),l.a.createElement("div",{className:"mx-3 mb-6"},l.a.createElement(D.a,{component:"fieldset"},l.a.createElement(L.a,{component:"legend"},"Layout mode"),l.a.createElement(F.a,{"aria-label":"layout-mode",name:"layoutMode",value:t.layout2Settings.mode,onChange:r("layout2Settings.mode")},l.a.createElement(z.a,{value:"full",control:l.a.createElement(M.a,null),label:"Full"}),l.a.createElement(z.a,{value:"contained",control:l.a.createElement(M.a,null),label:"Contained"}),l.a.createElement(z.a,{value:"boxed",control:l.a.createElement(M.a,null),label:"Boxed"})))))},Q=Object(u.a)((function(e){return{label:{color:e.palette.secondary.main,backgroundColor:e.palette.primary.dark,fontWeight:700,transform:"rotate(90deg)",marginBottom:"2.5rem",padding:".25rem .5rem",borderRadius:"4px",cursor:"pointer",letterSpacing:"1.5px",fontSize:"1rem","&:hover, &.open":{backgroundColor:e.palette.secondary.main,color:e.palette.secondary.contrastText}},helpText:{margin:"0px .5rem 1rem"}}}),{withTheme:!0})(Object(r.b)((function(e){return{settings:e.layout.settings,setLayoutSettings:b.a.func.isRequired,setDefaultSettings:b.a.func.isRequired}}),{setLayoutSettings:c.d,setDefaultSettings:c.c})((function(e){var t=Object(n.useState)(!1),a=Object(j.a)(t,2),r=a[0],c=a[1],o=Object(n.useState)(0),m=Object(j.a)(o,2),u=m[0],p=m[1],b=e.settings,E=e.classes,h=e.setLayoutSettings,f=e.setDefaultSettings,y=function(e){var t=Object(d.merge)({},b,e);h(t),f(t)},v=function(t,a){var n=e.settings,l=Object(d.set)(n,t,a);y(l)},N=function(e){return function(t){var a="checkbox"===t.target.type?t.target.checked:t.target.value;v(e,a)}},x=function(){c(!r)},S=function(e){p(e)},I=Object(k.a)({},b.themes[b.activeTheme]);return l.a.createElement(n.Fragment,null,l.a.createElement(O.a,{title:"Theme Settings",placement:"left"},l.a.createElement("span",{className:"".concat(E.label," ").concat(Object(g.a)({open:r})),onClick:x},"DEMOS")),r&&l.a.createElement(P.a,{theme:I},l.a.createElement("div",{className:"matx-customizer pb-8 ".concat(E.root),style:{backgroundColor:I.palette.background.default}},l.a.createElement("div",{className:"flex felx-row items-center px-5 py-4 mb-4 min-h-64 elevation-z6"},l.a.createElement(i.a,{color:"primary"},"settings"),l.a.createElement("h5",{className:"mb-0 ml-2"},"Theme Settings"),l.a.createElement(s.a,{onClick:x,className:"customizer-close"},l.a.createElement(i.a,null,"close"))),l.a.createElement("div",{className:"px-6 mb-4 flex"},l.a.createElement(C.a,{variant:"outlined",color:0===u?"secondary":"primary",onClick:function(){return S(0)},className:"mr-4"},"Demos"),l.a.createElement(C.a,{variant:"outlined",color:1===u?"secondary":"primary",onClick:function(){return S(1)}},"Settings")),l.a.createElement(q.a,{options:{suppressScrollX:!0},className:"px-4"},0===u&&l.a.createElement("div",{className:"mb-8 mx-2"},l.a.createElement("div",{className:"text-muted"},"Layouts"),l.a.createElement("div",{className:"layout-boxes"},[{name:"Light Sidebar",thumbnail:"/assets/images/screenshots/layout1-customizer.png",isPro:!1,options:{activeLayout:"layout1",activeTheme:"blue",layout1Settings:{leftSidebar:{theme:"whiteBlue",bgOpacity:.98},topbar:{theme:"blueDark",fixed:!0}},footer:{theme:"slateDark1"}}},{name:"Dark Sidebar",thumbnail:"/assets/images/screenshots/layout1-blue-customizer.png",isPro:!1,options:{activeLayout:"layout1",activeTheme:"blue",layout1Settings:{leftSidebar:{theme:"slateDark1",bgOpacity:.92},topbar:{theme:"blueDark",fixed:!0}}}},{name:"Dark Theme",thumbnail:"/assets/images/screenshots/layout3-customizer.png",isPro:!1,options:{activeLayout:"layout1",activeTheme:"purpleDark1",layout1Settings:{leftSidebar:{theme:"slateDark1",bgOpacity:.92},topbar:{theme:"purpleDark1",fixed:!0}},footer:{theme:"slateDark1"}}},{name:"Horizontal Navigation",thumbnail:"/assets/images/screenshots/layout4-customizer.png",isPro:!0,options:{activeLayout:"layout2",activeTheme:"purple1",layout2Settings:{mode:"full"},footer:{theme:"slateDark1"}}}].map((function(e){return l.a.createElement(W,{color:"secondary",className:"layout-box",badgeContent:"Pro",invisible:!e.isPro,key:e.name},l.a.createElement(w.a,{onClick:function(){return y(e.options)},elevation:4},l.a.createElement("span",{className:"layout-name"},l.a.createElement(C.a,{variant:"contained",color:"secondary"},e.name)),l.a.createElement("img",{src:e.thumbnail,alt:e.name})))})))),1===u&&l.a.createElement("div",null,l.a.createElement("div",{className:E.helpText},"Set different themes to body, topbar, sidebar, footer & etc. Check out the ",l.a.createElement(_.a,{href:"http://demos.ui-lib.com/matx-react-doc/layout.html",target:"_blank"},"Documentation")),l.a.createElement("div",{className:"mb-4 mx-2"},l.a.createElement("div",{className:"text-muted mb-4"},"Main theme"),l.a.createElement("div",{className:"colors"},X.map((function(e,t){return l.a.createElement(O.a,{key:t,title:e,placement:"top"},l.a.createElement("div",{className:"color",onClick:function(){return y({activeTheme:e})},style:{backgroundColor:A.a[e].palette.primary.main}},b.activeTheme===e&&l.a.createElement(i.a,null,"done"),l.a.createElement("div",{className:b.themes[e].palette.type})))})))),"layout1"===b.activeLayout&&l.a.createElement($,{settings:b,handleChange:v,handleControlChange:N}),"layout2"===b.activeLayout&&l.a.createElement(K,{settings:b,handleChange:v,handleControlChange:N}),l.a.createElement("div",{className:"mx-2 mb-6"},l.a.createElement(D.a,{component:"fieldset"},l.a.createElement(L.a,{component:"legend"},"Footer"),l.a.createElement(T.a,null,l.a.createElement(z.a,{control:l.a.createElement(R.a,{checked:Object(d.get)(b.footer,"show"),onChange:N("footer.show")}),label:"Show"}),l.a.createElement(z.a,{control:l.a.createElement(R.a,{checked:Object(d.get)(b.layout1Settings.footer,"fixed"),onChange:N("footer.fixed")}),label:"Fixed"})))),l.a.createElement("div",{className:"mx-2 mb-6"},l.a.createElement(D.a,{component:"fieldset"},l.a.createElement(L.a,{component:"legend"},"Secondary sidebar"),l.a.createElement(T.a,null,l.a.createElement(z.a,{control:l.a.createElement(R.a,{checked:Object(d.get)(b.secondarySidebar,"show"),onChange:N("secondarySidebar.show")}),label:"Show"})))),l.a.createElement("div",{className:"mb-4 mx-2"},l.a.createElement("div",{className:"text-muted mb-4"},"Secondary sidebar theme"),l.a.createElement("div",{className:"colors"},G.map((function(e,t){return l.a.createElement(O.a,{key:t,title:e,placement:"top"},l.a.createElement("div",{className:"color",onClick:function(){return v("secondarySidebar.theme",e)},style:{backgroundColor:A.a[e].palette.primary.main}},b.secondarySidebar.theme===e&&l.a.createElement(i.a,null,"done"),l.a.createElement("div",{className:b.themes[e].palette.type})))})))),l.a.createElement("div",{className:"mb-4 mx-2"},l.a.createElement("div",{className:"text-muted mb-4"},"Footer theme"),l.a.createElement("div",{className:"colors"},G.map((function(e,t){return l.a.createElement(O.a,{key:t,title:e,placement:"top"},l.a.createElement("div",{className:"color",onClick:function(){return v("footer.theme",e)},style:{backgroundColor:A.a[e].palette.primary.main}},b.footer.theme===e&&l.a.createElement(i.a,null,"done"),l.a.createElement("div",{className:b.themes[e].palette.type})))})))))))))}))),V=a(1333),Y=function(e){function t(){return Object(h.a)(this,t),Object(y.a)(this,Object(v.a)(t).apply(this,arguments))}return Object(N.a)(t,e),Object(f.a)(t,[{key:"render",value:function(){var e=this.props.classes;return l.a.createElement("div",{className:e.root+" "+Object(g.a)({"secondary-sidebar":!0})},l.a.createElement("span",{className:"m-auto"}),l.a.createElement(Q,null),l.a.createElement(V.a,null),l.a.createElement(x.a,{to:"/chat"},l.a.createElement(s.a,{size:"small","aria-label":"delete",className:"my-3"},l.a.createElement(i.a,null,"comments"))),l.a.createElement("span",{className:"m-auto"}))}}]),t}(n.Component),Z=Object(u.a)((function(e){return{root:{position:"fixed",height:"100vh",width:"50px",right:0,bottom:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",boxShadow:e.shadows[8],backgroundColor:e.palette.primary.main,zIndex:98,transition:"all 0.15s ease"},"@global":{"@media screen and (min-width: 767px)":{".content-wrap, .layout2.layout-contained, .layout2.layout-full":{marginRight:"50px"},".matx-customizer":{right:"50px"}},"@media screen and (max-width: 959px)":{".toolbar-menu-wrap .menu-area":{width:"calc(100% - ".concat("50px",")")}}}}}),{withTheme:!0})(Object(S.g)(Object(r.b)((function(e){return{settings:e.layout.settings}}),{})(Y))),ee=function(e){var t=e.theme,a=(e.classes,e.children);e.open;return l.a.createElement(P.a,{theme:t},a)};t.a=Object(r.b)((function(e){return{settings:e.layout.settings}}),{})((function(e){var t=e.settings,a=t.themes[t.secondarySidebar.theme];return l.a.createElement(ee,{theme:a},t.secondarySidebar.open&&l.a.createElement(Z,null),l.a.createElement(E,null))}))},1423:function(e,t,a){"use strict";var n=a(1),l=a.n(n),r=a(40),c=function(e){var t=e.className,a=Object(r.c)((function(e){return e.layout.settings})),n=a.themes[a.activeTheme];return l.a.createElement("svg",{width:"24px",height:"24px",className:t,viewBox:"0 0 240 239",version:"1.1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink"},l.a.createElement("g",{id:"Page-1",stroke:"none",strokeWidth:"1",fill:"none",fillRule:"evenodd"},l.a.createElement("g",{id:"logo",transform:"translate(120.500000, 98.000000) rotate(-270.000000) translate(-120.500000, -98.000000) translate(-21.000000, -35.000000)"},l.a.createElement("g",{id:"Group",transform:"translate(141.500000, 133.000000) rotate(90.000000) translate(-141.500000, -133.000000) translate(9.000000, -8.000000)"},l.a.createElement("g",{id:"Path-4-Copy",transform:"translate(132.242532, 149.243361) rotate(-135.000000) translate(-132.242532, -149.243361) translate(38.742532, 55.743361)"},l.a.createElement("g",{id:"path-1-link",fill:"#000000"},l.a.createElement("polygon",{id:"path-1",points:"136.269985 0.8695976 186.615824 50.367072 186.615824 186.98041 50.7100649 186.98041 0.4346189 136.704964"})),l.a.createElement("g",{id:"path-1-link",fill:n.palette.primary.light},l.a.createElement("polygon",{id:"path-1",points:"136.269985 0.8695976 186.615824 50.367072 186.615824 186.98041 50.7100649 186.98041 0.4346189 136.704964"}))),l.a.createElement("polygon",{id:"Path-3",fill:n.palette.primary.light,points:"13 238.415212 13 0 249.898437 238.415212"}),l.a.createElement("polygon",{id:"Path-4",fill:n.palette.primary.main,points:"252.486992 0 252.486992 238.799226 13 238.799226"})))))};t.a=function(e){var t=e.children;return l.a.createElement("div",{className:"flex items-center justify-between brand-area"},l.a.createElement("div",{className:"flex items-center brand"},l.a.createElement(c,{className:""}),l.a.createElement("span",{className:"brand__text ml-2"},"Matx")),t)}},1424:function(e,t,a){"use strict";var n=a(1),l=a.n(n),r=a(1189),c=a(10),o=Object(c.a)((function(e){return{root:{backgroundColor:e.palette.background.default,color:e.palette.text.primary,"& .sidenav":{"& .sidenav__hold":{opacity:"1 !important","&::after":{background:e.palette.primary.main,opacity:.96},"& .nav-item:not(.badge)":{color:e.palette.text.primary},"& .nav-item":{"&.active, &.active:hover":{background:e.palette.secondary.main},"& .icon-text::after":{background:e.palette.text.primary}}}}}}}),{withTheme:!0})((function(e){var t=e.children,a=e.classes;return l.a.createElement("div",{className:a.root},t)}));t.a=function(e){var t=e.theme,a=e.settings,n=e.children;return l.a.createElement(r.a,{theme:t},l.a.createElement(o,{theme:t,settings:a},n))}},2029:function(e,t,a){"use strict";a.r(t);var n=a(21),l=a(1),r=a.n(l),c=a(40),o=a(0),s=a.n(o),i=a(103),m=a(1189),u=a(10),d=a(1260),p=a.n(d),b=a(72),g=a(372),E=a(8),h=a(31),f=a(30),y=a(46),v=a(47),N=a(48),x=a(65),S=a(1134),k=a(1200),j=a(1272),O=a(98),C=a(333),w=a(1417),_=a(59),D=a(1333),L=function(e){function t(){var e,a;Object(h.a)(this,t);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return(a=Object(y.a)(this,(e=Object(v.a)(t)).call.apply(e,[this].concat(l)))).state={},a.updateSidebarMode=function(e){var t=a.props,n=t.settings;(0,t.setLayoutSettings)(Object(E.a)({},n,{layout1Settings:Object(E.a)({},n.layout1Settings,{leftSidebar:Object(E.a)({},n.layout1Settings.leftSidebar,{},e)})}))},a.handleSidebarToggle=function(){var e,t=a.props.settings.layout1Settings;e=Object(b.e)()?"close"===t.leftSidebar.mode?"mobile":"close":"full"===t.leftSidebar.mode?"close":"full",a.updateSidebarMode({mode:e})},a.handleSignOut=function(){a.props.logoutUser()},a}return Object(N.a)(t,e),Object(f.a)(t,[{key:"render",value:function(){var e=this.props,t=e.classes,a=e.fixed;return r.a.createElement("div",{className:"topbar ".concat(t.topbar)},r.a.createElement("div",{className:Object(b.a)({"topbar-hold":!0,fixed:a})},r.a.createElement("div",{className:"flex justify-between items-center h-full"},r.a.createElement("div",{className:"flex"},r.a.createElement(S.a,{onClick:this.handleSidebarToggle,className:"hide-on-pc"},r.a.createElement(k.a,null,"menu")),r.a.createElement("div",{className:"hide-on-mobile"},r.a.createElement(S.a,null,r.a.createElement(k.a,null,"mail_outline")),r.a.createElement(S.a,null,r.a.createElement(k.a,null,"web_asset")),r.a.createElement(S.a,null,r.a.createElement(k.a,null,"star_outline")))),r.a.createElement("div",{className:"flex items-center"},r.a.createElement(C.i,null),r.a.createElement(w.a,null),r.a.createElement(D.a,null),r.a.createElement(C.g,{menuButton:r.a.createElement("img",{className:"mx-2 align-middle circular-image-small cursor-pointer",src:"/assets/images/face-6.jpg",alt:"user"})},r.a.createElement(j.a,null,r.a.createElement(_.a,{className:t.menuItem,to:"/"},r.a.createElement(k.a,null," home "),r.a.createElement("span",{className:"pl-4"}," Home "))),r.a.createElement(j.a,null,r.a.createElement(k.a,null," person "),r.a.createElement("span",{className:"pl-4"}," Profile ")),r.a.createElement(j.a,{className:t.menuItem},r.a.createElement(k.a,null," settings "),r.a.createElement("span",{className:"pl-4"}," Settings ")),r.a.createElement(j.a,{onClick:this.handleSignOut,className:t.menuItem},r.a.createElement(k.a,null," power_settings_new "),r.a.createElement("span",{className:"pl-4"}," Logout ")))))))}}]),t}(l.Component),T=Object(u.a)((function(e){return{topbar:{"& .topbar-hold":{backgroundColor:e.palette.primary.main,height:"80px","&.fixed":{boxShadow:e.shadows[8],height:"64px"}}},menuItem:{display:"flex",alignItems:"center",minWidth:185}}}),{withTheme:!0})(Object(x.g)(Object(c.b)((function(e){return{setLayoutSettings:s.a.func.isRequired,logoutUser:s.a.func.isRequired,settings:e.layout.settings}}),{setLayoutSettings:i.d,logoutUser:O.d})(L))),z=a(1453),R=a(1315),P=a(1418),I=a(1423),q=a(1424),F=a(55),M=Object(u.a)((function(e){return{root:{backgroundColor:"transparent",padding:"5px"}}}))(S.a),U=Object(u.a)((function(){return{root:{fontSize:"1rem"}}}))(k.a),A=function(e){function t(){var e,a;Object(h.a)(this,t);for(var n=arguments.length,l=new Array(n),c=0;c<n;c++)l[c]=arguments[c];return(a=Object(y.a)(this,(e=Object(v.a)(t)).call.apply(e,[this].concat(l)))).state={hidden:!0},a.updateSidebarMode=function(e){var t=a.props,n=t.settings,l=t.setLayoutSettings,r=t.setDefaultSettings,c=Object(F.merge)({},n,{layout1Settings:{leftSidebar:Object(E.a)({},e)}});l(c),r(c)},a.handleSidenavToggle=function(){var e=a.props.settings.layout1Settings.leftSidebar.mode;console.log(e),a.updateSidebarMode({mode:"compact"===e?"full":"compact"})},a.handleSignOut=function(){a.props.logoutUser()},a.renderLogoSwitch=function(){return r.a.createElement(I.a,null,r.a.createElement(z.a,{className:"sidenav__toggle show-on-pc",onChange:a.handleSidenavToggle,checked:!("full"===a.props.settings.layout1Settings.leftSidebar.mode),color:"secondary"}))},a.renderUser=function(){var e=a.props.user;return r.a.createElement("div",{className:"sidenav__user"},r.a.createElement("div",{className:"username-photo"},r.a.createElement("img",{src:e.photoURL,alt:"user"})),r.a.createElement("div",{className:"ml-4"},r.a.createElement("span",{className:"username"},e.displayName),r.a.createElement("div",{className:"user__menu"},r.a.createElement(C.g,{menuButton:r.a.createElement(R.a,{title:"Settings"},r.a.createElement(M,{"aria-label":"Delete",className:"",size:"small"},r.a.createElement(U,null," settings ")))},r.a.createElement(j.a,{className:"flex items-center"},r.a.createElement(k.a,null," home "),r.a.createElement("span",{className:"pl-4"}," Home ")),r.a.createElement(j.a,{className:"flex items-center"},r.a.createElement(k.a,null," settings "),r.a.createElement("span",{className:"pl-4"}," Account Setting "))),r.a.createElement(R.a,{title:"Profile"},r.a.createElement(M,{"aria-label":"Delete",className:"",size:"small"},r.a.createElement(U,null,"person"))),r.a.createElement(R.a,{title:"Sign out"},r.a.createElement(M,{"aria-label":"Delete",className:"",size:"small",onClick:a.handleSignOut},r.a.createElement(U,null,"exit_to_app"))))))},a}return Object(N.a)(t,e),Object(f.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.unlistenRouteChange=this.props.history.listen((function(t,a){Object(b.e)()&&e.updateSidebarMode({mode:"close"})})),setTimeout((function(){e.setState({hidden:!1})}),400)}},{key:"componentWillUnmount",value:function(){this.unlistenRouteChange()}},{key:"render",value:function(){var e=this.props,t=e.theme,a=e.settings,n=a.themes[a.layout1Settings.leftSidebar.theme]||t;return r.a.createElement(q.a,{theme:n,settings:a},r.a.createElement("div",{className:"sidenav"},r.a.createElement("div",{className:"sidenav__hold",style:{backgroundImage:"url(".concat(a.layout1Settings.leftSidebar.bgImgURL,")")}},!this.state.hidden&&r.a.createElement(l.Fragment,null,this.renderLogoSwitch(),r.a.createElement(P.a,null,this.renderUser())))))}}]),t}(l.Component),B=Object(u.a)((function(e){return{}}),{withTheme:!0})(Object(x.g)(Object(c.b)((function(e){return{setDefaultSettings:s.a.func.isRequired,setLayoutSettings:s.a.func.isRequired,logoutUser:s.a.func.isRequired,user:e.user,settings:e.layout.settings}}),{setLayoutSettings:i.d,setDefaultSettings:i.c,logoutUser:O.d})(A))),W=a(1419),X=a(1420),H=a(156);t.default=Object(u.a)((function(e){return{layout:{backgroundColor:e.palette.background.default}}}),{withTheme:!0})(Object(c.b)((function(e){return{setLayoutSettings:s.a.func.isRequired,settings:e.layout.settings}}),{setLayoutSettings:i.d})((function(e){var t,a=Object(l.useContext)(H.a).routes,c=e.settings,o=e.classes,s=e.theme,i=c.layout1Settings,u=c.themes[i.topbar.theme],d=(t={},Object(n.a)(t,o.layout,!0),Object(n.a)(t,"".concat(c.activeLayout," sidenav-").concat(i.leftSidebar.mode," theme-").concat(s.palette.type," flex"),!0),Object(n.a)(t,"topbar-fixed",i.topbar.fixed),t);return r.a.createElement("div",{className:Object(b.a)(d)},i.leftSidebar.show&&r.a.createElement(B,null),r.a.createElement("div",{className:"content-wrap position-relative"},i.topbar.show&&i.topbar.fixed&&r.a.createElement(m.a,{theme:u},r.a.createElement(T,{fixed:!0,className:"elevation-z8"})),c.perfectScrollbar&&r.a.createElement(p.a,{className:"scrollable-content"},i.topbar.show&&!i.topbar.fixed&&r.a.createElement(m.a,{theme:u},r.a.createElement(T,null)),r.a.createElement("div",{className:"content"},r.a.createElement(C.m,null,Object(g.b)(a))),r.a.createElement("div",{className:"my-auto"}),c.footer.show&&!c.footer.fixed&&r.a.createElement(W.a,null)),!c.perfectScrollbar&&r.a.createElement("div",{className:"scrollable-content"},i.topbar.show&&!i.topbar.fixed&&r.a.createElement(T,null),r.a.createElement("div",{className:"content"},r.a.createElement(C.m,null,Object(g.b)(a))),r.a.createElement("div",{className:"my-auto"}),c.footer.show&&!c.footer.fixed&&r.a.createElement(W.a,null)),c.footer.show&&c.footer.fixed&&r.a.createElement(W.a,null)),c.secondarySidebar.show&&r.a.createElement(X.a,null))})))}}]);