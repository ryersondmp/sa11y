import loadGlobals from "../js/LoadGlobals";
import reset from "../js/Reset";
import scanPage from "../js/ScanPage";

export default function generalSetup() {
    const elemtoIgnore = loadGlobals();
    var sa11yToggle = $("#sa11y-toggle");
    sa11yToggle.click(() => {
        if (localStorage.getItem("sa11y-panel") === "opened") {
            localStorage.setItem("sa11y-panel", "closed");
            sa11yToggle.removeClass("sa11y-on").attr("aria-expanded", "false");
            reset();
        } else {
            localStorage.setItem("sa11y-panel", "opened");
            sa11yToggle.addClass("sa11y-on").attr("aria-expanded", "true");
            scanPage(elemtoIgnore);
        }
    });
    //Remember to leave it open
    if (localStorage.getItem("sa11y-panel") === "opened") {
        sa11yToggle.addClass("sa11y-on").attr("aria-expanded", "true");
    }

    //Crudely give a little time to load any other content or slow post-rendered JS, iFrames, etc.
    if (sa11yToggle.hasClass("sa11y-on")) {
        sa11yToggle.toggleClass("loading-sa11y");
        sa11yToggle.attr("aria-expanded", "true");
        setTimeout(() => {
            scanPage(elemtoIgnore);
        }, 500);
    }

    $(document).ready(() => {
        // Updates badge counter
        scanPage(elemtoIgnore);
        reset();
    });

    //Escape key to shutdown.
    // Check if working:
    $(document).keyup((e) => {
        if (e.keyCode == 27 && $("#sa11y-panel").hasClass("sa11y-active")) {
            tippy.hideAll();
            sessionStorage.enableSa11y = "";
            localStorage.setItem("sa11y-panel", "closed");
            sa11yToggle.removeClass("sa11y-on").attr("aria-expanded", "false");
            reset();
        } else {
            this.onkeyup = null;
        }
    });
}
