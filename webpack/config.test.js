const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const commonConfig = require("./config.common");

let testConfig = Object.assign({}, commonConfig);

testConfig.plugins = testConfig.plugins.filter(p =>
    !(p instanceof HtmlWebpackPlugin) && !(p instanceof CleanWebpackPlugin)
);
delete testConfig.entry;
delete testConfig.optimization;

module.exports = testConfig;