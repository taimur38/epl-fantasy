var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.debug.config.js');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    historyApiFallback: true,
    hot: true
}).listen(6969, '0.0.0.0', function(err, result) {
    if(err) {
        console.log(err);
    }

    console.log("Listening at 0.0.0.0:6969");
});

