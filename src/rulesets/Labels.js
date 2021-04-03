import IssueGenerator from "../components/IssueGenerator";
import { ERROR } from "../constants";
import config from "../sa11y.config";

export default function checkLabels({ inputs }) {
    let errorCount = 0;
    inputs.each((i, el) => {
        let $el = $(el);
        if (
            !$el.attr("id") &&
            !$el.attr("aria-label") &&
            !$el.attr("aria-labelledby")
        ) {
            // Missing Label
            errorCount += 1;
            $el.addClass("sa11y-error-border");
            let issueText =
                "There is no label associated with this input. Please add an <span class='sa11y-kbd'>id</span> to this input, and add a matching <span class='sa11y-kbd'>for</span> attribute to the label.";
            $el.after(IssueGenerator(ERROR, issueText, true));
        } else if ($el.attr("aria-label")) {
            /*Optional: add pass border.*/
        } else if ($el.prev().is("label")) {
            let label = $el.prev();
            if (label.attr("for") == $el.attr("id")) {
                /*Optional: add pass border.*/
            } else {
                // No For Attribute
                errorCount += 1;
                $el.addClass("sa11y-error-border");
                let issueText = `There is no label associated with this input. 
                    Add a <span class='sa11y-kbd'>for</span> attribute to the label that matches the <span class='sa11y-kbd'>id</span> of this input. 
                    <hr class='sa11y-hr' aria-hidden='true'>
                    The ID for this input is: 
                    <span class='sa11y-bold'>id=&#34;${$el.attr("id")}&#34;
                    </span>`;
                $el.after(IssueGenerator(ERROR, issueText, true));
            }
        }
        return { error: errorCount };
    });
}
