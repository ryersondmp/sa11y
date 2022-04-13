class Sa11yCustomChecks {
    'use strict';  
    check = () => {
        const M = sa11yLang;
        /******************************/
        /* Add custom rulesets below. */
        /******************************/

        /* Custom messages for tooltips. */
        const C = {
           ANNOUNCEMENT_MESSAGE: 
                `More than one Announcement component found! The Announcement component should be used strategically and sparingly. It should be used to get attention or indicate that something is important. Misuse of this component makes it less effective or impactful. Secondly, this component is semantically labeled as an Announcement for people who use screen readers.`,
        }
    
        /* Example custom check #1 */
        const $checkAnnouncement = Sa11y.root.querySelectorAll(".sa11y-announcement-component");
        if ($checkAnnouncement.length > 1) {
            Sa11y.warningCount++;
            for (let i = 1; i < $checkAnnouncement.length; i++) {
                $checkAnnouncement[i].classList.add("sa11y-warning-border");
                $checkAnnouncement[i].insertAdjacentHTML("beforebegin", 
                    Sa11y.annotate(M["WARNING"], C["ANNOUNCEMENT_MESSAGE"])
                );
            }
        }
        /******************************/
        /*   End of custom rulesets.  */
        /******************************/
    };
}