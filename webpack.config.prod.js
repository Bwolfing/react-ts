const merge = require("webpack-merge");
const uglifyJsPlugin = require("uglifyjs-webpack-plugin");
const optimizeCssPlugin = require("optimize-css-assets-webpack-plugin");

const standardConfig = require("./webpack.config.common");


module.exports = () => {
    let configs = [];
    for (let i = 0; i < standardConfig.length; i++) {
        configs.push(
            merge(standardConfig[i], {
                mode: "production",

                optimization: {
                    minimize: true,
                    minimizer: [
                        new uglifyJsPlugin({
                            sourceMap: false
                        }),
                        new optimizeCssPlugin()
                    ]
                }
            })
        );
    }

    return configs;
};