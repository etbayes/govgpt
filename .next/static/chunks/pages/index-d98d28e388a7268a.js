(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,s,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(2515)}])},2515:function(e,s,t){"use strict";t.r(s),t.d(s,{default:function(){return b}});var r=t(5893),a=t(7294),o=t(7542);let l=(0,o.createClientComponentClient)({options:{realtime:{params:{eventsPerSecond:-1}}}});var n=t(9258),i=t(8139),c=t(5044),d=t(5593),u=t(5117),p=t(6869),m=t(9834),h=t(8861),x=t(3865),g=t(7511),f=t(3461),y=t(4075),j=t(7415);let w=(e,s)=>{let t=s.interactionId,r=e.reduce((e,r)=>[...e,r.id===t?{...r,message:r.message+s.token,url:s.url?s.url:r.url}:r],[]),a={id:t,message:s.token,speaker:"bot",url:s.url};return e.some(e=>e.id===t)?r:[...r,a]};function b(){let[e,s]=(0,a.useState)(""),[t,o]=(0,a.useState)([]),[b,v]=(0,a.useState)(!1),[C,N]=(0,a.useState)("Waiting for query..."),[D,k]=(0,a.useState)(),[S,z]=(0,a.useState)(""),[E,F]=(0,a.useState)(!1);if((0,a.useEffect)(()=>{l.auth.getSession().then(e=>{let{data:{session:s}}=e;s?k(null==s?void 0:s.user.id):l.auth.onAuthStateChange((e,s)=>k(null==s?void 0:s.user.id))})},[]),!E)return(0,r.jsx)(j.default,{setConversation:o,setIsInitialInputGiven:F});if(!D)return(0,r.jsx)("div",{className:"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",children:(0,r.jsx)(n.gx,{supabaseClient:l,appearance:{theme:i.rD},providers:[]})});let I=l.channel(D);I.on("broadcast",{event:"chat"},e=>{let{payload:s}=e;switch(s.event){case"responseEnd":v(!1),o(e=>w(e,s));let t={message:"",url:s.urls&&s.urls[0],speaker:"bot"};o(e=>[...e,t]),s.urls&&s.urls[0]&&z(s.urls[0]);break;case"status":N(s.message)}}).subscribe();let B=async()=>{o([]);try{await l.from("conversations").delete().eq("user_id",D)}catch(e){console.error("Error deleting conversation:",e)}},T=async t=>{t.preventDefault(),o(s=>[...s,{message:e,speaker:"user"}]);try{v(!0);let s=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:e})}),t=await s.json();if(t.generations&&t.generations[0]&&t.generations[0][0])o(e=>w(e,{interactionId:t.interactionId,token:t.generations[0][0].text,event:"responseEnd"}));else throw Error("Unexpected data structure.")}catch(e){console.error("Error submitting message:",e)}s("")},P=async e=>{o([{message:e,speaker:"user"}]);try{v(!0);let s=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:e})});await s.json()}catch(e){console.error("Error submitting message:",e)}},_=0===t.length;return(0,r.jsxs)("div",{id:"chatbotpage",className:"flex flex-col h-screen",children:[(0,r.jsx)("div",{id:"top",className:"h-12 bg-black px-60 pt-2 flex justify-between items-center",children:(0,r.jsx)(d.E,{width:190,height:30,fit:"contain",src:"/logo.svg"})}),(0,r.jsx)("div",{id:"paddingtop",className:"px-60 pb-3",children:(0,r.jsx)("div",{className:"gradient w-full h-3"})}),(0,r.jsx)("div",{id:"chat",className:"flex flex-col px-60 overflow-y-auto flex-grow",children:(0,r.jsxs)("div",{id:"response",className:"flex-grow",children:[t.length>0?t.map((e,s)=>(0,r.jsxs)("div",{id:"speechbubble",className:"flex flex-row whitespace-pre-wrap ".concat(e.url?"":"py-3"," items-start pl-3"),style:{backgroundColor:"user"!==e.speaker?"#F3F2F1":""},children:["user"!==e.speaker||e.url?e.url?null:(0,r.jsx)(c.k,{size:"md",variant:"gradient",gradient:{from:"indigo",to:"cyan"},className:"shadow-md",children:(0,r.jsx)(d.E,{maw:20,mx:"auto",fit:"contain",src:"https://i.postimg.cc/MGvN9TNY/Vector-1.png"})}):(0,r.jsx)(c.k,{size:"md",variant:"gradient",gradient:{from:"orange",to:"red"},className:"shadow-md",children:(0,r.jsx)(h.Z,{size:"1rem"})}),(0,r.jsxs)("div",{id:"chatbotmessage",className:"ml-3 flex flex-row",style:{fontSize:"14px",paddingTop:"3px"},children:[(0,r.jsx)(u.x,{id:"chatmessage",fz:"sm",style:{color:"#697075"},children:e.message}),e.url&&"I don't know"!==e.message&&"Can you ask another question"!==e.message&&(0,r.jsx)(p.z,{id:"urlbutton",rightIcon:(0,r.jsx)(x.Z,{}),onClick:()=>{window.open(S,"_blank")},variant:"outline",style:{color:"#697075"},className:"border border-gray-300 bg-white hover:bg-gray-300 ml-6 mb-3",children:"Learn more"})]})]},s)):null,(0,r.jsx)(function(){return b?(0,r.jsxs)("div",{className:"flex flex-row whitespace-pre-wrap py-3 items-start pl-3",style:{backgroundColor:"#F3F2F1"},children:[(0,r.jsx)(c.k,{size:"md",variant:"gradient",gradient:{from:"indigo",to:"cyan"},className:"shadow-md",children:(0,r.jsx)(d.E,{maw:20,mx:"auto",fit:"contain",src:"https://i.postimg.cc/MGvN9TNY/Vector-1.png"})}),(0,r.jsx)("div",{className:"ml-3 flex flex-row",style:{paddingTop:"3px"},children:(0,r.jsx)(d.E,{src:"https://thumbs.gfycat.com/GrippingReflectingBasenji-max-1mb.gif",width:30})})]}):null},{})]})}),(0,r.jsxs)("div",{className:"flex flex-col items-stretch",children:[_&&(0,r.jsxs)("div",{id:"prompts",className:"w-full flex gap-3 pt-3 px-60 items-center justify-center gap-3",children:[(0,r.jsx)(g.Z,{size:"1.125rem",style:{color:"#697075"}}),(0,r.jsx)(p.z,{variant:"outline",color:"gray",radius:"xl",compact:!0,style:{borderColor:"#D8DBDF",color:"#697075",fontWeight:"normal"},onClick:()=>P("How do I login to universal credit?"),children:"How do I login to universal credit?"}),(0,r.jsx)(p.z,{variant:"outline",color:"gray",radius:"xl",compact:!0,style:{borderColor:"#D8DBDF",color:"#697075",fontWeight:"normal"},onClick:()=>P("How do I get help with my energy bills?"),children:"How do I get help with my energy bills?"}),(0,r.jsx)(p.z,{variant:"outline",color:"gray",radius:"xl",compact:!0,style:{borderColor:"#D8DBDF",color:"#697075",fontWeight:"normal"},onClick:()=>P("How do I apply for a passport?"),children:"How do I apply for a passport?"})]}),(0,r.jsxs)("div",{id:"searchbardiv",className:"flex gap-3 mb-4 px-60 pt-3",children:[(0,r.jsxs)("form",{id:"searchbar",onSubmit:e=>T(e),className:"relative flex-grow",children:[(0,r.jsx)("input",{className:"search-text w-full pr-10 border border-gray-300 rounded focus:shadow-lg",placeholder:"Say something...",onChange:e=>{s(e.target.value)},value:e,style:{fontSize:"14px",padding:"9px"}}),(0,r.jsx)(m.A,{variant:"transparent",type:"submit",className:"absolute inset-y-0 right-0 pr-3 flex items-center border border-transparent rounded h-10 w-10",children:(0,r.jsx)(f.Z,{size:"1.125rem"})})]}),(0,r.jsx)(m.A,{onClick:B,className:"border border-gray-300 rounded h-10 w-10",children:(0,r.jsx)(y.Z,{size:"1.125rem"})})]}),(0,r.jsxs)("div",{id:"bottom",className:"w-full h-12 flex items-center justify-center gap-3",style:{backgroundColor:"#F3F2F1",borderTop:"1px solid #B1B4B6"},children:[(0,r.jsx)(u.x,{fz:"xs",style:{color:"#697075"},children:"Information correct as of June 2023."}),(0,r.jsx)(u.x,{fz:"xs",style:{color:"#697075"},children:"|"}),(0,r.jsxs)(u.x,{fz:"xs",style:{color:"#697075"},children:["Built with ❤ by ",(0,r.jsx)("a",{href:"https://www.general-purpose.io",style:{textDecoration:"underline"},children:"General Purpose"})," "]}),(0,r.jsx)(u.x,{fz:"xs",style:{color:"#697075"},children:"|"}),(0,r.jsx)(u.x,{fz:"xs",style:{color:"#697075"},children:"May produce inaccurate information."})]})]})]})}},7415:function(e,s,t){"use strict";t.r(s);var r=t(5893),a=t(7294),o=t(5593),l=t(9834),n=t(6869),i=t(9684),c=t(3523),d=t(5117),u=t(9845),p=t(3461),m=t(7511),h=t(7650),x=t(6154),g=t(7460),f=t.n(g);let y=e=>{let{setConversation:s,setIsInitialInputGiven:t}=e,[g,y]=(0,a.useState)([]),[j,w]=(0,a.useState)(""),[b,v]=(0,a.useState)("English"),C=async e=>{s([{message:e,speaker:"user"}]),t(!0);try{let s=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:e})});await s.json()}catch(e){console.error("Error submitting initial message:",e)}};(0,a.useEffect)(()=>{let e=async()=>{let e=await x.Z.get("Cymraeg"===b?"https://docs.google.com/spreadsheets/d/e/2PACX-1vSqKi1YOqksJOO3U07eGgNKU2P62-QjGmY4wzwI6vnUp8sjtU1CvnHcYu3PD_BVDfIjZUCuouNjsd9L/pub?output=csv":"https://docs.google.com/spreadsheets/d/e/2PACX-1vRYnQg-krksesMIkfe-VcoJMS3C92t99MgvjklMkz_5VRLMHaRfNPzXcjwUg3hL7-4E77C-8V1-8HM-/pub?output=csv"),s=f().parse(e.data,{header:!0,dynamicTyping:!0});y(s.data)};e()},[b]);let N=(e,s)=>{console.log(e,s)},D=e=>{console.log(e)},k=e=>{w(e.name)},S=e=>{w(e),C(e)},z=()=>{console.log("Focused")},E=e=>{e.preventDefault(),C(j)},F=e=>e&&e.name?(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("span",{style:{display:"block",textAlign:"left"},children:e.name})}):null;return(0,r.jsxs)("div",{id:"homepage",className:"flex flex-col h-screen items-center justify-between",children:[(0,r.jsxs)("div",{className:"flex flex-col items-center justify-center flex-grow",children:["Cymraeg"===b?(0,r.jsx)(o.E,{className:"pb-6",height:50,fit:"contain",src:"https://i.postimg.cc/bJhZ6j53/Frame-4.png"}):(0,r.jsx)(o.E,{className:"pb-6",height:50,fit:"contain",src:"https://i.postimg.cc/xTngTWcK/Group-7.png"}),(0,r.jsxs)("div",{className:"flex mb-2 px-28 w-full",children:[" ",(0,r.jsx)("form",{id:"searchbar",className:"relative flex-grow pr-3",onSubmit:E,children:(0,r.jsx)(h.ReactSearchAutocomplete,{className:"autocomplete-dropdown",items:g,onSearch:N,onHover:D,onSelect:k,onFocus:z,autoFocus:!0,formatResult:F,maxResults:7,placeholder:"Cymraeg"===b?"Gofyn cwestiwn...":"Ask a question...",showNoResults:!1,showIcon:!1,styling:{borderRadius:"5px",fontSize:"14px",height:"38px"}})}),(0,r.jsx)(l.A,{id:"sendbutton",className:"border border-gray-300 rounded h-10 w-10",type:"submit",children:(0,r.jsx)(p.Z,{size:"1.125rem"})})]}),(0,r.jsxs)("div",{id:"prompts",className:"w-full flex gap-3 mb-2 pt-2 px-40 items-center justify-center gap-3",children:[" ",(0,r.jsx)(m.Z,{size:"1.125rem",style:{color:"#697075"}}),(0,r.jsx)(n.z,{variant:"outline",color:"gray",radius:"xl",compact:!0,style:{borderColor:"#D8DBDF",color:"#697075",fontWeight:"normal"},onClick:()=>S("Cymraeg"===b?"Sut alla i gael cymorth costau byw?":"How can I get cost of living support?"),children:"Cymraeg"===b?"Costau byw":"Cost of living"}),(0,r.jsx)(n.z,{variant:"outline",color:"gray",radius:"xl",compact:!0,style:{borderColor:"#D8DBDF",color:"#697075",fontWeight:"normal"},onClick:()=>S("Cymraeg"===b?"Pa help alla i ei gael gyda fy miliau ynni?":"What help can I get with my energy bills?"),children:"Cymraeg"===b?"Biliau ynni":"Energy bills"}),(0,r.jsx)(n.z,{variant:"outline",color:"gray",radius:"xl",compact:!0,style:{borderColor:"#D8DBDF",color:"#697075",fontWeight:"normal"},onClick:()=>S("Cymraeg"===b?"Sut mae cyflwyno hunanasesiad treth?":"How do I submit a tax self assessment?"),children:"Cymraeg"===b?"Hunanasesiad treth":"Tax self assessment"}),(0,r.jsx)(n.z,{variant:"outline",color:"gray",radius:"xl",compact:!0,style:{borderColor:"#D8DBDF",color:"#697075",fontWeight:"normal"},onClick:()=>S("Cymraeg"===b?"Sut mae gwneud cais am basbort?":"How do I apply for a passport?"),children:"Cymraeg"===b?"Pasbort":"Passport"})]}),(0,r.jsxs)("div",{id:"language",className:"w-full flex gap-3 pt-3 px-40 items-center justify-center gap-3",children:[" ",(0,r.jsx)(i.s,{data:[{value:"English",label:(0,r.jsxs)(c.M,{children:[(0,r.jsx)(d.x,{children:"\uD83C\uDDEC\uD83C\uDDE7"}),(0,r.jsx)(u.x,{ml:6,sx:{fontSize:"0.75rem"},children:"English"})]})},{value:"Cymraeg",label:(0,r.jsxs)(c.M,{children:[(0,r.jsx)(d.x,{children:"\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73\uDB40\uDC7F"}),(0,r.jsx)(u.x,{ml:6,sx:{fontSize:"0.75rem"},children:"Cymraeg"})]})}],onChange:v})]})]}),(0,r.jsxs)("div",{id:"bottom",className:"w-full h-12 flex items-center justify-center gap-3",children:[(0,r.jsx)(d.x,{fz:"xs",style:{color:"#697075"},children:"Cymraeg"===b?"Mae GOVGPT yn arbrawf":"GOVGPT is an experiment"}),(0,r.jsx)("p",{style:{fontSize:"11px",color:"#697075"},children:"|"}),(0,r.jsxs)(d.x,{fz:"xs",style:{color:"#697075"},children:["Cymraeg"===b?"Cynnwys a gyhoeddwyd o dan y":"Content published under the"," ",(0,r.jsx)("a",{href:"https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",style:{textDecoration:"underline"},children:"Open Government Licence v3.0"}),"."]}),(0,r.jsx)("p",{style:{fontSize:"11px",color:"#697075"},children:"|"}),(0,r.jsxs)(d.x,{fz:"xs",style:{color:"#697075"},children:["Cymraeg"===b?"Adeiladwyd gyda ❤ yn \xf4l":"Built with ❤ by","  ",(0,r.jsx)("a",{href:"https://www.general-purpose.io",style:{textDecoration:"underline"},children:"General Purpose"})]})]})]})};s.default=y}},function(e){e.O(0,[65,366,774,888,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);