var express = require('express');
var app = express();
var server = require('http').createServer(app);
server.listen(3000);

var io = require('socket.io')(server);

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/socket.io.demo.client.html');
});

io.on('connection', function (socket) {
    console.log("connected");
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});