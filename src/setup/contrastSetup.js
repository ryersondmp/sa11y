export default function contrastSetup() {
    // ----------------------------------------------------------------------
    // Toggle Contrast Check
    // ----------------------------------------------------------------------
    let $sa11yContrastCheck = $("#sa11y-contrastCheck-toggle");
    $sa11yContrastCheck.click(() => {
        if (localStorage.getItem("sa11y-contrastCheck") === "On") {
            localStorage.setItem("sa11y-contrastCheck", "off");
            $sa11yContrastCheck.text("Off");
            $sa11yContrastCheck.attr("aria-pressed", "false");
        } else {
            localStorage.setItem("sa11y-contrastCheck", "On");
            $sa11yContrastCheck.text("On");
            $sa11yContrastCheck.attr("aria-pressed", "true");
        }
    });
}
