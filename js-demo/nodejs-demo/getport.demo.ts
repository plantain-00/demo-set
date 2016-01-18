/**
 * Created by yaoyao on 14-12-5.
 */
/// <reference path="DefinitelyTyped/express/express.d.ts" />

var express = require("express");
var app = express();
var getPort = require('get-port');

app.get("/", function (req, res) {
    getPort(function (err, port) {
        res.send(port.toString());
    });
});

app.listen(8888, function () {
    console.log("Server has started");
});