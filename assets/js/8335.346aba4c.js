"use strict";(self.webpackChunkdev_docs=self.webpackChunkdev_docs||[]).push([["8335"],{4020:function(t){var e="%[a-f0-9]{2}",n=RegExp("("+e+")|([^%]+?)","gi"),r=RegExp("("+e+")+","gi");t.exports=function(t){if("string"!=typeof t)throw TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof t+"`");try{return t=t.replace(/\+/g," "),decodeURIComponent(t)}catch(e){return function(t){for(var e={"%FE%FF":"\uFFFD\uFFFD","%FF%FE":"\uFFFD\uFFFD"},o=r.exec(t);o;){try{e[o[0]]=decodeURIComponent(o[0])}catch(t){var i=function(t){try{return decodeURIComponent(t)}catch(o){for(var e=t.match(n)||[],r=1;r<e.length;r++)e=(t=(function t(e,n){try{return[decodeURIComponent(e.join(""))]}catch(t){}if(1===e.length)return e;n=n||1;var r=e.slice(0,n),o=e.slice(n);return Array.prototype.concat.call([],t(r),t(o))})(e,r).join("")).match(n)||[];return t}}(o[0]);i!==o[0]&&(e[o[0]]=i)}o=r.exec(t)}e["%C2"]="\uFFFD";for(var c=Object.keys(e),a=0;a<c.length;a++){var u=c[a];t=t.replace(RegExp(u,"g"),e[u])}return t}(t)}}},7418:function(t){var e=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable;t.exports=!function(){try{if(!Object.assign)return!1;var t=new String("abc");if(t[5]="de","5"===Object.getOwnPropertyNames(t)[0])return!1;for(var e={},n=0;n<10;n++)e["_"+String.fromCharCode(n)]=n;var r=Object.getOwnPropertyNames(e).map(function(t){return e[t]});if("0123456789"!==r.join(""))return!1;var o={};if("abcdefghijklmnopqrst".split("").forEach(function(t){o[t]=t}),"abcdefghijklmnopqrst"!==Object.keys(Object.assign({},o)).join(""))return!1;return!0}catch(t){return!1}}()?function(t,o){for(var i,c,a=function(t){if(null==t)throw TypeError("Object.assign cannot be called with null or undefined");return Object(t)}(t),u=1;u<arguments.length;u++){for(var s in i=Object(arguments[u]),i)n.call(i,s)&&(a[s]=i[s]);if(e){c=e(i);for(var p=0;p<c.length;p++)r.call(i,c[p])&&(a[c[p]]=i[c[p]])}}return a}:Object.assign},7563:function(t,e,n){var r=n(610),o=n(7418),i=n(4020);function c(t,e){return e.encode?e.strict?r(t):encodeURIComponent(t):t}e.stringify=function(t,e){!1===(e=o({encode:!0,strict:!0,arrayFormat:"none"},e)).sort&&(e.sort=function(){});var n=function(t){switch(t.arrayFormat){case"index":return function(e,n,r){return null===n?[c(e,t),"[",r,"]"].join(""):[c(e,t),"[",c(r,t),"]=",c(n,t)].join("")};case"bracket":return function(e,n){return null===n?c(e,t):[c(e,t),"[]=",c(n,t)].join("")};default:return function(e,n){return null===n?c(e,t):[c(e,t),"=",c(n,t)].join("")}}}(e);return t?Object.keys(t).sort(e.sort).map(function(r){var o=t[r];if(void 0===o)return"";if(null===o)return c(r,e);if(Array.isArray(o)){var i=[];return o.slice().forEach(function(t){if(void 0!==t)i.push(n(r,t,i.length))}),i.join("&")}return c(r,e)+"="+c(o,e)}).filter(function(t){return t.length>0}).join("&"):""}},7129:function(t,e,n){n.r(e),n.d(e,{default:()=>p});var r,o=n("7294"),i=n("7563");var c=(r=function(t,e){return(r=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),a=function(){return(a=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n],e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)},u=function(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&0>e.indexOf(r)&&(n[r]=t[r]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols)for(var o=0,r=Object.getOwnPropertySymbols(t);o<r.length;o++)0>e.indexOf(r[o])&&(n[r[o]]=t[r[o]]);return n},s=function(t){function e(e){var n=t.call(this,e)||this;return n.request=null,n.cancel=function(){n.request&&n.request.cancel()},n.handleFetchSuccess=function(t){n.props.onSuccess&&n.props.onSuccess(t),n.setState({html:t.html},function(){window.instgrm.Embeds.process(),n.props.onAfterRender&&n.props.onAfterRender()})},n.handleFetchFailure=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];clearTimeout(n.timer),n.props.onFailure&&n.props.onFailure(t)},n.createRequestPromise=function(t){var e={};return e.promise=new Promise(function(n,r){var o=fetch(t).then(function(t){return t.json()}).then(function(t){return n(t)}).catch(function(t){return r(t)});return e.cancel=function(){return r(Error("Cancelled"))},o}),e},n.state={html:null},n}return c(e,t),e.prototype.componentDidMount=function(){var t=this;window.instgrm?this.fetchEmbed(this.getQueryParams(this.props)):(this.props.injectScript&&!document.getElementById("react-instagram-embed-script")&&this.injectScript(),this.checkAPI().then(function(){t.fetchEmbed(t.getQueryParams(t.props))}))},e.prototype.componentDidUpdate=function(t){var e=this.props,n=e.url,r=e.hideCaption,o=e.maxWidth,i=e.containerTagName;(t.url!==n||t.hideCaption!==r||t.maxWidth!==o||t.containerTagName!==i)&&(this.request.cancel(),this.fetchEmbed(this.getQueryParams(this.props)))},e.prototype.componentWillUnmount=function(){this.cancel()},e.prototype.render=function(){var t=this.props.containerTagName;return o.createElement(t,a({},this.omitComponentProps(),{dangerouslySetInnerHTML:{__html:this.state.html||""}}))},e.prototype.fetchEmbed=function(t){this.request=this.createRequestPromise("https://api.instagram.com/oembed/?"+t),this.props.onLoading&&this.props.onLoading(),this.request.promise.then(this.handleFetchSuccess).catch(this.handleFetchFailure)},e.prototype.omitComponentProps=function(){var t=this.props;return t.url,t.hideCaption,t.maxWidth,t.containerTagName,t.onLoading,t.onSuccess,t.onAfterRender,t.onFailure,t.protocol,t.injectScript,u(t,["url","hideCaption","maxWidth","containerTagName","onLoading","onSuccess","onAfterRender","onFailure","protocol","injectScript"])},e.prototype.injectScript=function(){var t=0===window.location.protocol.indexOf("file")?this.props.protocol:"",e=document.createElement("script");e.async=e.defer=!0,e.src=t+"//platform.instagram.com/en_US/embeds.js",e.id="react-instagram-embed-script";var n=document.body;n&&n.appendChild(e)},e.prototype.checkAPI=function(){var t=this;return new Promise(function(e){!function t(n){n.timer=window.setTimeout(function(){window.instgrm?(clearTimeout(n.timer),e()):t(n)},20)}(t)})},e.prototype.getQueryParams=function(t){var e=t.url,n=t.hideCaption,r=t.maxWidth;return i.stringify({url:e,hidecaption:n,maxwidth:"number"==typeof r&&r>=320?r:void 0,omitscript:!0})},e.defaultProps={hideCaption:!1,containerTagName:"div",protocol:"https:",injectScript:!0},e}(o.PureComponent);let p=function(t){var e=t.url,n=t.renderWrap;return n(o.createElement(s,{url:e,maxWidth:320,hideCaption:!1,containerTagName:"div",protocol:"",injectScript:!0,onLoading:function(){},onSuccess:function(){},onAfterRender:function(){},onFailure:function(){}}))}},610:function(t){t.exports=function(t){return encodeURIComponent(t).replace(/[!'()*]/g,function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()})}}}]);