"use strict";(self.webpackChunkdev_docs=self.webpackChunkdev_docs||[]).push([["4091"],{3144:function(t,e,n){n.r(e),n.d(e,{metadata:()=>s,contentTitle:()=>a,default:()=>p,assets:()=>c,toc:()=>d,frontMatter:()=>r});var s=JSON.parse('{"id":"testing-concept-fronted","title":"Testing Concept Frontend","description":"You first need to undestand the concept of frontend tests.","source":"@site/docs/testing-concept-frontend.md","sourceDirName":".","slug":"/testing-concept-fronted","permalink":"/zettelkasten/testing-concept-fronted","draft":false,"unlisted":false,"editUrl":"https://github.com/sibelius/zettelkasten/edit/main/docs/testing-concept-frontend.md","tags":[{"inline":true,"label":"testing","permalink":"/zettelkasten/tags/testing"},{"inline":true,"label":"concept","permalink":"/zettelkasten/tags/concept"},{"inline":true,"label":"frontend","permalink":"/zettelkasten/tags/frontend"}],"version":"current","lastUpdatedBy":"Sibelius Seraphini","lastUpdatedAt":1730722839000,"frontMatter":{"id":"testing-concept-fronted","title":"Testing Concept Frontend","tags":["testing","concept","frontend"]},"sidebar":"docs","previous":{"title":"Talks","permalink":"/zettelkasten/talks"},"next":{"title":"updates","permalink":"/zettelkasten/category/updates"}}'),o=n("5893"),i=n("65");let r={id:"testing-concept-fronted",title:"Testing Concept Frontend",tags:["testing","concept","frontend"]},a=void 0,c={},d=[];function l(t){let e={code:"code",p:"p",pre:"pre",...(0,i.a)(),...t.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(e.p,{children:"You first need to undestand the concept of frontend tests."}),"\n",(0,o.jsx)(e.p,{children:"You should not test the implementation but the behavior"}),"\n",(0,o.jsx)(e.p,{children:"You test like the end user"}),"\n",(0,o.jsx)(e.p,{children:"For instance, imagine a login screen with email and password inputs and a submit button"}),"\n",(0,o.jsx)(e.p,{children:"The test should input the email and the password, then click in the submit button."}),"\n",(0,o.jsx)(e.p,{children:"You should assert the API was called with the inputted data."}),"\n",(0,o.jsx)(e.p,{children:"When using testing library you test against DOM"}),"\n",(0,o.jsx)(e.p,{children:"code:"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-jsx",children:"const emailInput = getByTestId(emailTestId);\nfireEvent.onChange(emailInput, { target: { value: 'email@email.com.br' }})\n\nconst passwordInput = getByTestId(passwordTestId);\nfireEvent.onChange(passwordInput, { target: { value: 'pwd' }})\n\nconst submitButton = getByText('Login').closest('button');\nfireEvent.click(submitButton);\n\n// assert api was called properly\n"})})]})}function p(t={}){let{wrapper:e}={...(0,i.a)(),...t.components};return e?(0,o.jsx)(e,{...t,children:(0,o.jsx)(l,{...t})}):l(t)}},65:function(t,e,n){n.d(e,{Z:function(){return a},a:function(){return r}});var s=n(7294);let o={},i=s.createContext(o);function r(t){let e=s.useContext(i);return s.useMemo(function(){return"function"==typeof t?t(e):{...e,...t}},[e,t])}function a(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(o):t.components||o:r(t.components),s.createElement(i.Provider,{value:e},t.children)}}}]);