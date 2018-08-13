const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const TsconfigPaths = require("tsconfig-paths-webpack-plugin");
const fs = require('fs');
const webpack = require("webpack");

const projectRoot = path.join(__dirname, "../");
const environmentName = process.env.NODE_ENV || "development";
const nodeModules = {};

fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    entry: path.join(projectRoot, "src/server/index.ts"),
    output: {
        path: path.join(projectRoot, "server"),
        filename: "index.js",
        chunkFilename: "index.js",
        // Bundle absolute resource paths in the source-map,
        // so VSCode can match the source file.
        devtoolModuleFilenameTemplate: '[absolute-resource-path]'
    },
    mode: environmentName,
    devtool: "source-map",
    resolve: {
        extensions: [
            ".ts",
            ".tsx",
            ".js",
            ".json",
            ".scss"
        ],
        modules: [
            path.join(projectRoot, "node_modules")
        ],
        plugins: [
            new TsconfigPaths()
        ],
    },
    plugins: [
        new CleanWebpackPlugin(path.join(projectRoot, "server"), {
            root: projectRoot
        }),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },
        ]
    },
    target: "node",
    externals: nodeModules
};