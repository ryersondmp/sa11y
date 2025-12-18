(function(r){typeof define=="function"&&define.amd?define(r):r()})((function(){"use strict";const r="4.4.0",d=`
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
</svg>`,c=()=>new Promise((n,i)=>{const t=document.createElement("link");t.rel="stylesheet",t.href=`https://raw.githack.com/ryersondmp/sa11y/${r}/dist/css/sa11y.css`,t.onload=n,t.onerror=i,document.head.appendChild(t)}),l=n=>new Promise((i,t)=>{const s=[`https://raw.githack.com/ryersondmp/sa11y/${r}/dist/js/sa11y.umd.js`,`https://raw.githack.com/ryersondmp/sa11y/${r}/dist/js/lang/${n}.umd.js`];let o=0;function e(){if(o>=s.length)return i();const a=document.createElement("script");a.src=s[o++],a.onload=e,a.onerror=t,document.body.appendChild(a)}e()}),p=n=>{const i=()=>{const s=`Sa11yLang${n.charAt(0).toUpperCase()+n.slice(1)}`;Sa11y.Lang.addI18n(window[s].strings),new Sa11y.Sa11y({autoDetectShadowComponents:!0,customChecks:!1,exportResultsPlugin:!0,detectSPArouting:!0})};if(window.location.href.includes("https://360.articulate.com/review/content")){const s=document.querySelector("iframe.player"),o=s.getAttribute("src");s&&o?(document.getElementById("sa11y-loading").remove(),window.confirm("Press OK to be redirected to a page where you can check the accessibility of the content. The page will open in a new tab.")&&window.open(o,"_blank")):i()}else i(),document.getElementById("sa11y-loading").remove()};(()=>{const n=document.createElement("div");n.id="sa11y-loading";const i=n.attachShadow({mode:"open"}),t=document.createElement("div");t.classList.add("loader"),t.innerHTML=d,i.appendChild(t),document.body.appendChild(n);const o=(document.documentElement.lang||"en").split("-");let e=o[0];const a=o[1]?o[1].toLowerCase():"";["bg","cs","da","de","el","en","es","et","fi","fr","hu","id","it","ja","ko","lt","lv","nb","nl","pl","pt","ro","sl","sk","sv","tr","uk","ua","zh"].includes(e)?e==="pt"?e=a==="br"?"ptBR":"ptPT":e==="uk"?e="ua":e==="en"&&(e=a==="us"?"enUS":"en"):e="en",c().then(()=>l(e)).then(()=>p(e)).catch(u=>new Error("Error loading Sa11y:",u))})()}));
