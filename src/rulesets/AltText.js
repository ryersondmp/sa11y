import IssueGenerator from "../components/IssueGenerator";
import { ERROR, PASS, WARNING } from "../constants";

export default function checkAltText({ images }) {
    let containsAltTextStopWords = (textContent) => {
        let stopWords = [
            ".png",
            "DSC",
            ".jpg",
            ".jpeg",
            "image of",
            "graphic of",
            "picture of",
            "placeholder",
        ];
        var hit = null;
        $.each(stopWords, function (index, word) {
            if (textContent.toLowerCase().indexOf(word) >= 0) {
                hit = word;
                return word;
            }
        });
        return hit;
    };
    let sanitizeForHTML = (string) => {
        let entityMap = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
            "/": "&#x2F;",
            "`": "&#x60;",
            "=": "&#x3D;",
        };
        return String(string).replace(/[&<>"'`=\/]/g, function (s) {
            return entityMap[s];
        });
    };

    let errorCount = 0;
    let warningCount = 0;

    // Test each image for alternative text.
    images.each((i, el) => {
        let $el = $(el);
        let text = $el.attr("alt");

        if (text === undefined) {
            errorCount += 1;
            // Image fails if it is used as a link and is missing an alt attribute.
            if ($el.parents().is("a[href]")) {
                //Image contains both hyperlink
                if ($el.parents("a").text().trim().length > 1) {
                    $el.addClass("sa11y-error-border");
                    let issueText =
                        "Image is being used as a hyperlink with surrounding text, although the alt attribute should be marked as decorative or null.";
                    $el.closest("a").before(IssueGenerator(ERROR, issueText));
                } else if ($el.parents("a").text().trim().length == 0) {
                    // Missing alt link text
                    $el.addClass("sa11y-error-border");
                    let issueText =
                        "Image is being used as a hyperlink but is missing alt text! Please ensure alt text describes where the link takes you.";
                    $el.closest("a").before(IssueGenerator(ERROR, issueText));
                }
            }
            // General failure message if image is missing alt.
            else {
                $el.addClass("sa11y-error-border");
                let issueText =
                    "Missing alt text! If the image conveys a story, a mood or important information - be sure to describe the image.";
                $el.before(IssueGenerator(ERROR, issueText));
            }
        }
        // If alt attribute is present, further tests are done.
        else {
            let altText = sanitizeForHTML(text); //Prevent tooltip from breaking.
            let error = containsAltTextStopWords(altText);
            let altLength = text.length;

            // Image fails if a stop word was found.
            if (error != null && $el.parents().is("a[href]")) {
                errorCount += 1;
                $el.addClass("sa11y-error-border");
                let issueText = `Detected poor alt text in hyperlinked image. Ensure alt text describes destination of link, not a literal description of the picture. 
                    Remove word: <span class='sa11y-red-text sa11y-bold'>${error}</span>. 
                    <hr aria-hidden='true' class='sa11y-hr'> 
                    The alt text for this image is: <span class='sa11y-bold'>${altText}</span>`;
                $el.closest("a").before(IssueGenerator(ERROR, issueText));
            } else if (error != null) {
                // Alt text has bad word
                errorCount += 1;
                $el.addClass("sa11y-error-border");
                let issueText = `Poor alt text found. It is not necessary to include words like <em>image</em>, <em>graphic</em> or the file extension. 
                    Consider removing the word: <span class='sa11y-red-text sa11y-bold'>${error}</span>. 
                    <hr aria-hidden='true' class='sa11y-hr'> 
                    The alt text for this image is: <span class='sa11y-bold'>${altText} </span>`;
                $el.before(IssueGenerator(ERROR, issueText));
            } else if (text == "" && $el.parents().is("a[href]")) {
                if ($el.parents("a").text().trim().length == 0) {
                    // ImageLinkNullAltNoTextMessage
                    errorCount += 1;
                    $el.addClass("sa11y-error-border");
                    let issueText =
                        "Image within hyperlink is marked as decorative and there is no link text. Please add alt text to image that describes destination of link.";
                    $el.closest("a").before(IssueGenerator(ERROR, issueText));
                } else {
                    let issueText =
                        "Image is marked as decorative, although the hyperlink is using the surrounding text as a descriptive label.";
                    $el.closest("a").before(IssueGenerator(PASS, issueText));
                }
            }
            //Decorative alt and not a link.
            else if (text == "" && $el.parents().not("a[href]")) {
                let issueText =
                    "Image marked as <span class='sa11y-bold'>decorative.</span> However, if the image conveys a story, a mood or important information - be sure to add alt text.";
                $el.before(IssueGenerator(PASS, issueText));
            }
            //Link and contains alt text.
            else if (text.length > 160 && $el.parents().is("a")) {
                // HyperlinkAltLengthMessage
                errorCount += 1;
                $el.addClass("sa11y-error-border");
                let issueText = `Alt text description on hyperlinked image is <span class='sa11y-bold'>too long</span>. 
                    The alt text on hyperlinked images should describe where the link takes you, not a literal description of the image. 
                    <span class='sa11y-bold'>Consider using the title of the page it links to as the alt text.</span> 
                    <hr aria-hidden='true' class='sa11y-hr'> 
                    The alt text is <span class='sa11y-red-text sa11y-bold'>${altLength}</span> characters: 
                    <span class='sa11y-red-text sa11y-bold'>${altText}</span>`;
                $el.closest("a").before(IssueGenerator(ERROR, issueText));
            }
            //Link and contains an alt text.
            else if (
                text != "" &&
                $el.parents().is("a") &&
                $el.parents("a").text().trim().length == 0
            ) {
                // ImageLinkAltTextMessage
                warningCount += 1;
                $el.addClass("sa11y-warning-border");
                let issueText = `Image link contains alt text, although please ensure alt text describes the destination page. 
                    <span class='sa11y-bold'>Consider using the title of the page it links to as the alt text.</span>
                    Does the alt text describe where the link takes you? 
                    <hr aria-hidden='true' class='sa11y-hr'>
                    Alt text: <span class='sa11y-bold'>${altText}</span>`;
                $el.closest("a").before(IssueGenerator(WARNING, issueText));
            }
            //Contains alt text & surrounding link text.
            else if (
                text != "" &&
                $el.parents().is("a") &&
                $el.parents("a").text().trim().length > 1
            ) {
                warningCount += 1;
                $el.addClass("sa11y-warning-border");
                let issueText = `Image link contains <span class='sa11y-bold'>both alt text and surrounding link text.</span> If this image is decorative and is being used as a functional link to another page, consider marking the image as decorative or null - the surrounding link text should suffice. <hr aria-hidden='true' class='sa11y-hr'>
                    Alt text: <span class='sa11y-bold'>${altText}</span>`;
                $el.closest("a").before(IssueGenerator(WARNING, issueText));
            } else if (text.length > 160) {
                // AltTooLongMessage
                warningCount += 1;
                $el.addClass("sa11y-warning-border");
                let issueText = `Alt text description is <span class='sa11y-bold'>too long</span>. Alt text should be concise, yet meaningful like a <em>tweet</em> (around 100 characters). 
                If this is a complex image or a graph, consider putting the long description of the image in text below or in an accordion component. 
                <hr aria-hidden='true' class='sa11y-hr'> 
                The alt text is <span class='sa11y-red-text sa11y-bold'> ${altLength}</span> characters: 
                <span class='sa11y-red-text sa11y-bold'>${altText}</span>`;
                $el.before(IssueGenerator(WARNING, issueText));
            } else if (text != "") {
                let issueText = `The alt text for this image is: <span class='sa11y-bold'>${altText}</span>`;
                $el.before(IssueGenerator(PASS, issueText));
            }
        }
    });
    return { error: errorCount, warning: warningCount };
}
