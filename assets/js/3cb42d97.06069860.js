"use strict";(self.webpackChunkdev_docs=self.webpackChunkdev_docs||[]).push([[1670],{4118:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>r,default:()=>c,frontMatter:()=>i,metadata:()=>a,toc:()=>l});var o=n(5893),s=n(1151);const i={id:"frontend-hiring-questions",title:"frontend hiring questions",tags:["advice","mentorship","questions","async"]},r=void 0,a={id:"mentorship/frontend-hiring-questions",title:"frontend hiring questions",description:"frontend questions",source:"@site/docs/mentorship/frontend-hiring-questions.md",sourceDirName:"mentorship",slug:"/mentorship/frontend-hiring-questions",permalink:"/zettelkasten/mentorship/frontend-hiring-questions",draft:!1,unlisted:!1,editUrl:"https://github.com/sibelius/zettelkasten/edit/main/docs/mentorship/frontend-hiring-questions.md",tags:[{label:"advice",permalink:"/zettelkasten/tags/advice"},{label:"mentorship",permalink:"/zettelkasten/tags/mentorship"},{label:"questions",permalink:"/zettelkasten/tags/questions"},{label:"async",permalink:"/zettelkasten/tags/async"}],version:"current",lastUpdatedBy:"Sibelius Seraphini",lastUpdatedAt:1710090253,formattedLastUpdatedAt:"Mar 10, 2024",frontMatter:{id:"frontend-hiring-questions",title:"frontend hiring questions",tags:["advice","mentorship","questions","async"]},sidebar:"docs",previous:{title:"focus on english",permalink:"/zettelkasten/mentorship/focus-on-english"},next:{title:"hard skill worth",permalink:"/zettelkasten/mentorship/hard-skill-worth"}},d={},l=[{value:"frontend questions",id:"frontend-questions",level:2}];function h(e){const t={h2:"h2",li:"li",p:"p",ul:"ul",...(0,s.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{id:"frontend-questions",children:"frontend questions"}),"\n",(0,o.jsx)(t.p,{children:'"Good backend hiring question?"'}),"\n",(0,o.jsxs)(t.ul,{children:["\n",(0,o.jsx)(t.li,{children:"how to scale frontend? a good answer is to use a design system"}),"\n",(0,o.jsx)(t.li,{children:"how to scale css? use design system"}),"\n",(0,o.jsx)(t.li,{children:"What do you test on the frontend? integration test, test the behavior, using testing library, test that when filling out a form and clicking the submit button, the api is called with the correct data"}),"\n",(0,o.jsx)(t.li,{children:"how do you create a new page? does it start with a component and then break it down (top down), or does it start with base components and then compose them? a good answer would be to use top-down, because segmenting (componentizing) is very difficult if you don't know how it will be structured, another good answer is to use only the components that already exist in the design system"}),"\n",(0,o.jsx)(t.li,{children:"if a component doesn't exist in the design system for a page you need to do what do you do? A good answer would be to discuss with the designer whether to use an existing component or add the new component to the design system."}),"\n",(0,o.jsx)(t.li,{children:"what is the tradeoff of adding a new component to a design system? the more components, the more complexity and work to maintain, the fewer simpler components"}),"\n",(0,o.jsx)(t.li,{children:"how to organize a design system? A good answer is to have documentation, using docusuarus and/or storybook"}),"\n",(0,o.jsx)(t.li,{children:"how do you deal with data fetching? The best answer would be relay, but it only works if you have graphql, another answer would be something more level and declarative like react-query, data fetching by hand is always an error"}),"\n",(0,o.jsx)(t.li,{children:'create a new component or a new prop? prefer a prop if the "new behavior" converges with the existing component, otherwise create a new component'}),"\n",(0,o.jsx)(t.li,{children:"how to start a new design system? decide the initial basic components, typography, scaping, buttons"}),"\n",(0,o.jsx)(t.li,{children:"what is important is a design system? consistency, maintainability, scalability, typography, basic components, storybook, documentation"}),"\n",(0,o.jsx)(t.li,{children:"when to use SSR? when you need perf and SEO, SSR is to render the frontend in the server and hydrate"}),"\n",(0,o.jsx)(t.li,{children:"what is hydration? it is the process of conciliating the server rendered html with the client rendered html"}),"\n",(0,o.jsx)(t.li,{children:"how to improve SEO? use SSR, use meta tags, use structured data, use sitemap, use robots.txt, make site fast"}),"\n",(0,o.jsx)(t.li,{children:"how to improve frontend performance? lazy loading, RSC, SSR, tree shaking, remove big packages"}),"\n",(0,o.jsx)(t.li,{children:"when to virtualize a list? when we are handling big number of items"}),"\n",(0,o.jsx)(t.li,{children:"when to memo a component? when you need to render a lot of number of this components"}),"\n",(0,o.jsx)(t.li,{children:"how to manage state? prefer local state using useState, only when needed use useContext, move data fetching to something else like relay, react-query"}),"\n",(0,o.jsx)(t.li,{children:"how to build complex forms with validations ? prefer use packages like formik and yup"}),"\n",(0,o.jsx)(t.li,{children:"how to deploy frontend ? you can deploy on s3 and expose then using nginx, cloudfront or cloudflare pages, any CDN works."}),"\n"]})]})}function c(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(h,{...e})}):h(e)}},1151:(e,t,n)=>{n.d(t,{a:()=>r});var o=n(7294);const s={},i=o.createContext(s);function r(e){const t=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}}}]);