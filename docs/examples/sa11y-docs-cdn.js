//Switch to false for development mode.
const production = true;

/* Production mode */
if (production === true) {

    const sa11ycss = document.createElement("link");
    sa11ycss.setAttribute("rel", "stylesheet");
    sa11ycss.setAttribute("href", "https://cdn.jsdelivr.net/gh/ryersondmp/sa11y@2.1.5/src/sa11y.min.css");
    sa11ycss.setAttribute("type", "text/css");

    const bodyheader = document.getElementsByTagName("head")[0];
    bodyheader.appendChild(sa11ycss);

    const combine = document.createElement("script");
    combine.src = "https://cdn.jsdelivr.net/combine/npm/@popperjs/core@2/dist/umd/popper.min.js,npm/tippy.js@6/dist/tippy.umd.min.js,gh/ryersondmp/sa11y@2.1.5/src/sa11y-english.min.js,gh/ryersondmp/sa11y@2.1.5/src/sa11y.min.js";

    document.body.appendChild(combine);
    combine.onload = combine.onreadystatechange = function() {
        new Sa11y({
            checkRoot: "main",
            readabilityRoot: "main",
            linksToFlag: "a[href^='https://www.dev.'], a[href*='wp-admin']",
            exampleQA: true,
            detectSPArouting: true,
        });
    };
} 

/* Development mode */
else {

    const warningMode = document.createElement("div");
    warningMode.setAttribute("class", "alert alert-danger fixed-top text-center");
    warningMode.setAttribute("style", "width: 200px")
    warningMode.innerText = "Development mode";
    const body = document.getElementsByTagName("body")[0];
    body.appendChild(warningMode);


    const sa11ycss = document.createElement("link");
    sa11ycss.setAttribute("rel", "stylesheet");
    sa11ycss.setAttribute("href", "../../src/sa11y.css");
    sa11ycss.setAttribute("type", "text/css");

    const bodyheader = document.getElementsByTagName("head")[0];
    bodyheader.appendChild(sa11ycss);

    const tippy = document.createElement("script");
    tippy.src = "https://cdn.jsdelivr.net/combine/npm/@popperjs/core@2/dist/umd/popper.min.js,npm/tippy.js@6/dist/tippy.umd.min.js";
    document.body.appendChild(tippy);

    tippy.onload =  tippy.onreadystatechange = function() {
        const sa11yDevEnglish = document.createElement("script");
        sa11yDevEnglish.src = "../../src/sa11y-english.js";
        document.body.appendChild(sa11yDevEnglish);   

        sa11yDevEnglish.onload = sa11yDevEnglish.onreadystatechange = function() {
            const sa11yDev = document.createElement("script");
            sa11yDev.src = "../../src/sa11y.js";
            document.body.appendChild(sa11yDev);  

            sa11yDev.onload = sa11yDev.onreadystatechange = function() {
                new Sa11y({
                    checkRoot: "main",
                    readabilityRoot: "main",
                    linksToFlag: "a[href^='https://www.dev.'], a[href*='wp-admin']",
                    exampleQA: true,
                    linkIgnoreSpan: '.sr-only-example',
                    detectSPArouting: true,
                });
            }
        }
    };
}

document.addEventListener(
    'DOMContentLoaded',
    (e) => {
      const iframe = document.getElementById("iframe-check"),
        newTabOnly = document.getElementById("newtabonly");

      if (window.top == window) {
        iframe.remove();
      } else {
        iframe.style.display = "block";
      }

      if (window.top != window) {
        newTabOnly.style.display = "none";
      } else {
        newTabOnly.style.display = "block";
      }
 });