const merge = require("webpack-merge");
const webpack = require("webpack");
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
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            })
        ]
    }
);