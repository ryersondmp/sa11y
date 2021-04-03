import config from "../sa11y.config";

// Returns an  object containing a summary of elements to ignore
export default function loadGlobals() {
    // Set the root container aka the container sa11y is scanning
    let { root, ignore: ignoreConfig } = config;
    let elementsToIgnore = {};
    if (
        typeof root !== "string"
        //  || $(root).length === 0
    ) {
        root = "body";
    }
    /*
        elementsToIgnore[item] are the ignore classes that sa11y generates
        ignoreConfig[item] are the ignore classes found in the config file  
    */

    elementsToIgnore["container"] = "[aria-hidden]";
    if (ignoreConfig["container"].length !== "") {
        elementsToIgnore["container"] +=
            "," +
            ignoreConfig["container"]
                .split(",")
                .map((x) => x.trim() + " *," + x.trim())
                .join();
    }

    // Images ignore defaults plus presentation role.
    elementsToIgnore["image"] = "[role='presentation']";
    if (ignoreConfig["image"] !== "") {
        elementsToIgnore["container"] = "[role='presentation']," + ignoreImages;
    }

    elementsToIgnore["header"] = ignoreConfig["header"];

    // Links ignore defaults plus sa11y links.
    elementsToIgnore["link"] = "[aria-hidden]";
    if (ignoreConfig["link"] !== "") {
        elementsToIgnore["link"] = ignoreConfig["link"] + ",[aria-hidden]";
    }

    elementsToIgnore["header"] = elementsToIgnore["container"];
    if (ignoreConfig["header"] !== "") {
        elementsToIgnore["header"] =
            ignoreConfig["header"] + "," + elementsToIgnore["container"];
    }

    /*
        // Default setup generates the following: 
        {
            container: '[aria-hidden],.sa11y-ignore *,.sa11y-ignore,#sa11y-container *,#sa11y-container',
            image: "[role='presentation']",
            header: '.sa11y-ignore, #sa11y-container',
            link: '[aria-hidden]'
        }
    */

    return elementsToIgnore;
}
