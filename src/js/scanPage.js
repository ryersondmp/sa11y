import config from "../sa11y.config";
import findElements from "./findElements";
import displayPanel from "./DisplayPanel";
import reset from "./Reset";

import checkHeaders from "../rulesets/Headers";
import checkLinkText from "../rulesets/LinkText";
import checkLabels from "../rulesets/Labels";
import checkAltText from "../rulesets/AltText";
import checkQA from "../rulesets/QA";
import checkContrast from "../rulesets/Contrast";
import checkReadability from "../rulesets/Readability";

// Previously named checkall
export default async function scanPage(elemToIgnore) {
    let issueCount = { error: 0, warning: 0 };
    const root = $(config["root"]);
    const elems = findElements(root, elemToIgnore);

    let addToIssueCount = (result = {}) => {
        issueCount["error"] += result["error"] || 0;
        issueCount["warning"] += result["warning"] || 0;
    };
    reset(root);
    // Headers
    addToIssueCount(checkHeaders(elems, elemToIgnore));
    // Link Text
    addToIssueCount(checkLinkText(elems));
    // Labels
    addToIssueCount(checkLabels(elems));
    // Alt Text
    addToIssueCount(checkAltText(elems));
    // QA
    addToIssueCount(checkQA(root, elemToIgnore));

    // Contrast
    if (localStorage.getItem("sa11y-contrastCheck") === "On") {
        addToIssueCount(checkContrast(root, elemToIgnore));
    }
    //  Readability
    if (localStorage.getItem("sa11y-readabilityCheck") === "On") {
        addToIssueCount(checkReadability(root, elemToIgnore));
    }

    // ?: Original Code:
    //  I dont understand what this does...

    /*
    if (this.panelActive) {
            this.reset();
        } else {
            this.displayPanel();
        }
        */

    // // Force close
    // if (localStorage.getItem("sa11y-panel") === "opened") {
    //     localStorage.setItem("sa11y-panel", "closed");
    //     sa11yToggle.removeClass("sa11y-on").attr("aria-expanded", "false");
    // }
    // // Open Again
    // localStorage.setItem("sa11y-panel", "opened");
    // sa11yToggle.addClass("sa11y-on").attr("aria-expanded", "true");
    displayPanel(issueCount);

    // Update Badge
    // let totalCount = this.errorCount + this.warningCount;
    // if (totalCount === 0) {
    //     $("#sa11y-notification-badge").hide();
    // } else if (this.warningCount > 0 && this.errorCount === 0) {
    //     $("#sa11y-notification-badge").show();
    //     $("#sa11y-notification-badge").addClass(
    //         "sa11y-notification-badge-warning"
    //     );
    //     $("#sa11y-notification-count").html(this.warningCount);
    // } else {
    //     $("#sa11y-notification-badge").show();
    //     $("#sa11y-notification-count").html(totalCount);
    // }t
    let totalCount = issueCount["error"] + issueCount["warning"];
    if (totalCount === 0) {
        $("#sa11y-notification-badge").hide();
    } else if (this.warningCount > 0 && this.errorCount === 0) {
        $("#sa11y-notification-badge").show();
        $("#sa11y-notification-badge").addClass(
            "sa11y-notification-badge-warning"
        );
        $("#sa11y-notification-count").html(this.warningCount);
    } else {
        $("#sa11y-notification-badge").show();
        $("#sa11y-notification-count").html(totalCount);
    }

    // Initizlize tippy
    tippy(".sa11y-btn", {
        interactive: true,
        trigger: "mouseenter click",
        arrow: true,
        theme: "sa11y-theme",
        allowHTML: true,
        appendTo: document.body,
    });
}
