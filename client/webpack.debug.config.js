var webpack = require("webpack")
var config = require("./webpack.config.js")

config.entry.push("webpack-dev-server/client?http://metal.fish:6969")
config.entry.push("webpack/hot/only-dev-server")


config.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
];

config.module.loaders[0].loaders.unshift("react-hot");

module.exports = config;
