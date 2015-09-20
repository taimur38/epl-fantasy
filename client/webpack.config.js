var webpack = require("webpack")

module.exports = {
    resolve: {
        modulesDirectories: ['node_modules', 'components', 'redux'],
        extensions: ['', '.js', '.jsx']
    },

    entry: [
        './components/routes.jsx'
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
                loaders: ['babel?stage=0&optional[]=runtime'],
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
