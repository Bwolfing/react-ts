
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
            "react-router-dom": path.join(__dirname, "node_modules/react-router-dom/umd/react-router-dom.js")
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
            }
        ]
    }
}