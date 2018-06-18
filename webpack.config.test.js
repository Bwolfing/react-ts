const webpack = require("webpack");
const commonConfig = require("./webpack.config.common");
const merge = require("webpack-merge");
const path = require("path");

module.exports = merge(
    commonConfig,
    {
        mode: "development",
        entry: path.join(__dirname, "src/Tests.js"),
        output: {
            path: path.join(__dirname, "dist/test")
        },
        devtool: "inline-source-map",
        plugins: [
            new webpack.DefinePlugin({
                "typeof window": JSON.stringify("object")
            })
        ]
    }
);