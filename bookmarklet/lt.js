!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){"use strict";const e="3.0.9",t=e=>{const t=`Sa11yLang${e.charAt(0).toUpperCase()+e.slice(1)}`;Sa11y.Lang.addI18n(window[t].strings),new Sa11y.Sa11y({autoDetectShadowComponents:!0,customChecks:!1,exportResultsPlugin:!0,detectSPArouting:!0})};"object"==typeof Sa11y?window.location.pathname.includes("sa11y")?alert('Vilkite mygtuką "Sa11y" į skirtukų juostą. Tada spustelėkite žymę bet kuriame tinklalapyje.'):alert("Sa11y jau įkeltas į šį puslapį. Palaukite arba įkelkite puslapį iš naujo ir bandykite dar kartą."):function(n){const a=document.createElement("link"),s=document.getElementsByTagName("head")[0];a.rel="stylesheet",a.href=`https://cdn.jsdelivr.net/gh/ryersondmp/sa11y@${e}/dist/css/sa11y.min.css`,a.type="text/css",s.appendChild(a);const i=document.createElement("script");i.src=`https://cdn.jsdelivr.net/combine/gh/ryersondmp/sa11y@${e}/dist/js/lang/${n}.umd.min.js,gh/ryersondmp/sa11y@${e}/dist/js/sa11y.umd.min.js`,document.body.appendChild(i),i.onload=()=>t(n),i.onreadystatechange=()=>t(n)}("lt")}));
