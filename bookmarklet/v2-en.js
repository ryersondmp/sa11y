(function(o){typeof define=="function"&&define.amd?define(o):o()})((function(){"use strict";const o="5.0.3",a=`
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
</svg>`,r=()=>new Promise((t,n)=>{const e=document.createElement("link");e.rel="stylesheet",e.href=`https://cdn.jsdelivr.net/gh/ryersondmp/sa11y@${o}/dist/css/sa11y.min.css`,e.onload=t,e.onerror=n,document.head.appendChild(e)}),s=()=>new Promise((t,n)=>{const e=document.createElement("script");e.src=`https://cdn.jsdelivr.net/combine/gh/ryersondmp/sa11y@${o}/dist/js/lang/en.umd.min.js,gh/ryersondmp/sa11y@${o}/dist/js/sa11y.umd.min.js`,e.onload=t,e.onerror=n,document.body.appendChild(e)}),d=()=>{const t=()=>{Sa11y.Lang.addI18n(Sa11yLangEn.strings),new Sa11y.Sa11y({autoDetectShadowComponents:!0,customChecks:!1,exportResultsPlugin:!0,detectSPArouting:!0})},n=document.getElementById("sa11y-loading"),e=document.querySelector("iframe.player")?.getAttribute("src")||"";let i=!1;try{const{protocol:p,hostname:m}=new URL(e);i=p==="https:"&&["360.articulate.com","articulate.com"].includes(m)}catch{i=!1}const{origin:c,pathname:l}=window.location;c==="https://360.articulate.com"&&l.startsWith("/review/content")&&i?(n?.remove(),confirm("Redirect to check accessibility in a new tab?")&&window.open(e,"_blank","noopener,noreferrer")):(t(),n?.remove())};(()=>{const t=document.createElement("div");t.id="sa11y-loading";const n=t.attachShadow({mode:"open"}),e=document.createElement("div");e.classList.add("loader"),e.innerHTML=a,n.appendChild(e),document.body.appendChild(t),r().then(()=>s()).then(()=>d()).catch(i=>new Error("Error loading Sa11y:",i))})()}));
