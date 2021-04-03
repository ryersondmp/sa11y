// checkHeaders(headings,ignoreClasses)
import IssueGenerator from "../components/IssueGenerator";
import { ERROR } from "../constants";
import sa11yConfig from "../sa11y.config";

export default function checkHeaders({ h }, elemToIgnore) {
    let prevLevel;
    let errorCount = 0;
    // For each heading on the page
    h.each((i, el) => {
        let $el = $(el);
        let level;

        // Get the level of the current heading
        level = $el.attr("aria-level") || $el[0].tagName.slice(1);

        // Get heading length
        let headingLength = $el.text().trim().length;

        // Stores the error text
        let issueText = null;

        // If the heading is non consequtive based on it's heading level
        if (level - prevLevel > 1 && i !== 0) {
            issueText = `Non-consecutive heading level used. Headings should never skip levels, or go from 
                    <span class='sa11y-bold'>Heading ${prevLevel}</span> 
                    to 
                    <span class='sa11y-red-text sa11y-bold'>Heading ${level}</span>.`;
        } else if ($el.text().trim().length === 0) {
            // If the heading tag is empty
            issueText = "Empty heading found! Please remove empty header tags.";
            $el.addClass("sa11y-error-text");
        } else if ($el.text().trim().length > 170) {
            // If the heading is too long
            issueText = `Heading is too long! Headings are used to organize content and convey structure. They should be brief, clear, informative and unique. Please keep headings less than 160 characters (no more than a sentence).<hr aria-hidden='true' class='sa11y-hr'>Character count: 
                    <span class='sa11y-bold sa11y-red-text'>${headingLength}</span>.`;
        } else if (i === 0 && level !== 1 && level !== 2) {
            // If the first heading is H1 or H2
            issueText = `First heading on page should usually be a Heading 1 or Heading 2. Heading 1 should be the start of the main content section, and is the main heading that describes the overall purpose of the page. Learn more about <a href='https://www.w3.org/WAI/tutorials/page-structure/headings/' target='_blank'>Heading Structure.<span class='sa11y-visually-hidden'> (Opens in new tab)</span></a>`;
        }

        prevLevel = level;

        let li = `<li class='sa11y-outline-${level}'>
                <span class='sa11y-badge'>${level}</span> 
                <span class='sa11y-outline-list-item'>${$el.text()}</span>
            </li>`;

        let liError = `<li class='sa11y-outline-${level}'>
                <span class='sa11y-badge sa11y-error-badge'>
                <span aria-hidden='true'>&#10007;</span>
                    <span class='sa11y-visually-hidden'>${
                        sa11yConfig["lang"]["text"][ERROR]
                    }</span>
                    ${level}
                    </span> 
                <span class='sa11y-outline-list-item sa11y-red-text sa11y-bold'>${$el.text()}</span>
            </li>`;

        // Add the heading to the outline (wrt error/pass)
        let outlineIgnore = elemToIgnore["outline"] || "";
        if ($el.not(outlineIgnore).length !== 0) {
            $el.not(outlineIgnore).append(
                `<span class='sa11y-heading-label'>H${level}</span>`
            );
            if (issueText != null && $el.closest("a").length > 0) {
                errorCount += 1;
                $el.addClass("sa11y-error-heading");
                $el.closest("a").after(IssueGenerator(ERROR, issueText, true));
                $("#sa11y-outline-list").append(liError);
            } else if (issueText != null) {
                errorCount += 1;
                $el.addClass("sa11y-error-heading");
                $el.before(IssueGenerator(ERROR, issueText, true));
                $("#sa11y-outline-list").append(liError);
            } else if (issueText === null) {
                $("#sa11y-outline-list").append(li);
            }
        }
    });
    return { error: errorCount };
}
