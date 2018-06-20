const merge = require("webpack-merge");
const standardConfig = require("./config.common");

module.exports = merge(
    standardConfig,
    {
        mode: "development",
        devtool: "inline-source-map"
    }
);