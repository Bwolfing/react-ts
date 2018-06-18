const HtmlWebpackPlugin = require("html-webpack-plugin")

const commonConfig = require("./webpack.config.common");

let testConfig = Object.assign({}, commonConfig);

testConfig.plugins = testConfig.plugins.filter(p => !(p instanceof HtmlWebpackPlugin));
delete testConfig.entry;
delete testConfig.optimization;

module.exports = testConfig;