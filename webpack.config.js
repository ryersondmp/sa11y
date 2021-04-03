const path = require("path");
module.exports = {
    entry: "./src/index.js",
    module: {
        rules: [
            {
                test: /\.svg$/,
                use: "svg-inline-loader",
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, ""),
        filename: "sa11y-v2.1.js",
    },
    mode: "development",
};
