
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
        ]
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
    },

    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
}