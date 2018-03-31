var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
        'babel-polyfill',
        './src/index.js'
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: 'http://localhost:3000'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        //new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                loader: 'react-hot-loader',
                test: /\.js?$/,
            },
            {
                loader: 'babel-loader',
                include: [path.resolve(__dirname, "src")],
                test: /\.js?$/,
                query: {
                    plugins: ['transform-runtime']
                }
            }
        ]
    }
}