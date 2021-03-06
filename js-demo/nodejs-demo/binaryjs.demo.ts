/**
 * Created by yaoyao on 14/12/8.
 */
/// <reference path="DefinitelyTyped/node/node.d.ts" />
var BinaryServer = require('binaryjs').BinaryServer;
var fs = require('fs');

// Start Binary.js server
var server = BinaryServer({port: 9000});
// Wait for new user connections
server.on('connection', function(client){
    // Stream a flower as a hello!
    var file = fs.createReadStream(__dirname + '/flower.png');
    client.send(file);
});