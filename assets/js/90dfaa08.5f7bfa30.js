"use strict";(self.webpackChunkdev_docs=self.webpackChunkdev_docs||[]).push([["6389"],{1069:function(e,t,n){n.r(t),n.d(t,{metadata:()=>i,contentTitle:()=>d,default:()=>h,assets:()=>c,toc:()=>p,frontMatter:()=>l});var i=JSON.parse('{"id":"paid-consulting-startups","title":"Paid Consulting for Startups","description":"Paid Consulting for Startups","source":"@site/docs/paid-consulting-startups.mdx","sourceDirName":".","slug":"/paid-consulting-startups","permalink":"/zettelkasten/paid-consulting-startups","draft":false,"unlisted":false,"editUrl":"https://github.com/sibelius/zettelkasten/edit/main/docs/paid-consulting-startups.mdx","tags":[{"inline":true,"label":"consulting","permalink":"/zettelkasten/tags/consulting"},{"inline":true,"label":"paid","permalink":"/zettelkasten/tags/paid"},{"inline":true,"label":"startup","permalink":"/zettelkasten/tags/startup"}],"version":"current","lastUpdatedBy":"Sibelius Seraphini","lastUpdatedAt":1730722839000,"frontMatter":{"id":"paid-consulting-startups","title":"Paid Consulting for Startups","tags":["consulting","paid","startup"]},"sidebar":"docs","previous":{"title":"Mentorship Questions","permalink":"/zettelkasten/mentorship-questions"},"next":{"title":"Paid Mentorship for Developers","permalink":"/zettelkasten/paid-mentorship-developers"}}'),s=n("5893"),r=n("65"),o=n("9594"),a=n("5575");let l={id:"paid-consulting-startups",title:"Paid Consulting for Startups",tags:["consulting","paid","startup"]},d=void 0,c={},p=[{value:"Paid Consulting for Startups",id:"paid-consulting-for-startups",level:2},{value:"Price",id:"price",level:2},{value:"How to pay",id:"how-to-pay",level:2}];function u(e){let t={a:"a",h2:"h2",hr:"hr",li:"li",p:"p",ul:"ul",...(0,r.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{id:"paid-consulting-for-startups",children:"Paid Consulting for Startups"}),"\n",(0,s.jsx)(t.p,{children:"1 sync call per month"}),"\n",(0,s.jsx)(t.p,{children:"Async chat with me everyday"}),"\n",(0,s.jsx)(t.p,{children:"Things I can help you with:"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"Structure your development team processes: daily, product management, code review, automation, ci/cd"}),"\n",(0,s.jsx)(t.li,{children:"Validate your team, idea, product and market"}),"\n",(0,s.jsx)(t.li,{children:"Reduce scope for your Minimal Viable Product (MVP, and define the MVP, what to focus on, and how to validate it"}),"\n",(0,s.jsx)(t.li,{children:"Make you reach Product Market Fit (PMF), using cohort to identify problems in your onboarding and product"}),"\n",(0,s.jsx)(t.li,{children:"Scale your process and team"}),"\n"]}),"\n",(0,s.jsx)(t.h2,{id:"price",children:"Price"}),"\n",(0,s.jsx)(t.p,{children:"US$ 120 per month"}),"\n",(0,s.jsx)(t.h2,{id:"how-to-pay",children:"How to pay"}),"\n",(0,s.jsx)(t.p,{children:"Pix"}),"\n",(0,s.jsx)(o.s,{value:"00020126720014BR.GOV.BCB.PIX0136c78052c6-43e5-4732-a9ef-90fd615ed6380210mentorship5204000053039865802BR5918Sibelius Seraphini6009SAO PAULO61080540900062240520672Ib1DOdDFVQn65hoid6304AA21"}),"\n",(0,s.jsx)(a.G,{value:"00020126720014BR.GOV.BCB.PIX0136c78052c6-43e5-4732-a9ef-90fd615ed6380210mentorship5204000053039865802BR5918Sibelius Seraphini6009SAO PAULO61080540900062240520672Ib1DOdDFVQn65hoid6304AA21"}),"\n",(0,s.jsx)(t.hr,{}),"\n",(0,s.jsxs)(t.p,{children:["Paypal: ",(0,s.jsx)(t.a,{href:"mailto:sibeliusseraphini@gmail.com",children:"sibeliusseraphini@gmail.com"})]}),"\n",(0,s.jsxs)(t.p,{children:["Patreon: ",(0,s.jsx)(t.a,{href:"https://www.patreon.com/sibelius",children:"https://www.patreon.com/sibelius"})]}),"\n",(0,s.jsxs)(t.p,{children:["Github Sponsors: ",(0,s.jsx)(t.a,{href:"https://github.com/sponsors/sibelius",children:"https://github.com/sponsors/sibelius"})]})]})}function h(e={}){let{wrapper:t}={...(0,r.a)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(u,{...e})}):u(e)}},5575:function(e,t,n){n.d(t,{G:()=>c});var i=n("5893"),s=n("7294"),r=n("1237"),o=n("4697");let a=async e=>{try{if(navigator.clipboard){if(navigator.permissions)try{let e=await navigator.permissions.query({name:"clipboard-write"});console.log("cliboard-write: ",e.state),e.onchange=()=>{console.log("clipboard-write changed: ",e.state)}}catch(e){console.log("error permissions: ",e)}return await navigator.clipboard.writeText(e),console.log("navigator.clipboard.writeText: ",e),!0}}catch(e){console.log("Failed to copy!",e)}let t=l(e);if(console.log("textNode: ",t),!t){let n=d(e);return console.log("textArea: ",t),n}return t},l=e=>{let t=document.createTextNode(e);document.body.appendChild(t);let n=document.createRange();n.selectNodeContents(t),window.getSelection().removeAllRanges(),window.getSelection().addRange(n);try{let n=document.execCommand("copy");return window.getSelection().removeAllRanges(),t.remove(),n&&console.log("createTextNode: ",e),n}catch(e){return console.log("createTextNode: ",e),!1}},d=e=>{let t=document.createElement("textarea");t.value=e,document.body.appendChild(t),t.focus(),t.select();try{let n=document.execCommand("copy");return document.body.removeChild(t),n&&console.log("textArea: ",e),n}catch(e){return console.log("createTextArea: ",e),!1}},c=e=>{let{value:t}=e,[n,l]=(0,s.useState)(!1),d=(0,o.y1)(()=>{l(!1)},1e3),c=async()=>{l(!0),await a(t),d()};return(0,i.jsx)("button",{onClick:c,children:n?(0,i.jsx)(r.xv,{as:"span",sx:{textTransform:"uppercase"},children:"Copied"}):(0,i.jsx)(r.xv,{as:"span",sx:{textTransform:"uppercase"},children:"Copy QR Code"})})}},9594:function(e,t,n){n.d(t,{s:function(){return l}});var i=n(5893),s=n(4507),r=n(1220),o=n(1237);n(7294);let a=(0,r.ZP)(o.kC)`
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
`,l=e=>{let{value:t}=e;return(0,i.jsx)(a,{children:(0,i.jsx)(s.t,{value:t,marginSize:4})})}}}]);