"use strict";(self.webpackChunkzettelkasten=self.webpackChunkzettelkasten||[]).push([["4091"],{86273:function(t,e,n){n.r(e),n.d(e,{default:()=>p,frontMatter:()=>r,metadata:()=>s,assets:()=>c,toc:()=>l,contentTitle:()=>a});var s=JSON.parse('{"id":"testing-concept-fronted","title":"Testing Concept Frontend","description":"You first need to undestand the concept of frontend tests.","source":"@site/docs/testing-concept-frontend.md","sourceDirName":".","slug":"/testing-concept-fronted","permalink":"/zettelkasten/testing-concept-fronted","draft":false,"unlisted":false,"editUrl":"https://github.com/sibelius/zettelkasten/edit/main/docs/testing-concept-frontend.md","tags":[{"inline":true,"label":"testing","permalink":"/zettelkasten/tags/testing"},{"inline":true,"label":"concept","permalink":"/zettelkasten/tags/concept"},{"inline":true,"label":"frontend","permalink":"/zettelkasten/tags/frontend"}],"version":"current","lastUpdatedBy":"Sibelius Seraphini","lastUpdatedAt":1744578963000,"frontMatter":{"id":"testing-concept-fronted","title":"Testing Concept Frontend","tags":["testing","concept","frontend"]},"sidebar":"docs","previous":{"title":"Talks","permalink":"/zettelkasten/talks"},"next":{"title":"updates","permalink":"/zettelkasten/category/updates"}}'),i=n("85893"),o=n("50065");let r={id:"testing-concept-fronted",title:"Testing Concept Frontend",tags:["testing","concept","frontend"]},a=void 0,c={},l=[];function d(t){let e={code:"code",p:"p",pre:"pre",...(0,o.a)(),...t.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.p,{children:"You first need to undestand the concept of frontend tests."}),"\n",(0,i.jsx)(e.p,{children:"You should not test the implementation but the behavior"}),"\n",(0,i.jsx)(e.p,{children:"You test like the end user"}),"\n",(0,i.jsx)(e.p,{children:"For instance, imagine a login screen with email and password inputs and a submit button"}),"\n",(0,i.jsx)(e.p,{children:"The test should input the email and the password, then click in the submit button."}),"\n",(0,i.jsx)(e.p,{children:"You should assert the API was called with the inputted data."}),"\n",(0,i.jsx)(e.p,{children:"When using testing library you test against DOM"}),"\n",(0,i.jsx)(e.p,{children:"code:"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-jsx",children:"const emailInput = getByTestId(emailTestId);\nfireEvent.onChange(emailInput, { target: { value: 'email@email.com.br' }})\n\nconst passwordInput = getByTestId(passwordTestId);\nfireEvent.onChange(passwordInput, { target: { value: 'pwd' }})\n\nconst submitButton = getByText('Login').closest('button');\nfireEvent.click(submitButton);\n\n// assert api was called properly\n"})})]})}function p(t={}){let{wrapper:e}={...(0,o.a)(),...t.components};return e?(0,i.jsx)(e,{...t,children:(0,i.jsx)(d,{...t})}):d(t)}},50065:function(t,e,n){n.d(e,{Z:function(){return a},a:function(){return r}});var s=n(67294);let i={},o=s.createContext(i);function r(t){let e=s.useContext(o);return s.useMemo(function(){return"function"==typeof t?t(e):{...e,...t}},[e,t])}function a(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(i):t.components||i:r(t.components),s.createElement(o.Provider,{value:e},t.children)}}}]);