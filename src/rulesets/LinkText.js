import IssueGenerator from "../components/IssueGenerator";
import { ERROR, PASS } from "../constants";
import config from "../sa11y.config";

export default function checkLinkText({ link }) {
    /* Mini function if you need to exclude any text contained with a span. We created this function to ignore automatically appended sr-only text for external links and document filetypes.

$.fn.ignore = function(sel){
  return this.clone().find(sel||">*").remove().end();
};


Example: If you need to ignore any text within <span class="sr-only">test</span>.
$el.ignore("span.sr-only").text().trim(); */

    // Checks if text is not descriptive and returns the word(s) that are making the text inaccessible.
    //showStopper words will always flag an issue if contained in a hyperlink.
    //partialStopWords will only be flagged as an issue if it's the only hyperlink text.
    let containsLinkTextStopWords = function (textContent) {
        let stopWords = [
            "click here",
            "<",
            ">",
            "http://",
            "https://",
            ".aspx",
            ".html",
            ".php",
            "here.",
        ];
        let partialStopWords = [
            "learn more",
            "learn",
            "more",
            "register",
            "register now",
            "this page",
            "check out",
            "learn to",
            "view",
            "view our",
            "read more",
            "read",
            ".",
            ",",
            ":",
            "page",
            "this page",
            "download",
            "form",
            "link",
            "here",
            "this",
        ];
        var hit = null;

        // TODO: Check if this actually returns false.
        // First check for show stoppers.
        $.each(stopWords, function (index, word) {
            if (textContent.toLowerCase().indexOf(word) >= 0) {
                hit = word;
                return false;
            }
        });

        // If no partial words were found, then check for total words.
        if (hit == null) {
            $.each(partialStopWords, function (index, word) {
                if (
                    textContent.length === word.length &&
                    textContent.toLowerCase().indexOf(word) >= 0
                ) {
                    hit = word;
                    return false;
                }
            });
        }
        return hit;
    };

    let errorCount = 0;

    link.each((i, el) => {
        let $el = $(el);
        var linktext = $el.text();
        var hasarialabelledby = $el.attr("aria-labelledby");
        var hasarialabel = $el.attr("aria-label");
        var hasariahidden = $el.attr("aria-hidden");
        var hastabindex = $el.attr("tabindex");
        var error = containsLinkTextStopWords($el.text().trim());
        if (
            $el.children().length == 0 &&
            $el.attr("href") !== undefined &&
            $el.text().length == 0 &&
            $el.is(":visible")
        ) {
            errorCount += 1;
            let issueText = "Found an empty hyperlink without any text!";
            $el.addClass("sa11y-error-text");
            $el.after(IssueGenerator(ERROR, issueText, true));
        } else if (error != null) {
            if (hasarialabelledby != null) {
                // Link has aria labelled-by message
                var acclinkname = document.getElementById(hasarialabelledby)
                    .textContent;
                var issueText = `The descriptive label for this link is: <span class='sa11y-bold'> ${linktext} ${acclinkname}</span>`;
                $el.after(IssueGenerator(PASS, issueText, true));
            } else if (hasarialabel != null) {
                let issueText = `The descriptive label for this link is: <span class='sa11y-bold'>${hasarialabel} </span>`;
                $el.after(IssueGenerator(PASS, issueText, true));
            } else if (hasariahidden == "true" && hastabindex == "-1") {
                //do nothing.
            } else {
                errorCount += 1;
                $el.addClass("sa11y-error-text");
                let issueText = `Link text may not be descriptive enough, consider changing word: <span class='sa11y-red-text sa11y-bold'>${error}</span><hr aria-hidden='true' class='sa11y-hr'><span class='sa11y-bold'>Tip!</span> Link text should always be unique and meaningful so it could be understood out of context.`;
                $el.after(IssueGenerator(ERROR, issueText, true));
            }
        }
    });
    return { error: errorCount };
}
