
const path = require("path");
const tsconfigPaths = require("tsconfig-paths-webpack-plugin");
const MiniCssExtract = require("mini-css-extract-plugin");

const environmentName = process.env.NODE_ENV || "development";

const aliasFiles = {
    "react": {
        production: ".production.min",
        development: ".development"
    },
    "react-dom": {
        production: ".production.min",
        development: ".development"
    },
    "react-router-dom": {
        production: ".min",
        development: ""
    },
    "react-redux": {
        production: ".min",
        development: ""
    },
};

console.log(environmentName);

module.exports = [
    {
        optimization: {
            splitChunks: {
                cacheGroups: {
                    styles: {
                        name: 'styles',
                        test: /\.css$/,
                        chunks: 'all',
                        enforce: true
                    }
                }
            }
        },
        plugins: [
            new MiniCssExtract({
                filename: "styles.css",
            })
        ],
        output: {
            path: path.join(__dirname, "dist")
        },
        entry: path.join(__dirname, "src/styles/styles.scss"),
        resolve: {
            extensions: [".scss"],
            alias: {
                "@bootstrap": path.join(__dirname, "bower_components/bootstrap")
            }
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtract.loader,
                        "css-loader",
                        "sass-loader"
                    ]
                }
            ]
        }
    },
    {
        entry: path.join(__dirname, "src/App.tsx"),
        output: {
            filename: "app.js",
            path: path.join(__dirname, "dist")
        },

        resolve: {
            extensions: [".ts", ".tsx", ".js", ".json"],
            plugins: [
                new tsconfigPaths()
            ],
            alias: (() => {
                let alias = {
                    "react": path.join(__dirname, "node_modules/react/umd/"),
                    "react-dom": path.join(__dirname, "node_modules/react-dom/umd/"),
                    "react-router-dom": path.join(__dirname, "node_modules/react-router-dom/umd/"),
                    "react-redux": path.join(__dirname, "node_modules/react-redux/dist/"),
                };

                for (let key in aliasFiles) {
                    alias[key] = path.join(
                        alias[key],
                        key + aliasFiles[key][environmentName] + ".js");
                }

                return alias;
            })()
        },

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "awesome-typescript-loader"
                },
                {
                    enforce: "pre",
                    test: /.js?$/
                }
            ]
        }
    }
];