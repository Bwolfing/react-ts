const merge = require("webpack-merge");
const standardConfig = require("./webpack.config.common");

module.exports = merge(
    standardConfig,
    {
        mode: "development",
        devtool: "inline-source-map"
    }
);