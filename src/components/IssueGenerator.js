import { ERROR, PASS, WARNING } from "../constants";
import config from "../sa11y.config";
export default function IssueGenerator(type, content, inline = false) {
    const ValidTypes = new Set([ERROR, WARNING, PASS]);
    const CSSName = {
        [ERROR]: "error",
        [WARNING]: "warning",
        [PASS]: "pass",
    };
    // TODO: Discuss Throwing Errors.
    if (!ValidTypes.has(type)) {
        alert(`Invalid type: ${type}`);
        throw Error;
    }
    const textType = config["lang"]["text"][type];
    return `
        <div class=${inline ? "sa11y-instance-inline" : "sa11y-instance"}>
            <button   
                aria-label=${textType} 
                class="sa11y-btn 
                sa11y-${CSSName[type]}-btn${inline ? "-text" : ""}" 
                data-tippy-content=
                    "<div lang='${config["lang"]["code"]}'>
                        <div class='sa11y-header-text'>${textType}</div>
                        ${content} 
                    </div>"
            > 
            </button>
        </div>
        `;
}
