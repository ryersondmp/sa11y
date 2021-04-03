import IssueGenerator from "../components/IssueGenerator";
import ErrorBannerGenerator from "../components/ErrorBannerGenerator";
import { ERROR, PASS, WARNING } from "../constants";

export default function checkQA(root, elemToIgnore) {
    let errorCount = 0;
    let warningCount = 0;

    // ------------------------------------------------
    // VIDEOS
    // ------------------------------------------------
    var $videos = root
        .find(
            "video, iframe[src*='youtube.com'], iframe[src*='vimeo.com'], iframe[src*='yuja.com'], iframe[src*='panopto.com']"
        )
        .not(elemToIgnore["container"]);
    $videos.each((i, el) => {
        let $el = $(el);
        warningCount++;
        $el.addClass("sa11y-warning-border");
        let issueText =
            "Please ensure <span class='sa11y-bold'>all videos have closed captioning.</span> Providing captions for all audio and video content is a mandatory Level A requirement. Captions are meant to support people who are D/deaf or hard-of-hearing.";
        $videos.first().before(IssueGenerator(WARNING, issueText));
    });

    // ------------------------------------------------
    // AUDIO
    // ------------------------------------------------
    let $audio = root
        .find(
            "audio, iframe[src*='soundcloud.com'], iframe[src*='simplecast.com'], iframe[src*='podbean.com'], iframe[src*='buzzsprout.com'], iframe[src*='blubrry.com'], iframe[src*='transistor.fm'], iframe[src*='fusebox.fm'], iframe[src*='libsyn.com']"
        )
        .not(elemToIgnore["container"]);
    $audio.each((i, el) => {
        let $el = $(el);
        warningCount++;
        $el.addClass("sa11y-warning-border");
        let issueText =
            "Please ensure to provide a <span class='sa11y-bold'>transcript for all podcasts.</span> Providing transcripts for audio content is a mandatory Level A requirement. Transcripts are meant to support people who are D/deaf or hard-of-hearing, but can benefit everyone. Consider placing the transcript below or within an accordion panel.";
        $el.first().before(IssueGenerator(WARNING, issueText));
    });

    // ------------------------------------------------
    // DataVizualization
    // ------------------------------------------------
    let $dataviz = root
        .find("iframe[src*='datastudio.google.com'], iframe[src*='tableau']")
        .not(elemToIgnore["container"]);
    $dataviz.each((i, el) => {
        let $el = $(el);
        warningCount++;
        $el.addClass("sa11y-warning-border");
        let issueText =
            "Data visualization widgets like this are often problematic for people who use a keyboard or screen reader to navigate, and can present significant difficulties for people with low vision or colorblindness. It's recommended to provide the same information in an alternative (text or table) format below the widget.";
        $el.first().before(IssueGenerator(WARNING, issueText));
    });

    // ------------------------------------------------
    // Twitter Warning
    // ------------------------------------------------
    let $twitterWarning = root
        .find("[id^=twitter-widget]")
        .not(elemToIgnore["container"]);
    $twitterWarning.each((i, el) => {
        let $el = $(el);
        var numberofTweets = $el.contents().find(".timeline-TweetList-tweet")
            .length;
        if (numberofTweets > 3) {
            warningCount++;
            $el.addClass("sa11y-warning-text");
            let issueText =
                "The default Twitter timeline may cause accessibility issues for keyboard users. Secondly, the inline scrolling of the Twitter timeline may cause usability issues for mobile. It's recommended to add the following data attributes to the embed code. <hr aria-hidden='true' class='sa11y-hr'><span class='sa11y-bold'>It's recommended to:</span><ul><li>Add <span class='sa11y-kbd'>data-tweet-limit=&#34;2&#34;</span> to limit the amount of tweets.</li><li>Add <span class='sa11y-kbd'>data-chrome=&#34;nofooter noheader&#34;</span> to remove the widget's header and footer.</li></ul>";
            $el.before(IssueGenerator(WARNING, issueText));
        }
    });

    // ------------------------------------------------
    // Warn users of TARGET BLANK within main content.
    // ------------------------------------------------
    let $linksTargetBlank = root
        .find("a[target='_blank']")
        .not(elemToIgnore["link"])
        .not("a[href$='.pdf']")
        .not("a[href$='.docx']")
        .not("#sa11y-container a")
        .not(".sa11y-exclude");
    $linksTargetBlank.each((i, el) => {
        let $el = $(el);

        var passWordsNewWindow = ["new tab", "new window"];
        var containsPassWordsNewWindow = passWordsNewWindow.some(function (
            pass
        ) {
            return $el.text().toLowerCase().indexOf(pass) >= 0;
        });
        if ($el && !containsPassWordsNewWindow) {
            warningCount++;
            $el.addClass("sa11y-warning-text");
            let issueText =
                "Please use <span class='sa11y-bold'>target=&ldquo;_blank&rdquo;</span> sparingly. Opening links in new tabs or windows can be very disorienting for people, especially for people who have difficulty perceiving visual content. Secondly, it's not always a good practice to control a user's experience or make decisions for them. Alert the user that the link opens in a new window within the link text.";
            $el.first().after(IssueGenerator(WARNING, issueText, true));
        }
    });
    // ------------------------------------------------
    //Error: Find all links pointing to development environment. Customize as needed.
    // ------------------------------------------------
    let $badDevLinks = root
        .find("a[href^='https://www.dev.'], a[href*='wp-admin']")
        .not(elemToIgnore["link"]);
    $badDevLinks.each((i, el) => {
        // BadLinkMessage
        let $el = $(el);
        errorCount++;
        $el.addClass("sa11y-error-text");
        let issueText = `Bad link found. Link appears to point to a development environment. Make sure the link does not contain <em>dev</em> or <em>wp-admin</em> in the URL. <hr aria-hidden='true' class='sa11y-hr'>This link points to: <br><span class='sa11y-bold sa11y-red-text'>
            ${el}</span>`;
        $el.after(IssueGenerator(ERROR, issueText, true));
    });

    // ------------------------------------------------
    // Warning: Find all PDFs. Although only append warning icon to first PDF on page.
    // ------------------------------------------------
    let checkPDF = root.find("a[href$='.pdf']").not(elemToIgnore["container"]);
    let firstPDF = root
        .find("a[href$='.pdf']:first")
        .not(elemToIgnore["container"]);
    if (checkPDF.length > 0) {
        warningCount++;
        checkPDF.addClass("sa11y-warning-text");
        checkPDF.has("img").removeClass("sa11y-warning-text");
        let issueText =
            "PDFs are considered web content and must be made accessible as well. PDFs often contain issues for people who use screen readers (missing structural tags or missing form field labels) and people with low vision (text does not reflow when enlarged). If this PDF is a form, consider using an accessible HTML form as an alternative. If this PDF is a document, consider converting it into a web page. Otherwise, please <span class='sa11y-bold'>check PDF for accessibility in Acrobat DC.</span>";
        firstPDF.after(IssueGenerator(WARNING, issueText, true));
    }

    // ------------------------------------------------
    // Block Quotes
    // ------------------------------------------------
    let $blockquotes = root.find("blockquote").not(elemToIgnore["container"]);
    $blockquotes.each((i, el) => {
        let $el = $(el);
        if ($el.text().trim().length < 25) {
            // BlockquoteMessage
            errorCount++;
            $el.addClass("sa11y-error-border");
            let issueText =
                "Blockquotes should be used for quotes only. They should never be used as headings. Please replace with a semantic heading (e.g. Heading 2 or Heading 3).";
            $el.before(IssueGenerator(ERROR, issueText));
        }
    });

    // ------------------------------------------------
    // warning: detect uppercase
    // ------------------------------------------------
    let $queryUppercase = root
        .find('h1, h2, h3, h4, h5, h6, p, li:not([class^="sa11y"]), blockquote')
        .not(elemToIgnore["container"]);

    $queryUppercase.each((i, el) => {
        let $this = $(el);
        let issueText =
            "All caps detected. Avoid typing sentences or phrases in uppercase. Some screen readers may interpret all capital text as an acronym and will read each letter individually. Additionally, all caps are more difficult to read and give the appearance of SHOUTING.";
        var uppercasePattern = /(?!<a[^>]*?>)(\b[A-Z]['!:A-Z\s]{15,}|\b[A-Z]{15,}\b)(?![^<]*?<\/a>)/g;
        var replaceUppercase =
            '<span class="sa11y-warning-uppercase">$1</span>' +
            IssueGenerator(WARNING, issueText, true);
        // $this.each( () {
        //     $(this).html(
        //         $(this).html().replace(uppercasePattern, replaceUppercase)
        //     );
        // });
        $this.html($this.html().replace(uppercasePattern, replaceUppercase));
    });
    if ($(".sa11y-warning-uppercase").length > 0) {
        warningCount++;
    }

    // ------------------------------------------------
    // Tables
    // ------------------------------------------------
    let $table = root.find("table").not(elemToIgnore["container"]);
    //Tables check.
    $table.each((i, el) => {
        let $el = $(el);
        let findTHeaders = $el.find("th");
        let findHeadingTags = $el.find("h1, h2, h3, h4, h5, h6");
        if (findTHeaders.length == 0) {
            // MissingHeadingsError
            errorCount++;
            $el.addClass("sa11y-error-border");
            let issueText =
                "Missing table headers! Accessible tables need HTML markup that indicates header cells and data cells which defines their relationship. This information provides context to people who use assistive technology. Tables should be used for tabular data only.";
            $el.before(IssueGenerator(ERROR, issueText));
        }
        if (findHeadingTags.length > 0) {
            // SemanticHeadingTableError
            findHeadingTags.addClass("sa11y-error-heading");
            findHeadingTags.parent().addClass("sa11y-error-border");
            let issueText =
                "Semantic headings such as Heading 2 or Heading 3 should only be used for sections of content; <span class='sa11y-bold'>not</span> in HTML tables. Indicate table headings using the <span class='sa11y-bold'>th</span> element instead.";
            findHeadingTags.before(IssueGenerator(ERROR, issueText));
        }
        findTHeaders.each((_, th) => {
            // EmptyTableHeaderError
            let $th = $(th);
            if ($th.text().trim().length < 1) {
                errorCount++;
                findTHeaders.addClass("sa11y-error-border");
                let issueText =
                    "Empty table header found! Table headers should <em>never</em> be empty. It is important to designate row and/or column headers to convey their relationship. This information provides context to people who use assistive technology. Please keep in mind that tables should be used for tabular data only.";
                findTHeaders.append(IssueGenerator(ERROR, issueText));
            }
        });
    });

    // ------------------------------------------------
    // Missing Language Tag
    // ------------------------------------------------
    //Error: Missing language tag. Lang should be at least 2 characters.
    var lang = $("html").attr("lang");
    if (lang == undefined || lang.length < 2) {
        errorCount++;
        let issueText =
            "Page language not declared! Please <a href='https://www.w3.org/International/questions/qa-html-language-declarations' target='_blank'>declare language on HTML tag.<span class='sa11y-visually-hidden'> (opens new tab)</span></a>";
        $("#sa11y-container").after(ErrorBannerGenerator(issueText));
    }

    // ------------------------------------------------
    // Announcement
    // ------------------------------------------------
    //Example ruleset. Be creative.
    let $checkAnnouncement = root
        .find(".announcement-component")
        .not(elemToIgnore["container"]).length;
    if ($checkAnnouncement > 1) {
        warningCount++;
        let issueText =
            "More than one Announcement component found! The Announcement component should be used strategically and sparingly. It should be used to get attention or warn users about something important. Misuse of this component makes it less effective or impactful. Secondly, this component is semantically labeled as an Announcement for people who use screen readers.";
        $(".announcement-component:gt(0)").addClass("sa11y-warning-border");
        $(".announcement-component:gt(0)").before(
            IssueGenerator(WARNING, issueText)
        );
    }
    return { error: errorCount, warning: warningCount };
}
