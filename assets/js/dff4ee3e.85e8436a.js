"use strict";(self.webpackChunkdev_docs=self.webpackChunkdev_docs||[]).push([[8385],{4796:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>u,frontMatter:()=>a,metadata:()=>d,toc:()=>p});var i=n(4848),o=n(8453),r=n(2864),s=n(1677);const a={id:"paid-mentorship-developers",title:"Paid Mentorship for Developers",tags:["advice","mentorship","paid","developer"]},l=void 0,d={id:"paid-mentorship-developers",title:"Paid Mentorship for Developers",description:"Paid Mentorship for Developers",source:"@site/docs/paid-mentorship-developers.mdx",sourceDirName:".",slug:"/paid-mentorship-developers",permalink:"/zettelkasten/paid-mentorship-developers",draft:!1,unlisted:!1,editUrl:"https://github.com/sibelius/zettelkasten/edit/main/docs/paid-mentorship-developers.mdx",tags:[{inline:!0,label:"advice",permalink:"/zettelkasten/tags/advice"},{inline:!0,label:"mentorship",permalink:"/zettelkasten/tags/mentorship"},{inline:!0,label:"paid",permalink:"/zettelkasten/tags/paid"},{inline:!0,label:"developer",permalink:"/zettelkasten/tags/developer"}],version:"current",lastUpdatedBy:"Sibelius Seraphini",lastUpdatedAt:172305545e4,frontMatter:{id:"paid-mentorship-developers",title:"Paid Mentorship for Developers",tags:["advice","mentorship","paid","developer"]},sidebar:"docs",previous:{title:"Paid Consulting for Startups",permalink:"/zettelkasten/paid-consulting-startups"},next:{title:"Podcasts",permalink:"/zettelkasten/podcasts"}},c={},p=[{value:"Paid Mentorship for Developers",id:"paid-mentorship-for-developers",level:2},{value:"Price",id:"price",level:2},{value:"How to pay",id:"how-to-pay",level:2}];function h(e){const t={a:"a",h2:"h2",hr:"hr",li:"li",p:"p",ul:"ul",...(0,o.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{id:"paid-mentorship-for-developers",children:"Paid Mentorship for Developers"}),"\n",(0,i.jsx)(t.p,{children:"1 sync call per month"}),"\n",(0,i.jsx)(t.p,{children:"Async chat with me everyday"}),"\n",(0,i.jsx)(t.p,{children:"Things I can help you with:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"I can help you get your first job"}),"\n",(0,i.jsx)(t.li,{children:"I can help you get a better job"}),"\n",(0,i.jsx)(t.li,{children:"I can help you get to a more Senior Level"}),"\n",(0,i.jsx)(t.li,{children:"I can help you transition from IC to management"}),"\n",(0,i.jsx)(t.li,{children:"I can help you manage your team"}),"\n",(0,i.jsx)(t.li,{children:"I can help you manage your product"}),"\n",(0,i.jsx)(t.li,{children:"I can help you fix technical debt, improve your archicture and data modeling skills"}),"\n"]}),"\n",(0,i.jsx)(t.h2,{id:"price",children:"Price"}),"\n",(0,i.jsx)(t.p,{children:"US$ 120 per month"}),"\n",(0,i.jsx)(t.h2,{id:"how-to-pay",children:"How to pay"}),"\n",(0,i.jsx)(t.p,{children:"Pix"}),"\n",(0,i.jsx)(r.r,{value:"00020126720014BR.GOV.BCB.PIX0136c78052c6-43e5-4732-a9ef-90fd615ed6380210mentorship5204000053039865802BR5918Sibelius Seraphini6009SAO PAULO61080540900062240520672Ib1DOdDFVQn65hoid6304AA21"}),"\n",(0,i.jsx)(s.m,{value:"00020126720014BR.GOV.BCB.PIX0136c78052c6-43e5-4732-a9ef-90fd615ed6380210mentorship5204000053039865802BR5918Sibelius Seraphini6009SAO PAULO61080540900062240520672Ib1DOdDFVQn65hoid6304AA21"}),"\n",(0,i.jsx)(t.hr,{}),"\n",(0,i.jsxs)(t.p,{children:["Paypal: ",(0,i.jsx)(t.a,{href:"mailto:sibeliusseraphini@gmail.com",children:"sibeliusseraphini@gmail.com"})]}),"\n",(0,i.jsxs)(t.p,{children:["Patreon: ",(0,i.jsx)(t.a,{href:"https://www.patreon.com/sibelius",children:"https://www.patreon.com/sibelius"})]}),"\n",(0,i.jsxs)(t.p,{children:["Github Sponsors: ",(0,i.jsx)(t.a,{href:"https://github.com/sponsors/sibelius",children:"https://github.com/sponsors/sibelius"})]})]})}function u(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}},1677:(e,t,n)=>{n.d(t,{m:()=>d});var i=n(6540),o=n(381),r=n(1591);const s=e=>{const t=document.createTextNode(e);document.body.appendChild(t);const n=document.createRange();n.selectNodeContents(t),window.getSelection().removeAllRanges(),window.getSelection().addRange(n);try{const n=document.execCommand("copy");return window.getSelection().removeAllRanges(),t.remove(),n&&console.log("createTextNode: ",e),n}catch(i){return console.log("createTextNode: ",i),!1}},a=e=>{const t=document.createElement("textarea");t.value=e,document.body.appendChild(t),t.focus(),t.select();try{const n=document.execCommand("copy");return document.body.removeChild(t),n&&console.log("textArea: ",e),n}catch(n){return console.log("createTextArea: ",n),!1}};var l=n(4848);const d=e=>{let{value:t}=e;const[n,d]=(0,i.useState)(!1),c=(0,r.YQ)((()=>{d(!1)}),1e3);return(0,l.jsx)("button",{onClick:async()=>{d(!0),await(async e=>{try{if(navigator.clipboard){if(navigator.permissions)try{const e={name:"clipboard-write"},t=await navigator.permissions.query(e);console.log("cliboard-write: ",t.state),t.onchange=()=>{console.log("clipboard-write changed: ",t.state)}}catch(n){console.log("error permissions: ",n)}return await navigator.clipboard.writeText(e),console.log("navigator.clipboard.writeText: ",e),!0}}catch(n){console.log("Failed to copy!",n)}const t=s(e);if(console.log("textNode: ",t),!t){const n=a(e);return console.log("textArea: ",t),n}return t})(t),c()},children:n?(0,l.jsx)(o.EY,{as:"span",sx:{textTransform:"uppercase"},children:"Copied"}):(0,l.jsx)(o.EY,{as:"span",sx:{textTransform:"uppercase"},children:"Copy QR Code"})})}},2864:(e,t,n)=>{n.d(t,{r:()=>l});var i=n(7290),o=n(2187),r=n(381),s=(n(6540),n(4848));const a=(0,o.Ay)(r.so)`
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
`,l=e=>{let{value:t}=e;return(0,s.jsx)(a,{children:(0,s.jsx)(i.Ay,{renderAs:"svg",value:t,includeMargin:!0})})}}}]);