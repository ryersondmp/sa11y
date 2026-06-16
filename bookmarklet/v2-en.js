(function(a){typeof define=="function"&&define.amd?define(a):a()})((function(){"use strict";const a="5.0.8",p=`
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
</svg>`,d=n=>{const e=(n||"en").split("-");let t=e[0];const o=e[1]?e[1].toLowerCase():"";return["bg","cs","da","de","el","en","es","et","fi","fr","hu","id","it","ja","ko","lt","lv","nb","nl","pl","pt","ro","sl","sk","sv","ta","tr","uk","ua","zh"].includes(t)?t==="pt"?t=o==="br"?"ptBR":"ptPT":t==="uk"?t="ua":t==="en"&&(t=o==="us"?"enUS":"en"):t="en",t},g=()=>new Promise((n,s)=>{const e=document.createElement("link");e.rel="stylesheet",e.href=`https://cdn.jsdelivr.net/gh/ryersondmp/sa11y@${a}/dist/css/sa11y.min.css`,e.onload=n,e.onerror=s,document.head.appendChild(e)}),u=(n,s)=>new Promise((e,t)=>{const o=document.createElement("script"),i=[`gh/ryersondmp/sa11y@${a}/dist/js/lang/${n}.umd.min.js`];n!==s&&i.push(`gh/ryersondmp/sa11y@${a}/dist/js/lang/${s}.umd.min.js`),i.push(`gh/ryersondmp/sa11y@${a}/dist/js/sa11y.umd.min.js`),o.src=`https://cdn.jsdelivr.net/combine/${i.join(",")}`,o.onload=e,o.onerror=t,document.body.appendChild(o)}),m=(n,s)=>{const e=()=>{const r=`Sa11yLang${n.charAt(0).toUpperCase()+n.slice(1)}`,c=`Sa11yLang${s.charAt(0).toUpperCase()+s.slice(1)}`,l=window[r]||{},f=window[c]||{},w={...l.strings||l,...f.ruleset||{}};Sa11y.Lang.addI18n(w),new Sa11y.Sa11y({autoDetectShadowComponents:!0,customChecks:!1,exportResultsPlugin:!0,detectSPArouting:!0})},t=document.getElementById("sa11y-loading"),o=document.querySelector("iframe.player")?.getAttribute("src")||"";let i=!1;try{const{protocol:r,hostname:c}=new URL(o);i=r==="https:"&&["360.articulate.com","articulate.com"].includes(c)}catch{i=!1}const{origin:h,pathname:y}=window.location;h==="https://360.articulate.com"&&y.startsWith("/review/content")&&i?(t?.remove(),confirm("Redirect to check accessibility in a new tab?")&&window.open(o,"_blank","noopener,noreferrer")):(e(),t?.remove())};(()=>{const n=document.createElement("div");n.id="sa11y-loading";const s=n.attachShadow({mode:"open"}),e=document.createElement("div");e.classList.add("loader"),e.innerHTML=p,s.appendChild(e),document.body.appendChild(n);const t=d(document.documentElement.lang),o=d(navigator.language||navigator.languages?.[0]);g().then(()=>u(o,t)).then(()=>m(o,t)).catch(i=>new Error("Error loading Sa11y:",i))})()}));
