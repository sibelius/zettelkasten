"use strict";(self.webpackChunkdev_docs=self.webpackChunkdev_docs||[]).push([[5762],{3054:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>d,contentTitle:()=>l,default:()=>u,frontMatter:()=>s,metadata:()=>c,toc:()=>p});var n=i(5893),o=i(1151),a=i(2512),r=i(2205);const s={id:"private-community",title:"Private Community",tags:["private","paid","community","developer","startup"]},l=void 0,c={id:"private-community",title:"Private Community",description:"Private Community",source:"@site/docs/private-community.mdx",sourceDirName:".",slug:"/private-community",permalink:"/zettelkasten/private-community",draft:!1,unlisted:!1,editUrl:"https://github.com/sibelius/zettelkasten/edit/main/docs/private-community.mdx",tags:[{inline:!0,label:"private",permalink:"/zettelkasten/tags/private"},{inline:!0,label:"paid",permalink:"/zettelkasten/tags/paid"},{inline:!0,label:"community",permalink:"/zettelkasten/tags/community"},{inline:!0,label:"developer",permalink:"/zettelkasten/tags/developer"},{inline:!0,label:"startup",permalink:"/zettelkasten/tags/startup"}],version:"current",lastUpdatedBy:"Sibelius Seraphini",lastUpdatedAt:1717437213e3,frontMatter:{id:"private-community",title:"Private Community",tags:["private","paid","community","developer","startup"]},sidebar:"docs",previous:{title:"Podcasts",permalink:"/zettelkasten/podcasts"},next:{title:"Programming Fundamentals",permalink:"/zettelkasten/programming-fundamentals"}},d={},p=[{value:"Private Community",id:"private-community",level:2},{value:"Price",id:"price",level:2},{value:"How to pay",id:"how-to-pay",level:2}];function m(e){const t={a:"a",h2:"h2",hr:"hr",p:"p",...(0,o.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h2,{id:"private-community",children:"Private Community"}),"\n",(0,n.jsx)(t.p,{children:"A discord community to discuss with me and high-minded people about your startup, product, and software development."}),"\n",(0,n.jsx)(t.p,{children:"High-level discussions with Builders."}),"\n",(0,n.jsx)(t.h2,{id:"price",children:"Price"}),"\n",(0,n.jsx)(t.p,{children:"US$ 10 per month"}),"\n",(0,n.jsx)(t.h2,{id:"how-to-pay",children:"How to pay"}),"\n",(0,n.jsx)(t.p,{children:"Pix"}),"\n",(0,n.jsx)(a.s,{value:"00020126720014BR.GOV.BCB.PIX0136c78052c6-43e5-4732-a9ef-90fd615ed6380210mentorship5204000053039865802BR5918Sibelius Seraphini6009SAO PAULO61080540900062240520672Ib1DOdDFVQn65hoid6304AA21"}),"\n",(0,n.jsx)(r.G,{value:"00020126720014BR.GOV.BCB.PIX0136c78052c6-43e5-4732-a9ef-90fd615ed6380210mentorship5204000053039865802BR5918Sibelius Seraphini6009SAO PAULO61080540900062240520672Ib1DOdDFVQn65hoid6304AA21"}),"\n",(0,n.jsx)(t.hr,{}),"\n",(0,n.jsxs)(t.p,{children:["Paypal: ",(0,n.jsx)(t.a,{href:"mailto:sibeliusseraphini@gmail.com",children:"sibeliusseraphini@gmail.com"})]}),"\n",(0,n.jsxs)(t.p,{children:["Patreon: ",(0,n.jsx)(t.a,{href:"https://www.patreon.com/sibelius",children:"https://www.patreon.com/sibelius"})]}),"\n",(0,n.jsxs)(t.p,{children:["Github Sponsors: ",(0,n.jsx)(t.a,{href:"https://github.com/sponsors/sibelius",children:"https://github.com/sponsors/sibelius"})]})]})}function u(e={}){const{wrapper:t}={...(0,o.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(m,{...e})}):m(e)}},2205:(e,t,i)=>{i.d(t,{G:()=>c});var n=i(7294),o=i(1237),a=i(4697);const r=e=>{const t=document.createTextNode(e);document.body.appendChild(t);const i=document.createRange();i.selectNodeContents(t),window.getSelection().removeAllRanges(),window.getSelection().addRange(i);try{const i=document.execCommand("copy");return window.getSelection().removeAllRanges(),t.remove(),i&&console.log("createTextNode: ",e),i}catch(n){return console.log("createTextNode: ",n),!1}},s=e=>{const t=document.createElement("textarea");t.value=e,document.body.appendChild(t),t.focus(),t.select();try{const i=document.execCommand("copy");return document.body.removeChild(t),i&&console.log("textArea: ",e),i}catch(i){return console.log("createTextArea: ",i),!1}};var l=i(5893);const c=e=>{let{value:t}=e;const[i,c]=(0,n.useState)(!1),d=(0,a.y1)((()=>{c(!1)}),1e3);return(0,l.jsx)("button",{onClick:async()=>{c(!0),await(async e=>{try{if(navigator.clipboard){if(navigator.permissions)try{const e={name:"clipboard-write"},t=await navigator.permissions.query(e);console.log("cliboard-write: ",t.state),t.onchange=()=>{console.log("clipboard-write changed: ",t.state)}}catch(i){console.log("error permissions: ",i)}return await navigator.clipboard.writeText(e),console.log("navigator.clipboard.writeText: ",e),!0}}catch(i){console.log("Failed to copy!",i)}const t=r(e);if(console.log("textNode: ",t),!t){const i=s(e);return console.log("textArea: ",t),i}return t})(t),d()},children:i?(0,l.jsx)(o.xv,{as:"span",sx:{textTransform:"uppercase"},children:"Copied"}):(0,l.jsx)(o.xv,{as:"span",sx:{textTransform:"uppercase"},children:"Copy QR Code"})})}},2512:(e,t,i)=>{i.d(t,{s:()=>l});var n=i(4059),o=i(8095),a=i(1237),r=(i(7294),i(5893));const s=(0,o.ZP)(a.kC)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 10px;
  padding: 2px;
  border: 5px solid;
  border-color: #40787a;
  border-radius: 10px;
  width: 300px;

  & > svg {
    display: block;
    height: auto; /* reset height */
    width: 100%; /* reset width */
  }
`,l=e=>{let{value:t}=e;return(0,r.jsx)(s,{children:(0,r.jsx)(n.ZP,{renderAs:"svg",value:t,includeMargin:!0})})}}}]);