!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){"use strict";const e="3.0.4",n=e=>{const n=`Sa11yLang${e.charAt(0).toUpperCase()+e.slice(1)}`;Sa11y.Lang.addI18n(window[n].strings),new Sa11y.Sa11y({autoDetectShadowComponents:!0,customChecks:!1,detectSPArouting:!0})};"object"==typeof Sa11y?window.location.pathname.includes("sa11y")?alert('Gumb "Sa11y" povlecite v vrstico zaznamkov. Nato kliknite zaznamek na kateri koli spletni strani.'):alert("Sa11y je že naložen na tej strani. Počakajte ali ponovno naložite stran in poskusite znova."):function(t){const a=document.createElement("link"),s=document.getElementsByTagName("head")[0];a.rel="stylesheet",a.href=`https://cdn.jsdelivr.net/gh/ryersondmp/sa11y@${e}/dist/css/sa11y.min.css`,a.type="text/css",s.appendChild(a);const o=document.createElement("script");o.src=`https://cdn.jsdelivr.net/combine/gh/ryersondmp/sa11y@${e}/dist/js/lang/${t}.umd.min.js,gh/ryersondmp/sa11y@${e}/dist/js/sa11y.umd.min.js`,document.body.appendChild(o),o.onload=()=>n(t),o.onreadystatechange=()=>n(t)}("sl")}));
