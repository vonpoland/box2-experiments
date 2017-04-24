const express = require('express');
const app = express();
const http = require('http').Server(app);
// const webpackDevMiddleware = require("webpack-dev-middleware");
// const webpack = require("webpack");
//
// var webpackConfig = require('./webpack.config.js');

var isProduction = process.env.NODE_ENV === 'production';
// var compiler = webpack(webpackConfig);

if (isProduction) {
    app.use('/js/boot.js', express.static(__dirname + '/prod/outfile.js'));
} else {
    // app.use(webpackDevMiddleware(compiler, {
    //     publicPath: "/js" // Same as `output.publicPath` in most cases.
    // }));
    app.use('/js/bundle.js', express.static(__dirname + '/dist/bundle.js'));
}


app.all('/systemJsConfig.js', (req, res) => res.sendFile(__dirname + '/public/systemJsConfig.js'));
app.all('*', function (req, res) {
    res.sendFile(isProduction ? 'index-prod.html' : 'index.html', {root: __dirname + '/public'});
});

var server = http.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.info('Simple shapes app listening at http://%s:%s', host, port);
});