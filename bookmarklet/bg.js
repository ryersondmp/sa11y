!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){"use strict";const e="3.0.4",t=e=>{const t=`Sa11yLang${e.charAt(0).toUpperCase()+e.slice(1)}`;Sa11y.Lang.addI18n(window[t].strings),new Sa11y.Sa11y({autoDetectShadowComponents:!0,customChecks:!1,detectSPArouting:!0})};"object"==typeof Sa11y?window.location.pathname.includes("sa11y")?alert('Плъзнете бутона "Sa11y" в лентата с отметки. След това щракнете върху отметките на всяка уебстраница.'):alert("Sa11y вече е зареден на тази страница. Моля, изчакайте или презаредете страницата и опитайте отново."):function(n){const s=document.createElement("link"),a=document.getElementsByTagName("head")[0];s.rel="stylesheet",s.href=`https://cdn.jsdelivr.net/gh/ryersondmp/sa11y@${e}/dist/css/sa11y.min.css`,s.type="text/css",a.appendChild(s);const d=document.createElement("script");d.src=`https://cdn.jsdelivr.net/combine/gh/ryersondmp/sa11y@${e}/dist/js/lang/${n}.umd.min.js,gh/ryersondmp/sa11y@${e}/dist/js/sa11y.umd.min.js`,document.body.appendChild(d),d.onload=()=>t(n),d.onreadystatechange=()=>t(n)}("bg")}));
