(this["webpackJsonpmatx-react"]=this["webpackJsonpmatx-react"]||[]).push([[10],{1271:function(t,n,e){"use strict";e.r(n);var a=e(27),i=e(259),c=Array.prototype,r=c.map,f=c.slice,u={name:"implicit"};function o(t){var n=Object(i.a)(),e=[],a=u;function c(i){var c=i+"",r=n.get(c);if(!r){if(a!==u)return a;n.set(c,r=e.push(i))}return t[(r-1)%t.length]}return t=null==t?[]:f.call(t),c.domain=function(t){if(!arguments.length)return e.slice();e=[],n=Object(i.a)();for(var a,r,f=-1,u=t.length;++f<u;)n.has(r=(a=t[f])+"")||n.set(r,e.push(a));return c},c.range=function(n){return arguments.length?(t=f.call(n),c):t.slice()},c.unknown=function(t){return arguments.length?(a=t,c):a},c.copy=function(){return o().domain(e).range(t).unknown(a)},c}function s(){var t,n,e=o().unknown(void 0),i=e.domain,c=e.range,r=[0,1],f=!1,u=0,h=0,d=.5;function l(){var e=i().length,o=r[1]<r[0],s=r[o-0],l=r[1-o];t=(l-s)/Math.max(1,e-u+2*h),f&&(t=Math.floor(t)),s+=(l-s-t*(e-u))*d,n=t*(1-u),f&&(s=Math.round(s),n=Math.round(n));var b=Object(a.h)(e).map((function(n){return s+t*n}));return c(o?b.reverse():b)}return delete e.unknown,e.domain=function(t){return arguments.length?(i(t),l()):i()},e.range=function(t){return arguments.length?(r=[+t[0],+t[1]],l()):r.slice()},e.rangeRound=function(t){return r=[+t[0],+t[1]],f=!0,l()},e.bandwidth=function(){return n},e.step=function(){return t},e.round=function(t){return arguments.length?(f=!!t,l()):f},e.padding=function(t){return arguments.length?(u=h=Math.max(0,Math.min(1,t)),l()):u},e.paddingInner=function(t){return arguments.length?(u=Math.max(0,Math.min(1,t)),l()):u},e.paddingOuter=function(t){return arguments.length?(h=Math.max(0,Math.min(1,t)),l()):h},e.align=function(t){return arguments.length?(d=Math.max(0,Math.min(1,t)),l()):d},e.copy=function(){return s().domain(i()).range(r).round(f).paddingInner(u).paddingOuter(h).align(d)},l()}function h(){return function t(n){var e=n.copy;return n.padding=n.paddingOuter,delete n.paddingInner,delete n.paddingOuter,n.copy=function(){return t(e())},n}(s().paddingInner(1))}var d=e(187),l=e(1221),b=e(1201),_=function(t){return function(){return t}},p=function(t){return+t},y=[0,1];function x(t,n){return(n-=t=+t)?function(e){return(e-t)/n}:_(n)}function v(t,n,e,a){var i=t[0],c=t[1],r=n[0],f=n[1];return c<i?(i=e(c,i),r=a(f,r)):(i=e(i,c),r=a(r,f)),function(t){return r(i(t))}}function g(t,n,e,i){var c=Math.min(t.length,n.length)-1,r=new Array(c),f=new Array(c),u=-1;for(t[c]<t[0]&&(t=t.slice().reverse(),n=n.slice().reverse());++u<c;)r[u]=e(t[u],t[u+1]),f[u]=i(n[u],n[u+1]);return function(n){var e=Object(a.b)(t,n,1,c)-1;return f[e](r[e](n))}}function O(t,n){return n.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp())}function m(t,n){var e,a,i,c=y,u=y,o=l.a,s=!1;function h(){return e=Math.min(c.length,u.length)>2?g:v,a=i=null,d}function d(n){return(a||(a=e(c,u,s?function(t){return function(n,e){var a=t(n=+n,e=+e);return function(t){return t<=n?0:t>=e?1:a(t)}}}(t):t,o)))(+n)}return d.invert=function(t){return(i||(i=e(u,c,x,s?function(t){return function(n,e){var a=t(n=+n,e=+e);return function(t){return t<=0?n:t>=1?e:a(t)}}}(n):n)))(+t)},d.domain=function(t){return arguments.length?(c=r.call(t,p),h()):c.slice()},d.range=function(t){return arguments.length?(u=f.call(t),h()):u.slice()},d.rangeRound=function(t){return u=f.call(t),o=b.a,h()},d.clamp=function(t){return arguments.length?(s=!!t,h()):s},d.interpolate=function(t){return arguments.length?(o=t,h()):o},h()}var j=e(330),M=e(1202),k=e(1222),w=e(1203),N=e(1204);function T(t){var n=t.domain;return t.ticks=function(t){var e=n();return Object(a.m)(e[0],e[e.length-1],null==t?10:t)},t.tickFormat=function(t,e){return function(t,n,e){var i,c=t[0],r=t[t.length-1],f=Object(a.l)(c,r,null==n?10:n);switch((e=Object(j.a)(null==e?",f":e)).type){case"s":var u=Math.max(Math.abs(c),Math.abs(r));return null!=e.precision||isNaN(i=Object(M.a)(f,u))||(e.precision=i),Object(k.b)(e,u);case"":case"e":case"g":case"p":case"r":null!=e.precision||isNaN(i=Object(w.a)(f,Math.max(Math.abs(c),Math.abs(r))))||(e.precision=i-("e"===e.type));break;case"f":case"%":null!=e.precision||isNaN(i=Object(N.a)(f))||(e.precision=i-2*("%"===e.type))}return Object(k.a)(e)}(n(),t,e)},t.nice=function(e){null==e&&(e=10);var i,c=n(),r=0,f=c.length-1,u=c[r],o=c[f];return o<u&&(i=u,u=o,o=i,i=r,r=f,f=i),(i=Object(a.k)(u,o,e))>0?(u=Math.floor(u/i)*i,o=Math.ceil(o/i)*i,i=Object(a.k)(u,o,e)):i<0&&(u=Math.ceil(u*i)/i,o=Math.floor(o*i)/i,i=Object(a.k)(u,o,e)),i>0?(c[r]=Math.floor(u/i)*i,c[f]=Math.ceil(o/i)*i,n(c)):i<0&&(c[r]=Math.ceil(u*i)/i,c[f]=Math.floor(o*i)/i,n(c)),t},t}function S(){var t=m(x,d.a);return t.copy=function(){return O(t,S())},T(t)}function A(){var t=[0,1];function n(t){return+t}return n.invert=n,n.domain=n.range=function(e){return arguments.length?(t=r.call(e,p),n):t.slice()},n.copy=function(){return A().domain(t)},T(n)}var C=function(t,n){var e,a=0,i=(t=t.slice()).length-1,c=t[a],r=t[i];return r<c&&(e=a,a=i,i=e,e=c,c=r,r=e),t[a]=n.floor(c),t[i]=n.ceil(r),t};function E(t,n){return(n=Math.log(n/t))?function(e){return Math.log(e/t)/n}:_(n)}function R(t,n){return t<0?function(e){return-Math.pow(-n,e)*Math.pow(-t,1-e)}:function(e){return Math.pow(n,e)*Math.pow(t,1-e)}}function P(t){return isFinite(t)?+("1e"+t):t<0?0:t}function I(t){return 10===t?P:t===Math.E?Math.exp:function(n){return Math.pow(t,n)}}function D(t){return t===Math.E?Math.log:10===t&&Math.log10||2===t&&Math.log2||(t=Math.log(t),function(n){return Math.log(n)/t})}function q(t){return function(n){return-t(-n)}}function z(){var t=m(E,R).domain([1,10]),n=t.domain,e=10,i=D(10),c=I(10);function r(){return i=D(e),c=I(e),n()[0]<0&&(i=q(i),c=q(c)),t}return t.base=function(t){return arguments.length?(e=+t,r()):e},t.domain=function(t){return arguments.length?(n(t),r()):n()},t.ticks=function(t){var r,f=n(),u=f[0],o=f[f.length-1];(r=o<u)&&(l=u,u=o,o=l);var s,h,d,l=i(u),b=i(o),_=null==t?10:+t,p=[];if(!(e%1)&&b-l<_){if(l=Math.round(l)-1,b=Math.round(b)+1,u>0){for(;l<b;++l)for(h=1,s=c(l);h<e;++h)if(!((d=s*h)<u)){if(d>o)break;p.push(d)}}else for(;l<b;++l)for(h=e-1,s=c(l);h>=1;--h)if(!((d=s*h)<u)){if(d>o)break;p.push(d)}}else p=Object(a.m)(l,b,Math.min(b-l,_)).map(c);return r?p.reverse():p},t.tickFormat=function(n,a){if(null==a&&(a=10===e?".0e":","),"function"!==typeof a&&(a=Object(k.a)(a)),n===1/0)return a;null==n&&(n=10);var r=Math.max(1,e*n/t.ticks().length);return function(t){var n=t/c(Math.round(i(t)));return n*e<e-.5&&(n*=e),n<=r?a(t):""}},t.nice=function(){return n(C(n(),{floor:function(t){return c(Math.floor(i(t)))},ceil:function(t){return c(Math.ceil(i(t)))}}))},t.copy=function(){return O(t,z().base(e))},t}function B(t,n){return t<0?-Math.pow(-t,n):Math.pow(t,n)}function L(){var t=1,n=m((function(n,e){return(e=B(e,t)-(n=B(n,t)))?function(a){return(B(a,t)-n)/e}:_(e)}),(function(n,e){return e=B(e,t)-(n=B(n,t)),function(a){return B(n+e*a,1/t)}})),e=n.domain;return n.exponent=function(n){return arguments.length?(t=+n,e(e())):t},n.copy=function(){return O(n,L().exponent(t))},T(n)}function Y(){return L().exponent(.5)}function X(){var t=[],n=[],e=[];function i(){var i=0,r=Math.max(1,n.length);for(e=new Array(r-1);++i<r;)e[i-1]=Object(a.g)(t,i/r);return c}function c(t){if(!isNaN(t=+t))return n[Object(a.b)(e,t)]}return c.invertExtent=function(a){var i=n.indexOf(a);return i<0?[NaN,NaN]:[i>0?e[i-1]:t[0],i<e.length?e[i]:t[t.length-1]]},c.domain=function(n){if(!arguments.length)return t.slice();t=[];for(var e,c=0,r=n.length;c<r;++c)null==(e=n[c])||isNaN(e=+e)||t.push(e);return t.sort(a.a),i()},c.range=function(t){return arguments.length?(n=f.call(t),i()):n.slice()},c.quantiles=function(){return e.slice()},c.copy=function(){return X().domain(t).range(n)},c}function F(){var t=0,n=1,e=1,i=[.5],c=[0,1];function r(t){if(t<=t)return c[Object(a.b)(i,t,0,e)]}function u(){var a=-1;for(i=new Array(e);++a<e;)i[a]=((a+1)*n-(a-e)*t)/(e+1);return r}return r.domain=function(e){return arguments.length?(t=+e[0],n=+e[1],u()):[t,n]},r.range=function(t){return arguments.length?(e=(c=f.call(t)).length-1,u()):c.slice()},r.invertExtent=function(a){var r=c.indexOf(a);return r<0?[NaN,NaN]:r<1?[t,i[0]]:r>=e?[i[e-1],n]:[i[r-1],i[r]]},r.copy=function(){return F().domain([t,n]).range(c)},T(r)}function U(){var t=[.5],n=[0,1],e=1;function i(i){if(i<=i)return n[Object(a.b)(t,i,0,e)]}return i.domain=function(a){return arguments.length?(t=f.call(a),e=Math.min(t.length,n.length-1),i):t.slice()},i.range=function(a){return arguments.length?(n=f.call(a),e=Math.min(t.length,n.length-1),i):n.slice()},i.invertExtent=function(e){var a=n.indexOf(e);return[t[a-1],t[a]]},i.copy=function(){return U().domain(t).range(n)},i}var V=e(1205),W=e(1206),J=e(1207),Q=e(1208),H=e(1209),G=e(1210),K=e(1211),Z=e(1212),$=e(1227);function tt(t){return new Date(t)}function nt(t){return t instanceof Date?+t:+new Date(+t)}function et(t,n,e,i,c,f,u,o,s){var h=m(x,d.a),l=h.invert,b=h.domain,_=s(".%L"),p=s(":%S"),y=s("%I:%M"),v=s("%I %p"),g=s("%a %d"),j=s("%b %d"),M=s("%B"),k=s("%Y"),w=[[u,1,1e3],[u,5,5e3],[u,15,15e3],[u,30,3e4],[f,1,6e4],[f,5,3e5],[f,15,9e5],[f,30,18e5],[c,1,36e5],[c,3,108e5],[c,6,216e5],[c,12,432e5],[i,1,864e5],[i,2,1728e5],[e,1,6048e5],[n,1,2592e6],[n,3,7776e6],[t,1,31536e6]];function N(a){return(u(a)<a?_:f(a)<a?p:c(a)<a?y:i(a)<a?v:n(a)<a?e(a)<a?g:j:t(a)<a?M:k)(a)}function T(n,e,i,c){if(null==n&&(n=10),"number"===typeof n){var r=Math.abs(i-e)/n,f=Object(a.c)((function(t){return t[2]})).right(w,r);f===w.length?(c=Object(a.l)(e/31536e6,i/31536e6,n),n=t):f?(c=(f=w[r/w[f-1][2]<w[f][2]/r?f-1:f])[1],n=f[0]):(c=Math.max(Object(a.l)(e,i,n),1),n=o)}return null==c?n:n.every(c)}return h.invert=function(t){return new Date(l(t))},h.domain=function(t){return arguments.length?b(r.call(t,nt)):b().map(tt)},h.ticks=function(t,n){var e,a=b(),i=a[0],c=a[a.length-1],r=c<i;return r&&(e=i,i=c,c=e),e=(e=T(t,i,c,n))?e.range(i,c+1):[],r?e.reverse():e},h.tickFormat=function(t,n){return null==n?N:s(n)},h.nice=function(t,n){var e=b();return(t=T(t,e[0],e[e.length-1],n))?b(C(e,t)):h},h.copy=function(){return O(h,et(t,n,e,i,c,f,u,o,s))},h}var at=function(){return et(V.a,W.a,J.b,Q.a,H.a,G.a,K.a,Z.a,$.a).domain([new Date(2e3,0,1),new Date(2e3,0,2)])},it=e(1215),ct=e(1216),rt=e(1213),ft=e(1214),ut=e(1217),ot=e(1218),st=function(){return et(it.a,ct.a,rt.b,ft.a,ut.a,ot.a,K.a,Z.a,$.b).domain([Date.UTC(2e3,0,1),Date.UTC(2e3,0,2)])},ht=function(t){return t.match(/.{6}/g).map((function(t){return"#"+t}))},dt=ht("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf"),lt=ht("393b795254a36b6ecf9c9ede6379398ca252b5cf6bcedb9c8c6d31bd9e39e7ba52e7cb94843c39ad494ad6616be7969c7b4173a55194ce6dbdde9ed6"),bt=ht("3182bd6baed69ecae1c6dbefe6550dfd8d3cfdae6bfdd0a231a35474c476a1d99bc7e9c0756bb19e9ac8bcbddcdadaeb636363969696bdbdbdd9d9d9"),_t=ht("1f77b4aec7e8ff7f0effbb782ca02c98df8ad62728ff98969467bdc5b0d58c564bc49c94e377c2f7b6d27f7f7fc7c7c7bcbd22dbdb8d17becf9edae5"),pt=e(165),yt=e(1174),xt=Math.PI/180,vt=180/Math.PI,gt=-.14861,Ot=1.78277,mt=-.29227,jt=-.90649,Mt=1.97294,kt=Mt*jt,wt=Mt*Ot,Nt=Ot*mt-jt*gt;function Tt(t){if(t instanceof At)return new At(t.h,t.s,t.l,t.opacity);t instanceof yt.b||(t=Object(yt.h)(t));var n=t.r/255,e=t.g/255,a=t.b/255,i=(Nt*a+kt*n-wt*e)/(Nt+kt-wt),c=a-i,r=(Mt*(e-i)-mt*c)/jt,f=Math.sqrt(r*r+c*c)/(Mt*i*(1-i)),u=f?Math.atan2(r,c)*vt-120:NaN;return new At(u<0?u+360:u,f,i,t.opacity)}function St(t,n,e,a){return 1===arguments.length?Tt(t):new At(t,n,e,null==a?1:a)}function At(t,n,e,a){this.h=+t,this.s=+n,this.l=+e,this.opacity=+a}Object(pt.a)(At,St,Object(pt.b)(yt.a,{brighter:function(t){return t=null==t?yt.c:Math.pow(yt.c,t),new At(this.h,this.s,this.l*t,this.opacity)},darker:function(t){return t=null==t?yt.d:Math.pow(yt.d,t),new At(this.h,this.s,this.l*t,this.opacity)},rgb:function(){var t=isNaN(this.h)?0:(this.h+120)*xt,n=+this.l,e=isNaN(this.s)?0:this.s*n*(1-n),a=Math.cos(t),i=Math.sin(t);return new yt.b(255*(n+e*(gt*a+Ot*i)),255*(n+e*(mt*a+jt*i)),255*(n+e*(Mt*a)),this.opacity)}}));var Ct=e(326);function Et(t){return function n(e){function a(n,a){var i=t((n=St(n)).h,(a=St(a)).h),c=Object(Ct.a)(n.s,a.s),r=Object(Ct.a)(n.l,a.l),f=Object(Ct.a)(n.opacity,a.opacity);return function(t){return n.h=i(t),n.s=c(t),n.l=r(Math.pow(t,e)),n.opacity=f(t),n+""}}return e=+e,a.gamma=n,a}(1)}Et(Ct.c);var Rt=Et(Ct.a),Pt=Rt(St(300,.5,0),St(-240,.5,1)),It=Rt(St(-100,.75,.35),St(80,1.5,.8)),Dt=Rt(St(260,.75,.35),St(80,1.5,.8)),qt=St(),zt=function(t){(t<0||t>1)&&(t-=Math.floor(t));var n=Math.abs(t-.5);return qt.h=360*t-100,qt.s=1.5-1.5*n,qt.l=.8-.9*n,qt+""};function Bt(t){var n=t.length;return function(e){return t[Math.max(0,Math.min(n-1,Math.floor(e*n)))]}}var Lt=Bt(ht("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725")),Yt=Bt(ht("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf")),Xt=Bt(ht("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4")),Ft=Bt(ht("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));function Ut(t){var n=0,e=1,a=!1;function i(i){var c=(i-n)/(e-n);return t(a?Math.max(0,Math.min(1,c)):c)}return i.domain=function(t){return arguments.length?(n=+t[0],e=+t[1],i):[n,e]},i.clamp=function(t){return arguments.length?(a=!!t,i):a},i.interpolator=function(n){return arguments.length?(t=n,i):t},i.copy=function(){return Ut(t).domain([n,e]).clamp(a)},T(i)}e.d(n,"scaleBand",(function(){return s})),e.d(n,"scalePoint",(function(){return h})),e.d(n,"scaleIdentity",(function(){return A})),e.d(n,"scaleLinear",(function(){return S})),e.d(n,"scaleLog",(function(){return z})),e.d(n,"scaleOrdinal",(function(){return o})),e.d(n,"scaleImplicit",(function(){return u})),e.d(n,"scalePow",(function(){return L})),e.d(n,"scaleSqrt",(function(){return Y})),e.d(n,"scaleQuantile",(function(){return X})),e.d(n,"scaleQuantize",(function(){return F})),e.d(n,"scaleThreshold",(function(){return U})),e.d(n,"scaleTime",(function(){return at})),e.d(n,"scaleUtc",(function(){return st})),e.d(n,"schemeCategory10",(function(){return dt})),e.d(n,"schemeCategory20b",(function(){return lt})),e.d(n,"schemeCategory20c",(function(){return bt})),e.d(n,"schemeCategory20",(function(){return _t})),e.d(n,"interpolateCubehelixDefault",(function(){return Pt})),e.d(n,"interpolateRainbow",(function(){return zt})),e.d(n,"interpolateWarm",(function(){return It})),e.d(n,"interpolateCool",(function(){return Dt})),e.d(n,"interpolateViridis",(function(){return Lt})),e.d(n,"interpolateMagma",(function(){return Yt})),e.d(n,"interpolateInferno",(function(){return Xt})),e.d(n,"interpolatePlasma",(function(){return Ft})),e.d(n,"scaleSequential",(function(){return Ut}))},1321:function(t,n,e){"use strict";function a(t,n,e){t._context.bezierCurveTo(t._x1+t._k*(t._x2-t._x0),t._y1+t._k*(t._y2-t._y0),t._x2+t._k*(t._x1-n),t._y2+t._k*(t._y1-e),t._x2,t._y2)}function i(t,n){this._context=t,this._k=(1-n)/6}e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return i})),i.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x2,this._y2);break;case 3:a(this,this._x1,this._y1)}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2,this._x1=t,this._y1=n;break;case 2:this._point=3;default:a(this,t,n)}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}},n.b=function t(n){function e(t){return new i(t,n)}return e.tension=function(n){return t(+n)},e}(0)},1351:function(t,n,e){"use strict";e.d(n,"b",(function(){return c}));var a=e(1464),i=e(350);function c(t){var n=t.curve;return t.angle=t.x,delete t.x,t.radius=t.y,delete t.y,t.curve=function(t){return arguments.length?n(Object(a.b)(t)):n()._curve},t}n.a=function(){return c(Object(i.a)().curve(a.a))}},1352:function(t,n,e){"use strict";e.d(n,"a",(function(){return b})),e.d(n,"c",(function(){return _})),e.d(n,"b",(function(){return p}));var a=e(332),i=e(327),c=e(36),r=e(163),f=e(1389);function u(t){return t.source}function o(t){return t.target}function s(t){var n=u,e=o,f=r.a,s=r.b,h=null;function d(){var c,r=i.a.call(arguments),u=n.apply(this,r),o=e.apply(this,r);if(h||(h=c=Object(a.a)()),t(h,+f.apply(this,(r[0]=u,r)),+s.apply(this,r),+f.apply(this,(r[0]=o,r)),+s.apply(this,r)),c)return h=null,c+""||null}return d.source=function(t){return arguments.length?(n=t,d):n},d.target=function(t){return arguments.length?(e=t,d):e},d.x=function(t){return arguments.length?(f="function"===typeof t?t:Object(c.a)(+t),d):f},d.y=function(t){return arguments.length?(s="function"===typeof t?t:Object(c.a)(+t),d):s},d.context=function(t){return arguments.length?(h=null==t?null:t,d):h},d}function h(t,n,e,a,i){t.moveTo(n,e),t.bezierCurveTo(n=(n+a)/2,e,n,i,a,i)}function d(t,n,e,a,i){t.moveTo(n,e),t.bezierCurveTo(n,e=(e+i)/2,a,e,a,i)}function l(t,n,e,a,i){var c=Object(f.a)(n,e),r=Object(f.a)(n,e=(e+i)/2),u=Object(f.a)(a,e),o=Object(f.a)(a,i);t.moveTo(c[0],c[1]),t.bezierCurveTo(r[0],r[1],u[0],u[1],o[0],o[1])}function b(){return s(h)}function _(){return s(d)}function p(){var t=s(l);return t.angle=t.x,delete t.x,t.radius=t.y,delete t.y,t}},1353:function(t,n,e){"use strict";e.d(n,"b",(function(){return c}));var a=e(99),i=e(1321);function c(t,n,e){var i=t._x1,c=t._y1,r=t._x2,f=t._y2;if(t._l01_a>a.f){var u=2*t._l01_2a+3*t._l01_a*t._l12_a+t._l12_2a,o=3*t._l01_a*(t._l01_a+t._l12_a);i=(i*u-t._x0*t._l12_2a+t._x2*t._l01_2a)/o,c=(c*u-t._y0*t._l12_2a+t._y2*t._l01_2a)/o}if(t._l23_a>a.f){var s=2*t._l23_2a+3*t._l23_a*t._l12_a+t._l12_2a,h=3*t._l23_a*(t._l23_a+t._l12_a);r=(r*s+t._x1*t._l23_2a-n*t._l12_2a)/h,f=(f*s+t._y1*t._l23_2a-e*t._l12_2a)/h}t._context.bezierCurveTo(i,c,r,f,t._x2,t._y2)}function r(t,n){this._context=t,this._alpha=n}r.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x2,this._y2);break;case 3:this.point(this._x2,this._y2)}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){if(t=+t,n=+n,this._point){var e=this._x2-t,a=this._y2-n;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(e*e+a*a,this._alpha))}switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;break;case 2:this._point=3;default:c(this,t,n)}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}},n.a=function t(n){function e(t){return n?new r(t,n):new i.a(t,0)}return e.alpha=function(n){return t(+n)},e}(.5)},1388:function(t,n,e){"use strict";var a=e(1464),i=e(1155),c=e(1351);n.a=function(){var t=Object(i.a)().curve(a.a),n=t.curve,e=t.lineX0,r=t.lineX1,f=t.lineY0,u=t.lineY1;return t.angle=t.x,delete t.x,t.startAngle=t.x0,delete t.x0,t.endAngle=t.x1,delete t.x1,t.radius=t.y,delete t.y,t.innerRadius=t.y0,delete t.y0,t.outerRadius=t.y1,delete t.y1,t.lineStartAngle=function(){return Object(c.b)(e())},delete t.lineX0,t.lineEndAngle=function(){return Object(c.b)(r())},delete t.lineX1,t.lineInnerRadius=function(){return Object(c.b)(f())},delete t.lineY0,t.lineOuterRadius=function(){return Object(c.b)(u())},delete t.lineY1,t.curve=function(t){return arguments.length?n(Object(a.b)(t)):n()._curve},t}},1389:function(t,n,e){"use strict";n.a=function(t,n){return[(n=+n)*Math.cos(t-=Math.PI/2),n*Math.sin(t)]}},1458:function(t,n,e){"use strict";var a=e(332),i=e(36),c=e(99);function r(t){return t.innerRadius}function f(t){return t.outerRadius}function u(t){return t.startAngle}function o(t){return t.endAngle}function s(t){return t&&t.padAngle}function h(t,n,e,a,i,r,f,u){var o=e-t,s=a-n,h=f-i,d=u-r,l=d*o-h*s;if(!(l*l<c.f))return[t+(l=(h*(n-r)-d*(t-i))/l)*o,n+l*s]}function d(t,n,e,a,i,r,f){var u=t-e,o=n-a,s=(f?r:-r)/Object(c.l)(u*u+o*o),h=s*o,d=-s*u,l=t+h,b=n+d,_=e+h,p=a+d,y=(l+_)/2,x=(b+p)/2,v=_-l,g=p-b,O=v*v+g*g,m=i-r,j=l*p-_*b,M=(g<0?-1:1)*Object(c.l)(Object(c.h)(0,m*m*O-j*j)),k=(j*g-v*M)/O,w=(-j*v-g*M)/O,N=(j*g+v*M)/O,T=(-j*v+g*M)/O,S=k-y,A=w-x,C=N-y,E=T-x;return S*S+A*A>C*C+E*E&&(k=N,w=T),{cx:k,cy:w,x01:-h,y01:-d,x11:k*(i/m-1),y11:w*(i/m-1)}}n.a=function(){var t=r,n=f,e=Object(i.a)(0),l=null,b=u,_=o,p=s,y=null;function x(){var i,r,f=+t.apply(this,arguments),u=+n.apply(this,arguments),o=b.apply(this,arguments)-c.g,s=_.apply(this,arguments)-c.g,x=Object(c.a)(s-o),v=s>o;if(y||(y=i=Object(a.a)()),u<f&&(r=u,u=f,f=r),u>c.f)if(x>c.m-c.f)y.moveTo(u*Object(c.e)(o),u*Object(c.k)(o)),y.arc(0,0,u,o,s,!v),f>c.f&&(y.moveTo(f*Object(c.e)(s),f*Object(c.k)(s)),y.arc(0,0,f,s,o,v));else{var g,O,m=o,j=s,M=o,k=s,w=x,N=x,T=p.apply(this,arguments)/2,S=T>c.f&&(l?+l.apply(this,arguments):Object(c.l)(f*f+u*u)),A=Object(c.i)(Object(c.a)(u-f)/2,+e.apply(this,arguments)),C=A,E=A;if(S>c.f){var R=Object(c.c)(S/f*Object(c.k)(T)),P=Object(c.c)(S/u*Object(c.k)(T));(w-=2*R)>c.f?(M+=R*=v?1:-1,k-=R):(w=0,M=k=(o+s)/2),(N-=2*P)>c.f?(m+=P*=v?1:-1,j-=P):(N=0,m=j=(o+s)/2)}var I=u*Object(c.e)(m),D=u*Object(c.k)(m),q=f*Object(c.e)(k),z=f*Object(c.k)(k);if(A>c.f){var B,L=u*Object(c.e)(j),Y=u*Object(c.k)(j),X=f*Object(c.e)(M),F=f*Object(c.k)(M);if(x<c.j&&(B=h(I,D,X,F,L,Y,q,z))){var U=I-B[0],V=D-B[1],W=L-B[0],J=Y-B[1],Q=1/Object(c.k)(Object(c.b)((U*W+V*J)/(Object(c.l)(U*U+V*V)*Object(c.l)(W*W+J*J)))/2),H=Object(c.l)(B[0]*B[0]+B[1]*B[1]);C=Object(c.i)(A,(f-H)/(Q-1)),E=Object(c.i)(A,(u-H)/(Q+1))}}N>c.f?E>c.f?(g=d(X,F,I,D,u,E,v),O=d(L,Y,q,z,u,E,v),y.moveTo(g.cx+g.x01,g.cy+g.y01),E<A?y.arc(g.cx,g.cy,E,Object(c.d)(g.y01,g.x01),Object(c.d)(O.y01,O.x01),!v):(y.arc(g.cx,g.cy,E,Object(c.d)(g.y01,g.x01),Object(c.d)(g.y11,g.x11),!v),y.arc(0,0,u,Object(c.d)(g.cy+g.y11,g.cx+g.x11),Object(c.d)(O.cy+O.y11,O.cx+O.x11),!v),y.arc(O.cx,O.cy,E,Object(c.d)(O.y11,O.x11),Object(c.d)(O.y01,O.x01),!v))):(y.moveTo(I,D),y.arc(0,0,u,m,j,!v)):y.moveTo(I,D),f>c.f&&w>c.f?C>c.f?(g=d(q,z,L,Y,f,-C,v),O=d(I,D,X,F,f,-C,v),y.lineTo(g.cx+g.x01,g.cy+g.y01),C<A?y.arc(g.cx,g.cy,C,Object(c.d)(g.y01,g.x01),Object(c.d)(O.y01,O.x01),!v):(y.arc(g.cx,g.cy,C,Object(c.d)(g.y01,g.x01),Object(c.d)(g.y11,g.x11),!v),y.arc(0,0,f,Object(c.d)(g.cy+g.y11,g.cx+g.x11),Object(c.d)(O.cy+O.y11,O.cx+O.x11),v),y.arc(O.cx,O.cy,C,Object(c.d)(O.y11,O.x11),Object(c.d)(O.y01,O.x01),!v))):y.arc(0,0,f,k,M,v):y.lineTo(q,z)}else y.moveTo(0,0);if(y.closePath(),i)return y=null,i+""||null}return x.centroid=function(){var e=(+t.apply(this,arguments)+ +n.apply(this,arguments))/2,a=(+b.apply(this,arguments)+ +_.apply(this,arguments))/2-c.j/2;return[Object(c.e)(a)*e,Object(c.k)(a)*e]},x.innerRadius=function(n){return arguments.length?(t="function"===typeof n?n:Object(i.a)(+n),x):t},x.outerRadius=function(t){return arguments.length?(n="function"===typeof t?t:Object(i.a)(+t),x):n},x.cornerRadius=function(t){return arguments.length?(e="function"===typeof t?t:Object(i.a)(+t),x):e},x.padRadius=function(t){return arguments.length?(l=null==t?null:"function"===typeof t?t:Object(i.a)(+t),x):l},x.startAngle=function(t){return arguments.length?(b="function"===typeof t?t:Object(i.a)(+t),x):b},x.endAngle=function(t){return arguments.length?(_="function"===typeof t?t:Object(i.a)(+t),x):_},x.padAngle=function(t){return arguments.length?(p="function"===typeof t?t:Object(i.a)(+t),x):p},x.context=function(t){return arguments.length?(y=null==t?null:t,x):y},x}},1464:function(t,n,e){"use strict";e.d(n,"a",(function(){return a})),e.d(n,"b",(function(){return c}));var a=c(e(198).a);function i(t){this._curve=t}function c(t){function n(n){return new i(t(n))}return n._curve=t,n}i.prototype={areaStart:function(){this._curve.areaStart()},areaEnd:function(){this._curve.areaEnd()},lineStart:function(){this._curve.lineStart()},lineEnd:function(){this._curve.lineEnd()},point:function(t,n){this._curve.point(n*Math.sin(t),n*-Math.cos(t))}}},1498:function(t,n,e){"use strict";var a=e(36),i=function(t,n){return n<t?-1:n>t?1:n>=t?0:NaN},c=function(t){return t},r=e(99);n.a=function(){var t=c,n=i,e=null,f=Object(a.a)(0),u=Object(a.a)(r.m),o=Object(a.a)(0);function s(a){var i,c,s,h,d,l=a.length,b=0,_=new Array(l),p=new Array(l),y=+f.apply(this,arguments),x=Math.min(r.m,Math.max(-r.m,u.apply(this,arguments)-y)),v=Math.min(Math.abs(x)/l,o.apply(this,arguments)),g=v*(x<0?-1:1);for(i=0;i<l;++i)(d=p[_[i]=i]=+t(a[i],i,a))>0&&(b+=d);for(null!=n?_.sort((function(t,e){return n(p[t],p[e])})):null!=e&&_.sort((function(t,n){return e(a[t],a[n])})),i=0,s=b?(x-l*g)/b:0;i<l;++i,y=h)c=_[i],h=y+((d=p[c])>0?d*s:0)+g,p[c]={data:a[c],index:i,value:d,startAngle:y,endAngle:h,padAngle:v};return p}return s.value=function(n){return arguments.length?(t="function"===typeof n?n:Object(a.a)(+n),s):t},s.sortValues=function(t){return arguments.length?(n=t,e=null,s):n},s.sort=function(t){return arguments.length?(e=t,n=null,s):e},s.startAngle=function(t){return arguments.length?(f="function"===typeof t?t:Object(a.a)(+t),s):f},s.endAngle=function(t){return arguments.length?(u="function"===typeof t?t:Object(a.a)(+t),s):u},s.padAngle=function(t){return arguments.length?(o="function"===typeof t?t:Object(a.a)(+t),s):o},s}},336:function(t,n,e){"use strict";e.r(n);var a=e(1458),i=e(1155),c=e(350),r=e(1498),f=e(1388),u=e(1351),o=e(1389),s=e(1352),h=e(1153),d=e(317),l=e(361),b=e(362),_=e(363),p=e(364),y=e(365),x=e(366),v=e(1162),g=e(1163),O=e(197);function m(t,n){this._basis=new O.a(t),this._beta=n}m.prototype={lineStart:function(){this._x=[],this._y=[],this._basis.lineStart()},lineEnd:function(){var t=this._x,n=this._y,e=t.length-1;if(e>0)for(var a,i=t[0],c=n[0],r=t[e]-i,f=n[e]-c,u=-1;++u<=e;)a=u/e,this._basis.point(this._beta*t[u]+(1-this._beta)*(i+a*r),this._beta*n[u]+(1-this._beta)*(c+a*f));this._x=this._y=null,this._basis.lineEnd()},point:function(t,n){this._x.push(+t),this._y.push(+n)}};var j=function t(n){function e(t){return 1===n?new O.a(t):new m(t,n)}return e.beta=function(n){return t(+n)},e}(.85),M=e(158),k=e(1321);function w(t,n){this._context=t,this._k=(1-n)/6}w.prototype={areaStart:M.a,areaEnd:M.a,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._x5=this._y0=this._y1=this._y2=this._y3=this._y4=this._y5=NaN,this._point=0},lineEnd:function(){switch(this._point){case 1:this._context.moveTo(this._x3,this._y3),this._context.closePath();break;case 2:this._context.lineTo(this._x3,this._y3),this._context.closePath();break;case 3:this.point(this._x3,this._y3),this.point(this._x4,this._y4),this.point(this._x5,this._y5)}},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._x3=t,this._y3=n;break;case 1:this._point=2,this._context.moveTo(this._x4=t,this._y4=n);break;case 2:this._point=3,this._x5=t,this._y5=n;break;default:Object(k.c)(this,t,n)}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var N=function t(n){function e(t){return new w(t,n)}return e.tension=function(n){return t(+n)},e}(0);function T(t,n){this._context=t,this._k=(1-n)/6}T.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._point=0},lineEnd:function(){(this._line||0!==this._line&&3===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3,this._line?this._context.lineTo(this._x2,this._y2):this._context.moveTo(this._x2,this._y2);break;case 3:this._point=4;default:Object(k.c)(this,t,n)}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var S=function t(n){function e(t){return new T(t,n)}return e.tension=function(n){return t(+n)},e}(0),A=e(1353);function C(t,n){this._context=t,this._alpha=n}C.prototype={areaStart:M.a,areaEnd:M.a,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._x5=this._y0=this._y1=this._y2=this._y3=this._y4=this._y5=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){switch(this._point){case 1:this._context.moveTo(this._x3,this._y3),this._context.closePath();break;case 2:this._context.lineTo(this._x3,this._y3),this._context.closePath();break;case 3:this.point(this._x3,this._y3),this.point(this._x4,this._y4),this.point(this._x5,this._y5)}},point:function(t,n){if(t=+t,n=+n,this._point){var e=this._x2-t,a=this._y2-n;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(e*e+a*a,this._alpha))}switch(this._point){case 0:this._point=1,this._x3=t,this._y3=n;break;case 1:this._point=2,this._context.moveTo(this._x4=t,this._y4=n);break;case 2:this._point=3,this._x5=t,this._y5=n;break;default:Object(A.b)(this,t,n)}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var E=function t(n){function e(t){return n?new C(t,n):new w(t,0)}return e.alpha=function(n){return t(+n)},e}(.5);function R(t,n){this._context=t,this._alpha=n}R.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){(this._line||0!==this._line&&3===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){if(t=+t,n=+n,this._point){var e=this._x2-t,a=this._y2-n;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(e*e+a*a,this._alpha))}switch(this._point){case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3,this._line?this._context.lineTo(this._x2,this._y2):this._context.moveTo(this._x2,this._y2);break;case 3:this._point=4;default:Object(A.b)(this,t,n)}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var P=function t(n){function e(t){return n?new R(t,n):new T(t,0)}return e.alpha=function(n){return t(+n)},e}(.5),I=e(1164),D=e(198),q=e(1154),z=e(1165),B=e(1150),L=e(1161),Y=e(1158),X=function(t,n){if((f=t.length)>0)for(var e,a,i,c,r,f,u=0,o=t[n[0]].length;u<o;++u)for(c=r=0,e=0;e<f;++e)(i=(a=t[n[e]][u])[1]-a[0])>0?(a[0]=c,a[1]=c+=i):i<0?(a[1]=r,a[0]=r+=i):(a[0]=0,a[1]=i)},F=e(97),U=e(1159),V=e(1160),W=e(248),J=function(t){var n=t.map(Q);return Object(W.a)(t).sort((function(t,e){return n[t]-n[e]}))};function Q(t){for(var n,e=-1,a=0,i=t.length,c=-1/0;++e<i;)(n=+t[e][1])>c&&(c=n,a=e);return a}var H=function(t){var n=t.map(G);return Object(W.a)(t).sort((function(t,e){return n[t]-n[e]}))};function G(t){for(var n,e=0,a=-1,i=t.length;++a<i;)(n=+t[a][1])&&(e+=n);return e}var K=function(t){return H(t).reverse()},Z=function(t){var n,e,a=t.length,i=t.map(G),c=J(t),r=0,f=0,u=[],o=[];for(n=0;n<a;++n)e=c[n],r<f?(r+=i[e],u.push(e)):(f+=i[e],o.push(e));return o.reverse().concat(u)},$=function(t){return Object(W.a)(t).reverse()};e.d(n,"arc",(function(){return a.a})),e.d(n,"area",(function(){return i.a})),e.d(n,"line",(function(){return c.a})),e.d(n,"pie",(function(){return r.a})),e.d(n,"areaRadial",(function(){return f.a})),e.d(n,"radialArea",(function(){return f.a})),e.d(n,"lineRadial",(function(){return u.a})),e.d(n,"radialLine",(function(){return u.a})),e.d(n,"pointRadial",(function(){return o.a})),e.d(n,"linkHorizontal",(function(){return s.a})),e.d(n,"linkVertical",(function(){return s.c})),e.d(n,"linkRadial",(function(){return s.b})),e.d(n,"symbol",(function(){return h.a})),e.d(n,"symbols",(function(){return h.b})),e.d(n,"symbolCircle",(function(){return d.a})),e.d(n,"symbolCross",(function(){return l.a})),e.d(n,"symbolDiamond",(function(){return b.a})),e.d(n,"symbolSquare",(function(){return _.a})),e.d(n,"symbolStar",(function(){return p.a})),e.d(n,"symbolTriangle",(function(){return y.a})),e.d(n,"symbolWye",(function(){return x.a})),e.d(n,"curveBasisClosed",(function(){return v.a})),e.d(n,"curveBasisOpen",(function(){return g.a})),e.d(n,"curveBasis",(function(){return O.b})),e.d(n,"curveBundle",(function(){return j})),e.d(n,"curveCardinalClosed",(function(){return N})),e.d(n,"curveCardinalOpen",(function(){return S})),e.d(n,"curveCardinal",(function(){return k.b})),e.d(n,"curveCatmullRomClosed",(function(){return E})),e.d(n,"curveCatmullRomOpen",(function(){return P})),e.d(n,"curveCatmullRom",(function(){return A.a})),e.d(n,"curveLinearClosed",(function(){return I.a})),e.d(n,"curveLinear",(function(){return D.a})),e.d(n,"curveMonotoneX",(function(){return q.a})),e.d(n,"curveMonotoneY",(function(){return q.b})),e.d(n,"curveNatural",(function(){return z.a})),e.d(n,"curveStep",(function(){return B.a})),e.d(n,"curveStepAfter",(function(){return B.b})),e.d(n,"curveStepBefore",(function(){return B.c})),e.d(n,"stack",(function(){return L.a})),e.d(n,"stackOffsetExpand",(function(){return Y.a})),e.d(n,"stackOffsetDiverging",(function(){return X})),e.d(n,"stackOffsetNone",(function(){return F.a})),e.d(n,"stackOffsetSilhouette",(function(){return U.a})),e.d(n,"stackOffsetWiggle",(function(){return V.a})),e.d(n,"stackOrderAppearance",(function(){return J})),e.d(n,"stackOrderAscending",(function(){return H})),e.d(n,"stackOrderDescending",(function(){return K})),e.d(n,"stackOrderInsideOut",(function(){return Z})),e.d(n,"stackOrderNone",(function(){return W.a})),e.d(n,"stackOrderReverse",(function(){return $}))}}]);