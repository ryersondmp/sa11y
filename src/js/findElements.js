export default function (root, elemToIgnore) {
    let containerIgnore = elemToIgnore["container"];
    let imageIgnore = elemToIgnore["image"];
    let linkIgnore = elemToIgnore["link"];
    return {
        inputs: root.find("input").not(containerIgnore).not("input:hidden"),
        link: root.find("a[href]").not(linkIgnore),
        p: root.find("p").not(containerIgnore),
        h: root
            .find("h1, h2, h3, h4, h5, h6, [role='heading'][aria-level]")
            .not(":hidden")
            .not(containerIgnore),
        mainPandLi: root
            .find("main p, main li, [role='main'] p, [role='main'] li")
            .not(containerIgnore),
        images: root.find("img").not(imageIgnore),
        iframe: root.find("iframe").not(containerIgnore),

        contrast: root
            .find("*:visible")
            .not(".sa11y-exclude *")
            .not("#sa11y-container *")
            .not(containerIgnore),
    };
}
