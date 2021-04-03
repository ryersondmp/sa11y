function prefersColorTest(systemInitiatedDark) {
    if (systemInitiatedDark.matches) {
        $("html").attr("data-sa11y-theme", "dark");
        $sa11yTheme.text("On");
        $sa11yTheme.attr("aria-pressed", "true");
        sessionStorage.setItem("sa11y-theme", "");
    } else {
        $("html").attr("data-sa11y-theme", "light");
        $sa11yTheme.text("Off");
        $sa11yTheme.attr("aria-pressed", "false");
        sessionStorage.setItem("sa11y-theme", "");
    }
}

export default function darkmodeSetup() {
    // ----------------------------------------------------------------------
    // Dark Mode. Credits: https://derekkedziora.com/blog/dark-mode-revisited
    // ----------------------------------------------------------------------
    let systemInitiatedDark = window.matchMedia("(prefers-color-scheme: dark)");
    let $sa11yTheme = $("#sa11y-theme-toggle");
    let theme = sessionStorage.getItem("sa11y-theme");
    if (systemInitiatedDark.matches) {
        $sa11yTheme.text("On");
        $sa11yTheme.attr("aria-pressed", "true");
    } else {
        $sa11yTheme.text("Off");
        $sa11yTheme.attr("aria-pressed", "false");
    }

    systemInitiatedDark.addListener(prefersColorTest);
    $sa11yTheme.click(function () {
        let theme = sessionStorage.getItem("sa11y-theme");
        if (theme === "dark") {
            $("html").attr("data-sa11y-theme", "light");
            sessionStorage.setItem("sa11y-theme", "light");
            $sa11yTheme.text("Off");
            $sa11yTheme.attr("aria-pressed", "false");
        } else if (theme === "light") {
            $("html").attr("data-sa11y-theme", "dark");
            sessionStorage.setItem("sa11y-theme", "dark");
            $sa11yTheme.text("On");
            $sa11yTheme.attr("aria-pressed", "true");
        } else if (systemInitiatedDark.matches) {
            $("html").attr("data-sa11y-theme", "light");
            sessionStorage.setItem("sa11y-theme", "light");
            $sa11yTheme.text("Off");
            $sa11yTheme.attr("aria-pressed", "false");
        } else {
            $("html").attr("data-sa11y-theme", "dark");
            sessionStorage.setItem("sa11y-theme", "dark");
            $sa11yTheme.text("On");
            $sa11yTheme.attr("aria-pressed", "true");
        }
    });
    if (theme === "dark") {
        $("html").attr("data-sa11y-theme", "dark");
        sessionStorage.setItem("sa11y-theme", "dark");
        $sa11yTheme.text("On");
        $sa11yTheme.attr("aria-pressed", "true");
    } else if (theme === "light") {
        $("html").attr("data-sa11y-theme", "light");
        sessionStorage.setItem("sa11y-theme", "light");
        $sa11yTheme.text("Off");
        $sa11yTheme.attr("aria-pressed", "false");
    }
}
