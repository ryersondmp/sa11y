import checkReadability from "../rulesets/Readability";

export default function readabilitySetup() {
    // ----------------------------------------------------------------------
    // Toggle Readability
    // ----------------------------------------------------------------------
    let $sa11yReadabilityCheck = $("#sa11y-readabilityCheck-toggle");
    $sa11yReadabilityCheck.click(() => {
        if (localStorage.getItem("sa11y-readabilityCheck") === "On") {
            localStorage.setItem("sa11y-readabilityCheck", "off");
            $sa11yReadabilityCheck.text("Off");
            $sa11yReadabilityCheck.attr("aria-pressed", "false");
            $("#sa11y-readability-content").remove();
        } else {
            localStorage.setItem("sa11y-readabilityCheck", "On");
            $sa11yReadabilityCheck.text("On");
            $sa11yReadabilityCheck.attr("aria-pressed", "true");
            checkReadability();
        }
    });
}
