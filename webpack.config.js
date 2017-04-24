var path = require('path');

module.exports = {
    //devtool: "cheap-eval-source-map",
    context: __dirname + '\\public\\js',
    entry: {
      main: './boot.js'
    },
    module: {
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
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};