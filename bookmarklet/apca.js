(function(s){typeof define=="function"&&define.amd?define(s):s()})((function(){"use strict";const s="4.5.0",c=`
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
</svg>`,l=()=>new Promise((n,i)=>{const t=document.createElement("link");t.rel="stylesheet",t.href=`https://cdn.jsdelivr.net/gh/ryersondmp/sa11y@${s}/dist/css/sa11y.min.css`,t.onload=n,t.onerror=i,document.head.appendChild(t)}),p=n=>new Promise((i,t)=>{const o=document.createElement("script");o.src=`https://cdn.jsdelivr.net/combine/gh/ryersondmp/sa11y@${s}/dist/js/lang/${n}.umd.min.js,gh/ryersondmp/sa11y@${s}/dist/js/sa11y.umd.min.js`,o.onload=i,o.onerror=t,document.body.appendChild(o)}),u=n=>{const i=()=>{const d=`Sa11yLang${n.charAt(0).toUpperCase()+n.slice(1)}`;Sa11y.Lang.addI18n(window[d].strings),new Sa11y.Sa11y({autoDetectShadowComponents:!0,customChecks:!1,exportResultsPlugin:!0,detectSPArouting:!0,contrastAPCA:!0})},t=window.location.href,o=document.getElementById("sa11y-loading"),e=document.querySelector("iframe.player")?.getAttribute("src")||"",a=e.startsWith("https://360.articulate.com")||e.startsWith("https://articulate.com");t.includes("https://360.articulate.com/review/content")&&a?(o?.remove(),confirm("Redirect to check accessibility in a new tab?")&&window.open(e,"_blank","noopener,noreferrer")):(i(),o?.remove())};(()=>{const n=document.createElement("div");n.id="sa11y-loading";const i=n.attachShadow({mode:"open"}),t=document.createElement("div");t.classList.add("loader"),t.innerHTML=c,i.appendChild(t),document.body.appendChild(n);const r=(document.documentElement.lang||"en").split("-");let e=r[0];const a=r[1]?r[1].toLowerCase():"";["bg","cs","da","de","el","en","es","et","fi","fr","hu","id","it","ja","ko","lt","lv","nb","nl","pl","pt","ro","sl","sk","sv","tr","uk","ua","zh"].includes(e)?e==="pt"?e=a==="br"?"ptBR":"ptPT":e==="uk"?e="ua":e==="en"&&(e=a==="us"?"enUS":"en"):e="en",l().then(()=>p(e)).then(()=>u(e)).catch(m=>new Error("Error loading Sa11y:",m))})()}));
