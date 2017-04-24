const express = require('express');
const app = express();
const http = require('http').Server(app);
var isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
    app.use('/js/boot.js', express.static(__dirname + '/prod/outfile.js'));
} else {
    app.use(require('connect-livereload')({
        port: 35729
    }));
    app.use('/js', express.static(__dirname + '/dist'));
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