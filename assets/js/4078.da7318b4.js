(self.webpackChunkzettelkasten=self.webpackChunkzettelkasten||[]).push([["4078"],{64063:function(e){"use strict";e.exports=function e(t,n){if(t===n)return!0;if(t&&n&&"object"==typeof t&&"object"==typeof n){if(t.constructor!==n.constructor)return!1;if(Array.isArray(t)){if((r=t.length)!=n.length)return!1;for(o=r;0!=o--;)if(!e(t[o],n[o]))return!1;return!0}if(t.constructor===RegExp)return t.source===n.source&&t.flags===n.flags;if(t.valueOf!==Object.prototype.valueOf)return t.valueOf()===n.valueOf();if(t.toString!==Object.prototype.toString)return t.toString()===n.toString();if((r=(a=Object.keys(t)).length)!==Object.keys(n).length)return!1;for(o=r;0!=o--;)if(!Object.prototype.hasOwnProperty.call(n,a[o]))return!1;for(o=r;0!=o--;){var r,o,a,i=a[o];if(!e(t[i],n[i]))return!1}return!0}return t!=t&&n!=n}},49090:function(e){function t(e,t){e.onload=function(){this.onerror=this.onload=null,t(null,e)},e.onerror=function(){this.onerror=this.onload=null,t(Error("Failed to load "+this.src),e)}}e.exports=function(e,n,r){var o=document.head||document.getElementsByTagName("head")[0],a=document.createElement("script");"function"==typeof n&&(r=n,n={}),n=n||{},r=r||function(){},a.type=n.type||"text/javascript",a.charset=n.charset||"utf8",a.async=!("async"in n)||!!n.async,a.src=e,n.attrs&&function(e,t){for(var n in t)e.setAttribute(n,t[n])}(a,n.attrs),n.text&&(a.text=""+n.text),("onload"in a?t:function(e,t){e.onreadystatechange=function(){("complete"==this.readyState||"loaded"==this.readyState)&&(this.onreadystatechange=null,t(null,e))}})(a,r),a.onload||t(a,r),o.appendChild(a)}},74909:function(e,t,n){"use strict";n.r(t),n.d(t,{default:()=>E});var r=n("67294"),o=n("76853"),a=n.n(o),i=n("64063"),s=n.n(i),u=n("11062"),c=n.n(u);function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function f(e,t){return(f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function p(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function d(e){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function h(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?y(Object(n),!0).forEach(function(t){g(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):y(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function g(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function m(e){return h(h({},e),{},{height:0,width:0,playerVars:h(h({},e.playerVars),{},{autoplay:0,start:0,end:0})})}var v=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(a,e);var t,n,o=(t=function(){if("undefined"==typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}(),function(){var e,n,r,o=d(a);return r=t?Reflect.construct(o,arguments,d(this).constructor):o.apply(this,arguments),e=this,(n=r)&&("object"===l(n)||"function"==typeof n)?n:p(e)});function a(e){var t;return!function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}(this,a),g(p(t=o.call(this,e)),"onPlayerReady",function(e){return t.props.onReady(e)}),g(p(t),"onPlayerError",function(e){return t.props.onError(e)}),g(p(t),"onPlayerStateChange",function(e){switch(t.props.onStateChange(e),e.data){case a.PlayerState.ENDED:t.props.onEnd(e);break;case a.PlayerState.PLAYING:t.props.onPlay(e);break;case a.PlayerState.PAUSED:t.props.onPause(e)}}),g(p(t),"onPlayerPlaybackRateChange",function(e){return t.props.onPlaybackRateChange(e)}),g(p(t),"onPlayerPlaybackQualityChange",function(e){return t.props.onPlaybackQualityChange(e)}),g(p(t),"createPlayer",function(){if("undefined"!=typeof document){var e=h(h({},t.props.opts),{},{videoId:t.props.videoId});t.internalPlayer=c()(t.container,e),t.internalPlayer.on("ready",t.onPlayerReady),t.internalPlayer.on("error",t.onPlayerError),t.internalPlayer.on("stateChange",t.onPlayerStateChange),t.internalPlayer.on("playbackRateChange",t.onPlayerPlaybackRateChange),t.internalPlayer.on("playbackQualityChange",t.onPlayerPlaybackQualityChange)}}),g(p(t),"resetPlayer",function(){return t.internalPlayer.destroy().then(t.createPlayer)}),g(p(t),"updatePlayer",function(){t.internalPlayer.getIframe().then(function(e){t.props.id?e.setAttribute("id",t.props.id):e.removeAttribute("id"),t.props.className?e.setAttribute("class",t.props.className):e.removeAttribute("class"),t.props.opts&&t.props.opts.width?e.setAttribute("width",t.props.opts.width):e.removeAttribute("width"),t.props.opts&&t.props.opts.height?e.setAttribute("height",t.props.opts.height):e.removeAttribute("height"),"string"==typeof t.props.title?e.setAttribute("title",t.props.title):e.setAttribute("title","YouTube video player")})}),g(p(t),"getInternalPlayer",function(){return t.internalPlayer}),g(p(t),"updateVideo",function(){if(void 0===t.props.videoId||null===t.props.videoId){t.internalPlayer.stopVideo();return}var e=!1,n={videoId:t.props.videoId};if("playerVars"in t.props.opts&&(e=1===t.props.opts.playerVars.autoplay,"start"in t.props.opts.playerVars&&(n.startSeconds=t.props.opts.playerVars.start),"end"in t.props.opts.playerVars&&(n.endSeconds=t.props.opts.playerVars.end)),e){t.internalPlayer.loadVideoById(n);return}t.internalPlayer.cueVideoById(n)}),g(p(t),"refContainer",function(e){t.container=e}),t.container=null,t.internalPlayer=null,t}return n=[{key:"componentDidMount",value:function(){this.createPlayer()}},{key:"componentDidUpdate",value:function(e){var t,n;t=this.props,(e.id!==t.id||e.className!==t.className||e.opts.width!==t.opts.width||e.opts.height!==t.opts.height||e.title!==t.title)&&this.updatePlayer(),n=this.props,(e.videoId!==n.videoId||!s()(m(e.opts),m(n.opts)))&&this.resetPlayer(),function(e,t){if(e.videoId!==t.videoId)return!0;var n=e.opts.playerVars||{},r=t.opts.playerVars||{};return n.start!==r.start||n.end!==r.end}(e,this.props)&&this.updateVideo()}},{key:"componentWillUnmount",value:function(){this.internalPlayer.destroy()}},{key:"render",value:function(){return r.createElement("div",{className:this.props.containerClassName},r.createElement("div",{id:this.props.id,className:this.props.className,ref:this.refContainer,loading:this.props.loading}))}}],function(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}(a.prototype,n),a}(r.Component);g(v,"PlayerState",{UNSTARTED:-1,ENDED:0,PLAYING:1,PAUSED:2,BUFFERING:3,CUED:5}),v.propTypes={videoId:a().string,id:a().string,className:a().string,containerClassName:a().string,title:a().string,loading:a().oneOf(["lazy","eager","auto"]),opts:a().objectOf(a().any),onReady:a().func,onError:a().func,onPlay:a().func,onPause:a().func,onEnd:a().func,onStateChange:a().func,onPlaybackRateChange:a().func,onPlaybackQualityChange:a().func},v.defaultProps={videoId:null,id:null,className:null,loading:null,opts:{},containerClassName:"",onReady:function(){},onError:function(){},onPlay:function(){},onPause:function(){},onEnd:function(){},onStateChange:function(){},onPlaybackRateChange:function(){},onPlaybackQualityChange:function(){},title:null};var b=n("96595"),P=(0,b.rule)({w:"100%"}),w=(0,b.rule)({d:"block",maxW:"100%",w:"100%"});let E=function(e){var t=e.id;return(0,e.renderWrap)(r.createElement(v,{videoId:t,containerClassName:P,className:w}))}},24320:function(e,t,n){"use strict";var r=n(56627);function o(){}function a(){}a.resetWarningCache=o,e.exports=function(){function e(e,t,n,o,a,i){if(i!==r){var s=Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw s.name="Invariant Violation",s}}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:a,resetWarningCache:o};return n.PropTypes=n,n}},76853:function(e,t,n){e.exports=n(24320)()},56627:function(e){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},33988:function(e){"use strict";var t;t=function(){var e={},t={};return e.on=function(e,n){var r={name:e,handler:n};return t[e]=t[e]||[],t[e].unshift(r),r},e.off=function(e){var n=t[e.name].indexOf(e);-1!==n&&t[e.name].splice(n,1)},e.trigger=function(e,n){var r,o=t[e];if(o)for(r=o.length;r--;)o[r].handler(n)},e},e.exports=t},66006:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=(r=n(22275))&&r.__esModule?r:{default:r};t.default={pauseVideo:{acceptableStates:[o.default.ENDED,o.default.PAUSED],stateChangeRequired:!1},playVideo:{acceptableStates:[o.default.ENDED,o.default.PLAYING],stateChangeRequired:!1},seekTo:{acceptableStates:[o.default.ENDED,o.default.PLAYING,o.default.PAUSED],stateChangeRequired:!0,timeout:3e3}},e.exports=t.default},89125:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s(n(9215)),o=s(n(28255)),a=s(n(65279)),i=s(n(66006));function s(e){return e&&e.__esModule?e:{default:e}}var u=(0,r.default)("youtube-player"),c={};c.proxyEvents=function(e){var t={},n=function(n){var r="on"+n.slice(0,1).toUpperCase()+n.slice(1);t[r]=function(t){u('event "%s"',r,t),e.trigger(n,t)}},r=!0,o=!1,i=void 0;try{for(var s,c=a.default[Symbol.iterator]();!(r=(s=c.next()).done);r=!0){var l=s.value;n(l)}}catch(e){o=!0,i=e}finally{try{!r&&c.return&&c.return()}finally{if(o)throw i}}return t},c.promisifyPlayer=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n={},r=function(r){t&&i.default[r]?n[r]=function(){for(var t=arguments.length,n=Array(t),o=0;o<t;o++)n[o]=arguments[o];return e.then(function(e){var t=i.default[r],o=e.getPlayerState(),a=e[r].apply(e,n);return t.stateChangeRequired||Array.isArray(t.acceptableStates)&&-1===t.acceptableStates.indexOf(o)?new Promise(function(n){e.addEventListener("onStateChange",function r(){var o=e.getPlayerState(),a=void 0;"number"==typeof t.timeout&&(a=setTimeout(function(){e.removeEventListener("onStateChange",r),n()},t.timeout)),Array.isArray(t.acceptableStates)&&-1!==t.acceptableStates.indexOf(o)&&(e.removeEventListener("onStateChange",r),clearTimeout(a),n())})}).then(function(){return a}):a})}:n[r]=function(){for(var t=arguments.length,n=Array(t),o=0;o<t;o++)n[o]=arguments[o];return e.then(function(e){return e[r].apply(e,n)})}},a=!0,s=!1,u=void 0;try{for(var c,l=o.default[Symbol.iterator]();!(a=(c=l.next()).done);a=!0){var f=c.value;r(f)}}catch(e){s=!0,u=e}finally{try{!a&&l.return&&l.return()}finally{if(s)throw u}}return n},t.default=c,e.exports=t.default},22275:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={BUFFERING:3,ENDED:0,PAUSED:2,PLAYING:1,UNSTARTED:-1,VIDEO_CUED:5},e.exports=t.default},65279:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=["ready","stateChange","playbackQualityChange","playbackRateChange","error","apiChange","volumeChange"],e.exports=t.default},28255:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=["cueVideoById","loadVideoById","cueVideoByUrl","loadVideoByUrl","playVideo","pauseVideo","stopVideo","getVideoLoadedFraction","cuePlaylist","loadPlaylist","nextVideo","previousVideo","playVideoAt","setShuffle","setLoop","getPlaylist","getPlaylistIndex","setOption","mute","unMute","isMuted","setVolume","getVolume","seekTo","getPlayerState","getPlaybackRate","setPlaybackRate","getAvailablePlaybackRates","getPlaybackQuality","setPlaybackQuality","getAvailableQualityLevels","getCurrentTime","getDuration","removeEventListener","getVideoUrl","getVideoEmbedCode","getOptions","getOption","addEventListener","destroy","setSize","getIframe"],e.exports=t.default},11062:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=s(n(33988)),a=s(n(55900)),i=s(n(89125));function s(e){return e&&e.__esModule?e:{default:e}}var u=void 0;t.default=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],s=(0,o.default)();if(u||(u=(0,a.default)(s)),t.events)throw Error("Event handlers cannot be overwritten.");if("string"==typeof e&&!document.getElementById(e))throw Error('Element "'+e+'" does not exist.');t.events=i.default.proxyEvents(s);var c=new Promise(function(n){(void 0===e?"undefined":r(e))==="object"&&e.playVideo instanceof Function?n(e):u.then(function(r){var o=new r.Player(e,t);return s.on("ready",function(){n(o)}),null})}),l=i.default.promisifyPlayer(c,n);return l.on=s.on,l.off=s.off,l},e.exports=t.default},55900:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=(r=n(49090))&&r.__esModule?r:{default:r};t.default=function(e){return new Promise(function(t){if(window.YT&&window.YT.Player&&window.YT.Player instanceof Function){t(window.YT);return}var n="http:"===window.location.protocol?"http:":"https:";(0,o.default)(n+"//www.youtube.com/iframe_api",function(t){t&&e.trigger("error",t)});var r=window.onYouTubeIframeAPIReady;window.onYouTubeIframeAPIReady=function(){r&&r(),t(window.YT)}})},e.exports=t.default},9215:function(e,t,n){function r(){var e;try{e=t.storage.debug}catch(e){}return!e&&"undefined"!=typeof process&&"env"in process&&(e=process.env.DEBUG),e}(t=e.exports=n(55046)).log=function(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)},t.formatArgs=function(e){var n=this.useColors;if(e[0]=(n?"%c":"")+this.namespace+(n?" %c":" ")+e[0]+(n?"%c ":" ")+"+"+t.humanize(this.diff),n){var r="color: "+this.color;e.splice(1,0,r,"color: inherit");var o=0,a=0;e[0].replace(/%[a-zA-Z%]/g,function(e){"%%"!==e&&(o++,"%c"===e&&(a=o))}),e.splice(a,0,r)}},t.save=function(e){try{null==e?t.storage.removeItem("debug"):t.storage.debug=e}catch(e){}},t.load=r,t.useColors=function(){return"undefined"!=typeof window&&!!window.process&&"renderer"===window.process.type||"undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)},t.storage="undefined"!=typeof chrome&&void 0!==chrome.storage?chrome.storage.local:function(){try{return window.localStorage}catch(e){}}(),t.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],t.formatters.j=function(e){try{return JSON.stringify(e)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}},t.enable(r())},55046:function(e,t,n){var r;function o(e){function n(){if(n.enabled){var e=+new Date,o=e-(r||e);n.diff=o,n.prev=r,n.curr=e,r=e;for(var a=Array(arguments.length),i=0;i<a.length;i++)a[i]=arguments[i];a[0]=t.coerce(a[0]),"string"!=typeof a[0]&&a.unshift("%O");var s=0;a[0]=a[0].replace(/%([a-zA-Z%])/g,function(e,r){if("%%"===e)return e;s++;var o=t.formatters[r];if("function"==typeof o){var i=a[s];e=o.call(n,i),a.splice(s,1),s--}return e}),t.formatArgs.call(n,a),(n.log||t.log||console.log.bind(console)).apply(n,a)}}return n.namespace=e,n.enabled=t.enabled(e),n.useColors=t.useColors(),n.color=function(e){var n,r=0;for(n in e)r=(r<<5)-r+e.charCodeAt(n)|0;return t.colors[Math.abs(r)%t.colors.length]}(e),"function"==typeof t.init&&t.init(n),n}(t=e.exports=o.debug=o.default=o).coerce=function(e){return e instanceof Error?e.stack||e.message:e},t.disable=function(){t.enable("")},t.enable=function(e){t.save(e),t.names=[],t.skips=[];for(var n=("string"==typeof e?e:"").split(/[\s,]+/),r=n.length,o=0;o<r;o++)n[o]&&("-"===(e=n[o].replace(/\*/g,".*?"))[0]?t.skips.push(RegExp("^"+e.substr(1)+"$")):t.names.push(RegExp("^"+e+"$")))},t.enabled=function(e){var n,r;for(n=0,r=t.skips.length;n<r;n++)if(t.skips[n].test(e))return!1;for(n=0,r=t.names.length;n<r;n++)if(t.names[n].test(e))return!0;return!1},t.humanize=n(14680),t.names=[],t.skips=[],t.formatters={}},14680:function(e){function t(e,t,n){return e<t?void 0:e<1.5*t?Math.floor(e/t)+" "+n:Math.ceil(e/t)+" "+n+"s"}e.exports=function(e,n){n=n||{};var r,o,a=typeof e;if("string"===a&&e.length>0)return function(e){if(!((e=String(e)).length>100)){var t=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]);switch((t[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return 315576e5*n;case"days":case"day":case"d":return 864e5*n;case"hours":case"hour":case"hrs":case"hr":case"h":return 36e5*n;case"minutes":case"minute":case"mins":case"min":case"m":return 6e4*n;case"seconds":case"second":case"secs":case"sec":case"s":return 1e3*n;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}(e);if("number"===a&&!1===isNaN(e)){return n.long?t(r=e,864e5,"day")||t(r,36e5,"hour")||t(r,6e4,"minute")||t(r,1e3,"second")||r+" ms":(o=e)>=864e5?Math.round(o/864e5)+"d":o>=36e5?Math.round(o/36e5)+"h":o>=6e4?Math.round(o/6e4)+"m":o>=1e3?Math.round(o/1e3)+"s":o+"ms"}throw Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))}}}]);