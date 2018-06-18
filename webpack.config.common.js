
const path = require("path");
const TsconfigPaths = require("tsconfig-paths-webpack-plugin");
const MiniCssExtract = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

const entryPoints = ["inline","polyfills","sw-register","styles","vendor","main"];
const environmentName = process.env.NODE_ENV || "development";

console.log(environmentName);

module.exports = {
    entry: path.join(__dirname, "src/main.tsx"),
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].bundle.js",
        chunkFilename: "[id].bundle.js",
    },
    resolve: {
        extensions: [
            ".ts",
            ".tsx",
            ".js",
            ".json",
            ".scss"
        ],
        modules: [
            path.join(__dirname, "node_modules")
        ],
        plugins: [
            new TsconfigPaths()
        ],
        alias: {
            "@bootstrap": path.join(__dirname, "bower_components/bootstrap")
        },
    },
    mode: environmentName,
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new MiniCssExtract({
            filename: "styles.bundle.css"
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "index.html"),
            filename: "index.html",
            hash: false,
            inject: true,
            favicon: false,
            minify: false,
            cache: true,
            showErrors: true,
            chunks: "all",
            excludeChunks: [],
            title: "Webpack App",
            xhtml: true,
            chunksSortMode: function sort(left, right) {
                let leftIndex = entryPoints.indexOf(left.names[0]);
                let rightindex = entryPoints.indexOf(right.names[0]);
                if (leftIndex > rightindex) {
                    return 1;
                }
                else if (leftIndex < rightindex) {
                    return -1;
                }
                else {
                    return 0;
                }
            },
        })
    ],
    module: {
        rules: [
            {
                "test": /\.html$/,
                "loader": "raw-loader"
            },
            {
                "test": /\.(eot|svg|cur)$/,
                "loader": "file-loader",
                "options": {
                    "name": "[name].[hash:20].[ext]",
                    "limit": 10000
                }
            },
            {
                "test": /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/,
                "loader": "url-loader",
                "options": {
                    "name": "[name].[hash:20].[ext]",
                    "limit": 10000
                }
            },
            {
                test: /\.scss$/,
                exclude: /\.(js|ts|tsx)$/,
                use: [
                    MiniCssExtract.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },
            {
                enforce: "pre",
                test: /.js?$/
            }
        ],
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                },
                vendor: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                }
            }
        }
    }
};