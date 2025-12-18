(function(s){typeof define=="function"&&define.amd?define(s):s()})((function(){"use strict";const s="4.4.0",d=`
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
</svg>`,c=()=>new Promise((t,i)=>{const e=document.createElement("link");e.rel="stylesheet",e.href=`https://cdn.jsdelivr.net/gh/ryersondmp/sa11y@${s}/dist/css/sa11y.min.css`,e.onload=t,e.onerror=i,document.head.appendChild(e)}),l=t=>new Promise((i,e)=>{const n=document.createElement("script");n.src=`https://cdn.jsdelivr.net/combine/gh/ryersondmp/sa11y@${s}/dist/js/lang/${t}.umd.min.js,gh/ryersondmp/sa11y@${s}/dist/js/sa11y.umd.min.js`,n.onload=i,n.onerror=e,document.body.appendChild(n)}),p=t=>{const i=()=>{const n=`Sa11yLang${t.charAt(0).toUpperCase()+t.slice(1)}`;Sa11y.Lang.addI18n(window[n].strings),new Sa11y.Sa11y({autoDetectShadowComponents:!0,customChecks:!1,exportResultsPlugin:!0,detectSPArouting:!0,contrastAPCA:!0})};if(window.location.href.includes("https://360.articulate.com/review/content")){const n=document.querySelector("iframe.player"),r=n.getAttribute("src");n&&r?(document.getElementById("sa11y-loading").remove(),window.confirm("Press OK to be redirected to a page where you can check the accessibility of the content. The page will open in a new tab.")&&window.open(r,"_blank")):i()}else i(),document.getElementById("sa11y-loading").remove()};(()=>{const t=document.createElement("div");t.id="sa11y-loading";const i=t.attachShadow({mode:"open"}),e=document.createElement("div");e.classList.add("loader"),e.innerHTML=d,i.appendChild(e),document.body.appendChild(t);const r=(document.documentElement.lang||"en").split("-");let o=r[0];const a=r[1]?r[1].toLowerCase():"";["bg","cs","da","de","el","en","es","et","fi","fr","hu","id","it","ja","ko","lt","lv","nb","nl","pl","pt","ro","sl","sk","sv","tr","uk","ua","zh"].includes(o)?o==="pt"?o=a==="br"?"ptBR":"ptPT":o==="uk"?o="ua":o==="en"&&(o=a==="us"?"enUS":"en"):o="en",c().then(()=>l(o)).then(()=>p(o)).catch(u=>new Error("Error loading Sa11y:",u))})()}));
