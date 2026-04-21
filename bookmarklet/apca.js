(function(a){typeof define=="function"&&define.amd?define(a):a()})((function(){"use strict";const a="5.0.3",d=`
<style>
.loader {
  height: 55px;
  width: 55px;
  background: linear-gradient(0deg, #e040fb, #00bcd4);
  background-color: var(--sa11y-setting-switch-bg-off);
  background-size: 150% 150%;
  border-radius: 50%;
  text-align: center;
  vertical-align: middle;
  bottom: 15px;
  inset-inline-end: 18px;
  position: fixed;
  z-index: 9999;
}
</style>

<!-- Credit: https://codepen.io/aurer/pen/ZEJxpO -->
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="55px" height="55px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
  <path fill="#FFF" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
  <animateTransform attributeType="xml"
    attributeName="transform"
    type="rotate"
    from="0 25 25"
    to="360 25 25"
    dur="1.2s"
    repeatCount="indefinite"/>
  </path>
</svg>`,l=()=>new Promise((n,i)=>{const e=document.createElement("link");e.rel="stylesheet",e.href=`https://cdn.jsdelivr.net/gh/ryersondmp/sa11y@${a}/dist/css/sa11y.min.css`,e.onload=n,e.onerror=i,document.head.appendChild(e)}),p=n=>new Promise((i,e)=>{const o=document.createElement("script");o.src=`https://cdn.jsdelivr.net/combine/gh/ryersondmp/sa11y@${a}/dist/js/lang/${n}.umd.min.js,gh/ryersondmp/sa11y@${a}/dist/js/sa11y.umd.min.js`,o.onload=i,o.onerror=e,document.body.appendChild(o)}),u=n=>{const i=()=>{const r=`Sa11yLang${n.charAt(0).toUpperCase()+n.slice(1)}`;Sa11y.Lang.addI18n(window[r].strings),new Sa11y.Sa11y({autoDetectShadowComponents:!0,customChecks:!1,exportResultsPlugin:!0,detectSPArouting:!0,contrastAPCA:!0})},e=document.getElementById("sa11y-loading"),o=document.querySelector("iframe.player")?.getAttribute("src")||"";let s=!1;try{const{protocol:r,hostname:g}=new URL(o);s=r==="https:"&&["360.articulate.com","articulate.com"].includes(g)}catch{s=!1}const{origin:t,pathname:c}=window.location;t==="https://360.articulate.com"&&c.startsWith("/review/content")&&s?(e?.remove(),confirm("Redirect to check accessibility in a new tab?")&&window.open(o,"_blank","noopener,noreferrer")):(i(),e?.remove())};(()=>{const n=document.createElement("div");n.id="sa11y-loading";const i=n.attachShadow({mode:"open"}),e=document.createElement("div");e.classList.add("loader"),e.innerHTML=d,i.appendChild(e),document.body.appendChild(n);const s=(document.documentElement.lang||"en").split("-");let t=s[0];const c=s[1]?s[1].toLowerCase():"";["bg","cs","da","de","el","en","es","et","fi","fr","hu","id","it","ja","ko","lt","lv","nb","nl","pl","pt","ro","sl","sk","sv","ta","tr","uk","ua","zh"].includes(t)?t==="pt"?t=c==="br"?"ptBR":"ptPT":t==="uk"?t="ua":t==="en"&&(t=c==="us"?"enUS":"en"):t="en",l().then(()=>p(t)).then(()=>u(t)).catch(r=>new Error("Error loading Sa11y:",r))})()}));
