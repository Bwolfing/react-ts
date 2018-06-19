const merge = require("webpack-merge");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCssPlugin = require("optimize-css-assets-webpack-plugin");

const standardConfig = require("./webpack.config.common");

module.exports = merge(
    standardConfig,
    {
        mode: "production",
        optimization: {
            minimize: true,
            minimizer: [
                new UglifyJsPlugin({
                    sourceMap: false
                }),
                new OptimizeCssPlugin()
            ]
        }
    }
);