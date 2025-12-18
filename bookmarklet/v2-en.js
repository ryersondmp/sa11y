(function(n){typeof define=="function"&&define.amd?define(n):n()})((function(){"use strict";const n="4.4.0",r=`
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
</svg>`,s=()=>new Promise((t,o)=>{const e=document.createElement("link");e.rel="stylesheet",e.href=`https://cdn.jsdelivr.net/gh/ryersondmp/sa11y@${n}/dist/css/sa11y.min.css`,e.onload=t,e.onerror=o,document.head.appendChild(e)}),a=()=>new Promise((t,o)=>{const e=document.createElement("script");e.src=`https://cdn.jsdelivr.net/combine/gh/ryersondmp/sa11y@${n}/dist/js/lang/en.umd.min.js,gh/ryersondmp/sa11y@${n}/dist/js/sa11y.umd.min.js`,e.onload=t,e.onerror=o,document.body.appendChild(e)}),d=()=>{const t=()=>{Sa11y.Lang.addI18n(Sa11yLangEn.strings),new Sa11y.Sa11y({autoDetectShadowComponents:!0,customChecks:!1,exportResultsPlugin:!0,detectSPArouting:!0})};if(window.location.href.includes("https://360.articulate.com/review/content")){const e=document.querySelector("iframe.player"),i=e.getAttribute("src");e&&i?(document.getElementById("sa11y-loading").remove(),window.confirm("Press OK to be redirected to a page where you can check the accessibility of the content. The page will open in a new tab.")&&window.open(i,"_blank")):t()}else t(),document.getElementById("sa11y-loading").remove()};(()=>{const t=document.createElement("div");t.id="sa11y-loading";const o=t.attachShadow({mode:"open"}),e=document.createElement("div");e.classList.add("loader"),e.innerHTML=r,o.appendChild(e),document.body.appendChild(t),s().then(()=>a()).then(()=>d()).catch(i=>new Error("Error loading Sa11y:",i))})()}));
