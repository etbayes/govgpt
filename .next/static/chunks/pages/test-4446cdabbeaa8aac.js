(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[378],{1752:function(t,e,n){t.exports=n(6949)},1185:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/test",function(){return n(7886)}])},7886:function(t,e,n){"use strict";n.r(e);var i=n(5893),c=n(7294),r=n(1752),s=n.n(r);let{publicRuntimeConfig:u}=s()(),{apiUrl:a}=u;e.default=function(){let[t,e]=(0,c.useState)([]),n=async()=>{try{let i=await fetch("".concat(a,"/api/test")),c=await i.json();e([...t,c]),setTimeout(n,1e3)}catch(t){console.error("Error fetching data:",t),setTimeout(n,5e3)}};return(0,c.useEffect)(()=>{n()},[]),(0,i.jsxs)("div",{children:[(0,i.jsx)("h1",{children:"Streaming data:"}),(0,i.jsx)("ul",{children:t.map((t,e)=>(0,i.jsx)("li",{children:JSON.stringify(t)},e))})]})}}},function(t){t.O(0,[774,888,179],function(){return t(t.s=1185)}),_N_E=t.O()}]);