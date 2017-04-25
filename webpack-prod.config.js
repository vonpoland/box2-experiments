var path = require('path');
var webpack = require('webpack');

module.exports = {
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        hot: true,
        publicPath: "/"
    },
    context: path.resolve(__dirname, 'public'),
    entry: {
        index: './js/index.js',
        raw: './js/boot.js',
        react: ['react', 'react-dom']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [ 'babel-loader', ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader?modules', ],
            },
        ],
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'react' // Specify the common bundle's name.
        })
    ],
};