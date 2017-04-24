const express = require('express');
const app = express();
const http = require('http').Server(app);

app.use(require('connect-livereload')({
    port: 35729
}));

app.use('/js', express.static(__dirname + '/dist'));
app.all('*', function (req, res) {
    res.sendFile('index.html', {root: __dirname + '/public'});
});

var server = http.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.info('Simple shapes app listening at http://%s:%s', host, port);
});