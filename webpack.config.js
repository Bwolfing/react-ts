
const path = require("path");
const tsconfigPaths = require("tsconfig-paths-webpack-plugin");

module.exports = {
    entry: "./src/App.tsx",
    output: {
        filename: "app.js",
        path: path.join(__dirname, "dist")
    },

    mode: "development",

    devtool: "source-map",

    resolve: {
        extensions: [ ".ts", ".tsx", ".js", ".json" ],
        plugins: [
            new tsconfigPaths()
        ],
        alias: {
            "react": path.join(__dirname, "node_modules/react/umd/react.development.js"),
            "react-dom": path.join(__dirname, "node_modules/react-dom/umd/react-dom.development.js"),
            "react-router-dom": path.join(__dirname, "node_modules/react-router-dom/umd/react-router-dom.js"),
            "@bootstrap": path.join(__dirname, "bower_components/bootstrap")
        }
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },
            {
                enforce: "pre",
                test: /.js?$/,
                loader: "source-map-loader"
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            includePaths: [
                                path.join(__dirname, "src/styles")
                            ]
                        }
                    },
                ]
            }
        ]
    }
}