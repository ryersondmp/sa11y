import { ERROR, WARNING, PASS, TOOLICON } from "./constants";
export default {
    //Use "main" for main content.
    root: "body",
    //Language of Sa11y. Some global variables to help translate.
    lang: {
        //Language code, e.g. "fr"
        code: "en",
        text: {
            main: "Toggle Accessibility Checker",
            container: "Accessibility Checker",
            [ERROR]: "Error", //Erreur
            [WARNING]: "Warning", //Attention
            [PASS]: "Good", //Bon
        },
    },
    //Inclusions and exclusions
    // TODO: make these ignores consistent.
    ignore: {
        container: ".sa11y-ignore, #sa11y-container", //Ignore specific regions.
        outline: "", //Exclude headings from outline panel.
        header: "", //Ignore specific headings. E.g. "h1.jumbotron-heading"
        image: "", //Ignore specific images.
        link: "", //Ignore specific links.
    },
    icon: TOOLICON,
};
