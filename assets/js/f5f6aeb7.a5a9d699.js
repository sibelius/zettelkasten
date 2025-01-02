"use strict";(self.webpackChunkdev_docs=self.webpackChunkdev_docs||[]).push([["6376"],{59:function(e,t,n){n.r(t),n.d(t,{metadata:()=>r,contentTitle:()=>s,default:()=>d,assets:()=>c,toc:()=>u,frontMatter:()=>l});var r=JSON.parse('{"id":"concepts-over-implementation","title":"Concepts over Implementation","description":"Prefer Concepts over Implementation","source":"@site/docs/concepts-over-implementation.md","sourceDirName":".","slug":"/concepts-over-implementation","permalink":"/zettelkasten/concepts-over-implementation","draft":false,"unlisted":false,"editUrl":"https://github.com/sibelius/zettelkasten/edit/main/docs/concepts-over-implementation.md","tags":[{"inline":true,"label":"concepts","permalink":"/zettelkasten/tags/concepts"},{"inline":true,"label":"implementation","permalink":"/zettelkasten/tags/implementation"}],"version":"current","lastUpdatedBy":"Sibelius Seraphini","lastUpdatedAt":1735818365000,"frontMatter":{"id":"concepts-over-implementation","title":"Concepts over Implementation","tags":["concepts","implementation"]},"sidebar":"docs","previous":{"title":"Buying Time","permalink":"/zettelkasten/buying-time"},"next":{"title":"Culture","permalink":"/zettelkasten/culture"}}'),i=n("5893"),o=n("65"),a=n("2745");let l={id:"concepts-over-implementation",title:"Concepts over Implementation",tags:["concepts","implementation"]},s=void 0,c={},u=[{value:"Prefer Concepts over Implementation",id:"prefer-concepts-over-implementation",level:2}];function m(e){let t={h2:"h2",li:"li",ul:"ul",...(0,o.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{id:"prefer-concepts-over-implementation",children:"Prefer Concepts over Implementation"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"babel -> compilers"}),"\n",(0,i.jsx)(t.li,{children:"webpack -> bundlers"}),"\n",(0,i.jsx)(t.li,{children:"javascript -> programming logic"}),"\n",(0,i.jsx)(t.li,{children:"sql -> databases"}),"\n",(0,i.jsx)(t.li,{children:"redis -> cache"}),"\n",(0,i.jsx)(t.li,{children:"serverless, k8s, aws -> containers, linux, vm, DNS, IP"}),"\n",(0,i.jsx)(t.li,{children:"express -> HTTP/TCP/UDP"}),"\n",(0,i.jsx)(t.li,{children:"react -> html, css, js"}),"\n"]}),"\n",(0,i.jsx)(a.Z,{url:"https://twitter.com/sseraphini/status/1760262122129207442"})]})}function d(e={}){let{wrapper:t}={...(0,o.a)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(m,{...e})}):m(e)}},9395:function(e,t,n){n.r(t),n.d(t,{ReactEmbed:()=>I,default:()=>S});var r=n("8395"),i=n("7294"),o=/\.(mp3|wav|weba|aac|oga|m4a|mp4|ogg|opus|ts|wma|mpga)($|\?)/i,a=/\.(m4a|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx|mp4|og[gv]|webm|mov|m4v|m3u8|mpd)($|\?)/i,l=/facebook\.com\/([^/?].+\/)?video(s|\.php)[/?].*$/,s=/(?:www\.|go\.)?twitch\.tv\/videos\/(\d+)($|\?)/,c=/(?:www\.|go\.)?twitch\.tv\/([a-z0-9_]+)($|\?)/,u=/^(?:(?:https?):)?(?:\/\/)?(?:www\.)?(?:(?:dailymotion\.com(?:\/embed)?\/video)|dai\.ly)\/([a-zA-Z0-9]+)(?:_[\w_-]+)?$/,m=/vimeo\.com\/.+/,d=/vimeo\.com\/external\/.+\.mp4/,p=/mixcloud\.com\/([^/]+\/[^/]+)/,f=/streamable\.com\/([a-z0-9]+)$/;let h=function(e){var t,n,r,i,o,h,v;return t=e,l.test(t)||(n=e,s.test(n)||c.test(n))||(r=e,u.test(r))||(i=e,!d.test(i)&&m.test(i))||(o=e,p.test(o))||(h=e,f.test(h))||(v=e,a.test(v))};var v=/\.(pdf)($|\?)/i,b=function(e,t){var n=t.pathname.split("/");if(n.length)return[e.tweet,n[n.length-1]]},g=function(e,t){var n=t.search.match(/v=([^\&]+)(&|$)/),r=t.pathname.replace("/","");return n?[e.youtube,n[1]]:r?[e.youtube,r]:void 0},w=function(e,t){var n=t.pathname.split("/");if(!(n.length<2))return[e.jsfiddle,n[1]]},y=function(e,t){var n=t.url.match(/\/(?:a|gallery)\/([^\/]+)(?:\/|$)/);if(n)return[e.imgur,n[1]]},x=function(e,t){var n=t.pathname.split("/");if(!(n.length<3))return[e.gist,n[2]]},k=function(e,t){var n=t.pathname.split("/");if(3===n.length){var r="".concat(n[1],"/").concat(n[2]);return[e.replit,r]}},j=function(e,t){var n=t.pathname.split("/");if("maps"===n[1]&&n.length>=3)return[e.gmaps,""]},z=function(e,t){var n=t.pathname.split("/");if(!(n.length<2)){if(n[1]&&"string"==typeof n[1]){var r=n[1].split("-");return[e.gfycat,r[0]]}}};let P=function(e,t){var n,r,i=t.hostname,a=t.url;switch(i){case"twitter.com":return b(e,t);case"www.youtube.com":case"youtu.be":case"youtube.com":return g(e,t);case"soundcloud.com":return[e.soundcloud,""];case"jsfiddle.net":return w(e,t);case"imgur.com":return y(e,t);case"www.instagram.com":return[e.instagram,""];case"gist.github.com":return x(e,t);case"repl.it":return k(e,t);case"www.figma.com":return[e.figma,""];case"www.google.com":return j(e,t);case"gfycat.com":return z(e,t);case"dropbox.com":case"www.dropbox.com":return[e.dropbox,""];case"codesandbox.io":if(a.includes("codesandbox.io/embed/"))return[e.codesandbox,""];return;default:;if(n=a,v.test(n))return[e.pdf,""];if(r=a,o.test(r))return[e.simplePlayer,""];else if(h(a))return[e.reactPlayer,""];else return}},C=function(e,t,n,o){return i.createElement(e,(0,r.__assign)({},o.url,{id:t,width:n.width,isDark:n.isDark,renderWrap:n.renderWrap,renderVoid:function(e){return n.renderVoid(n,o,e)}}))};var _="object"==typeof window,$={dropbox:i.lazy(function(){return n.e("8726").then(n.bind(n,6409))}),figma:i.lazy(function(){return Promise.all([n.e("396"),n.e("9718")]).then(n.bind(n,7766))}),gfycat:i.lazy(function(){return n.e("5931").then(n.bind(n,3452))}),gist:i.lazy(function(){return n.e("4293").then(n.bind(n,1811))}),gmaps:i.lazy(function(){return Promise.all([n.e("396"),n.e("4582")]).then(n.bind(n,7486))}),imgur:i.lazy(function(){return n.e("8375").then(n.bind(n,2694))}),instagram:i.lazy(function(){return n.e("8335").then(n.bind(n,7129))}),jsfiddle:i.lazy(function(){return Promise.all([n.e("396"),n.e("5273")]).then(n.bind(n,7539))}),pdf:i.lazy(function(){return n.e("9967").then(n.bind(n,9184))}),reactPlayer:i.lazy(function(){return n.e("311").then(n.bind(n,9456))}),replit:i.lazy(function(){return n.e("8963").then(n.bind(n,3294))}),simplePlayer:i.lazy(function(){return Promise.all([n.e("396"),n.e("2301")]).then(n.bind(n,8328))}),soundcloud:i.lazy(function(){return n.e("5430").then(n.bind(n,6213))}),tweet:i.lazy(function(){return Promise.all([n.e("396"),n.e("142")]).then(n.bind(n,4416))}),youtube:i.lazy(function(){return Promise.all([n.e("396"),n.e("4078")]).then(n.bind(n,4909))}),codesandbox:i.lazy(function(){return n.e("6985").then(n.bind(n,5308))})},D=function(){return null},Z=function(e){return e},I=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.state={},t}return(0,r.__extends)(t,e),t.getDerivedStateFromProps=function(e){if(!_)return null;if("string"==typeof e.url)try{var t=new URL(e.url),n=t.hostname,r=t.pathname,i=t.search,o=t.hash;return{url:{url:e.url,hostname:n,pathname:r,search:i,hash:o}}}catch(e){return{error:e}}},t.getDerivedStateFromError=function(e){return{error:e}},t.prototype.render=function(){if(!_)return null;var e,t,n=this.props,r=this.state;if(r.error)return n.renderVoid(n,r,r.error);try{t=n.router(n.blocks,r.url)}catch(e){return console.error("Could not route block:",e),n.renderVoid(n,r,e)}if(!t||!t[0])return n.renderVoid(n,r);var i=(e=t)[0],o=e[1];return n.render(i,o,n,r)},t.defaultProps={width:"object"==typeof window?window.innerWidth:0,isDark:!1,blocks:$,router:P,render:C,renderVoid:D,renderWrap:Z},t}(i.PureComponent);let S=I},6095:function(e,t,n){n.d(t,{Z:function(){return a}});var r=n(8395),i=n(7294);n(9395);var o=i.lazy(function(){return Promise.resolve().then(n.bind(n,9395))});let a=function(e){return i.createElement(i.Suspense,{fallback:e.fallback||null},i.createElement(o,(0,r.__assign)({},e)))}},5070:function(e,t,n){n.d(t,{Z:function(){return o}});var r=n(5893);n(7294);var i=n(7131);function o(e){let{children:t,fallback:n}=e;return(0,i.Z)()?(0,r.jsx)(r.Fragment,{children:t?.()}):n??null}},2745:function(e,t,n){n.d(t,{Z:function(){return a}});var r=n(5893);n(7294);var i=n(5070),o=n(7844);let a=e=>{let{colorMode:t}=(0,o.I)();return(0,r.jsx)(i.Z,{children:()=>{let i=n(6095).Z;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i,{isDark:"dark"===t,...e}),(0,r.jsx)("a",{href:e.url,children:e.url})]})}})}},65:function(e,t,n){n.d(t,{Z:function(){return l},a:function(){return a}});var r=n(7294);let i={},o=r.createContext(i);function a(e){let t=r.useContext(o);return r.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),r.createElement(o.Provider,{value:t},e.children)}}}]);