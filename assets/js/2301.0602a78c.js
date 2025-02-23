"use strict";(self.webpackChunkzettelkasten=self.webpackChunkzettelkasten||[]).push([["2301"],{8328:function(e,t,n){n.r(t),n.d(t,{default:function(){return u}});var r=n(7294),a=n(4130);let u=function(e){var t=e.url,n=e.isDark,u=e.width;return(0,e.renderWrap)(r.createElement(a.Player,{src:t,height:50,hideVolume:u<500,grey:n?[20,23,26]:[240,243,246]}))}},5078:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var n=e[0],r=e[1],a=e[2],u=Math.round((n+r+a)/3),o=u>127,i=o?[0,0,0]:[255,255,255];return{isLight:o,avg:u,grey:e,accent:t,shade:function(e){var t=o?"0":"255";return"rgba("+t+","+t+","+t+","+e+")"},shift:function(e,t){void 0===t&&(t=1);var u=Math.max(0,Math.min(255,n+(o?e:-e))),i=Math.max(0,Math.min(255,r+(o?e:-e))),l=Math.max(0,Math.min(255,a+(o?e:-e)));return 1===t?"rgba("+u+","+i+","+l+","+t+")":"rgb("+u+","+i+","+l+")"},contrast:function(e){return void 0===e&&(e=1),"rgba("+i[0]+","+i[1]+","+i[2]+","+e+")"}}}},2797:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=Math.round(e),n=t%60,r=Math.round((t-n)/60),a=r%60,u=Math.round((r-a)/60);return(u?u+":":"")+(a>9?a:"0"+a)+":"+(n>9?n:"0"+n)}},1264:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var r=n(8395),a=r.__importStar(n(7294)),u=n(6595),o=r.__importDefault(n(6818)),i=r.__importDefault(n(5827)),l=r.__importDefault(n(7282)),c=r.__importDefault(n(7433)),f=r.__importDefault(n(1036)),s=r.__importDefault(n(8210)),d=n(9865),m=n(3288),p=n(5135),v=r.__importDefault(n(5078)),_=r.__importDefault(n(2797)),g=a.useRef,h=a.useEffect,b=a.useState,y=a.useMemo,C='"Open Sans",Roboto,sans-serif';t.defaultHeight=64;var E=u.rule({d:"flex",alignItems:"center",bg:"#eee",h:t.defaultHeight+"px",bdrad:"4px",w:"100%"}),M=u.rule({d:"flex",alignItems:"center",h:"100%",pad:"0 16px",cur:"pointer",mar:0,bd:0,bg:"transparent",bdrad:"4px","& svg":{w:"18px",h:"18px"}}),x=u.rule({pos:"relative",d:"flex",flex:"1 1 100%",alignItems:"center",h:"100%",cur:"pointer",cursor:"ew-resize"}),P=u.rule({pos:"absolute",op:.9}),L=u.rule({d:"inline-block",mar:"0 0 0 -50%",pad:"4px 8px",fz:"12px",ff:C,bdrad:"3px",whiteSpace:"nowrap"}),S=u.rule({whiteSpace:"nowrap",userSelect:"none",pad:"0 0 0 16px",ff:C,fz:"12px"}),w=u.rule({d:"flex",alignItems:"center",h:"100%",pad:"0 16px",cur:"pointer",mar:0,bd:0,bg:"transparent",bdrad:"4px","& svg":{w:"18px",h:"18px"}});t.Player=function(e){var n=e.src,C=e.height,j=void 0===C?t.defaultHeight:C,k=e.grey,O=void 0===k?[246,248,250]:k,D=e.accent,R=void 0===D?[255,0,0]:D,N=e.autoPlay,H=e.hideVolume,V=e.controls,B=e.state,T=e.audio,W=e.onState,Z=y(function(){return v.default(O,R)},r.__spreadArrays(O,R)),z=b(!1),I=z[0],U=z[1],A=o.default({src:n,autoPlay:!!N}),F=A[0],X=A[1],Y=A[2],q=A[3],G=a.useState(!1),J=G[0],K=G[1],Q=u.nano.cache({svg:{fill:Z.contrast(.8)},"&:hover":{bg:Z.contrast(.02),svg:{fill:Z.contrast(1)}},"&:active":{bg:Z.contrast(.04)}}),$=g(X);$.current=X;var ee=g(Y);ee.current=Y;var et=g(null),en=i.default(et,{onScrubStop:function(e){$.current.duration&&ee.current.seek(Math.round($.current.duration*e))}});B&&(B.current=X),V&&(V.current=Y),T&&(T.current=q.current),h(function(){W&&W(X)},[X]);var er={background:I?Z.shift(-6):Z.shift(0)},ea={fill:Z.contrast(.85)};j!==t.defaultHeight&&(er.height=j);var eu=a.createElement("button",{className:M+Q,onClick:function(){X.paused?Y.play():Y.pause()}},X.paused?a.createElement(l.default,{style:ea}):a.createElement(c.default,null)),eo=a.createElement("span",{ref:et,className:x,onMouseEnter:function(){return K(!0)},onMouseLeave:function(){return K(!1)}},a.createElement(m.RailWrap,null,a.createElement(d.Rail,{value:1,color:J?Z.contrast(.12):Z.contrast(.08)}),!!X.duration&&!!X.buffered&&X.buffered.map(function(e){var t=e.start,n=e.end;return a.createElement(d.Rail,{value:(n-t)/X.duration,skip:t/X.duration,color:Z.contrast(.08)})}),!!X.duration&&a.createElement(d.Rail,{value:(X.time||0)/X.duration,color:X.paused?Z.shade(.4):en.isSliding?"rgba("+R[0]+","+R[1]+","+R[2]+",.5)":"rgb("+R[0]+","+R[1]+","+R[2]+")"}),!!en.isSliding&&a.createElement(d.Rail,{value:en.value,color:"rgba("+R[0]+","+R[1]+","+R[2]+",.6)"})),!!X.duration&&en.isSliding&&a.createElement("span",{className:P,style:{top:-30+j/2+"px",left:en.isSliding?100*en.value+"%":100*X.time/X.duration+"%"}},a.createElement("span",{className:L,style:{background:"#000",color:"#fff"}},_.default(en.value*X.duration)))),ei=a.createElement("button",{className:w+Q,onClick:function(){X.muted?Y.unmute():Y.mute()}},X.muted||!X.volume?a.createElement(s.default,{style:{fill:Z.contrast(.85)}}):a.createElement(f.default,{style:{fill:Z.contrast(.85)}}));return a.createElement("span",{className:E,style:er,onMouseEnter:function(){return U(!0)},onMouseLeave:function(){return U(!1)}},F,eu,eo,!!X.duration&&a.createElement("span",{className:S,style:{color:Z.contrast(.85)}},_.default(X.time)+" / "+_.default(X.duration)),ei,!H&&a.createElement(p.Volume,{value:X.volume||0,onChange:function(e){return Y.volume(e)},bg:Z.contrast(.06),rail:Z.contrast(.12),railHover:Z.contrast(.18)}))}},9865:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var r=n(8395).__importStar(n(7294)),a=n(6595).rule({d:"inline-block",pos:"absolute",h:"100%",minH:"5px"});t.Rail=function(e){var t=e.color,n=e.value,u=e.skip,o={background:void 0===t?"red":t,width:100*n+"%"};return u&&(o.marginLeft=u+"%"),r.createElement("span",{className:a,style:o})}},3288:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var r=n(8395).__importStar(n(7294)),a=n(6595);t.railHeight=8;var u=a.rule({d:"flex",w:"100%",h:t.railHeight+"px",pos:"relative",bdrad:"2px",ov:"hidden"});t.RailWrap=function(e){var t=e.children;return r.createElement("span",{className:u},t)}},5135:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var r=n(8395),a=r.__importStar(n(7294)),u=n(6595),o=r.__importDefault(n(5827)),i=n(3288),l=n(9865),c=a.useRef,f=u.rule({d:"flex",flex:"0 0 100px",w:"100px",h:"100%",alignItems:"center",cur:"pointer",marr:"16px",cursor:"ew-resize"});t.Volume=function(e){var t=e.value,n=e.bg,r=e.rail,u=e.railHover,s=e.onChange,d=c(null),m=a.useState(!1),p=m[0],v=m[1];return o.default(d,{onScrub:s}),a.createElement("span",{ref:d,className:f,onMouseEnter:function(){return v(!0)},onMouseLeave:function(){return v(!1)}},a.createElement(i.RailWrap,null,a.createElement(l.Rail,{value:1,color:n}),!!t&&a.createElement(l.Rail,{value:t,color:p?u:r})))}},8210:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var r=n(8395),a=r.__importStar(n(7294));t.default=function(e){return a.createElement("svg",r.__assign({},e,{viewBox:"0 0 18 18"}),a.createElement("polygon",{points:"12.4 12.5 14.5 10.4 16.6 12.5 18 11.1 15.9 9 18 6.9 16.6 5.5 14.5 7.6 12.4 5.5 11 6.9 13.1 9 11 11.1"}),a.createElement("path",{d:"M3.78571429,6.00820648 L0.714285714,6.00820648 C0.285714286,6.00820648 0,6.30901277 0,6.76022222 L0,11.2723167 C0,11.7235261 0.285714286,12.0243324 0.714285714,12.0243324 L3.78571429,12.0243324 L7.85714286,15.8819922 C8.35714286,16.1827985 9,15.8819922 9,15.2803796 L9,2.75215925 C9,2.15054666 8.35714286,1.77453879 7.85714286,2.15054666 L3.78571429,6.00820648 Z"}))}},7433:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var r=n(8395),a=r.__importStar(n(7294));t.default=function(e){return a.createElement("svg",r.__assign({},e,{viewBox:"0 0 18 18"}),a.createElement("path",{d:"M6,1 L3,1 C2.4,1 2,1.4 2,2 L2,16 C2,16.6 2.4,17 3,17 L6,17 C6.6,17 7,16.6 7,16 L7,2 C7,1.4 6.6,1 6,1 L6,1 Z"}),a.createElement("path",{d:"M12,1 C11.4,1 11,1.4 11,2 L11,16 C11,16.6 11.4,17 12,17 L15,17 C15.6,17 16,16.6 16,16 L16,2 C16,1.4 15.6,1 15,1 L12,1 Z"}))}},7282:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var r=n(8395),a=r.__importStar(n(7294));t.default=function(e){return a.createElement("svg",r.__assign({},e,{viewBox:"0 0 18 18"}),a.createElement("path",{d:"M15.5615866,8.10002147 L3.87056367,0.225209313 C3.05219207,-0.33727727 2,0.225209313 2,1.12518784 L2,16.8748122 C2,17.7747907 3.05219207,18.3372773 3.87056367,17.7747907 L15.5615866,9.89997853 C16.1461378,9.44998927 16.1461378,8.55001073 15.5615866,8.10002147 L15.5615866,8.10002147 Z"}))}},1036:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var r=n(8395),a=r.__importStar(n(7294));t.default=function(e){return a.createElement("svg",r.__assign({},e,{viewBox:"0 0 18 18"}),a.createElement("path",{d:"M15.5999996,3.3 C15.1999996,2.9 14.5999996,2.9 14.1999996,3.3 C13.7999996,3.7 13.7999996,4.3 14.1999996,4.7 C15.3999996,5.9 15.9999996,7.4 15.9999996,9 C15.9999996,10.6 15.3999996,12.1 14.1999996,13.3 C13.7999996,13.7 13.7999996,14.3 14.1999996,14.7 C14.3999996,14.9 14.6999996,15 14.8999996,15 C15.1999996,15 15.3999996,14.9 15.5999996,14.7 C17.0999996,13.2 17.9999996,11.2 17.9999996,9 C17.9999996,6.8 17.0999996,4.8 15.5999996,3.3 L15.5999996,3.3 Z"}),a.createElement("path",{d:"M11.2819745,5.28197449 C10.9060085,5.65794047 10.9060085,6.22188944 11.2819745,6.59785542 C12.0171538,7.33303477 12.2772954,8.05605449 12.2772954,9.00000021 C12.2772954,9.93588462 11.851678,10.9172014 11.2819745,11.4869049 C10.9060085,11.8628709 10.9060085,12.4268199 11.2819745,12.8027859 C11.4271642,12.9479755 11.9176724,13.0649528 12.2998149,12.9592565 C12.4124479,12.9281035 12.5156669,12.8776063 12.5978555,12.8027859 C13.773371,11.732654 14.1311161,10.1597914 14.1312523,9.00000021 C14.1312723,8.8299555 14.1286311,8.66015647 14.119665,8.4897429 C14.0674781,7.49784946 13.8010171,6.48513613 12.5978554,5.28197449 C12.2218894,4.9060085 11.6579405,4.9060085 11.2819745,5.28197449 Z"}),a.createElement("path",{d:"M3.78571429,6.00820648 L0.714285714,6.00820648 C0.285714286,6.00820648 0,6.30901277 0,6.76022222 L0,11.2723167 C0,11.7235261 0.285714286,12.0243324 0.714285714,12.0243324 L3.78571429,12.0243324 L7.85714286,15.8819922 C8.35714286,16.1827985 9,15.8819922 9,15.2803796 L9,2.75215925 C9,2.15054666 8.35714286,1.77453879 7.85714286,2.15054666 L3.78571429,6.00820648 Z"}))}},4130:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),n(8395).__exportStar(n(1264),t)},7499:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var r=n(8395),a=r.__importStar(n(7294)),u=n(7294),o=r.__importDefault(n(4920)),i=r.__importDefault(n(1030));t.default=function(e){return function(t){l=a.isValidElement(t)?(n=t).props:t;var n,l,c=o.default({buffered:[],time:0,duration:0,paused:!0,muted:!1,volume:1,playing:!1}),f=c[0],s=c[1],d=u.useRef(null),m=function(e,t){return function(n){try{t&&t(n)}finally{e&&e(n)}}},p=function(){return s({paused:!1})},v=function(){return s({playing:!0})},_=function(){return s({playing:!1})},g=function(){return s({paused:!0,playing:!1})},h=function(){var e=d.current;e&&s({muted:e.muted,volume:e.volume})},b=function(){var e=d.current;if(e){var t=e.duration,n=e.buffered;s({duration:t,buffered:i.default(n)})}},y=function(){var e=d.current;e&&s({time:e.currentTime})},C=function(){var e=d.current;e&&s({buffered:i.default(e.buffered)})};n=n?a.cloneElement(n,r.__assign(r.__assign({controls:!1},l),{ref:d,onPlay:m(l.onPlay,p),onPlaying:m(l.onPlaying,v),onWaiting:m(l.onWaiting,_),onPause:m(l.onPause,g),onVolumeChange:m(l.onVolumeChange,h),onDurationChange:m(l.onDurationChange,b),onTimeUpdate:m(l.onTimeUpdate,y),onProgress:m(l.onProgress,C)})):a.createElement(e,r.__assign(r.__assign({controls:!1},l),{ref:d,onPlay:m(l.onPlay,p),onPlaying:m(l.onPlaying,v),onWaiting:m(l.onWaiting,_),onPause:m(l.onPause,g),onVolumeChange:m(l.onVolumeChange,h),onDurationChange:m(l.onDurationChange,b),onTimeUpdate:m(l.onTimeUpdate,y),onProgress:m(l.onProgress,C)}));var E=!1,M={play:function(){var e=d.current;if(e&&!E){var t=e.play();if("object"==typeof t){E=!0;var n=function(){E=!1};t.then(n,n)}return t}},pause:function(){var e=d.current;if(e&&!E)return e.pause()},seek:function(e){var t=d.current;t&&void 0!==f.duration&&(e=Math.min(f.duration,Math.max(0,e)),t.currentTime=e)},volume:function(e){var t=d.current;t&&(e=Math.min(1,Math.max(0,e)),t.volume=e,s({volume:e}))},mute:function(){var e=d.current;e&&(e.muted=!0)},unmute:function(){var e=d.current;e&&(e.muted=!1)}};return u.useEffect(function(){var e=d.current;e&&(s({volume:e.volume,muted:e.muted,paused:e.paused}),l.autoPlay&&e.paused&&M.play())},[l.src]),[n,f,M,d]}}},1030:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){for(var t=[],n=0;n<e.length;n++)t.push({start:e.start(n),end:e.end(n)});return t}},8387:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.isNavigator=t.isBrowser=t.off=t.on=t.noop=void 0,t.noop=function(){},t.on=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];e&&e.addEventListener&&e.addEventListener.apply(e,t)},t.off=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];e&&e.removeEventListener&&e.removeEventListener.apply(e,t)},t.isBrowser="undefined"!=typeof window,t.isNavigator="undefined"!=typeof navigator},6818:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var r=n(8395).__importDefault(n(7499)).default("audio");t.default=r},5929:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var r=n(7294);t.default=function(){var e=r.useRef(!1),t=r.useCallback(function(){return e.current},[]);return r.useEffect(function(){return e.current=!0,function(){e.current=!1}},[]),t}},4920:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var r=n(7294);t.default=function(e){void 0===e&&(e={});var t=r.useState(e),n=t[0],a=t[1];return[n,r.useCallback(function(e){a(function(t){return Object.assign({},t,e instanceof Function?e(t):e)})},[])]}},5827:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var r=n(8395),a=n(7294),u=n(8387),o=r.__importDefault(n(5929)),i=r.__importDefault(n(4920));t.default=function(e,t){void 0===t&&(t={});var n=o.default(),r=a.useRef(!1),l=a.useRef(0),c=a.useRef(0),f=i.default({isSliding:!1,value:0}),s=f[0],d=f[1];return l.current=s.value,a.useEffect(function(){if(u.isBrowser){var a=void 0===t.styles||t.styles,o=void 0!==t.reverse&&t.reverse;e.current&&a&&(e.current.style.userSelect="none");var i=function(){!r.current&&n()&&((t.onScrubStart||u.noop)(),r.current=!0,d({isSliding:!0}),_())},f=function(){r.current&&n()&&((t.onScrubStop||u.noop)(l.current),r.current=!1,d({isSliding:!1}),g())},s=function(e){i(),m(e)},m=t.vertical?function(e){return h(e.clientY)}:function(e){return h(e.clientX)},p=function(e){i(),v(e)},v=t.vertical?function(e){return h(e.changedTouches[0].clientY)}:function(e){return h(e.changedTouches[0].clientX)},_=function(){u.on(document,"mousemove",m),u.on(document,"mouseup",f),u.on(document,"touchmove",v),u.on(document,"touchend",f)},g=function(){u.off(document,"mousemove",m),u.off(document,"mouseup",f),u.off(document,"touchmove",v),u.off(document,"touchend",f)},h=function(r){cancelAnimationFrame(c.current),c.current=requestAnimationFrame(function(){if(n()&&e.current){var a=e.current.getBoundingClientRect(),i=t.vertical?a.top:a.left,l=t.vertical?a.height:a.width;if(l){var c=(r-i)/l;c>1?c=1:c<0&&(c=0),o&&(c=1-c),d({value:c}),(t.onScrub||u.noop)(c)}}})};return u.on(e.current,"mousedown",s),u.on(e.current,"touchstart",p),function(){u.off(e.current,"mousedown",s),u.off(e.current,"touchstart",p)}}},[e,t.vertical]),s}}}]);