import config from "../sa11y.config";

export default function reset() {
    const root = $(config["root"]);
    root.find(".sa11y-error-border").removeClass("sa11y-error-border");
    root.find(".sa11y-error-heading").removeClass("sa11y-error-heading");
    root.find(".sa11y-error-message-container").remove();
    root.find(".sa11y-error-text").removeClass("sa11y-error-text");

    root.find(".sa11y-warning-border").removeClass("sa11y-warning-border");
    root.find(".sa11y-warning-text").removeClass("sa11y-warning-text");
    root.find(".sa11y-warning-uppercase").contents().unwrap();
    root.find("p").removeClass("sa11y-fake-list");

    root.find(".sa11y-instance").remove();
    root.find(".sa11y-instance-inline").remove();
    root.find(".sa11y-heading-label").remove();
    root.find("#sa11y-panel").removeClass("sa11y-active");
    root.find("#sa11y-outline-list li").remove();
    root.find("#sa11y-readability-content").remove();
    root.find(".sa11y-readability-period").remove();

    $("#sa11y-panel-content").removeClass();
    $("#sa11y-status").text();
    // Remove Listeners for outline/settings clicks
    $("#sa11y-outline-toggle").off("click");
    $("#sa11y-settings-toggle").off("click");
}
