import loadGlobals from "../js/LoadGlobals";
import sa11yConfig from "../sa11y.config";
export default function checkReadability(
    root = $(sa11yConfig["root"]),
    elemToIgnore = loadGlobals()
) {
    //Crude hack to add a period to the end of list items to make a complete sentence.
    const $mainPandLi = root
        .find("main p, main li, [role='main'] p, [role='main'] li")
        .not(elemToIgnore["container"]);
    $('main li, [role="main"] li').each(function () {
        var endOfList = $(this),
            listText = endOfList.text();
        if (listText.charAt(listText.length - 1) !== ".") {
            $('main li, [role="main"] li').append(
                '<span class="sa11y-readability-period sa11y-visually-hidden">.</span>'
            );
        }
    });

    function number_of_syllables(wordCheck) {
        wordCheck = wordCheck.toLowerCase().replace(".", "").replace("\n", "");
        if (wordCheck.length <= 3) {
            return 1;
        }
        wordCheck = wordCheck.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
        wordCheck = wordCheck.replace(/^y/, "");
        var syllable_string = wordCheck.match(/[aeiouy]{1,2}/g);

        if (!!syllable_string) {
            var syllables = syllable_string.length;
        } else {
            syllables = 0;
        }
        return syllables;
    }

    let paragraphtext = $mainPandLi.not("blockquote").text();

    var words_raw = paragraphtext.replace(/[.!?-]+/g, " ").split(" ");
    var words = 0;
    for (var i = 0; i < words_raw.length; i++) {
        if (words_raw[i] != 0) {
            words = words + 1;
        }
    }

    var sentences_raw = paragraphtext.split(/[.!?]+/);
    var sentences = 0;
    for (var i = 0; i < sentences_raw.length; i++) {
        if (sentences_raw[i] != "") {
            sentences = sentences + 1;
        }
    }

    var total_syllables = 0;
    var syllables1 = 0;
    var syllables2 = 0;
    for (var i = 0; i < words_raw.length; i++) {
        if (words_raw[i] != 0) {
            var syllable_count = number_of_syllables(words_raw[i]);
            if (syllable_count == 1) {
                syllables1 = syllables1 + 1;
            }
            if (syllable_count == 2) {
                syllables2 = syllables2 + 1;
            }
            total_syllables = total_syllables + syllable_count;
        }
    }

    var characters = paragraphtext.replace(/[.!?|\s]+/g, "").length;
    var pollysyllables = words - (syllables1 + syllables2);
    var flesch_reading_ease =
        206.835 -
        (1.015 * words) / sentences -
        (84.6 * total_syllables) / words;

    if (flesch_reading_ease > 100) {
        flesch_reading_ease = 100;
    } else if (flesch_reading_ease < 0) {
        flesch_reading_ease = 0;
    }

    var flesch_kincaid_grade_level =
        (0.39 * words) / sentences + (11.8 * total_syllables) / words - 15.9;
    var gunning_fog_index =
        (words / sentences + 100 * (pollysyllables / words)) * 0.4;
    var automated_readability_index =
        4.71 * (characters / words) + 0.5 * (words / sentences) - 21.43;
    var smog = 1.043 * Math.sqrt((pollysyllables * 30) / sentences) + 3.1291;
    var coleman_liau =
        0.0588 * ((100 * characters) / words) -
        0.296 * ((100 * sentences) / words) -
        15.8;
    var scoreMsg = `
        [Detailed] Readability score of main content area. Please note text within a list is ignored.

        Flesch Reading Ease: ${flesch_reading_ease.toFixed(1)}
        WCAG 2.0 Level AAA requires 60 or greater.
        
        Grade Level Average: ${(
            (flesch_kincaid_grade_level +
                gunning_fog_index +
                automated_readability_index +
                coleman_liau +
                (sentences >= 30 ? smog : 0)) /
            (sentences >= 30 ? 5 : 4)
        ).toFixed(1)}
        
        (Flesch-Kincaid): ${flesch_kincaid_grade_level.toFixed(1)}
        (Gunning-Fog): ${gunning_fog_index.toFixed(1)}
        (Automated Readability): ${automated_readability_index.toFixed(1)}
        (Colemane-Liau):  : ${coleman_liau.toFixed(1)}${
        sentences >= 30 ? "(SMOG): " + smog.toFixed(1) + "\n\n" : ""
    }
        WCAG 2.0 Level AAA requires grade 9 or lower.

        Words: ${words}

        Complex Words: ${Math.round(
            100 * ((words - (syllables1 + syllables2)) / words)
        )}%
        
        Sentences:${sentences}
        Words Per Sentence: ${(words / sentences).toFixed(1)}

        Syllables: ${total_syllables}
        Characters: ${characters}
    `;

    console.log(scoreMsg);

    let readingDifficulty = "";
    let readabilityDetails = "";
    let notEnoughContent = "";

    if (words > 30) {
        var fleschScore = flesch_reading_ease.toFixed(1);
        var avgWordsPerSentence = (words / sentences).toFixed(1);

        //WCAG AAA pass if greater than 60
        if (fleschScore >= 0 && fleschScore < 30) {
            readingDifficulty =
                '<span class="sa11y-readability-score">Very difficult</span>';
        } else if (fleschScore > 31 && fleschScore < 49) {
            readingDifficulty =
                '<span class="sa11y-readability-score">Difficult</span>';
        } else if (fleschScore > 50 && fleschScore < 60) {
            readingDifficulty =
                '<span class="sa11y-readability-score">Fairly difficult</span>';
        } else {
            readingDifficulty =
                '<span class="sa11y-readability-score">Good</span>';
        }

        readabilityDetails = `
            <ul id="sa11y-readability-details">
                <li>
                <span class='sa11y-bold'>Average words per sentence:</span> ${avgWordsPerSentence} 
                </li>
                <li>
                    <span class='sa11y-bold'>Complex words:</span> ${Math.round(
                        100 * ((words - (syllables1 + syllables2)) / words)
                    )} %
                </li>
                <li>
                    <span class='sa11y-bold'>Words:</span> ${words}
                </li>
            </ul>`;
    } else if ($mainPandLi.length === 0) {
        fleschScore = "";
        readingDifficulty = "";
        readabilityDetails = "";
        notEnoughContent =
            'Please identify the <a href="https://www.w3.org/WAI/tutorials/page-structure/regions/#main-content" target="_blank">main content region to calculate readability. <span class="sa11y-visually-hidden">(opens new tab)</span></a>';
    } else {
        fleschScore = "";
        readingDifficulty = "";
        readabilityDetails = "";
        notEnoughContent = "Not enough content to calculate readability score.";
    }

    let sa11yReadabilityPanel = document.createElement("div");
    sa11yReadabilityPanel.setAttribute("id", "sa11y-readability-content");
    sa11yReadabilityPanel.innerHTML = `
            <span class="sa11y-header-text">Readability</span>
            <div class="sa11y-readability-level">${fleschScore} ${readingDifficulty}</div> ${readabilityDetails} ${notEnoughContent}
            `;
    $("#sa11y-readability-panel").prepend(sa11yReadabilityPanel);
}
