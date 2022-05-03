/* FOR LOCAL DEVELOPMENT: Switch to false. */
/* FOR LOCAL DEVELOPMENT: Switch to false. */
/* FOR LOCAL DEVELOPMENT: Switch to false. */

const production = true;
const v = "2.2.3"; //Version

/* FOR LOCAL DEVELOPMENT: Switch to false. */
/* FOR LOCAL DEVELOPMENT: Switch to false. */
/* FOR LOCAL DEVELOPMENT: Switch to false. */

//Sa11y's version.
const webV = document.getElementById("v");
webV.innerHTML = v;

//Demo page styling.
const bodyheader = document.getElementsByTagName("head")[0]; 
const style = document.createElement("link");
const url = window.location.href;

style.setAttribute("rel", "stylesheet");
style.setAttribute("type", "text/css");
style.setAttribute("href", "../assets/main.css");
bodyheader.appendChild(style);

/* Production mode */
if (production === false) {
    const warningMode = document.createElement("div");
    warningMode.setAttribute("class", "bg-danger p-1 text-white fixed-top text-center");
    warningMode.setAttribute("id", "sa11y-dev-mode");
    warningMode.innerText = "Development mode";
    const body = document.getElementsByTagName("body")[0];
    body.appendChild(warningMode);

    const sa11ycss = document.createElement("link");
    sa11ycss.setAttribute("rel", "stylesheet");
    sa11ycss.setAttribute("href", "../../../src/sa11y.css");
    sa11ycss.setAttribute("type", "text/css");

    bodyheader.appendChild(sa11ycss);

    const tippy = document.createElement("script");
    tippy.src = "https://cdn.jsdelivr.net/combine/npm/@popperjs/core@2/dist/umd/popper.min.js,npm/tippy.js@6/dist/tippy.umd.min.js";
    document.body.appendChild(tippy);

    tippy.onload = tippy.onreadystatechange = function () {

        const sa11yDevEnglish = document.createElement("script");

        if (url.indexOf("pl") > -1) {
            sa11yDevEnglish.src = "../../../src/lang/pl.js";
        } else if (url.indexOf("fr") > -1) {
            sa11yDevEnglish.src = "../../../src/lang/fr-ca.js";
        } else if (url.indexOf("ua") > -1) {
            sa11yDevEnglish.src = "../../../src/lang/ua.js";
        } else {
            sa11yDevEnglish.src = "../../../src/lang/en.js";
        }
        
        document.body.appendChild(sa11yDevEnglish);

        sa11yDevEnglish.onload = sa11yDevEnglish.onreadystatechange = function () {
            const sa11yDev = document.createElement("script");
            sa11yDev.src = "../../../src/sa11y.js";
            document.body.appendChild(sa11yDev);

            sa11yDev.onload = sa11yDev.onreadystatechange = function () {

                // Abstracted custom rulesets
                const sa11yCustom = document.createElement("script");
                sa11yCustom.src = "../../../src/sa11y-custom-checks.js";
                document.body.appendChild(sa11yCustom);

                new Sa11y({
                    checkRoot: 'body',
                    readabilityRoot: 'main',
                    containerIgnore: '#list-example, footer',
                    linksToFlag: 'a[href^="https://www.dev."]',
                    linkIgnoreSpan: '.sr-only-example',
                    detectSPArouting: true,
                    doNotRun: '[data-sa11y-hide]'
                });
            }
        }
    };
}

/* Production mode */
else {
    const sa11ycss = document.createElement("link");
    sa11ycss.setAttribute("rel", "stylesheet");
    sa11ycss.setAttribute("href", `https://cdn.jsdelivr.net/gh/ryersondmp/sa11y@${v}/src/sa11y.min.css`);
    sa11ycss.setAttribute("type", "text/css");

    bodyheader.appendChild(sa11ycss);

    const combine = document.createElement("script");

    if (url.indexOf("pl") > -1) {
        combine.src = `https://cdn.jsdelivr.net/combine/npm/@popperjs/core@2/dist/umd/popper.min.js,npm/tippy.js@6/dist/tippy.umd.min.js,gh/ryersondmp/sa11y@${v}/src/lang/pl.min.js,gh/ryersondmp/sa11y@${v}/src/sa11y-custom-checks.min.js,gh/ryersondmp/sa11y@${v}/src/sa11y.min.js`;
    } else if (url.indexOf("fr") > -1) {
        combine.src = `https://cdn.jsdelivr.net/combine/npm/@popperjs/core@2/dist/umd/popper.min.js,npm/tippy.js@6/dist/tippy.umd.min.js,gh/ryersondmp/sa11y@${v}/src/lang/fr-ca.min.js,gh/ryersondmp/sa11y@${v}/src/sa11y-custom-checks.min.js,gh/ryersondmp/sa11y@${v}/src/sa11y.min.js`;
    } else if (url.indexOf("ua") > -1) {
        combine.src = `https://cdn.jsdelivr.net/combine/npm/@popperjs/core@2/dist/umd/popper.min.js,npm/tippy.js@6/dist/tippy.umd.min.js,gh/ryersondmp/sa11y@${v}/src/lang/ua.min.js,gh/ryersondmp/sa11y@${v}/src/sa11y-custom-checks.min.js,gh/ryersondmp/sa11y@${v}/src/sa11y.min.js`;
    } else {
        combine.src = `https://cdn.jsdelivr.net/combine/npm/@popperjs/core@2/dist/umd/popper.min.js,npm/tippy.js@6/dist/tippy.umd.min.js,gh/ryersondmp/sa11y@${v}/src/lang/en.min.js,gh/ryersondmp/sa11y@${v}/src/sa11y-custom-checks.min.js,gh/ryersondmp/sa11y@${v}/src/sa11y.min.js`;
    }

    document.body.appendChild(combine);
    combine.onload = combine.onreadystatechange = function () {
        new Sa11y({
            checkRoot: "body",
            readabilityRoot: "main",
            containerIgnore: 'footer',
            linksToFlag: "a[href^='https://www.dev.']",
            linkIgnoreSpan: '.sr-only-example',
            detectSPArouting: true
        });
    };
}