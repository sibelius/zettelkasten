"use strict";(self.webpackChunkdev_docs=self.webpackChunkdev_docs||[]).push([[7918],{798:(e,t,r)=>{r.d(t,{Z:()=>U});var a=r(7294),s=r(6010),o=r(3702),d=r(1871),n=r(2142),c=r(4850),l=r(4597);const i="lastUpdated_VsjB",m={},u=e=>{const t=document.querySelector(`script[src="${e}"]`);if(t)return m[e]={loading:!1,error:null,scriptEl:t}},p="undefined"!=typeof window&&void 0!==window.document,E=()=>{const[e,t]=(e=>{let{src:t,checkForExisting:r=!0,...s}=e,o=t?m[t]:void 0;!o&&r&&t&&p&&(o=u(t));const[d,n]=(0,a.useState)(o?o.loading:Boolean(t)),[c,l]=(0,a.useState)(o?o.error:null);return(0,a.useEffect)((()=>{if(!p||!t||!d||c)return;let e;o=m[t],!o&&r&&(o=u(t)),o?e=o.scriptEl:(e=document.createElement("script"),e.src=t,Object.keys(s).forEach((t=>{void 0===e[t]?e.setAttribute(t,s[t]):e[t]=s[t]})),o=m[t]={loading:!0,error:null,scriptEl:e});const a=()=>{o&&(o.loading=!1),n(!1)},i=e=>{o&&(o.error=e),l(e)};return e.addEventListener("load",a),e.addEventListener("error",i),document.body.appendChild(e),()=>{e.removeEventListener("load",a),e.removeEventListener("error",i)}}),[t]),[d,c]})({src:"https://utteranc.es/client.js",checkForExisting:!1,repo:"sibelius/zettelkasten","issue-term":"pathname",label:"discussion",theme:"preferred-color-scheme",crossOrigin:"anonymous",async:!0});(0,a.useEffect)((()=>{t&&console.log("utteranc.es not loaded")}),[t])};function f(e){return a.createElement("div",{className:(0,s.Z)(o.k.docs.docFooterTagsRow,"row margin-bottom--sm")},a.createElement("div",{className:"col"},a.createElement(l.Z,e)))}function v(e){let{editUrl:t,lastUpdatedAt:r,lastUpdatedBy:d,formattedLastUpdatedAt:l}=e;return a.createElement("div",{className:(0,s.Z)(o.k.docs.docFooterEditMetaRow,"row")},a.createElement("div",{className:"col"},t&&a.createElement(c.Z,{editUrl:t})),a.createElement("div",{className:(0,s.Z)("col",i)},(r||d)&&a.createElement(n.Z,{lastUpdatedAt:r,formattedLastUpdatedAt:l,lastUpdatedBy:d})))}function U(){const{metadata:e}=(0,d.k)(),{editUrl:t,lastUpdatedAt:r,formattedLastUpdatedAt:n,lastUpdatedBy:c,tags:l}=e,i=l.length>0,m=!!(t||r||c);return i||m?(E(),a.createElement("footer",{className:(0,s.Z)(o.k.docs.docFooter,"docusaurus-mt-lg")},i&&a.createElement(f,{tags:l}),m&&a.createElement(v,{editUrl:t,lastUpdatedAt:r,lastUpdatedBy:c,formattedLastUpdatedAt:n}))):null}}}]);