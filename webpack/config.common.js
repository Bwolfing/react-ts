
const path = require("path");
const TsconfigPaths = require("tsconfig-paths-webpack-plugin");
const MiniCssExtract = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const PwaManifestPlugin = require("webpack-pwa-manifest");
const webpack = require("webpack");

const projectRoot = path.join(__dirname, "../");
const entryPoints = ["inline","polyfills","sw-register","styles","vendor","main"];
const environmentName = process.env.NODE_ENV || "development";

console.log(environmentName);

module.exports = {
    entry: {
        main: [
            path.join(projectRoot, "src/app/main.tsx")
        ],
        "service-worker": [
            path.join(projectRoot, "src/app/service-worker.ts")
        ]
    },
    output: {
        path: path.join(projectRoot, "dist"),
        filename: "[name].bundle.js",
        chunkFilename: "[name].bundle.js",
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
            path.join(projectRoot, "node_modules")
        ],
        plugins: [
            new TsconfigPaths()
        ],
        alias: {
            "@bootstrap": path.join(projectRoot, "bower_components/bootstrap"),
        },
    },
    mode: environmentName,
    plugins: [
        new CleanWebpackPlugin(path.join(projectRoot, "dist"), {
            root: projectRoot
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new MiniCssExtract({
            filename: "styles.bundle.css"
        }),
        new HtmlWebpackPlugin({
            template: path.join(projectRoot, "src/app/index.html"),
            filename: "index.html",
            hash: false,
            inject: true,
            favicon: false,
            minify: false,
            cache: true,
            showErrors: true,
            chunks: "all",
            excludeChunks: [
                "service-worker"
            ],
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
        }),
        new PwaManifestPlugin({
            name: "React with TypeScript",
            short_name: "React TS",
            description: "Practice application for React and PWAs",
            icons: [
                {
                    src: path.join(projectRoot, "src/app/assets/react.png"),
                    size: 144
                }
            ],
            background_color: "#fff",
            fingerprints: false,
            inject: true,
            lang: "en-US",
            display: "standalone",
            start_url: "/about"
        }),
        new webpack.ExtendedAPIPlugin()
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
                    "name": "assets/[name].[ext]",
                    "limit": 10000
                }
            },
            {
                "test": /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/,
                "loader": "url-loader",
                "options": {
                    "name": "assets/[name].[ext]",
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
                test: /\.css$/,
                use: [
                    MiniCssExtract.loader,
                    "css-loader"
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
                    test: /([\\/]node_modules\/@fortawesome|\.css$)/,
                },
                vendor: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                }
            }
        }
    }
};