var webpack = require("webpack")

module.exports = {
    resolve: {
        moduleDirectories: ['node_modules', 'components', 'flux'],
        extensions: ['', '.js', '.jsx']
    },

    entry: [
        './components/root/index.jsx'
    ],
    
    output: {
        path: __dirname + "/build/",
        filename: "bundle.js",
        publicPath: "/build/"
    },

    plugins: [],
    module: {
        loaders: [
            {
                test: /\.js.*$/,
                loaders: ['babel-loader?stage=0'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader?sourceMap', 'autoprefixer-loader']
            },
            {
                test: /\.(otf|svg|eot|woff|ttf)$/,
                loaders: ['url-loader']
            },
            {
                test: /\.json$/,
                loaders: ['json-loader']
            }
        ]
    }
}
