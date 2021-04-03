import panel from "./panelSetup";

import defaultSetup from "./generalSetup";

import contrastSetup from "./contrastSetup";
import darkmodeSetup from "./darkModeSetup";
import readabilitySetup from "./readabilitySetup";

export default function Sa11y() {
    $(() => {
        $("body").prepend(panel);
        defaultSetup();
        // contrastSetup();
        contrastSetup();
        darkmodeSetup();
        readabilitySetup();
    });
}
