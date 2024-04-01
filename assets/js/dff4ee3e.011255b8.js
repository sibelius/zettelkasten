"use strict";(self.webpackChunkdev_docs=self.webpackChunkdev_docs||[]).push([[5183],{8123:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>u,frontMatter:()=>a,metadata:()=>d,toc:()=>p});var n=o(5893),i=o(1151),r=o(2512),s=o(2205);const a={id:"paid-mentorship-developers",title:"Paid Mentorship for Developers",tags:["advice","mentorship","paid","developer"]},l=void 0,d={id:"paid-mentorship-developers",title:"Paid Mentorship for Developers",description:"Paid Mentorship for Developers",source:"@site/docs/paid-mentorship-developers.mdx",sourceDirName:".",slug:"/paid-mentorship-developers",permalink:"/zettelkasten/paid-mentorship-developers",draft:!1,unlisted:!1,editUrl:"https://github.com/sibelius/zettelkasten/edit/main/docs/paid-mentorship-developers.mdx",tags:[{label:"advice",permalink:"/zettelkasten/tags/advice"},{label:"mentorship",permalink:"/zettelkasten/tags/mentorship"},{label:"paid",permalink:"/zettelkasten/tags/paid"},{label:"developer",permalink:"/zettelkasten/tags/developer"}],version:"current",lastUpdatedBy:"Sibelius Seraphini",lastUpdatedAt:1711971614,formattedLastUpdatedAt:"Apr 1, 2024",frontMatter:{id:"paid-mentorship-developers",title:"Paid Mentorship for Developers",tags:["advice","mentorship","paid","developer"]},sidebar:"docs",previous:{title:"Paid Consulting for Startups",permalink:"/zettelkasten/paid-consulting-startups"},next:{title:"Podcasts",permalink:"/zettelkasten/podcasts"}},c={},p=[{value:"Paid Mentorship for Developers",id:"paid-mentorship-for-developers",level:2},{value:"Price",id:"price",level:2},{value:"How to pay",id:"how-to-pay",level:2}];function h(e){const t={a:"a",h2:"h2",hr:"hr",li:"li",p:"p",ul:"ul",...(0,i.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h2,{id:"paid-mentorship-for-developers",children:"Paid Mentorship for Developers"}),"\n",(0,n.jsx)(t.p,{children:"1 sync call per month"}),"\n",(0,n.jsx)(t.p,{children:"Async chat with me everyday"}),"\n",(0,n.jsx)(t.p,{children:"Things I can help you with:"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:"I can help you get your first job"}),"\n",(0,n.jsx)(t.li,{children:"I can help you get a better job"}),"\n",(0,n.jsx)(t.li,{children:"I can help you get to a more Senior Level"}),"\n",(0,n.jsx)(t.li,{children:"I can help you transition from IC to management"}),"\n",(0,n.jsx)(t.li,{children:"I can help you manage your team"}),"\n",(0,n.jsx)(t.li,{children:"I can help you manage your product"}),"\n",(0,n.jsx)(t.li,{children:"I can help you fix technical debt, improve your archicture and data modeling skills"}),"\n"]}),"\n",(0,n.jsx)(t.h2,{id:"price",children:"Price"}),"\n",(0,n.jsx)(t.p,{children:"US$ 120 per month"}),"\n",(0,n.jsx)(t.h2,{id:"how-to-pay",children:"How to pay"}),"\n",(0,n.jsx)(t.p,{children:"Pix"}),"\n",(0,n.jsx)(r.s,{value:"00020126720014BR.GOV.BCB.PIX0136c78052c6-43e5-4732-a9ef-90fd615ed6380210mentorship5204000053039865802BR5918Sibelius Seraphini6009SAO PAULO61080540900062240520672Ib1DOdDFVQn65hoid6304AA21"}),"\n",(0,n.jsx)(s.G,{value:"00020126720014BR.GOV.BCB.PIX0136c78052c6-43e5-4732-a9ef-90fd615ed6380210mentorship5204000053039865802BR5918Sibelius Seraphini6009SAO PAULO61080540900062240520672Ib1DOdDFVQn65hoid6304AA21"}),"\n",(0,n.jsx)(t.hr,{}),"\n",(0,n.jsxs)(t.p,{children:["Paypal: ",(0,n.jsx)(t.a,{href:"mailto:sibeliusseraphini@gmail.com",children:"sibeliusseraphini@gmail.com"})]}),"\n",(0,n.jsxs)(t.p,{children:["Patreon: ",(0,n.jsx)(t.a,{href:"https://www.patreon.com/sibelius",children:"https://www.patreon.com/sibelius"})]}),"\n",(0,n.jsxs)(t.p,{children:["Github Sponsors: ",(0,n.jsx)(t.a,{href:"https://github.com/sponsors/sibelius",children:"https://github.com/sponsors/sibelius"})]})]})}function u(e={}){const{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(h,{...e})}):h(e)}},2205:(e,t,o)=>{o.d(t,{G:()=>d});var n=o(7294),i=o(1237),r=o(4697);const s=e=>{const t=document.createTextNode(e);document.body.appendChild(t);const o=document.createRange();o.selectNodeContents(t),window.getSelection().removeAllRanges(),window.getSelection().addRange(o);try{const o=document.execCommand("copy");return window.getSelection().removeAllRanges(),t.remove(),o&&console.log("createTextNode: ",e),o}catch(n){return console.log("createTextNode: ",n),!1}},a=e=>{const t=document.createElement("textarea");t.value=e,document.body.appendChild(t),t.focus(),t.select();try{const o=document.execCommand("copy");return document.body.removeChild(t),o&&console.log("textArea: ",e),o}catch(o){return console.log("createTextArea: ",o),!1}};var l=o(5893);const d=e=>{let{value:t}=e;const[o,d]=(0,n.useState)(!1),c=(0,r.y1)((()=>{d(!1)}),1e3);return(0,l.jsx)("button",{onClick:async()=>{d(!0),await(async e=>{try{if(navigator.clipboard){if(navigator.permissions)try{const e={name:"clipboard-write"},t=await navigator.permissions.query(e);console.log("cliboard-write: ",t.state),t.onchange=()=>{console.log("clipboard-write changed: ",t.state)}}catch(o){console.log("error permissions: ",o)}return await navigator.clipboard.writeText(e),console.log("navigator.clipboard.writeText: ",e),!0}}catch(o){console.log("Failed to copy!",o)}const t=s(e);if(console.log("textNode: ",t),!t){const o=a(e);return console.log("textArea: ",t),o}return t})(t),c()},children:o?(0,l.jsx)(i.xv,{as:"span",sx:{textTransform:"uppercase"},children:"Copied"}):(0,l.jsx)(i.xv,{as:"span",sx:{textTransform:"uppercase"},children:"Copy QR Code"})})}},2512:(e,t,o)=>{o.d(t,{s:()=>l});var n=o(4059),i=o(964),r=o(1237),s=(o(7294),o(5893));const a=(0,i.ZP)(r.kC)`
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
`,l=e=>{let{value:t}=e;return(0,s.jsx)(a,{children:(0,s.jsx)(n.ZP,{renderAs:"svg",value:t,includeMargin:!0})})}}}]);