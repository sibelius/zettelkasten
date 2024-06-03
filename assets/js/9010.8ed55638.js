(self.webpackChunkdev_docs=self.webpackChunkdev_docs||[]).push([[9010],{9114:(e,t,n)=>{"use strict";n.d(t,{Z:()=>w});var s=n(7294),a=n(5893);function o(e){const{mdxAdmonitionTitle:t,rest:n}=function(e){const t=s.Children.toArray(e),n=t.find((e=>s.isValidElement(e)&&"mdxAdmonitionTitle"===e.type)),o=t.filter((e=>e!==n)),i=n?.props.children;return{mdxAdmonitionTitle:i,rest:o.length>0?(0,a.jsx)(a.Fragment,{children:o}):null}}(e.children),o=e.title??t;return{...e,...o&&{title:o},children:n}}var i=n(6905),r=n(7325),c=n(3702);const l={admonition:"admonition_xJq3",admonitionHeading:"admonitionHeading_Gvgb",admonitionIcon:"admonitionIcon_Rf37",admonitionContent:"admonitionContent_BuS1"};function d(e){let{type:t,className:n,children:s}=e;return(0,a.jsx)("div",{className:(0,i.Z)(c.k.common.admonition,c.k.common.admonitionType(t),l.admonition,n),children:s})}function u(e){let{icon:t,title:n}=e;return(0,a.jsxs)("div",{className:l.admonitionHeading,children:[(0,a.jsx)("span",{className:l.admonitionIcon,children:t}),n]})}function m(e){let{children:t}=e;return t?(0,a.jsx)("div",{className:l.admonitionContent,children:t}):null}function h(e){const{type:t,icon:n,title:s,children:o,className:i}=e;return(0,a.jsxs)(d,{type:t,className:i,children:[s||n?(0,a.jsx)(u,{title:s,icon:n}):null,(0,a.jsx)(m,{children:o})]})}function p(e){return(0,a.jsx)("svg",{viewBox:"0 0 14 16",...e,children:(0,a.jsx)("path",{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"})})}const f={icon:(0,a.jsx)(p,{}),title:(0,a.jsx)(r.Z,{id:"theme.admonition.note",description:"The default label used for the Note admonition (:::note)",children:"note"})};function b(e){return(0,a.jsx)(h,{...f,...e,className:(0,i.Z)("alert alert--secondary",e.className),children:e.children})}function x(e){return(0,a.jsx)("svg",{viewBox:"0 0 12 16",...e,children:(0,a.jsx)("path",{fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"})})}const g={icon:(0,a.jsx)(x,{}),title:(0,a.jsx)(r.Z,{id:"theme.admonition.tip",description:"The default label used for the Tip admonition (:::tip)",children:"tip"})};function v(e){return(0,a.jsx)(h,{...g,...e,className:(0,i.Z)("alert alert--success",e.className),children:e.children})}function j(e){return(0,a.jsx)("svg",{viewBox:"0 0 14 16",...e,children:(0,a.jsx)("path",{fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"})})}const N={icon:(0,a.jsx)(j,{}),title:(0,a.jsx)(r.Z,{id:"theme.admonition.info",description:"The default label used for the Info admonition (:::info)",children:"info"})};function C(e){return(0,a.jsx)(h,{...N,...e,className:(0,i.Z)("alert alert--info",e.className),children:e.children})}function k(e){return(0,a.jsx)("svg",{viewBox:"0 0 16 16",...e,children:(0,a.jsx)("path",{fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"})})}const L={icon:(0,a.jsx)(k,{}),title:(0,a.jsx)(r.Z,{id:"theme.admonition.warning",description:"The default label used for the Warning admonition (:::warning)",children:"warning"})};function y(e){return(0,a.jsx)("svg",{viewBox:"0 0 12 16",...e,children:(0,a.jsx)("path",{fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"})})}const Z={icon:(0,a.jsx)(y,{}),title:(0,a.jsx)(r.Z,{id:"theme.admonition.danger",description:"The default label used for the Danger admonition (:::danger)",children:"danger"})};const _={icon:(0,a.jsx)(k,{}),title:(0,a.jsx)(r.Z,{id:"theme.admonition.caution",description:"The default label used for the Caution admonition (:::caution)",children:"caution"})};const B={...{note:b,tip:v,info:C,warning:function(e){return(0,a.jsx)(h,{...L,...e,className:(0,i.Z)("alert alert--warning",e.className),children:e.children})},danger:function(e){return(0,a.jsx)(h,{...Z,...e,className:(0,i.Z)("alert alert--danger",e.className),children:e.children})}},...{secondary:e=>(0,a.jsx)(b,{title:"secondary",...e}),important:e=>(0,a.jsx)(C,{title:"important",...e}),success:e=>(0,a.jsx)(v,{title:"success",...e}),caution:function(e){return(0,a.jsx)(h,{..._,...e,className:(0,i.Z)("alert alert--warning",e.className),children:e.children})}}};function w(e){const t=o(e),n=(s=t.type,B[s]||(console.warn(`No admonition component found for admonition type "${s}". Using Info as fallback.`),B.info));var s;return(0,a.jsx)(n,{...t})}},6086:(e,t,n)=>{"use strict";n.d(t,{Z:()=>x});n(7294);var s=n(6905),a=n(3702),o=n(3734),i=n(9003),r=n(4791),c=n(7325),l=n(9524),d=n(5893);function u(e){return(0,d.jsx)("svg",{viewBox:"0 0 24 24",...e,children:(0,d.jsx)("path",{d:"M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z",fill:"currentColor"})})}const m={breadcrumbHomeIcon:"breadcrumbHomeIcon_YNFT"};function h(){const e=(0,l.ZP)("/");return(0,d.jsx)("li",{className:"breadcrumbs__item",children:(0,d.jsx)(r.Z,{"aria-label":(0,c.I)({id:"theme.docs.breadcrumbs.home",message:"Home page",description:"The ARIA label for the home page in the breadcrumbs"}),className:"breadcrumbs__link",href:e,children:(0,d.jsx)(u,{className:m.breadcrumbHomeIcon})})})}const p={breadcrumbsContainer:"breadcrumbsContainer_Z_bl"};function f(e){let{children:t,href:n,isLast:s}=e;const a="breadcrumbs__link";return s?(0,d.jsx)("span",{className:a,itemProp:"name",children:t}):n?(0,d.jsx)(r.Z,{className:a,href:n,itemProp:"item",children:(0,d.jsx)("span",{itemProp:"name",children:t})}):(0,d.jsx)("span",{className:a,children:t})}function b(e){let{children:t,active:n,index:a,addMicrodata:o}=e;return(0,d.jsxs)("li",{...o&&{itemScope:!0,itemProp:"itemListElement",itemType:"https://schema.org/ListItem"},className:(0,s.Z)("breadcrumbs__item",{"breadcrumbs__item--active":n}),children:[t,(0,d.jsx)("meta",{itemProp:"position",content:String(a+1)})]})}function x(){const e=(0,o.s1)(),t=(0,i.Ns)();return e?(0,d.jsx)("nav",{className:(0,s.Z)(a.k.docs.docBreadcrumbs,p.breadcrumbsContainer),"aria-label":(0,c.I)({id:"theme.docs.breadcrumbs.navAriaLabel",message:"Breadcrumbs",description:"The ARIA label for the breadcrumbs"}),children:(0,d.jsxs)("ul",{className:"breadcrumbs",itemScope:!0,itemType:"https://schema.org/BreadcrumbList",children:[t&&(0,d.jsx)(h,{}),e.map(((t,n)=>{const s=n===e.length-1,a="category"===t.type&&t.linkUnlisted?void 0:t.href;return(0,d.jsx)(b,{active:s,index:n,addMicrodata:!!a,children:(0,d.jsx)(f,{href:a,isLast:s,children:t.label})},n)}))]})}):null}},6817:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>De});var s=n(7294),a=n(5463),o=n(1871),i=n(5893);function r(){const{metadata:e,frontMatter:t,assets:n}=(0,o.k)();return(0,i.jsx)(a.d,{title:e.title,description:e.description,keywords:t.keywords,image:n.image??t.image})}var c=n(6905),l=n(3488),d=n(9473);function u(){const{metadata:e}=(0,o.k)();return(0,i.jsx)(d.Z,{previous:e.previous,next:e.next})}var m=n(5350),h=n(4617),p=n(798),f=n(3702),b=n(4639),x=n(107);function g(e){const t=e.map((e=>({...e,parentIndex:-1,children:[]}))),n=Array(7).fill(-1);t.forEach(((e,t)=>{const s=n.slice(2,e.level);e.parentIndex=Math.max(...s),n[e.level]=t}));const s=[];return t.forEach((e=>{const{parentIndex:n,...a}=e;n>=0?t[n].children.push(a):s.push(a)})),s}function v(e){let{toc:t,minHeadingLevel:n,maxHeadingLevel:s}=e;return t.flatMap((e=>{const t=v({toc:e.children,minHeadingLevel:n,maxHeadingLevel:s});return function(e){return e.level>=n&&e.level<=s}(e)?[{...e,children:t}]:t}))}function j(e){const t=e.getBoundingClientRect();return t.top===t.bottom?j(e.parentNode):t}function N(e,t){let{anchorTopOffset:n}=t;const s=e.find((e=>j(e).top>=n));if(s){return function(e){return e.top>0&&e.bottom<window.innerHeight/2}(j(s))?s:e[e.indexOf(s)-1]??null}return e[e.length-1]??null}function C(){const e=(0,s.useRef)(0),{navbar:{hideOnScroll:t}}=(0,x.L)();return(0,s.useEffect)((()=>{e.current=t?0:document.querySelector(".navbar").clientHeight}),[t]),e}function k(e){const t=(0,s.useRef)(void 0),n=C();(0,s.useEffect)((()=>{if(!e)return()=>{};const{linkClassName:s,linkActiveClassName:a,minHeadingLevel:o,maxHeadingLevel:i}=e;function r(){const e=function(e){return Array.from(document.getElementsByClassName(e))}(s),r=function(e){let{minHeadingLevel:t,maxHeadingLevel:n}=e;const s=[];for(let a=t;a<=n;a+=1)s.push(`h${a}.anchor`);return Array.from(document.querySelectorAll(s.join()))}({minHeadingLevel:o,maxHeadingLevel:i}),c=N(r,{anchorTopOffset:n.current}),l=e.find((e=>c&&c.id===function(e){return decodeURIComponent(e.href.substring(e.href.indexOf("#")+1))}(e)));e.forEach((e=>{!function(e,n){n?(t.current&&t.current!==e&&t.current.classList.remove(a),e.classList.add(a),t.current=e):e.classList.remove(a)}(e,e===l)}))}return document.addEventListener("scroll",r),document.addEventListener("resize",r),r(),()=>{document.removeEventListener("scroll",r),document.removeEventListener("resize",r)}}),[e,n])}var L=n(4791);function y(e){let{toc:t,className:n,linkClassName:s,isChild:a}=e;return t.length?(0,i.jsx)("ul",{className:a?void 0:n,children:t.map((e=>(0,i.jsxs)("li",{children:[(0,i.jsx)(L.Z,{to:`#${e.id}`,className:s??void 0,dangerouslySetInnerHTML:{__html:e.value}}),(0,i.jsx)(y,{isChild:!0,toc:e.children,className:n,linkClassName:s})]},e.id)))}):null}const Z=s.memo(y);function _(e){let{toc:t,className:n="table-of-contents table-of-contents__left-border",linkClassName:a="table-of-contents__link",linkActiveClassName:o,minHeadingLevel:r,maxHeadingLevel:c,...l}=e;const d=(0,x.L)(),u=r??d.tableOfContents.minHeadingLevel,m=c??d.tableOfContents.maxHeadingLevel,h=function(e){let{toc:t,minHeadingLevel:n,maxHeadingLevel:a}=e;return(0,s.useMemo)((()=>v({toc:g(t),minHeadingLevel:n,maxHeadingLevel:a})),[t,n,a])}({toc:t,minHeadingLevel:u,maxHeadingLevel:m});return k((0,s.useMemo)((()=>{if(a&&o)return{linkClassName:a,linkActiveClassName:o,minHeadingLevel:u,maxHeadingLevel:m}}),[a,o,u,m])),(0,i.jsx)(Z,{toc:h,className:n,linkClassName:a,...l})}var B=n(7325);const w={tocCollapsibleButton:"tocCollapsibleButton_TO0P",tocCollapsibleButtonExpanded:"tocCollapsibleButtonExpanded_MG3E"};function T(e){let{collapsed:t,...n}=e;return(0,i.jsx)("button",{type:"button",...n,className:(0,c.Z)("clean-btn",w.tocCollapsibleButton,!t&&w.tocCollapsibleButtonExpanded,n.className),children:(0,i.jsx)(B.Z,{id:"theme.TOCCollapsible.toggleButtonLabel",description:"The label used by the button on the collapsible TOC component",children:"On this page"})})}const E={tocCollapsible:"tocCollapsible_ETCw",tocCollapsibleContent:"tocCollapsibleContent_vkbj",tocCollapsibleExpanded:"tocCollapsibleExpanded_sAul"};function H(e){let{toc:t,className:n,minHeadingLevel:s,maxHeadingLevel:a}=e;const{collapsed:o,toggleCollapsed:r}=(0,b.u)({initialState:!0});return(0,i.jsxs)("div",{className:(0,c.Z)(E.tocCollapsible,!o&&E.tocCollapsibleExpanded,n),children:[(0,i.jsx)(T,{collapsed:o,onClick:r}),(0,i.jsx)(b.z,{lazy:!0,className:E.tocCollapsibleContent,collapsed:o,children:(0,i.jsx)(_,{toc:t,minHeadingLevel:s,maxHeadingLevel:a})})]})}const I={tocMobile:"tocMobile_ITEo"};function M(){const{toc:e,frontMatter:t}=(0,o.k)();return(0,i.jsx)(H,{toc:e,minHeadingLevel:t.toc_min_heading_level,maxHeadingLevel:t.toc_max_heading_level,className:(0,c.Z)(f.k.docs.docTocMobile,I.tocMobile)})}const A={tableOfContents:"tableOfContents_bqdL",docItemContainer:"docItemContainer_F8PC"},S="table-of-contents__link toc-highlight",z="table-of-contents__link--active";function V(e){let{className:t,...n}=e;return(0,i.jsx)("div",{className:(0,c.Z)(A.tableOfContents,"thin-scrollbar",t),children:(0,i.jsx)(_,{...n,linkClassName:S,linkActiveClassName:z})})}function R(){const{toc:e,frontMatter:t}=(0,o.k)();return(0,i.jsx)(V,{toc:e,minHeadingLevel:t.toc_min_heading_level,maxHeadingLevel:t.toc_max_heading_level,className:f.k.docs.docTocDesktop})}var P=n(3899),O=n(1151),U=n(1514),D=n(1048),$=n(9200);function W(){const{prism:e}=(0,x.L)(),{colorMode:t}=(0,$.I)(),n=e.theme,s=e.darkTheme||n;return"dark"===t?s:n}var F=n(7594),q=n.n(F);const G=/title=(?<quote>["'])(?<title>.*?)\1/,J=/\{(?<range>[\d,-]+)\}/,Y={js:{start:"\\/\\/",end:""},jsBlock:{start:"\\/\\*",end:"\\*\\/"},jsx:{start:"\\{\\s*\\/\\*",end:"\\*\\/\\s*\\}"},bash:{start:"#",end:""},html:{start:"\x3c!--",end:"--\x3e"}},Q={...Y,lua:{start:"--",end:""},wasm:{start:"\\;\\;",end:""},tex:{start:"%",end:""},vb:{start:"['\u2018\u2019]",end:""},vbnet:{start:"(?:_\\s*)?['\u2018\u2019]",end:""},rem:{start:"[Rr][Ee][Mm]\\b",end:""},f90:{start:"!",end:""},ml:{start:"\\(\\*",end:"\\*\\)"},cobol:{start:"\\*>",end:""}},X=Object.keys(Y);function K(e,t){const n=e.map((e=>{const{start:n,end:s}=Q[e];return`(?:${n}\\s*(${t.flatMap((e=>[e.line,e.block?.start,e.block?.end].filter(Boolean))).join("|")})\\s*${s})`})).join("|");return new RegExp(`^\\s*(?:${n})\\s*$`)}function ee(e,t){let n=e.replace(/\n$/,"");const{language:s,magicComments:a,metastring:o}=t;if(o&&J.test(o)){const e=o.match(J).groups.range;if(0===a.length)throw new Error(`A highlight range has been given in code block's metastring (\`\`\` ${o}), but no magic comment config is available. Docusaurus applies the first magic comment entry's className for metastring ranges.`);const t=a[0].className,s=q()(e).filter((e=>e>0)).map((e=>[e-1,[t]]));return{lineClassNames:Object.fromEntries(s),code:n}}if(void 0===s)return{lineClassNames:{},code:n};const i=function(e,t){switch(e){case"js":case"javascript":case"ts":case"typescript":return K(["js","jsBlock"],t);case"jsx":case"tsx":return K(["js","jsBlock","jsx"],t);case"html":return K(["js","jsBlock","html"],t);case"python":case"py":case"bash":return K(["bash"],t);case"markdown":case"md":return K(["html","jsx","bash"],t);case"tex":case"latex":case"matlab":return K(["tex"],t);case"lua":case"haskell":case"sql":return K(["lua"],t);case"wasm":return K(["wasm"],t);case"vb":case"vba":case"visual-basic":return K(["vb","rem"],t);case"vbnet":return K(["vbnet","rem"],t);case"batch":return K(["rem"],t);case"basic":return K(["rem","f90"],t);case"fsharp":return K(["js","ml"],t);case"ocaml":case"sml":return K(["ml"],t);case"fortran":return K(["f90"],t);case"cobol":return K(["cobol"],t);default:return K(X,t)}}(s,a),r=n.split("\n"),c=Object.fromEntries(a.map((e=>[e.className,{start:0,range:""}]))),l=Object.fromEntries(a.filter((e=>e.line)).map((e=>{let{className:t,line:n}=e;return[n,t]}))),d=Object.fromEntries(a.filter((e=>e.block)).map((e=>{let{className:t,block:n}=e;return[n.start,t]}))),u=Object.fromEntries(a.filter((e=>e.block)).map((e=>{let{className:t,block:n}=e;return[n.end,t]})));for(let h=0;h<r.length;){const e=r[h].match(i);if(!e){h+=1;continue}const t=e.slice(1).find((e=>void 0!==e));l[t]?c[l[t]].range+=`${h},`:d[t]?c[d[t]].start=h:u[t]&&(c[u[t]].range+=`${c[u[t]].start}-${h-1},`),r.splice(h,1)}n=r.join("\n");const m={};return Object.entries(c).forEach((e=>{let[t,{range:n}]=e;q()(n).forEach((e=>{m[e]??=[],m[e].push(t)}))})),{lineClassNames:m,code:n}}const te={codeBlockContainer:"codeBlockContainer_Ckt0"};function ne(e){let{as:t,...n}=e;const s=function(e){const t={color:"--prism-color",backgroundColor:"--prism-background-color"},n={};return Object.entries(e.plain).forEach((e=>{let[s,a]=e;const o=t[s];o&&"string"==typeof a&&(n[o]=a)})),n}(W());return(0,i.jsx)(t,{...n,style:s,className:(0,c.Z)(n.className,te.codeBlockContainer,f.k.common.codeBlock)})}const se={codeBlockContent:"codeBlockContent_biex",codeBlockTitle:"codeBlockTitle_Ktv7",codeBlock:"codeBlock_bY9V",codeBlockStandalone:"codeBlockStandalone_MEMb",codeBlockLines:"codeBlockLines_e6Vv",codeBlockLinesWithNumbering:"codeBlockLinesWithNumbering_o6Pm",buttonGroup:"buttonGroup__atx"};function ae(e){let{children:t,className:n}=e;return(0,i.jsx)(ne,{as:"pre",tabIndex:0,className:(0,c.Z)(se.codeBlockStandalone,"thin-scrollbar",n),children:(0,i.jsx)("code",{className:se.codeBlockLines,children:t})})}var oe=n(3768);const ie={attributes:!0,characterData:!0,childList:!0,subtree:!0};function re(e,t){const[n,a]=(0,s.useState)(),o=(0,s.useCallback)((()=>{a(e.current?.closest("[role=tabpanel][hidden]"))}),[e,a]);(0,s.useEffect)((()=>{o()}),[o]),function(e,t,n){void 0===n&&(n=ie);const a=(0,oe.zX)(t),o=(0,oe.Ql)(n);(0,s.useEffect)((()=>{const t=new MutationObserver(a);return e&&t.observe(e,o),()=>t.disconnect()}),[e,a,o])}(n,(e=>{e.forEach((e=>{"attributes"===e.type&&"hidden"===e.attributeName&&(t(),o())}))}),{attributes:!0,characterData:!1,childList:!1,subtree:!1})}var ce=n(4965);const le={codeLine:"codeLine_lJS_",codeLineNumber:"codeLineNumber_Tfdd",codeLineContent:"codeLineContent_feaV"};function de(e){let{line:t,classNames:n,showLineNumbers:s,getLineProps:a,getTokenProps:o}=e;1===t.length&&"\n"===t[0].content&&(t[0].content="");const r=a({line:t,className:(0,c.Z)(n,s&&le.codeLine)}),l=t.map(((e,t)=>(0,i.jsx)("span",{...o({token:e})},t)));return(0,i.jsxs)("span",{...r,children:[s?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("span",{className:le.codeLineNumber}),(0,i.jsx)("span",{className:le.codeLineContent,children:l})]}):l,(0,i.jsx)("br",{})]})}function ue(e){return(0,i.jsx)("svg",{viewBox:"0 0 24 24",...e,children:(0,i.jsx)("path",{fill:"currentColor",d:"M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"})})}function me(e){return(0,i.jsx)("svg",{viewBox:"0 0 24 24",...e,children:(0,i.jsx)("path",{fill:"currentColor",d:"M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"})})}const he={copyButtonCopied:"copyButtonCopied_obH4",copyButtonIcons:"copyButtonIcons_eSgA",copyButtonIcon:"copyButtonIcon_y97N",copyButtonSuccessIcon:"copyButtonSuccessIcon_LjdS"};function pe(e){let{code:t,className:n}=e;const[a,o]=(0,s.useState)(!1),r=(0,s.useRef)(void 0),l=(0,s.useCallback)((()=>{!function(e,t){let{target:n=document.body}=void 0===t?{}:t;if("string"!=typeof e)throw new TypeError(`Expected parameter \`text\` to be a \`string\`, got \`${typeof e}\`.`);const s=document.createElement("textarea"),a=document.activeElement;s.value=e,s.setAttribute("readonly",""),s.style.contain="strict",s.style.position="absolute",s.style.left="-9999px",s.style.fontSize="12pt";const o=document.getSelection(),i=o.rangeCount>0&&o.getRangeAt(0);n.append(s),s.select(),s.selectionStart=0,s.selectionEnd=e.length;let r=!1;try{r=document.execCommand("copy")}catch{}s.remove(),i&&(o.removeAllRanges(),o.addRange(i)),a&&a.focus()}(t),o(!0),r.current=window.setTimeout((()=>{o(!1)}),1e3)}),[t]);return(0,s.useEffect)((()=>()=>window.clearTimeout(r.current)),[]),(0,i.jsx)("button",{type:"button","aria-label":a?(0,B.I)({id:"theme.CodeBlock.copied",message:"Copied",description:"The copied button label on code blocks"}):(0,B.I)({id:"theme.CodeBlock.copyButtonAriaLabel",message:"Copy code to clipboard",description:"The ARIA label for copy code blocks button"}),title:(0,B.I)({id:"theme.CodeBlock.copy",message:"Copy",description:"The copy button label on code blocks"}),className:(0,c.Z)("clean-btn",n,he.copyButton,a&&he.copyButtonCopied),onClick:l,children:(0,i.jsxs)("span",{className:he.copyButtonIcons,"aria-hidden":"true",children:[(0,i.jsx)(ue,{className:he.copyButtonIcon}),(0,i.jsx)(me,{className:he.copyButtonSuccessIcon})]})})}function fe(e){return(0,i.jsx)("svg",{viewBox:"0 0 24 24",...e,children:(0,i.jsx)("path",{fill:"currentColor",d:"M4 19h6v-2H4v2zM20 5H4v2h16V5zm-3 6H4v2h13.25c1.1 0 2 .9 2 2s-.9 2-2 2H15v-2l-3 3l3 3v-2h2c2.21 0 4-1.79 4-4s-1.79-4-4-4z"})})}const be={wordWrapButtonIcon:"wordWrapButtonIcon_Bwma",wordWrapButtonEnabled:"wordWrapButtonEnabled_EoeP"};function xe(e){let{className:t,onClick:n,isEnabled:s}=e;const a=(0,B.I)({id:"theme.CodeBlock.wordWrapToggle",message:"Toggle word wrap",description:"The title attribute for toggle word wrapping button of code block lines"});return(0,i.jsx)("button",{type:"button",onClick:n,className:(0,c.Z)("clean-btn",t,s&&be.wordWrapButtonEnabled),"aria-label":a,title:a,children:(0,i.jsx)(fe,{className:be.wordWrapButtonIcon,"aria-hidden":"true"})})}function ge(e){let{children:t,className:n="",metastring:a,title:o,showLineNumbers:r,language:l}=e;const{prism:{defaultLanguage:d,magicComments:u}}=(0,x.L)(),m=function(e){return e?.toLowerCase()}(l??function(e){const t=e.split(" ").find((e=>e.startsWith("language-")));return t?.replace(/language-/,"")}(n)??d),h=W(),p=function(){const[e,t]=(0,s.useState)(!1),[n,a]=(0,s.useState)(!1),o=(0,s.useRef)(null),i=(0,s.useCallback)((()=>{const n=o.current.querySelector("code");e?n.removeAttribute("style"):(n.style.whiteSpace="pre-wrap",n.style.overflowWrap="anywhere"),t((e=>!e))}),[o,e]),r=(0,s.useCallback)((()=>{const{scrollWidth:e,clientWidth:t}=o.current,n=e>t||o.current.querySelector("code").hasAttribute("style");a(n)}),[o]);return re(o,r),(0,s.useEffect)((()=>{r()}),[e,r]),(0,s.useEffect)((()=>(window.addEventListener("resize",r,{passive:!0}),()=>{window.removeEventListener("resize",r)})),[r]),{codeBlockRef:o,isEnabled:e,isCodeScrollable:n,toggle:i}}(),f=function(e){return e?.match(G)?.groups.title??""}(a)||o,{lineClassNames:b,code:g}=ee(t,{metastring:a,language:m,magicComments:u}),v=r??function(e){return Boolean(e?.includes("showLineNumbers"))}(a);return(0,i.jsxs)(ne,{as:"div",className:(0,c.Z)(n,m&&!n.includes(`language-${m}`)&&`language-${m}`),children:[f&&(0,i.jsx)("div",{className:se.codeBlockTitle,children:f}),(0,i.jsxs)("div",{className:se.codeBlockContent,children:[(0,i.jsx)(ce.y$,{theme:h,code:g,language:m??"text",children:e=>{let{className:t,style:n,tokens:s,getLineProps:a,getTokenProps:o}=e;return(0,i.jsx)("pre",{tabIndex:0,ref:p.codeBlockRef,className:(0,c.Z)(t,se.codeBlock,"thin-scrollbar"),style:n,children:(0,i.jsx)("code",{className:(0,c.Z)(se.codeBlockLines,v&&se.codeBlockLinesWithNumbering),children:s.map(((e,t)=>(0,i.jsx)(de,{line:e,getLineProps:a,getTokenProps:o,classNames:b[t],showLineNumbers:v},t)))})})}}),(0,i.jsxs)("div",{className:se.buttonGroup,children:[(p.isEnabled||p.isCodeScrollable)&&(0,i.jsx)(xe,{className:se.codeButton,onClick:()=>p.toggle(),isEnabled:p.isEnabled}),(0,i.jsx)(pe,{className:se.codeButton,code:g})]})]})]})}function ve(e){let{children:t,...n}=e;const a=(0,D.Z)(),o=function(e){return s.Children.toArray(e).some((e=>(0,s.isValidElement)(e)))?e:Array.isArray(e)?e.join(""):e}(t),r="string"==typeof o?ge:ae;return(0,i.jsx)(r,{...n,children:o},String(a))}function je(e){return(0,i.jsx)("code",{...e})}var Ne=n(788),Ce=n(168);const ke={details:"details_lb9f",isBrowser:"isBrowser_bmU9",collapsibleContent:"collapsibleContent_i85q"};function Le(e){return!!e&&("SUMMARY"===e.tagName||Le(e.parentElement))}function ye(e,t){return!!e&&(e===t||ye(e.parentElement,t))}function Ze(e){let{summary:t,children:n,...a}=e;(0,Ce.Z)().collectAnchor(a.id);const o=(0,D.Z)(),r=(0,s.useRef)(null),{collapsed:c,setCollapsed:l}=(0,b.u)({initialState:!a.open}),[d,u]=(0,s.useState)(a.open),m=s.isValidElement(t)?t:(0,i.jsx)("summary",{children:t??"Details"});return(0,i.jsxs)("details",{...a,ref:r,open:d,"data-collapsed":c,className:(0,Ne.Z)(ke.details,o&&ke.isBrowser,a.className),onMouseDown:e=>{Le(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const t=e.target;Le(t)&&ye(t,r.current)&&(e.preventDefault(),c?(l(!1),u(!0)):l(!0))},children:[m,(0,i.jsx)(b.z,{lazy:!1,collapsed:c,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{l(e),u(!e)},children:(0,i.jsx)("div",{className:ke.collapsibleContent,children:n})})]})}const _e={details:"details_b_Ee"},Be="alert alert--info";function we(e){let{...t}=e;return(0,i.jsx)(Ze,{...t,className:(0,c.Z)(Be,_e.details,t.className)})}function Te(e){const t=s.Children.toArray(e.children),n=t.find((e=>s.isValidElement(e)&&"summary"===e.type)),a=(0,i.jsx)(i.Fragment,{children:t.filter((e=>e!==n))});return(0,i.jsx)(we,{...e,summary:n,children:a})}function Ee(e){return(0,i.jsx)(P.Z,{...e})}const He={containsTaskList:"containsTaskList_mC6p"};function Ie(e){if(void 0!==e)return(0,c.Z)(e,e?.includes("contains-task-list")&&He.containsTaskList)}const Me={img:"img_ev3q"};var Ae=n(9114);const Se={Head:U.Z,details:Te,Details:Te,code:function(e){return function(e){return void 0!==e.children&&s.Children.toArray(e.children).every((e=>"string"==typeof e&&!e.includes("\n")))}(e)?(0,i.jsx)(je,{...e}):(0,i.jsx)(ve,{...e})},a:function(e){return(0,i.jsx)(L.Z,{...e})},pre:function(e){return(0,i.jsx)(i.Fragment,{children:e.children})},ul:function(e){return(0,i.jsx)("ul",{...e,className:Ie(e.className)})},li:function(e){return(0,Ce.Z)().collectAnchor(e.id),(0,i.jsx)("li",{...e})},img:function(e){return(0,i.jsx)("img",{decoding:"async",loading:"lazy",...e,className:(t=e.className,(0,c.Z)(t,Me.img))});var t},h1:e=>(0,i.jsx)(Ee,{as:"h1",...e}),h2:e=>(0,i.jsx)(Ee,{as:"h2",...e}),h3:e=>(0,i.jsx)(Ee,{as:"h3",...e}),h4:e=>(0,i.jsx)(Ee,{as:"h4",...e}),h5:e=>(0,i.jsx)(Ee,{as:"h5",...e}),h6:e=>(0,i.jsx)(Ee,{as:"h6",...e}),admonition:Ae.Z,mermaid:()=>null};function ze(e){let{children:t}=e;return(0,i.jsx)(O.Z,{components:Se,children:t})}function Ve(e){let{children:t}=e;const n=function(){const{metadata:e,frontMatter:t,contentTitle:n}=(0,o.k)();return t.hide_title||void 0!==n?null:e.title}();return(0,i.jsxs)("div",{className:(0,c.Z)(f.k.docs.docMarkdown,"markdown"),children:[n&&(0,i.jsx)("header",{children:(0,i.jsx)(P.Z,{as:"h1",children:n})}),(0,i.jsx)(ze,{children:t})]})}var Re=n(6086),Pe=n(9501);const Oe={docItemContainer:"docItemContainer_Djhp",docItemCol:"docItemCol_VOVn"};function Ue(e){let{children:t}=e;const n=function(){const{frontMatter:e,toc:t}=(0,o.k)(),n=(0,l.i)(),s=e.hide_table_of_contents,a=!s&&t.length>0;return{hidden:s,mobile:a?(0,i.jsx)(M,{}):void 0,desktop:!a||"desktop"!==n&&"ssr"!==n?void 0:(0,i.jsx)(R,{})}}(),{metadata:{unlisted:s}}=(0,o.k)();return(0,i.jsxs)("div",{className:"row",children:[(0,i.jsxs)("div",{className:(0,c.Z)("col",!n.hidden&&Oe.docItemCol),children:[s&&(0,i.jsx)(Pe.Z,{}),(0,i.jsx)(m.Z,{}),(0,i.jsxs)("div",{className:Oe.docItemContainer,children:[(0,i.jsxs)("article",{children:[(0,i.jsx)(Re.Z,{}),(0,i.jsx)(h.Z,{}),n.mobile,(0,i.jsx)(Ve,{children:t}),(0,i.jsx)(p.Z,{})]}),(0,i.jsx)(u,{})]})]}),n.desktop&&(0,i.jsx)("div",{className:"col col--3",children:n.desktop})]})}function De(e){const t=`docs-doc-id-${e.content.metadata.id}`,n=e.content;return(0,i.jsx)(o.b,{content:e.content,children:(0,i.jsxs)(a.FG,{className:t,children:[(0,i.jsx)(r,{}),(0,i.jsx)(Ue,{children:(0,i.jsx)(n,{})})]})})}},9473:(e,t,n)=>{"use strict";n.d(t,{Z:()=>c});n(7294);var s=n(7325),a=n(6905),o=n(4791),i=n(5893);function r(e){const{permalink:t,title:n,subLabel:s,isNext:r}=e;return(0,i.jsxs)(o.Z,{className:(0,a.Z)("pagination-nav__link",r?"pagination-nav__link--next":"pagination-nav__link--prev"),to:t,children:[s&&(0,i.jsx)("div",{className:"pagination-nav__sublabel",children:s}),(0,i.jsx)("div",{className:"pagination-nav__label",children:n})]})}function c(e){const{previous:t,next:n}=e;return(0,i.jsxs)("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,s.I)({id:"theme.docs.paginator.navAriaLabel",message:"Docs pages",description:"The ARIA label for the docs pagination"}),children:[t&&(0,i.jsx)(r,{...t,subLabel:(0,i.jsx)(s.Z,{id:"theme.docs.paginator.previous",description:"The label used to navigate to the previous doc",children:"Previous"})}),n&&(0,i.jsx)(r,{...n,subLabel:(0,i.jsx)(s.Z,{id:"theme.docs.paginator.next",description:"The label used to navigate to the next doc",children:"Next"}),isNext:!0})]})}},4617:(e,t,n)=>{"use strict";n.d(t,{Z:()=>c});n(7294);var s=n(6905),a=n(7325),o=n(3702),i=n(8801),r=n(5893);function c(e){let{className:t}=e;const n=(0,i.E)();return n.badge?(0,r.jsx)("span",{className:(0,s.Z)(t,o.k.docs.docVersionBadge,"badge badge--secondary"),children:(0,r.jsx)(a.Z,{id:"theme.docs.versionBadge.label",values:{versionLabel:n.label},children:"Version: {versionLabel}"})}):null}},5350:(e,t,n)=>{"use strict";n.d(t,{Z:()=>b});n(7294);var s=n(6905),a=n(9962),o=n(4791),i=n(7325),r=n(868),c=n(3702),l=n(6409),d=n(8801),u=n(5893);const m={unreleased:function(e){let{siteTitle:t,versionMetadata:n}=e;return(0,u.jsx)(i.Z,{id:"theme.docs.versions.unreleasedVersionLabel",description:"The label used to tell the user that he's browsing an unreleased doc version",values:{siteTitle:t,versionLabel:(0,u.jsx)("b",{children:n.label})},children:"This is unreleased documentation for {siteTitle} {versionLabel} version."})},unmaintained:function(e){let{siteTitle:t,versionMetadata:n}=e;return(0,u.jsx)(i.Z,{id:"theme.docs.versions.unmaintainedVersionLabel",description:"The label used to tell the user that he's browsing an unmaintained doc version",values:{siteTitle:t,versionLabel:(0,u.jsx)("b",{children:n.label})},children:"This is documentation for {siteTitle} {versionLabel}, which is no longer actively maintained."})}};function h(e){const t=m[e.versionMetadata.banner];return(0,u.jsx)(t,{...e})}function p(e){let{versionLabel:t,to:n,onClick:s}=e;return(0,u.jsx)(i.Z,{id:"theme.docs.versions.latestVersionSuggestionLabel",description:"The label used to tell the user to check the latest version",values:{versionLabel:t,latestVersionLink:(0,u.jsx)("b",{children:(0,u.jsx)(o.Z,{to:n,onClick:s,children:(0,u.jsx)(i.Z,{id:"theme.docs.versions.latestVersionLinkLabel",description:"The label used for the latest version suggestion link label",children:"latest version"})})})},children:"For up-to-date documentation, see the {latestVersionLink} ({versionLabel})."})}function f(e){let{className:t,versionMetadata:n}=e;const{siteConfig:{title:o}}=(0,a.Z)(),{pluginId:i}=(0,r.gA)({failfast:!0}),{savePreferredVersionName:d}=(0,l.J)(i),{latestDocSuggestion:m,latestVersionSuggestion:f}=(0,r.Jo)(i),b=m??(x=f).docs.find((e=>e.id===x.mainDocId));var x;return(0,u.jsxs)("div",{className:(0,s.Z)(t,c.k.docs.docVersionBanner,"alert alert--warning margin-bottom--md"),role:"alert",children:[(0,u.jsx)("div",{children:(0,u.jsx)(h,{siteTitle:o,versionMetadata:n})}),(0,u.jsx)("div",{className:"margin-top--md",children:(0,u.jsx)(p,{versionLabel:f.label,to:b.path,onClick:()=>d(f.name)})})]})}function b(e){let{className:t}=e;const n=(0,d.E)();return n.banner?(0,u.jsx)(f,{className:t,versionMetadata:n}):null}},4850:(e,t,n)=>{"use strict";n.d(t,{Z:()=>d});n(7294);var s=n(7325),a=n(3702),o=n(4791),i=n(6905);const r={iconEdit:"iconEdit_Z9Sw"};var c=n(5893);function l(e){let{className:t,...n}=e;return(0,c.jsx)("svg",{fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,i.Z)(r.iconEdit,t),"aria-hidden":"true",...n,children:(0,c.jsx)("g",{children:(0,c.jsx)("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})})})}function d(e){let{editUrl:t}=e;return(0,c.jsxs)(o.Z,{to:t,className:a.k.common.editThisPage,children:[(0,c.jsx)(l,{}),(0,c.jsx)(s.Z,{id:"theme.common.editThisPage",description:"The link label to edit the current page",children:"Edit this page"})]})}},4464:(e,t,n)=>{"use strict";n.d(t,{Z:()=>d});n(7294);var s=n(7325),a=n(3702),o=n(9962);function i(e){void 0===e&&(e={});const{i18n:{currentLocale:t}}=(0,o.Z)(),n=function(){const{i18n:{currentLocale:e,localeConfigs:t}}=(0,o.Z)();return t[e].calendar}();return new Intl.DateTimeFormat(t,{calendar:n,...e})}var r=n(5893);function c(e){let{lastUpdatedAt:t}=e;const n=new Date(t),a=i({day:"numeric",month:"short",year:"numeric",timeZone:"UTC"}).format(n);return(0,r.jsx)(s.Z,{id:"theme.lastUpdated.atDate",description:"The words used to describe on which date a page has been last updated",values:{date:(0,r.jsx)("b",{children:(0,r.jsx)("time",{dateTime:n.toISOString(),itemProp:"dateModified",children:a})})},children:" on {date}"})}function l(e){let{lastUpdatedBy:t}=e;return(0,r.jsx)(s.Z,{id:"theme.lastUpdated.byUser",description:"The words used to describe by who the page has been last updated",values:{user:(0,r.jsx)("b",{children:t})},children:" by {user}"})}function d(e){let{lastUpdatedAt:t,lastUpdatedBy:n}=e;return(0,r.jsxs)("span",{className:a.k.common.lastUpdated,children:[(0,r.jsx)(s.Z,{id:"theme.lastUpdated.lastUpdatedAtBy",description:"The sentence used to display when a page has been last updated, and by who",values:{atDate:t?(0,r.jsx)(c,{lastUpdatedAt:t}):"",byUser:n?(0,r.jsx)(l,{lastUpdatedBy:n}):""},children:"Last updated{atDate}{byUser}"}),!1]})}},3852:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});n(7294);var s=n(6905),a=n(4791);const o={tag:"tag_zVej",tagRegular:"tagRegular_sFm0",tagWithCount:"tagWithCount_h2kH"};var i=n(5893);function r(e){let{permalink:t,label:n,count:r,description:c}=e;return(0,i.jsxs)(a.Z,{href:t,title:c,className:(0,s.Z)(o.tag,r?o.tagWithCount:o.tagRegular),children:[n,r&&(0,i.jsx)("span",{children:r})]})}},4597:(e,t,n)=>{"use strict";n.d(t,{Z:()=>c});n(7294);var s=n(6905),a=n(7325),o=n(3852);const i={tags:"tags_jXut",tag:"tag_QGVx"};var r=n(5893);function c(e){let{tags:t}=e;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("b",{children:(0,r.jsx)(a.Z,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list",children:"Tags:"})}),(0,r.jsx)("ul",{className:(0,s.Z)(i.tags,"padding--none","margin-left--sm"),children:t.map((e=>(0,r.jsx)("li",{className:i.tag,children:(0,r.jsx)(o.Z,{...e})},e.permalink)))})]})}},9501:(e,t,n)=>{"use strict";n.d(t,{Z:()=>h});n(7294);var s=n(6905),a=n(7325),o=n(1514),i=n(5893);function r(){return(0,i.jsx)(a.Z,{id:"theme.unlistedContent.title",description:"The unlisted content banner title",children:"Unlisted page"})}function c(){return(0,i.jsx)(a.Z,{id:"theme.unlistedContent.message",description:"The unlisted content banner message",children:"This page is unlisted. Search engines will not index it, and only users having a direct link can access it."})}function l(){return(0,i.jsx)(o.Z,{children:(0,i.jsx)("meta",{name:"robots",content:"noindex, nofollow"})})}var d=n(3702),u=n(9114);function m(e){let{className:t}=e;return(0,i.jsx)(u.Z,{type:"caution",title:(0,i.jsx)(r,{}),className:(0,s.Z)(t,d.k.common.unlistedBanner),children:(0,i.jsx)(c,{})})}function h(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(l,{}),(0,i.jsx)(m,{...e})]})}},1871:(e,t,n)=>{"use strict";n.d(t,{b:()=>r,k:()=>c});var s=n(7294),a=n(3768),o=n(5893);const i=s.createContext(null);function r(e){let{children:t,content:n}=e;const a=function(e){return(0,s.useMemo)((()=>({metadata:e.metadata,frontMatter:e.frontMatter,assets:e.assets,contentTitle:e.contentTitle,toc:e.toc})),[e])}(n);return(0,o.jsx)(i.Provider,{value:a,children:t})}function c(){const e=(0,s.useContext)(i);if(null===e)throw new a.i6("DocProvider");return e}},7594:(e,t)=>{function n(e){let t,n=[];for(let s of e.split(",").map((e=>e.trim())))if(/^-?\d+$/.test(s))n.push(parseInt(s,10));else if(t=s.match(/^(-?\d+)(-|\.\.\.?|\u2025|\u2026|\u22EF)(-?\d+)$/)){let[e,s,a,o]=t;if(s&&o){s=parseInt(s),o=parseInt(o);const e=s<o?1:-1;"-"!==a&&".."!==a&&"\u2025"!==a||(o+=e);for(let t=s;t!==o;t+=e)n.push(t)}}return n}t.default=n,e.exports=n},1151:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r,a:()=>i});var s=n(7294);const a={},o=s.createContext(a);function i(e){const t=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),s.createElement(o.Provider,{value:t},e.children)}},512:(e,t,n)=>{"use strict";function s(e){var t,n,a="";if("string"==typeof e||"number"==typeof e)a+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(n=s(e[t]))&&(a&&(a+=" "),a+=n)}else for(n in e)e[n]&&(a&&(a+=" "),a+=n);return a}n.d(t,{Z:()=>a});const a=function(){for(var e,t,n=0,a="",o=arguments.length;n<o;n++)(e=arguments[n])&&(t=s(e))&&(a&&(a+=" "),a+=t);return a}}}]);