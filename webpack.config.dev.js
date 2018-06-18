const merge = require("webpack-merge");
const standardConfig = require("./webpack.config.common");

// module.exports = () => {
//     let configs = [];
//     for (let i = 0; i < standardConfig.length; i++) {
//         configs.push(
//             merge(standardConfig[i], {
//                 mode: "development",
//                 devtool: "inline-source-map"
//             })
//         );
//     }

//     return configs;
// };
module.exports = merge(
    standardConfig,
    {
        mode: "development",
        devtool: "inline-source-map"
    }
);