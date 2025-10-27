
/*!
  * Sa11y, the accessibility quality assurance assistant.
  * @version 4.3.5
  * @author Adam Chaboryk
  * @license GPL-2.0-or-later
  * @copyright © 2020 - 2025 Toronto Metropolitan University.
  * @contact adam.chaboryk@torontomu.ca
  * GitHub: git+https://github.com/ryersondmp/sa11y.git | Website: https://sa11y.netlify.app
  * For all acknowledgements, please visit: https://sa11y.netlify.app/acknowledgements/
  * The above copyright notice shall be included in all copies or substantial portions of the Software.
**/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Sa11yLangFr = factory());
})(this, (function () { 'use strict';

  var fr = {
    // French
    strings: {
      LANG_CODE: 'fr',
      MAIN_TOGGLE_LABEL: 'Vérifier l’accessibilité',
      CONTAINER_LABEL: 'Vérificateur d’accessibilité',
      ERROR: 'Erreur',
      ERRORS: 'Erreurs',
      WARNING: 'Avertissement',
      WARNINGS: 'Avertissements',
      GOOD: 'Conforme',
      ON: 'Activé',
      OFF: 'Desactivé',
      ALERT_TEXT: 'Alerte',
      ALERT_CLOSE: 'Fermer',
      OUTLINE: 'Structure',
      READABILITY_DESC: 'Affiche le score de lisibilité dans l\'onglet <strong>Structure</strong> pour aider à évaluer la difficulté de lecture.',
      TITLE: 'Titre',
      ALT: 'Texte alternatif',
      IMAGES: 'Images',
      EDIT: 'Modifier',
      NO_IMAGES: 'Aucune image trouvée.',
      DECORATIVE: 'Décorative',
      MISSING: 'Manquant',
      PAGE_ISSUES: 'Problèmes de pages',
      SETTINGS: 'Paramètres',
      DEVELOPER_CHECKS: 'Vérifications du développeur',
      DEVELOPER_DESC: 'Vérifie les problèmes qui peuvent nécessiter des connaissances en programmation pour être corrigés, comme les attributs HTML, les formulaires et plus encore.',
      DARK_MODE: 'Mode sombre',
      SHORTCUT_SR: 'Passer au problème. Raccourci clavier : Alt + S',
      SKIP_TO_ISSUE: 'Passer au problème',
      NEW_TAB: 'Ouvre un nouvel onglet',
      LINKED: 'Lié',
      PANEL_HEADING: 'Vérification d’accessibilité',
      NO_ERRORS_FOUND: 'Aucune erreur trouvée.',
      WARNINGS_FOUND: 'avertissement(s) trouvé(s).',
      TOTAL_FOUND: 'problème(s) trouvé(s) au total.',
      NOT_VISIBLE: 'L’élément que vous tentez de consulter n’est pas visible; il peut être masqué, à l’intérieur de l’accordéon ou dans le volet de l’onglet.',
      MISSING_ROOT: 'L\'accessibilité de la page entière a été vérifiée, car la zone cible <code>%(root)</code> n\'existe pas.',
      MISSING_READABILITY_ROOT: 'Le score de lisibilité est basé sur la zone de contenu <code>%(fallback)</code>, car la zone cible <code>%(root)</code> n’existe pas.',
      SKIP_TO_PAGE_ISSUES: 'Passer aux problèmes de page',
      CONSOLE_ERROR: 'Désolé, mais il y a un problème avec le vérificateur d\'accessibilité sur cette page. Pouvez-vous s\'il vous plaît <a href="%(link)">le signaler via ce formulaire</a> ou sur <a href="%(link)">GitHub</a> ?',
      APPEARANCE: 'Apparence',
      MOVE_PANEL: 'Déplacer le panneau',
      HIDDEN: 'Caché',

      // Export
      DATE: 'Date',
      PAGE_TITLE: 'Titre de la page',
      RESULTS: 'Résultats',
      EXPORT_RESULTS: 'Exporter les résultats',
      GENERATED: 'Résultats générés avec %(tool).',
      PREVIEW: 'Aperçu',
      ELEMENT: 'Élément',
      PATH: 'Chemin',

      // Dismiss
      PANEL_DISMISS_BUTTON: 'Afficher %(dismissCount) rejetés',
      DISMISS: 'Rejeter',
      DISMISS_ALL: 'Tout rejeter',
      DISMISSED: 'Rejeté',
      DISMISS_REMINDER: 'Veuillez noter que les avertissements sont uniquement <strong>temporairement</strong> rejetés. La suppression de votre historique de navigation et de vos cookies restaurera tous les avertissements précédemment rejetés sur toutes les pages.',

      // Colour filters
      COLOUR_FILTER: 'Filtre de couleur',
      PROTANOPIA: 'Protanopie',
      DEUTERANOPIA: 'Deutéranopie',
      TRITANOPIA: 'Tritanopie',
      MONOCHROMACY: 'Monochromatie',
      COLOUR_FILTER_MESSAGE: 'Recherchez les éléments difficiles à percevoir ou à distinguer des autres couleurs.',
      RED_EYE: 'Daltonisme rouge.',
      GREEN_EYE: 'Daltonisme vert.',
      BLUE_EYE: 'Daltonisme bleu.',
      MONO_EYE: 'Daltonisme rouge, vert et bleu.',
      COLOUR_FILTER_HIGH_CONTRAST: 'Les filtres de couleur ne fonctionnent pas en mode contraste élevé.',

      // Alternative text stop words
      SUS_ALT_STOPWORDS: ['image', 'illustration', 'photo', 'photographie', 'graphic'],
      PLACEHOLDER_ALT_STOPWORDS: ['alt', 'image', 'photographie', 'décorative', 'photographie', 'support d’affichage', 'support d’affichage d’image', 'séparateur'],
      PARTIAL_ALT_STOPWORDS: [
        'clic',
        'cliquer ici',
        'cliquer pour plus de détails',
        'cliquer ici pour plus d’informations',
        'cocher',
        'télécharger',
        'télécharger ici',
        'pour en savoir',
        'pour en savoir d’avantage',
        'formulaire',
        'ici',
        'info',
        'information',
        'lien',
        'en apprendre',
        'en apprendre davantage',
        'davantage',
        'plus',
        'page',
        'papier',
        'en savoir plus',
        'lire',
        'lisez ceci',
        'ceci',
        'cette page',
        'ce site web',
        'consulter',
        'consulter notre',
        'site web',
      ],
      CLICK: ['click', 'cliquer'],
      NEW_WINDOW_PHRASES: ['externe', 'nouvel onglet', 'nouvelle fenêtre', 'fenêtre pop-up', 'pop-up'],
      FILE_TYPE_PHRASES: ['document', 'tableur', 'feuille de calcul', 'feuille de travail', 'fichier compressé', 'fichier archivé', 'feuille de calcul', 'powerpoint', 'présentation', 'installer', 'vidéo', 'audio', 'pdf'],

      // Readability
      READABILITY: 'Lisibilité',
      AVG_SENTENCE: 'Nombre de mots moyens par phrase:',
      COMPLEX_WORDS: 'Mots complexes:',
      TOTAL_WORDS: 'Mots:',
      VERY_DIFFICULT: 'Très difficile',
      DIFFICULT: 'Difficile',
      FAIRLY_DIFFICULT: 'Assez difficile',
      READABILITY_NO_CONTENT: 'Incapable de calculer le taux de lisibilité. Aucun paragraphe <code>&lt;p&gt;</code> ou liste de contenu <code>&lt;li&gt;</code> trouvé.',
      READABILITY_NOT_ENOUGH: 'Pas suffisamment de contenu pour calculer le taux de lisibilité.',

      // Headings
      HEADING_SKIPPED_LEVEL: 'Les titres ne doivent pas sauter de niveaux ou passer de <strong>Titre %(PREV_LEVEL)</strong> à <strong {C}>Titre %(LEVEL)</strong>, car cela perturbe l\'ordre et la hiérarchie du contenu, rendant sa compréhension plus difficile. <hr> Si <strong {C}>%(HEADING)</strong> fait partie de la section <strong>%(PREV_HEADING)</strong>, vous devriez le formater comme un <strong>Titre %(LEVEL)</strong> à la place.',
      HEADING_EMPTY: 'En-tête vide trouvé ! Pour corriger, supprimez cette ligne ou changez son format de <strong {C}>Titre %(level)</strong> à <strong>Normal</strong> ou <strong>Paragraphe</strong>.',
      HEADING_LONG: 'Le titre est long ! Les titres doivent être utilisés pour organiser le contenu et acheminer la structure. Ils doivent être brefs, informatifs et uniques. Les titres doivent être inférieurs à %(MAX_LENGTH) caractères (pas plus d’une phrase). <hr> <strong {B}>%(HEADING_LENGTH) Caractères</strong>',
      HEADING_FIRST: 'Le premier titre sur la page devrait généralement être un Titre 1 ou un Titre 2. Le Titre 1 doit débuter dans la section principale du contenu, car il s\'agit du titre principal qui décrit l\'objectif général de la page. En savoir plus sur <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">La Structure Des Titres.</a>',
      HEADING_MISSING_ONE: 'Titre 1 manquant. Le Titre 1 doit débuter dans la zone principale de contenu, il est le titre principal qui décrit l’objectif global de la page. En savoir plus sur <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">La Structure Des Titres.</a>',
      HEADING_EMPTY_WITH_IMAGE: 'Le titre ne contient pas de texte, mais seulement une image. Si ce n’est pas un titre, veuillez changer son format de <strong {C}>Titre %(level)</strong> à <strong>Normal</strong> ou <strong>Paragraphe</strong>. Sinon, veuillez ajouter du texte de remplacement à l’image si elle n’est pas décorative.',
      PANEL_HEADING_MISSING_ONE: 'Titre 1 manquant !',
      PANEL_NO_HEADINGS: 'Aucun titre trouvé.',

      // Links
      LINK_EMPTY: 'Retirer les liens vides sans texte.',
      LINK_EMPTY_LABELLEDBY: 'Le lien a une valeur pour <code>aria-labelledby</code> qui est vide ou ne correspond pas à la valeur de l\'attribut<code>id</code> d\'un autre élément de la page.',
      LINK_EMPTY_NO_LABEL: 'Le lien ne comporte pas de texte perceptible (discernible) par les lecteurs d\'écran ou autres technologies d\'assistance. À corriger: <ul><li>Ajoutez un texte bref qui décrit où le lien vous mène.</li><li>S’il s’agit d’un <a href="https://a11y-101.com/development/icons-and-links/">lien d’icône SVG (vectoriel),</a> il manque alors une description.</li><li>Si ce lien est une erreur due à un bogue de copier/coller, tentez de supprimer.</li></ul>',
      LINK_STOPWORD: 'Le texte du lien peut ne pas être suffisamment descriptif hors contexte : <strong {C}>%(ERROR)</strong>',
      LINK_STOPWORD_ARIA: 'Bien qu’un nom accessible ait été fourni, envisagez de réviser le texte visible du lien. Des expressions comme &quot;<strong {C}>%(ERROR)</strong>&quot; ne sont pas significatives.',
      LINK_TIP: '<hr> <strong>Astuce !</strong> Utilisez un texte de lien clair et unique qui décrit la destination du lien, généralement le titre de la page ou du document.',
      LINK_CLICK_HERE: 'La phrase « cliquer » ou « cliquez ici » met l’accent sur le mécanisme de la souris, alors que beaucoup de personnes n’utilisent pas de souris ou consultent ce site web sur un appareil mobile. Envisagez d’utiliser un verbe différent lié à la tâche.',
      DUPLICATE_TITLE: 'L’attribut <code>title</code> sur les liens et les images est conçu pour fournir des informations supplémentaires et doit être <strong>différent</strong> du texte ou du texte alternatif. Le texte du titre apparaît lors du survol d’un élément, mais il n’est pas accessible avec un clavier ou une saisie tactile. Envisagez <a href="https://www.a11yproject.com/posts/title-attributes/">d’éviter complètement l’attribut title.</a>',
      LINK_SYMBOLS: 'Évitez d’utiliser des symboles comme appels à l’action dans le texte des liens, sauf s’ils sont masqués aux technologies d’assistance. Les lecteurs d’écran peuvent lire les symboles à haute voix, ce qui peut prêter à confusion. Envisagez de les supprimer : <strong {C}>%(ERROR)</strong>',
      LINK_URL: 'Des adresses URLs plus longues et moins compréhensibles utilisé en tant que lien de texte peuvent être difficiles à écouter avec une technologie d’assistance. Dans la plupart des cas, il est recommandé d’utiliser du texte lisible plutôt qu’une adresse URL. Les adresses URL courtes (tels que les pages d’accueil de site web) sont correctes.',
      LINK_DOI: 'Pour les pages web ou les ressources en ligne uniquement, le <a href="https://apastyle.apa.org/style-grammar-guidelines/paper-format/accessibility/urls#:~:text=descriptive%20links">guide de style de l\'APA</a> recommande d\'utiliser des liens descriptifs en entourant l\'URL ou le DOI de l\'œuvre autour de son titre. Des adresses URLs plus longues et moins compréhensibles utilisé en tant que lien de texte peuvent être difficiles à écouter avec une technologie d’assistance.',
      LINK_NEW_TAB: 'Le lien s’ouvre dans une nouvelle fenêtre ou un nouvel onglet sans avertissement. Cela peut être particulièrement désorientant pour les personnes ayant des difficultés à percevoir le contenu visuel. De plus, il n’est pas recommandé de contrôler l\'expérience d\'une personne ou de prendre des décisions à sa place. Indiquez que le lien s’ouvrira dans une nouvelle fenêtre à l’intérieur du texte du lien. <hr> <strong>Conseil !</strong> Apprenez les meilleures pratiques: <a href="https://www.nngroup.com/articles/new-browser-windows-and-tabs/">l’ouverture de lien dans les nouvelles fenêtres ou onglets des navigateurs.</a>',
      LINK_FILE_EXT: 'Le lien dirige vers un PDF ou un fichier téléchargeable (exemple: MP3, Zip, Word Doc) sans avertissement. Indiquez le type de fichier dans le lien du texte. S’il s’agit d’un fichier volumineux, envisagez d’inclure la taille du fichier. <hr> <strong>Exemple:</strong> Rapport de synthèse (PDF, 3 Mo)',
      LINK_IDENTICAL_NAME: 'Le texte du lien est identique à un autre, bien qu’il pointe vers une page différente. Des liens qui contiennent le même texte peuvent porter à confusion pour les gens qui utilisent des lecteurs d’écran. <strong>Ajoutez une description plus complète au lien suivant pour le différencier des autres.</strong> <hr> <strong {B}>Nom accessible</strong> <strong {C}>%(TEXT)</strong>',

      // Images
      ALT_UNPRONOUNCEABLE: 'Le texte alternatif contient uniquement des symboles imprononçables et/ou des espaces. Les lecteurs d’écran annonceront l’image puis feront une pause. Si l’image est décorative, assurez-vous qu’il n’y a pas d’espaces dans le texte alternatif. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_ALT_UNPRONOUNCEABLE: 'Le texte alternatif de cette image liée contient uniquement des symboles imprononçables et/ou des espaces. Les lecteurs d’écran annonceront l’image puis feront une pause. Assurez-vous que le texte alternatif décrit la destination du lien. <hr> {L} {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      MISSING_ALT_LINK_HAS_TEXT: 'L’image est utilisé en tant que lien avec un texte autour, alors que l’attribut de remplacement doit être signalé comme décoratif ou nul.',
      MISSING_ALT_LINK: 'L’image est utilisée en tant que lien mais manque de texte de remplacement ! Veuillez vous assurer que le texte de remplacement décrit où le lien vous mène.',
      MISSING_ALT: 'Texte alternatif manquant ! Si l’image transmet un message, une émotion ou une information importante, assurez-vous d’ajouter une description claire de l’image.',
      LINK_ALT_FILE_EXT: 'Le texte alternatif ne doit pas inclure les extensions de fichier ou les dimensions de l\'image. Assurez-vous que le texte de remplacement décrit la destination du lien, pas une description complète de l’image. Retirer: <strong {C}>%(ERROR)</strong> <hr> {L} {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_PLACEHOLDER_ALT: 'Texte alternatif non-descriptif ou séparateur trouvé dans une image. Assurez-vous que le texte de remplacement décrit la destination du lien, pas une description complète de l’image. Remplacer le texte de remplacement suivant. <hr> {L} {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_SUS_ALT: 'La technologie d’assistance indique déjà que c’est une image, donc &quot;<strong {C}>%(ERROR)</strong>&quot; pourrait être redondant. Assurez-vous que le texte de remplacement décrit la destination du lien, pas la description complète de l’image. <hr> {L} {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      ALT_FILE_EXT: 'Le texte alternatif ne doit pas inclure les extensions de fichier ou les dimensions de l\'image. Si l’image transmet un message, une émotion ou une information importante, assurez-vous d’ajouter une description de l’image. Retirer: <strong {C}>%(ERROR)</strong> <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      ALT_PLACEHOLDER: 'Texte alternatif non-descriptif ou séparateur trouvé dans une image. Modifier le texte de remplacement suivant pour le rendre plus significatif. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      SUS_ALT: 'Les technologies d’assistances indiquent déjà qu’il s’agit d’une image, donc &quot;<strong {C}>%(ERROR)</strong>&quot; peut être redondant. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_NO_ALT_TEXT: 'L’image dans le lien est marquée comme décorative et il n’y a pas de lien de texte. Veuillez ajouter du texte de remplacement à l’image qui décrit la destination du lien.',
      LINK_IMAGE_TEXT: 'L’image est marquée comme étant décorative, bien que le lien utilise le texte autour en tant que description.',
      LINK_IMAGE_LONG_ALT: 'La description du texte de remplacement sur l’image liée est <strong>trop long</strong>. Le texte de remplacement sur l’image liée devrait décrire où le lien vous mène, pas une description complète de l’image. <strong>Utilisez le titre de l’image en tant que lien du texte de remplacement.</strong> <hr> {L} {ALT} <strong {B}>%(altLength) Caractères</strong> <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_ALT: 'Le lien vers l\'image contient un texte de remplacement. <strong>Le texte de remplacement décrit-il la destination du lien?</strong> Pensez à utiliser le titre de la page à laquelle le lien renvoie comme texte de remplacement. <hr> {L} {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_ALT_AND_TEXT: 'Le lien de l’image contient <strong>du texte de remplacement et du texte à l’entour.</strong> Si cette image est décorative et est utilisé en tant que lien qui mène à une autre page, envisagez marquer l’image en tant que décorative, ou nulle - les liens texte autour devraient suffire. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong> <hr> <strong {B}>Nom accessible</strong> {L} <strong {C}>%(TEXT)</strong>',
      IMAGE_FIGURE_DECORATIVE: 'L’image est perçue de manière <strong>décorative</strong> et sera ignorée par la technologie d’assistance. <hr> Bien qu’une <strong>légende</strong> est fournie, l’image devrait aussi avoir du texte de remplacement dans la plupart des cas.<ul><li>Le texte de remplacement devrait fournir une description précise de l’image.</li><li>La légende devrait fournir habituellement le contexte lié à l’image derrière le contenu environnant ou prêter attention à un élément d’information.</li></ul>En savoir plus: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt versus figcaption (légende de la figure).</a>',
      IMAGE_FIGURE_DUPLICATE_ALT: 'Ne pas utiliser le même mot pour la légende et le texte de remplacement. Les lecteurs d’écrans vont annoncer l’information en double. <ul><li>Le texte de remplacement devrait fournir une description précise de l’image.</li><li>La légende devrait fournir habituellement le contexte lié à l’image derrière le contenu environnant ou prêter attention à un élément d’information.</li></ul> En savoir plus: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt versus figcaption (légende de la figure).</a> <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      IMAGE_DECORATIVE: 'L’image est marquée comme <strong>décorative</strong> et sera ignorée par la technologie d’assistance. Si l’image transmet un message, une émotion ou une information importante, assurez-vous d’ajouter le texte de remplacement.',
      IMAGE_DECORATIVE_CAROUSEL: 'L\'image est marquée comme décorative, mais toutes les images dans un carrousel ou une galerie devraient inclure un texte alternatif descriptif pour garantir une expérience équivalente pour tout le monde.',
      IMAGE_ALT_TOO_LONG: 'La description du texte de remplacement est <strong>trop longue</strong>. Le texte de remplacement doit être précis, mais significatif tout comme un <em>gazouillis (micromessage) </em> (environ 100 caractères). S’il s’agit d’une image complexe ou d’une illustration, ajoutez une longue description de l’image dans le texte ci-dessous ou dans la composante accordéon. <hr> {ALT} <strong {B}>%(altLength) Caractères</strong> <strong {C}>%(ALT_TEXT)</strong>',
      IMAGE_PASS: '{ALT} %(ALT_TEXT)',
      LINK_ALT_MAYBE_BAD: "Le lien d'image a un texte alternatif qui peut ne pas fournir d'informations utiles ou est non descriptif. Assurez-vous que le texte alt décrit la destination du lien. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>",
      ALT_MAYBE_BAD: "Le texte alternatif peut ne pas fournir d'informations utiles ou est non descriptif. Améliorez le texte alt suivant : <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>",

      // Labels
      LABELS_MISSING_IMAGE_INPUT: 'Le bouton de l’image manque un texte de remplacement. Veuillez ajouter un texte de remplacement pour fournir un nom accessible. Par exemple: <em>Rechercher</em> ou <em>Soumettre</em>.',
      LABELS_INPUT_RESET: 'Le bouton de réinitialisation <strong>ne devrait pas</strong> être utilisé sauf en cas de besoin spécifique, car il est facile de l’activer par erreur.<hr><strong>Conseil !</strong> En savoir plus sur <a href="https://www.nngroup.com/articles/reset-and-cancel-buttons/">les problèmes liés aux boutons Réinitialiser et Annuler.</a>',
      LABELS_ARIA_LABEL_INPUT: 'L’entrée a un nom accessible, assurez-vous qu’il y a aussi une étiquette visible. <hr> <strong {B}>Nom accessible</strong> <strong {C}>%(TEXT)</strong>',
      LABELS_NO_FOR_ATTRIBUTE: 'Il n’y a pas d’étiquette associée à cette entrée. Ajoutez un attribut <code>for</code> à l’étiquette qui correspond à l’attribut <code>id</code> de cette entrée. <hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',
      LABELS_MISSING_LABEL: 'Il n’y a pas d’étiquette associée à cette entrée. Veuillez ajouter un attribut <code>id</code> à cette entrée, et ajouter un attribut <code>for</code> correspondant à l’étiquette.',
      LABELS_PLACEHOLDER: 'Le texte de remplacement qui disparaît rend difficile pour les gens de se souvenir de quelle information appartient à un champ et d’identifier et de corriger les problèmes de validation. En revanche, envisagez d\'utiliser un indice visible en permanence avant le champ du formulaire. <hr> En savoir plus: <a href="https://www.nngroup.com/articles/form-design-placeholders/">Les espaces réservés dans les champs de formulaire sont nuisibles.</a>',

      // Embedded content
      EMBED_VIDEO: 'Assurez-vous <strong>que les vidéos ont des sous-titres codés.</strong> Fournir les sous-titres pour tout type de contenu audio ou vidéo est une exigence obligatoire de Niveau A. Les sous-titres aident les gens qui sont malentendants.',
      EMBED_AUDIO: 'Assurez-vous de fournir <strong>une transcription pour tous les balados.</strong> Fournir les transcriptions pour tout type de contenu audio est une exigence obligatoire de Niveau A. Les transcriptions aident les gens qui sont malentendant, mais peuvent profiter à tout le monde. Positionnez la transcription sous ou à l’intérieur du panneau accordéon.',
      EMBED_DATA_VIZ: 'Les gadgets logiciels de visualisation de données comme ceci sont souvent problématiques pour les gens qui utilisent un clavier ou un lecteur d’écran lors de la navigation et peuvent présenter d’importantes difficultés pour les gens qui ont une malvoyance ou du daltonisme. Il est recommandé de fournir la même information de remplacement (texte ou tableau) dans le format ci-dessous du gadget logiciel. <hr> En savoir plus sur les <a href="https://www.w3.org/WAI/tutorials/images/complex/">images complexes.</a>',
      EMBED_MISSING_TITLE: 'Le contenu intégré requiert un nom accessible qui décrit le contenu. Veuillez fournir un titre (<code>title</code>) unique ou <code>aria-label</code> un attribut à l’élément <code>iframe</code>. En savoir plus sur les <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Element/iframe#une_iframe_simple">iFrames.</a>',
      EMBED_GENERAL: 'Impossible de vérifier le contenu intégré. Assurez-vous que les images ont du texte de remplacement, les vidéos ont des sous-titres, le texte est suffisamment contrasté et que les éléments interactifs sont <a href="https://webaim.org/techniques/keyboard/">accessible par le clavier.</a>',
      EMBED_UNFOCUSABLE: 'Les <code>&lt;iframe&gt;</code> avec des éléments non focusables ne doivent pas avoir de <code>tabindex="-1"</code>. Le contenu incorporé ne sera pas accessible au clavier.',

      // Quality assurance
      QA_BAD_LINK: 'Lien incorrect trouvé. Le lien semble diriger vers un environnement de développement. <hr> {L} <strong {C}>%(LINK)</strong>',
      QA_IN_PAGE_LINK: 'Lien interne cassé. La cible du lien ne correspond à aucun élément de cette page.',
      QA_STRONG_ITALICS: 'Les balises Gras et Italique ont une signification sémantique et <strong>ne devraient pas</strong> être utilisées pour surligner des paragraphes en entier. Le texte en gras doit être utilisé pour mettre fortement <strong>l’accent</strong> sur un mot ou une phrase. Les textes en Italiques doivent être utilisés pour surligner les noms propres (ex. livres et titre d’articles), les mots étrangers et les citations. Les citations longues doivent être formatées comme une citation en bloc.',
      QA_PDF: 'Impossible de vérifier l’accessibilité des fichiers PDF. Les PDF sont considérés comme contenu web et doivent être accessibles comme tel. Les PDF contiennent souvent des problèmes pour les personnes qui utilisent les lecteurs d’écrans (balises structurelles manquantes ou des champs de formulaire manquants) et les gens qui ont une malvoyance (le texte ne resurgit pas lorsqu’il est agrandi). <ul><li>S’il s’agit d’un formulaire, utilisez un formulaire HTML accessible comme alternative.</li><li>S’il s’agit d’un document, convertissez-le en page web.</li></ul> Sinon, veuillez vérifier <a href="https://helpx.adobe.com/acrobat/using/create-verify-pdf-accessibility.html">l’accessibilité du PDF dans Acrobat DC.</a>',
      QA_DOCUMENT: 'Impossible de vérifier l\'accessibilité du document. Les documents liés sont considérés comme du contenu web et doivent également être rendus accessibles. Veuillez vérifier manuellement ce document. <ul><li>Rendez votre <a href="https://support.google.com/docs/answer/6199477?hl=fr">document ou votre présentation Google Workspace plus accessible.</a></li><li>Rendez vos <a href="https://support.microsoft.com/fr-fr/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155">documents Office plus accessibles.</a></li></ul>',
      QA_BLOCKQUOTE: 'Est-ce un titre? <strong {C}>%(TEXT)</strong> <hr> Les citations en bloc doivent être utilisées pour les citations uniquement. S’il s’agit d’un titre, changez cette citation en bloc pour un titre sémantique (ex. Titre 2 ou Titre 3).',
      QA_FAKE_HEADING: 'Est-ce un titre? <strong {C}>%(TEXT)</strong> <hr> Une ligne de texte en gras ou de grande taille peut ressembler à un titre, mais pour une personne utilisant un lecteur d’écran, il est impossible de déterminer ce qui est important ou comment accéder au contenu. Un texte en gras ou de grande taille ne doit jamais remplacer un titre sémantique (Titre 2 à Titre 6).',
      QA_FAKE_LIST: 'Voulez-vous créer une liste? Une liste d’élément possible est trouvée: <strong {C}>%(firstPrefix)</strong> <hr> Assurez-vous de créer une liste en suivant le formatage de bouton, de puces ou de nombre. Lors d’une liste relative, la technologie d’assistance est en mesure de transmettre l’information telle que le nombre total d’élément et la position relative de chaque élément sur la site. En savoir plus sur les <a href="https://www.w3.org/WAI/tutorials/page-structure/content/#lists">listes relatives.</a>',
      QA_UPPERCASE: 'Majuscules trouvées. Certains lecteurs d’écran pourraient interpréter les textes majuscules en tant qu’acronyme et pourraient être tentés de les lire individuellement. De plus, certaines personnes trouvent les majuscules difficiles à lire et peuvent donner l’impression de <strong>CRIER.</strong>',
      QA_UNDERLINE: 'Le texte souligné peut être confondu avec les liens. Envisagez d’utiliser un style différent comme <strong>&lt;strong&gt;forte importance&lt;/strong&gt;</strong> ou <em>&lt;em&gt;emphase&lt;/em&gt;</em>.',
      QA_SUBSCRIPT: 'Les options de mise en forme en indice et en exposant ne doivent être utilisées que pour modifier la position du texte afin de se conformer aux conventions ou normes typographiques. Il ne doit <strong>pas</strong> être utilisé uniquement à des fins de présentation ou d’apparence. La mise en forme de phrases entières pose des problèmes de lisibilité. Les cas d’utilisation appropriés incluent l’affichage d’exposants, de nombres ordinaux tels que 4<sup>th</sup> au lieu de quatrième et de formules chimiques (H<sub>2</sub>O).',
      QA_NESTED_COMPONENTS: 'Évitez d\'imbriquer des composants de mise en page interactifs, comme de placer des accordéons dans des onglets ou des onglets dans des accordéons. Cela peut compliquer la navigation, augmenter la charge cognitive et conduire à ce que les gens négligent le contenu.',
      QA_JUSTIFY: 'Évitez d\'utiliser du texte justifié, qui s\'aligne à la fois sur les marges gauche et droite. Cela peut être difficile à lire pour certaines personnes en raison des espaces inégaux entre les mots. Utilisez du texte aligné à gauche pour une meilleure lisibilité.',
      QA_SMALL_TEXT: 'Le texte petit est plus difficile à lire, en particulier pour les personnes malvoyantes. Pour garantir une meilleure lisibilité, évitez d\'utiliser des tailles de police inférieures à la valeur par défaut.',

      // Shared
      ACC_NAME: '<strong {B}>Nom accessible</strong> %(TEXT)',
      ACC_NAME_TIP: '<hr><strong>Astuce !</strong> Le "nom accessible" est l\'étiquette finale qui est communiquée aux personnes utilisant des technologies d\'assistance et qui est calculée par ARIA. Cela les aide à comprendre le but du lien ou du bouton.',
      HIDDEN_FOCUSABLE: 'Le lien ou le bouton a <code>aria-hidden=&quot;true&quot;</code> mais reste accessible via le clavier. Si vous avez l\'intention de masquer un lien ou un bouton dupliqué, ajoutez également<code>tabindex=&quot;-1&quot;</code>. Sinon, <code>aria-hidden=&quot;true&quot;</code> ne doit pas être utilisé sur des éléments pouvant recevoir le focus. <hr> En savoir plus sur l\' <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden">attribut aria-hidden.</a>',

      // Developer
      DUPLICATE_ID: 'ID (Identifiant) dupliqué trouvé. Les erreurs d’ID (d’identifiants) dupliqués sont reconnues pour causer des problèmes au niveau de la technologie d’assistance lorsqu’ils tentent d’interagir avec le contenu. Veuillez retirer ou modifier l’ID (l’identifiant) suivant. <hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',
      UNCONTAINED_LI: 'Tous les éléments de liste <code>&lt;li&gt;</code> doivent être placés à l\'intérieur des éléments <code>&lt;ul&gt;</code> non ordonnés ou <code>&lt;ol&gt;</code> ordonnés. Cette structure aide les lecteurs d\'écran à annoncer la liste et ses éléments avec précision.',
      TABINDEX_ATTR: 'L\'élément ne doit pas avoir un attribut <code>tabindex</code> supérieur à 0.',

      // Meta checks
      META_LANG: 'La langue de la page n’est pas indiquée ! Veuillez <a href="https://www.w3.org/International/questions/qa-html-language-declarations.fr">indiquer la langue sur la balise HTML.</a>',
      META_TITLE: 'Titre de la page manquant ! Veuillez fournir un <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Element/title">titre de page.</a>',
      META_SCALABLE: 'Supprimez le paramètre <code>user-scalable="no"</code> dans la <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Viewport_meta_tag">balise meta viewport</a> pour permettre le zoom.',
      META_MAX: 'Assurez-vous que le paramètre <code>maximum-scale</code> dans la <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Viewport_meta_tag">balise meta viewport</a> n\'est pas inférieur à 2.',
      META_REFRESH: 'La page ne doit pas se rafraîchir automatiquement en utilisant une balise meta.',

      // Buttons
      BTN_EMPTY: 'Le bouton manque d’un nom accessible qui décrit son objectif.',
      BTN_EMPTY_LABELLEDBY: 'Le bouton a une valeur <code>aria-labelledby</code> qui est vide ou ne correspond pas à la valeur <code>id</code> d’un autre élément sur la page.',
      BTN: 'bouton',
      BTN_TIP: 'Apprenez à créer un <a href="https://www.sarasoueidan.com/blog/accessible-icon-buttons/">bouton accessible.</a>',
      BTN_ROLE_IN_NAME: 'N’incluez pas le mot « bouton » dans le nom d’un bouton. Les lecteurs d’écran annoncent déjà le rôle d’un élément en plus de son nom.',
      LABEL_IN_NAME: 'Le texte visible pour cet élément semble différent du nom accessible, ce qui peut entraîner de la confusion pour les utilisateurs des technologies d’assistance. Veuillez vérifier : <hr> <strong {B}>Nom Accessible</strong> <strong {C}>%(TEXT)</strong>',

      // Tables
      TABLES_MISSING_HEADINGS: 'En-têtes de tableau manquants ! Les tableaux accessibles nécessitent un balisage HTML qui indique les cellules d’en-tête et les cellules de données pour définir leur relation. Cette information fournit le contexte aux personnes qui utilisent la technologie d’assistance. Les tableaux doivent être utilisés pour les données tabulaires uniquement. <hr> En savoir plus sur les <a href="https://www.w3.org/WAI/tutorials/tables/">tableaux accessibles.</a>',
      TABLES_SEMANTIC_HEADING: 'Les titres sémantiques tels que Titre 2 ou Titre 3 doivent être utilisées uniquement pour les sections de contenu ; <strong>non</strong> pour les tableaux HTML. Indiquez les en-têtes de tableau en utilisant plutôt l’élément <code>&lt;th&gt;</code>. <hr> En savoir plus sur les <a href="https://www.w3.org/WAI/tutorials/tables/">tableaux accessibles.</a>',
      TABLES_EMPTY_HEADING: 'En-tête de tableau vide trouvé ! Les en-têtes de tableau ne devraient <strong>jamais</strong> être vides. Il est important de désigner les en-têtes de ligne et/ou de colonne pour définir leur relation. Cette information fournit le contexte aux personnes qui utilisent la technologie d’assistance. Veuillez garder à l’esprit que les tableaux devraient être utilisés pour les données tabulaires uniquement. <hr> En savoir plus sur les <a href="https://www.w3.org/WAI/tutorials/tables/">tableaux accessibles.</a>',

      // Contrast
      CONTRAST_NORMAL: 'Le texte de taille normale doit avoir un rapport de contraste d’au moins %(RATIO).',
      CONTRAST_LARGE: 'Le texte de grande taille doit avoir un rapport de contraste d’au moins %(RATIO).',
      CONTRAST_ERROR: 'Le texte n\'a pas assez de contraste avec l\'arrière-plan, ce qui le rend difficile à lire.',
      CONTRAST_WARNING: 'Le contraste de ce texte est inconnu et doit être vérifié manuellement. Assurez-vous que le texte et l\'arrière-plan ont un contraste suffisamment fort.',
      CONTRAST_ERROR_GRAPHIC: 'Le graphique n\'a pas assez de contraste avec l\'arrière-plan, ce qui le rend difficile à percevoir.',
      CONTRAST_WARNING_GRAPHIC: 'Le contraste de ce graphique est inconnu et doit être vérifié manuellement.',
      CONTRAST_TIP_GRAPHIC: 'Les graphiques et les éléments de l\'interface utilisateur doivent avoir un ratio de contraste d\'au moins 3:1.',
      CONTRAST_OPACITY: 'Augmentez l\'opacité pour une meilleure visibilité.',
      CONTRAST_APCA: 'Ce n\'est pas assez de contraste pour n\'importe quelle taille de texte. Envisagez-vous d\'utiliser cette combinaison de couleur et de taille de texte ?',
      CONTRAST_COLOR: 'Envisagez-vous d\'utiliser cette couleur à la place ?',
      CONTRAST_SIZE: 'Envisagez-vous d\'augmenter la taille du texte pour cette combinaison de couleurs ?',
      CONTRAST_PLACEHOLDER: 'Le texte de l\'espace réservé dans ce champ de saisie n\'a pas suffisamment de contraste avec l\'arrière-plan, ce qui le rend difficile à lire.',
      CONTRAST_PLACEHOLDER_UNSUPPORTED: 'Le contraste de ce texte de remplacement est inconnu et doit être vérifié manuellement. Assurez-vous que le texte et l’arrière-plan ont des couleurs fortement contrastées.',
      CONTRAST_INPUT: 'Le texte dans ce champ de saisie n\'a pas suffisamment de contraste avec l\'arrière-plan, ce qui le rend difficile à lire.',
      CONTRAST: 'Contraste',
      UNKNOWN: 'Inconnu',
      FG: 'Premier plan',
      BG: 'Arrière-plan',
      NO_SUGGESTION: 'Aucune combinaison accessible ne peut être trouvée en modifiant uniquement la couleur du texte. Essayez de modifier la couleur de l\'arrière-plan.',
    },
  };

  return fr;

}));
