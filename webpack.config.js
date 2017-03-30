var path = require('path');
var webpack = require('webpack');
var extractTextPlugin = require('extract-text-webpack-plugin');

var configurations = {
    entry: './js/index.js',
    output: {
        path: path.resolve(__dirname, './build'),
        publicPath: '/build',
        filename: 'build.js'
    },
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                loader:extractTextPlugin.extract({loader: ['css-loader', 'sass-loader']})
            }
        ]
    },
    devtool: '#eval-source-map',
    plugins: [
        new extractTextPlugin({filename: 'build.css', disable: false, allChunks: true})
    ]
};


module.exports = configurations;
