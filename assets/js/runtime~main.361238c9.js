(()=>{"use strict";var e,a,c,f,d,b,t,r,n={},o={};function u(e){var a=o[e];if(void 0!==a)return a.exports;var c=o[e]={id:e,loaded:!1,exports:{}};return n[e].call(c.exports,c,c.exports,u),c.loaded=!0,c.exports}u.m=n,u.c=o,u.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return u.d(a,{a:a}),a},a=Object.getPrototypeOf?function(e){return Object.getPrototypeOf(e)}:function(e){return e.__proto__},u.t=function(c,f){if(1&f&&(c=this(c)),8&f||"object"==typeof c&&c&&(4&f&&c.__esModule||16&f&&"function"==typeof c.then))return c;var d=Object.create(null);u.r(d);var b={};e=e||[null,a({}),a([]),a(a)];for(var t=2&f&&c;"object"==typeof t&&!~e.indexOf(t);t=a(t))Object.getOwnPropertyNames(t).forEach(function(e){b[e]=function(){return c[e]}});return b.default=function(){return c},u.d(d,b),d},u.d=function(e,a){for(var c in a)u.o(a,c)&&!u.o(e,c)&&Object.defineProperty(e,c,{enumerable:!0,get:a[c]})},u.f={},u.e=function(e){return Promise.all(Object.keys(u.f).reduce(function(a,c){return u.f[c](e,a),a},[]))},u.hmd=function(e){return(e=Object.create(e)).children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:function(){throw Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e},u.u=function(e){return"assets/js/"+(({1011:"75273fa3",103:"94eb9f3a",1044:"c0258ad0",1076:"f8e19343",1118:"85461b0c",1141:"265d4d03",1153:"280796ed",1168:"06180a50",1244:"37263ee9",1262:"40d6f9be",1385:"622200b4",1408:"7993dbca",1434:"05924c98",1449:"aa838568",1471:"4efd25ba",1555:"00c92335",1588:"8ca187c5",16:"047decf8",1602:"faf40925",1622:"7c911d58",1644:"22529445",169:"9357a754",170:"e30bde61",1717:"ce96d6c2",1797:"96df9843",183:"43f2772c",1895:"9b879edf",1908:"1a6f14a6",195:"0ddcbd4f",1964:"99c2b61c",1966:"531add09",1978:"e0ffeaad",1983:"14eb3368",2020:"11fad8c4",208:"517bd4c7",210:"f301c41e",2131:"77127149",2154:"70d1af52",2169:"273ac228",2170:"35e870a7",2193:"43def820",2202:"6379e597",2208:"88ba2689",221:"706dd09e",2261:"2a16cec9",2277:"7328be0d",2289:"a04fddad",2376:"05a8cd5e",2463:"8765f673",2506:"434a9968",2557:"fdb0b867",2669:"c13a086b",2721:"f3130a92",2824:"39e1ec7e",2843:"92776ebd",2898:"3720c009",2902:"8ce539e9",2942:"674856a9",295:"7a731458",2962:"4f45a33c",3039:"1ae5530a",3118:"9c97eba2",3131:"74f5f108",3133:"16cc522a",3262:"8586d19d",3271:"eba10e53",3341:"73d0aba1",3346:"9503cbd2",3378:"40c9b06b",342:"01c96cdc",343:"28ba9fc9",3432:"5e95c892",3460:"36c7f567",3476:"ab9bed24",3509:"95155d30",3518:"34c600fe",3557:"6917ac10",3561:"9f89e424",3578:"2ff3d884",3591:"4313bfd0",3616:"a2f43b3f",3635:"dce64deb",3648:"94827783",3674:"10d8e489",3685:"b8331890",3686:"3d9a635d",3709:"8389c9de",3734:"603484eb",3797:"025ea968",3846:"3d6783bc",3864:"ec49080b",3889:"42e158a6",3938:"0dfc5b50",3946:"ac1bfa38",3981:"6a403779",4084:"06a14360",4088:"77fffbe4",4091:"ffabebd3",4206:"eab0ea3a",4231:"0e7c86d7",427:"532417a3",4305:"482faf2e",4323:"f505f2e0",4404:"76f64608",4435:"d5125292",4465:"a8c183a2",4497:"fe5cf8ac",4500:"35432480",4543:"06680b20",4574:"c763d947",4603:"51ce4143",4618:"545549dd",464:"4f46affb",4730:"af653a03",4762:"1ef75a44",481:"4b5993a8",4848:"aaa44594",4851:"6313568f",4882:"c50deaea",4972:"231581e1",4974:"146fac89",4985:"72a33f98",50:"9336f2d5",5049:"26dcb941",5059:"a2b4919c",5112:"aba21aa0",5201:"ce2420cf",5211:"a7bd4aaa",5266:"295b9bb6",5369:"af13f569",538:"cdcadd06",5470:"5235f6a4",5514:"455a8819",563:"73071af8",5784:"5276eba5",5807:"60a0e847",5882:"447808b6",5975:"7c85c4d4",5982:"beb025e6",6052:"ef26299e",6070:"5af6a067",6088:"8e1cd903",6092:"e0505bde",6093:"594e0799",6129:"46889367",6174:"c973c45b",6209:"7d79d344",6222:"6c36d633",6245:"f338c96c",6267:"1178cdab",6278:"e0c8e2e5",6279:"5685d010",6320:"305a404d",6349:"08eca45a",6376:"f5f6aeb7",6389:"90dfaa08",6437:"c9e2e959",6453:"60154826",6461:"f07ab83c",6468:"871da184",6541:"8c7d9206",6586:"77f7779b",6598:"1830218c",6618:"6ae1ca2b",6634:"7bf24566",6646:"cc6a28fd",6669:"ece342d4",6750:"a852bbd0",6756:"dff4ee3e",6775:"ddd6597d",6818:"f12c2acc",6837:"6764d8de",688:"06781e94",6881:"be5e8f27",6902:"5cfb857a",6989:"64901bf5",7027:"f107f75c",7048:"17896441",7170:"56b749f9",7188:"eb5493b6",7227:"ae15b8b2",7257:"0889f163",7261:"1da3f97e",7262:"5a896471",7263:"1239ca31",7284:"aba11d9b",7287:"d8b658de",73:"3c6a5080",7321:"0e384e19",7346:"c44469d4",7432:"25be66c9",7486:"8aa5cbae",7507:"61093708",7508:"dfe5eec2",7519:"f5946869",7522:"e65f8f6d",7524:"cf9ed325",7580:"e4d22d59",7608:"b7176ea8",7675:"15349c60",7725:"d4e5997b",7803:"bfeb783f",7859:"fb0c96e1",7880:"e57c77a9",7902:"9c8da3a7",797:"3b5309da",7996:"318244bf",8002:"cfea1e7b",801:"351e0e36",8029:"24b38640",815:"df203c0f",8150:"7a20a513",817:"47567f22",8171:"c6db42d6",8182:"e8179dfa",8193:"c370cf0b",82:"b146b58c",828:"3cb42d97",8288:"b043ad2f",8302:"4b7efd5d",8383:"73220d60",8438:"2895d240",8490:"34d0c9b1",8510:"e0fefdca",8541:"942a0443",8651:"1a259d91",8692:"58a862e0",8714:"e276b44a",8724:"e995f04a",8846:"e0dcfd46",8862:"3eb67aae",8864:"1465d541",9032:"875d51de",9039:"99ee2e78",9120:"ca453c16",9149:"49194a39",9157:"3180b69c",9168:"2c6925d4",9177:"3ec900ef",9180:"d26f52f5",922:"e4f717fd",9290:"19976852",9331:"4b3c3e29",9369:"c22e6bee",9378:"bdd62852",9418:"b4095a62",9459:"f6c69e6e",9464:"9fbbad87",9469:"77cc17a2",9502:"8528f7ad",9523:"81494b3e",977:"152eb96a",9873:"9e1f9d9f",9905:"abaf4ec9",9914:"a94703ab"})[e]||e)+"."+({1011:"bc7d2630",103:"d7643a1b",1044:"a64ee488",1076:"cc2f221a",1118:"8a815499",1141:"429ccd01",1153:"980a83a1",1168:"0acf1b9a",1244:"385c24e2",1262:"b67c18c5",1385:"d0d4dfa0",1408:"0d7b1cbf",142:"fada637f",1434:"e6582610",1449:"117079b3",1471:"3157ca15",1555:"18da570d",1588:"c56ad4a3",16:"57b2b74f",1602:"f808bbce",1622:"7d597eaa",1644:"ae1cacd7",169:"a20fdd96",170:"46ea2dd1",1717:"3bfcbe32",1797:"64c21012",183:"01bc0c1e",1895:"3b761c80",1908:"9ad59c5f",195:"0c163394",1964:"824d8777",1966:"651ed0b1",1978:"b8004514",1983:"2259001f",2020:"bac66229",208:"ab0e214c",210:"df3183a1",2131:"5f9c5bbc",2154:"9c44f7c9",2169:"3173fce4",2170:"4417b37e",2193:"c0a9241e",2202:"49457242",2208:"5d3ae3a3",221:"28e173cd",2261:"e8909d60",2277:"7aafeb01",2289:"7437c10a",2301:"4913d12a",2376:"2f5d9592",2463:"d36fc0c7",2506:"26d366cc",2557:"ff729ace",2669:"445665e5",2721:"76929243",2824:"7b762e6a",2843:"399a0f75",2898:"bc6545c4",2902:"5f15ce89",2942:"21f48961",295:"7761fae1",2962:"98e52c0a",3039:"965cf54d",311:"70770030",3118:"83964d14",3131:"74462288",3133:"c4be2f53",3262:"49bfed80",3271:"f29caa19",3341:"bf371019",3346:"c9b8fa20",3378:"7a19cb1d",342:"2b7695c3",343:"4af9ec67",3432:"30b65f4d",3460:"34dafddc",3476:"71a1faab",3509:"7d7f972a",3518:"35b775a0",3557:"da229932",3561:"116147e8",3578:"0698c0db",3591:"017a5a68",3616:"9491b399",3635:"d30649e8",3648:"9c29cca4",3674:"0beacfff",3685:"32f5a468",3686:"5659fe78",3709:"b7bb2964",3734:"1db54e8e",3797:"32338f81",3846:"b4afa3ec",3864:"01c4fc45",3889:"2934a347",3938:"83902309",3946:"d2837295",396:"2cc0ad16",3981:"a72141ed",4078:"b63d39b4",4084:"961874f9",4088:"3f9c89c0",4091:"84357523",4206:"e49ee4c5",4231:"03a533cd",427:"18e16934",4293:"da93e670",4305:"4b9fd71f",4323:"65ec419b",4404:"ca092a04",4435:"c02acd1b",4465:"82d40d35",4497:"1159f917",4500:"d6e7b547",4543:"9e5c1a72",4574:"56e1280c",4582:"274f5ae9",4603:"5a3e16c1",4618:"ced82011",464:"5b933326",4730:"26d6bfcd",4762:"8be72879",481:"3739884c",4848:"47815acb",4851:"47376a4c",4882:"3ee9d762",4972:"56dd8f5a",4974:"f9d0e5a8",4985:"99d46942",50:"ec979d3b",5049:"7ea82ccc",5059:"e0175284",5112:"3b68a5d2",5201:"bc4e194a",5211:"046505fb",5266:"21daf760",5273:"9d68621a",5369:"e72c9947",538:"437876c3",5430:"e19cf3bd",5470:"e9f021c7",5514:"4b42dec0",563:"feb191dc",5784:"c8ed256d",5807:"8f2bbdd1",5882:"afd2da3e",5931:"c5ce88e8",5975:"ebcc704e",5982:"9a047a17",6052:"e7f37867",6070:"d6977117",6088:"67e2f1d5",6092:"cf8ff535",6093:"da0fed8f",6129:"d5569054",6174:"a6259737",6209:"4d1924dd",6222:"5382fa70",6245:"5cac8c8a",6267:"c767371b",6278:"b36770b8",6279:"4a5635e9",6320:"141e3559",6349:"ee381b4e",6376:"6e4dc5a2",6389:"09261b10",6437:"e192eea9",6453:"e9ad87df",6461:"1e2be1a2",6468:"da9f1675",6541:"8468ff81",6586:"e9e9e7f8",6598:"fac4116a",6618:"38aad301",6634:"c1f7d15b",6646:"056b1285",6669:"675299bf",6750:"e1471243",6756:"16658369",6775:"35a86275",6818:"bd0ddb11",6837:"b1ead58f",688:"93e47ad6",6881:"ca656a61",6902:"62974242",6985:"1c7d557f",6989:"93605748",7027:"0fcd2a8d",7048:"b1f410d8",7170:"69a0e9f1",7188:"af21727c",7227:"fc90a551",7257:"5af12cbe",7261:"06bf01ed",7262:"763b6ee1",7263:"0c683535",7284:"36a9f964",7287:"1ca27d77",73:"b502eec5",7321:"59152acb",7346:"fa9e794c",7432:"5e5ed2fd",745:"acc8adc1",7486:"58d41c1d",7507:"b52e6ff1",7508:"9e2f7a06",7519:"41de7e7a",7522:"0e5ea317",7524:"701043fd",7580:"9636e058",7608:"727823d3",7675:"e5fe0840",7725:"974e170b",7803:"c40827fd",7859:"ee4e7110",7880:"0368aac0",7902:"d5264915",797:"5b0372e2",7996:"600c6f66",8002:"edd9a246",801:"7e812601",8029:"1e67d0f8",815:"4e3a89a1",8150:"16e13461",817:"8e9ae37c",8171:"6a2ccb83",8182:"9596d96d",8193:"f93b7496",82:"68601fb3",828:"f121fea0",8288:"071cc106",8302:"b638107e",8335:"f1b18d28",8375:"34843a6b",8383:"2698d462",8438:"9aa44ef8",8490:"a364a291",8510:"9619a52e",8541:"76776e77",8651:"96a8f7ab",8692:"485e8d26",8714:"4b9518cf",8724:"ef4c9cf2",8726:"b7584815",8846:"cea3e15b",8862:"80b986c8",8864:"ab0fe304",8928:"2541bfb8",8963:"f1f934da",9032:"21cf866c",9039:"33d73fc0",9120:"d63bd1e1",9149:"f9c31999",9157:"366e3d0d",9168:"54c91389",9177:"35141fa0",9180:"393375eb",9196:"2aaa72ec",922:"6d912957",9290:"64a1721b",9331:"4035ed1e",9369:"2444459c",9378:"16b6e34e",9418:"88e664cc",9459:"6d15a514",9464:"dac2b8cd",9469:"85a3bdbc",9502:"27c3ed97",9523:"55940e88",9718:"5b656e61",977:"ca8c78ee",9873:"e66f989f",9905:"4168d100",9914:"08ec34d3",9967:"5771cc58"})[e]+".js"},u.miniCssF=function(e){return""+e+".css"},u.h=function(){return"f1cce20bbaa1d3c7"},u.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||Function("return this")()}catch(e){if("object"==typeof window)return window}}(),u.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)},c={},f="dev-docs:",u.l=function(e,a,d,b){if(c[e]){c[e].push(a);return}if(void 0!==d)for(var t,r,n=document.getElementsByTagName("script"),o=0;o<n.length;o++){var i=n[o];if(i.getAttribute("src")==e||i.getAttribute("data-webpack")==f+d){t=i;break}}t||(r=!0,(t=document.createElement("script")).charset="utf-8",t.timeout=120,u.nc&&t.setAttribute("nonce",u.nc),t.setAttribute("data-webpack",f+d),t.src=e),c[e]=[a];var s=function(a,f){t.onerror=t.onload=null,clearTimeout(l);var d=c[e];if(delete c[e],t.parentNode&&t.parentNode.removeChild(t),d&&d.forEach(function(e){return e(f)}),a)return a(f)},l=setTimeout(s.bind(null,void 0,{type:"timeout",target:t}),12e4);t.onerror=s.bind(null,t.onerror),t.onload=s.bind(null,t.onload),r&&document.head.appendChild(t)},u.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.nc=void 0,d=[],u.O=function(e,a,c,f){if(a){f=f||0;for(var b=d.length;b>0&&d[b-1][2]>f;b--)d[b]=d[b-1];d[b]=[a,c,f];return}for(var t=1/0,b=0;b<d.length;b++){for(var a=d[b][0],c=d[b][1],f=d[b][2],r=!0,n=0;n<a.length;n++)(!1&f||t>=f)&&Object.keys(u.O).every(function(e){return u.O[e](a[n])})?a.splice(n--,1):(r=!1,f<t&&(t=f));if(r){d.splice(b--,1);var o=c();void 0!==o&&(e=o)}}return e},u.p="/zettelkasten/",u.rv=function(){return"1.2.0-alpha.0"},u.gca=function(e){return e=({0x11113f9:"7048",0x130d294:"9290",0x157c5a5:"1644",0x21ca820:"4500",0x2cb7997:"6129",0x395e3ca:"6453",0x3a4374c:"7507",0x498dded:"2131",0x5a6f507:"3648","047decf8":"16","9336f2d5":"50","3c6a5080":"73",b146b58c:"82","94eb9f3a":"103","9357a754":"169",e30bde61:"170","43f2772c":"183","0ddcbd4f":"195","517bd4c7":"208",f301c41e:"210","706dd09e":"221","7a731458":"295","01c96cdc":"342","28ba9fc9":"343","532417a3":"427","4f46affb":"464","4b5993a8":"481",cdcadd06:"538","73071af8":"563","06781e94":"688","3b5309da":"797","351e0e36":"801",df203c0f:"815","47567f22":"817","3cb42d97":"828",e4f717fd:"922","152eb96a":"977","75273fa3":"1011",c0258ad0:"1044",f8e19343:"1076","85461b0c":"1118","265d4d03":"1141","280796ed":"1153","06180a50":"1168","37263ee9":"1244","40d6f9be":"1262","622200b4":"1385","7993dbca":"1408","05924c98":"1434",aa838568:"1449","4efd25ba":"1471","00c92335":"1555","8ca187c5":"1588",faf40925:"1602","7c911d58":"1622",ce96d6c2:"1717","96df9843":"1797","9b879edf":"1895","1a6f14a6":"1908","99c2b61c":"1964","531add09":"1966",e0ffeaad:"1978","14eb3368":"1983","11fad8c4":"2020","70d1af52":"2154","273ac228":"2169","35e870a7":"2170","43def820":"2193","6379e597":"2202","88ba2689":"2208","2a16cec9":"2261","7328be0d":"2277",a04fddad:"2289","05a8cd5e":"2376","8765f673":"2463","434a9968":"2506",fdb0b867:"2557",c13a086b:"2669",f3130a92:"2721","39e1ec7e":"2824","92776ebd":"2843","3720c009":"2898","8ce539e9":"2902","674856a9":"2942","4f45a33c":"2962","1ae5530a":"3039","9c97eba2":"3118","74f5f108":"3131","16cc522a":"3133","8586d19d":"3262",eba10e53:"3271","73d0aba1":"3341","9503cbd2":"3346","40c9b06b":"3378","5e95c892":"3432","36c7f567":"3460",ab9bed24:"3476","95155d30":"3509","34c600fe":"3518","6917ac10":"3557","9f89e424":"3561","2ff3d884":"3578","4313bfd0":"3591",a2f43b3f:"3616",dce64deb:"3635","10d8e489":"3674",b8331890:"3685","3d9a635d":"3686","8389c9de":"3709","603484eb":"3734","025ea968":"3797","3d6783bc":"3846",ec49080b:"3864","42e158a6":"3889","0dfc5b50":"3938",ac1bfa38:"3946","6a403779":"3981","06a14360":"4084","77fffbe4":"4088",ffabebd3:"4091",eab0ea3a:"4206","0e7c86d7":"4231","482faf2e":"4305",f505f2e0:"4323","76f64608":"4404",d5125292:"4435",a8c183a2:"4465",fe5cf8ac:"4497","06680b20":"4543",c763d947:"4574","51ce4143":"4603","545549dd":"4618",af653a03:"4730","1ef75a44":"4762",aaa44594:"4848","6313568f":"4851",c50deaea:"4882","231581e1":"4972","146fac89":"4974","72a33f98":"4985","26dcb941":"5049",a2b4919c:"5059",aba21aa0:"5112",ce2420cf:"5201",a7bd4aaa:"5211","295b9bb6":"5266",af13f569:"5369","5235f6a4":"5470","455a8819":"5514","5276eba5":"5784","60a0e847":"5807","447808b6":"5882","7c85c4d4":"5975",beb025e6:"5982",ef26299e:"6052","5af6a067":"6070","8e1cd903":"6088",e0505bde:"6092","594e0799":"6093",c973c45b:"6174","7d79d344":"6209","6c36d633":"6222",f338c96c:"6245","1178cdab":"6267",e0c8e2e5:"6278","5685d010":"6279","305a404d":"6320","08eca45a":"6349",f5f6aeb7:"6376","90dfaa08":"6389",c9e2e959:"6437",f07ab83c:"6461","871da184":"6468","8c7d9206":"6541","77f7779b":"6586","1830218c":"6598","6ae1ca2b":"6618","7bf24566":"6634",cc6a28fd:"6646",ece342d4:"6669",a852bbd0:"6750",dff4ee3e:"6756",ddd6597d:"6775",f12c2acc:"6818","6764d8de":"6837",be5e8f27:"6881","5cfb857a":"6902","64901bf5":"6989",f107f75c:"7027","56b749f9":"7170",eb5493b6:"7188",ae15b8b2:"7227","0889f163":"7257","1da3f97e":"7261","5a896471":"7262","1239ca31":"7263",aba11d9b:"7284",d8b658de:"7287","0e384e19":"7321",c44469d4:"7346","25be66c9":"7432","8aa5cbae":"7486",dfe5eec2:"7508",f5946869:"7519",e65f8f6d:"7522",cf9ed325:"7524",e4d22d59:"7580",b7176ea8:"7608","15349c60":"7675",d4e5997b:"7725",bfeb783f:"7803",fb0c96e1:"7859",e57c77a9:"7880","9c8da3a7":"7902","318244bf":"7996",cfea1e7b:"8002","24b38640":"8029","7a20a513":"8150",c6db42d6:"8171",e8179dfa:"8182",c370cf0b:"8193",b043ad2f:"8288","4b7efd5d":"8302","73220d60":"8383","2895d240":"8438","34d0c9b1":"8490",e0fefdca:"8510","942a0443":"8541","1a259d91":"8651","58a862e0":"8692",e276b44a:"8714",e995f04a:"8724",e0dcfd46:"8846","3eb67aae":"8862","1465d541":"8864","875d51de":"9032","99ee2e78":"9039",ca453c16:"9120","49194a39":"9149","3180b69c":"9157","2c6925d4":"9168","3ec900ef":"9177",d26f52f5:"9180","4b3c3e29":"9331",c22e6bee:"9369",bdd62852:"9378",b4095a62:"9418",f6c69e6e:"9459","9fbbad87":"9464","77cc17a2":"9469","8528f7ad":"9502","81494b3e":"9523","9e1f9d9f":"9873",abaf4ec9:"9905",a94703ab:"9914"})[e]||e,u.p+u.u(e)},b={2580:0,6212:0},u.f.j=function(e,a){var c=u.o(b,e)?b[e]:void 0;if(0!==c){if(c)a.push(c[2]);else if(/^(2580|6212)$/.test(e))b[e]=0;else{var f=new Promise(function(a,f){c=b[e]=[a,f]});a.push(c[2]=f);var d=u.p+u.u(e),t=Error();u.l(d,function(a){if(u.o(b,e)&&(0!==(c=b[e])&&(b[e]=void 0),c)){var f=a&&("load"===a.type?"missing":a.type),d=a&&a.target&&a.target.src;t.message="Loading chunk "+e+" failed.\n("+f+": "+d+")",t.name="ChunkLoadError",t.type=f,t.request=d,c[1](t)}},"chunk-"+e,e)}}},u.O.j=function(e){return 0===b[e]},t=function(e,a){var c,f,d=a[0],t=a[1],r=a[2],n=0;if(d.some(function(e){return 0!==b[e]})){for(c in t)u.o(t,c)&&(u.m[c]=t[c]);if(r)var o=r(u)}for(e&&e(a);n<d.length;n++)f=d[n],u.o(b,f)&&b[f]&&b[f][0](),b[f]=0;return u.O(o)},(r=self.webpackChunkdev_docs=self.webpackChunkdev_docs||[]).forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();