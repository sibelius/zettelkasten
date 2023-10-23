"use strict";(self.webpackChunkdev_docs=self.webpackChunkdev_docs||[]).push([[1065],{4137:(t,e,n)=>{n.d(e,{Zo:()=>p,kt:()=>f});var r=n(7294);function o(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function a(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?a(Object(n),!0).forEach((function(e){o(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function i(t,e){if(null==t)return{};var n,r,o=function(t,e){if(null==t)return{};var n,r,o={},a=Object.keys(t);for(r=0;r<a.length;r++)n=a[r],e.indexOf(n)>=0||(o[n]=t[n]);return o}(t,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);for(r=0;r<a.length;r++)n=a[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(o[n]=t[n])}return o}var l=r.createContext({}),c=function(t){var e=r.useContext(l),n=e;return t&&(n="function"==typeof t?t(e):s(s({},e),t)),n},p=function(t){var e=c(t.components);return r.createElement(l.Provider,{value:e},t.children)},u={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},d=r.forwardRef((function(t,e){var n=t.components,o=t.mdxType,a=t.originalType,l=t.parentName,p=i(t,["components","mdxType","originalType","parentName"]),d=c(n),f=o,m=d["".concat(l,".").concat(f)]||d[f]||u[f]||a;return n?r.createElement(m,s(s({ref:e},p),{},{components:n})):r.createElement(m,s({ref:e},p))}));function f(t,e){var n=arguments,o=e&&e.mdxType;if("string"==typeof t||o){var a=n.length,s=new Array(a);s[0]=d;var i={};for(var l in e)hasOwnProperty.call(e,l)&&(i[l]=e[l]);i.originalType=t,i.mdxType="string"==typeof t?t:o,s[1]=i;for(var c=2;c<a;c++)s[c]=n[c];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},4921:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>l,contentTitle:()=>s,default:()=>u,frontMatter:()=>a,metadata:()=>i,toc:()=>c});var r=n(7462),o=(n(7294),n(4137));n(8209);const a={id:"testing-concept-fronted",title:"Testing Concept Frontend",tags:["testing","concept","frontend"]},s=void 0,i={unversionedId:"testing-concept-fronted",id:"testing-concept-fronted",title:"Testing Concept Frontend",description:"You first need to undestand the concept of frontend tests.",source:"@site/docs/testing-concept-frontend.md",sourceDirName:".",slug:"/testing-concept-fronted",permalink:"/zettelkasten/testing-concept-fronted",draft:!1,editUrl:"https://github.com/sibelius/zettelkasten/edit/main/docs/testing-concept-frontend.md",tags:[{label:"testing",permalink:"/zettelkasten/tags/testing"},{label:"concept",permalink:"/zettelkasten/tags/concept"},{label:"frontend",permalink:"/zettelkasten/tags/frontend"}],version:"current",lastUpdatedBy:"dependabot[bot]",lastUpdatedAt:1698066332,formattedLastUpdatedAt:"Oct 23, 2023",frontMatter:{id:"testing-concept-fronted",title:"Testing Concept Frontend",tags:["testing","concept","frontend"]},sidebar:"docs",previous:{title:"Talks",permalink:"/zettelkasten/talks"},next:{title:"updates",permalink:"/zettelkasten/category/updates"}},l={},c=[],p={toc:c};function u(t){let{components:e,...n}=t;return(0,o.kt)("wrapper",(0,r.Z)({},p,n,{components:e,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"You first need to undestand the concept of frontend tests."),(0,o.kt)("p",null,"You should not test the implementation but the behavior"),(0,o.kt)("p",null,"You test like the end user"),(0,o.kt)("p",null,"For instance, imagine a login screen with email and password inputs and a submit button"),(0,o.kt)("p",null,"The test should input the email and the password, then click in the submit button."),(0,o.kt)("p",null,"You should assert the API was called with the inputted data."),(0,o.kt)("p",null,"When using testing library you test against DOM"),(0,o.kt)("p",null,"code:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"const emailInput = getByTestId(emailTestId);\nfireEvent.onChange(emailInput, { target: { value: 'email@email.com.br' }})\n\nconst passwordInput = getByTestId(passwordTestId);\nfireEvent.onChange(passwordInput, { target: { value: 'pwd' }})\n\nconst submitButton = getByText('Login').closest('button');\nfireEvent.click(submitButton);\n\n// assert api was called properly\n")))}u.isMDXComponent=!0},8209:(t,e,n)=>{n(7294)}}]);