!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){"use strict";const e="3.0.4",t=e=>{const t=`Sa11yLang${e.charAt(0).toUpperCase()+e.slice(1)}`;Sa11y.Lang.addI18n(window[t].strings),new Sa11y.Sa11y({autoDetectShadowComponents:!0,customChecks:!1,detectSPArouting:!0})};"object"==typeof Sa11y?window.location.pathname.includes("sa11y")?alert('Lohistage nupp "Sa11y" oma järjehoidjate riba. Seejärel klõpsake järjehoidjal ükskõik millisel veebilehel.'):alert("Sa11y on jo ladattu tälle sivulle. Odota, tai lataa sivu uudelleen ja yritä uudelleen."):function(n){const a=document.createElement("link"),s=document.getElementsByTagName("head")[0];a.rel="stylesheet",a.href=`https://cdn.jsdelivr.net/gh/ryersondmp/sa11y@${e}/dist/css/sa11y.min.css`,a.type="text/css",s.appendChild(a);const d=document.createElement("script");d.src=`https://cdn.jsdelivr.net/combine/gh/ryersondmp/sa11y@${e}/dist/js/lang/${n}.umd.min.js,gh/ryersondmp/sa11y@${e}/dist/js/sa11y.umd.min.js`,document.body.appendChild(d),d.onload=()=>t(n),d.onreadystatechange=()=>t(n)}("fi")}));
