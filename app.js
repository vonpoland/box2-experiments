const express = require('express');
const app = express();
const http = require('http').Server(app);

var isProduction = process.env.NODE_ENV === 'production';


if (isProduction) {
    app.use('/js', express.static(__dirname + '/dist'));
} else {
    app.use('/js/bundle.js', express.static(__dirname + '/dist/bundle.js'));
}

app.all('*', function (req, res) {
    res.sendFile(isProduction ? 'index-prod.html' : 'index.html', {root: __dirname + '/public'});
});

var server = http.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.info('Simple shapes app listening at http://%s:%s', host, port);
});