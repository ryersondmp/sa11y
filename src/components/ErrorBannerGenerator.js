import { ERROR } from "../constants";
import sa11yConfig from "../sa11y.config";

export default function ErrorBannerGenerator(content) {
    return `<div class="sa11y-error-message-container">
        <div class="sa11y-error-message" lang="${sa11yConfig["lang"]["code"]}">
            <span class="sa11y-visually-hidden">${sa11yConfig["lang"]["text"][ERROR]}</span> 
            ${content}
        </div>
    </div>`;
}
