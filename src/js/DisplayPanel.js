export default function displayPanels(issueCount) {
    let errorCount = issueCount["error"];
    let warningCount = issueCount["warning"];
    let totalCount = errorCount + warningCount;
    $("#sa11y-panel").addClass("sa11y-active");
    if (totalCount > 0) {
        if (errorCount > 0) {
            $("#sa11y-status").text(
                totalCount === 1
                    ? "One accessibility issue detected."
                    : totalCount + " accessibility issues detected."
            );
            $("#sa11y-panel-content").addClass("sa11y-errors");
        } else if (warningCount > 0) {
            $("#sa11y-status").text(
                totalCount === 1
                    ? "Please review warning."
                    : "Please review " + totalCount + " warnings."
            );
            $("#sa11y-panel-content").addClass("sa11y-warnings");
        }
    } else {
        $("#sa11y-panel-content").addClass("sa11y-pass");
        $("#sa11y-status").text("No accessibility errors found.");
    }
    //Show outline panel
    let $outlineToggle = $("#sa11y-outline-toggle");
    $outlineToggle.click(() => {
        if ($outlineToggle.attr("aria-expanded") == "true") {
            $outlineToggle.removeClass("sa11y-outline-active");
            $("#sa11y-outline-panel").removeClass("sa11y-active");
            $outlineToggle.text("Show Outline");
            $outlineToggle.attr("aria-expanded", "false");
            localStorage.setItem("sa11y-outline", "closed");
        } else {
            $outlineToggle.addClass("sa11y-outline-active");
            $("#sa11y-outline-panel").addClass("sa11y-active");
            $outlineToggle.text("Hide Outline");
            $outlineToggle.attr("aria-expanded", "true");
            localStorage.setItem("sa11y-outline", "opened");
        }
        $("#sa11y-outline-header > span").focus();
        $(".sa11y-heading-label").toggleClass("sa11y-label-visible");

        //Close Settings panel when Show Outline is active.
        $("#sa11y-settings-panel").removeClass("sa11y-active");
        $settingsToggle.removeClass("sa11y-settings-active");
        $settingsToggle.attr("aria-expanded", "false");
        $settingsToggle.text("Show Settings");

        //Keyboard accessibility fix for scrollable panel content.
        if ($("#sa11y-outline-list").height() > 350) {
            $("#sa11y-outline-list").attr("tabindex", "0");
        }
    });

    //Remember to leave outline open
    if (localStorage.getItem("sa11y-outline") === "opened") {
        $outlineToggle.addClass("sa11y-outline-active");
        $("#sa11y-outline-panel").addClass("sa11y-active");
        $outlineToggle.text("Hide Outline");
        $outlineToggle.attr("aria-expanded", "true");
        $(".sa11y-heading-label").toggleClass("sa11y-label-visible");
    }

    //Show settings panel
    let $settingsToggle = $("#sa11y-settings-toggle");
    $settingsToggle.click(function () {
        if ($settingsToggle.attr("aria-expanded") === "true") {
            $settingsToggle.removeClass("sa11y-settings-active");
            $("#sa11y-settings-panel").removeClass("sa11y-active");
            $settingsToggle.text("Show Settings");
            $settingsToggle.attr("aria-expanded", "false");
        } else {
            $settingsToggle.addClass("sa11y-settings-active");
            $("#sa11y-settings-panel").addClass("sa11y-active");
            $settingsToggle.text("Hide Settings");
            $settingsToggle.attr("aria-expanded", "true");
        }

        $("#sa11y-settings-header > span").focus();

        //Close Show Outline panel when Settings is active.
        $("#sa11y-outline-panel").removeClass("sa11y-active");
        $outlineToggle.removeClass("sa11y-outline-active");
        $outlineToggle.attr("aria-expanded", "false");
        $outlineToggle.text("Show Outline");
        $(".sa11y-heading-label").removeClass("sa11y-label-visible");
        localStorage.setItem("sa11y-outline", "closed");

        //Keyboard accessibility fix for scrollable panel content.
        if ($("#sa11y-settings-content").height() > 350) {
            $("#sa11y-settings-content").attr("tabindex", "0");
        }
    });
}
