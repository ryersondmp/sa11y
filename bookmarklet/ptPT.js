!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){"use strict";const e="3.0.4",t=e=>{const t=`Sa11yLang${e.charAt(0).toUpperCase()+e.slice(1)}`;Sa11y.Lang.addI18n(window[t].strings),new Sa11y.Sa11y({autoDetectShadowComponents:!0,customChecks:!1,detectSPArouting:!0})};"object"==typeof Sa11y?window.location.pathname.includes("sa11y")?alert('Arraste o botão "Sa11y" para a sua barra de favoritos. Em seguida, clique no marcador em qualquer página da Web.'):alert("Sa11y já foi carregado nesta página. Aguarde, ou recarregue a página e tente novamente."):function(a){const n=document.createElement("link"),s=document.getElementsByTagName("head")[0];n.rel="stylesheet",n.href=`https://cdn.jsdelivr.net/gh/ryersondmp/sa11y@${e}/dist/css/sa11y.min.css`,n.type="text/css",s.appendChild(n);const o=document.createElement("script");o.src=`https://cdn.jsdelivr.net/combine/gh/ryersondmp/sa11y@${e}/dist/js/lang/${a}.umd.min.js,gh/ryersondmp/sa11y@${e}/dist/js/sa11y.umd.min.js`,document.body.appendChild(o),o.onload=()=>t(a),o.onreadystatechange=()=>t(a)}("ptPT")}));
