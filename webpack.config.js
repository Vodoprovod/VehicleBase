var path = require('path');
var webpack = require('webpack');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// var styleExtractor = new ExtractTextPlugin("styles.css");

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },

    // plugins: [
    //     new ExtractTextPlugin('bundle.css')
    // ],

    module: {
        rules: [

            {
                loader: 'babel-loader',
                include: [path.resolve(__dirname, "src")],
                test: /\.js?$/,
                query: {
                    plugins: ['transform-runtime']
                }
            },
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"]
            }
        ]
    }
};