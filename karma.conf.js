const webpackConfig = require("./webpack/config.test");

module.exports = function (config) {
    config.set({
        basePath: "./src",
        frameworks: ["jasmine"],
        plugins: [
            require("karma-jasmine"),
            require("karma-firefox-launcher"),
            require("karma-jasmine-html-reporter"),
            require("karma-webpack"),
            require("karma-sourcemap-loader")
        ],
        client: {
            clearContext: false
        },
        coverageIstanbulReporter: {
            reports: [
                "html",
                "lcovonly"
            ],
            fixWebpackSourcePaths: true
        },
        reporters: ["kjhtml"],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ["Firefox"],
        singleRun: false,
        files: ["Tests.js"],
        preprocessors: {
            "Tests.js": ["webpack", "sourcemap"]
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true
        },
        browserNoActivityTimeout: 60 * 1000
    });
};