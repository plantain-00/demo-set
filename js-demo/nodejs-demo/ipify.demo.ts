/**
 * Created by yaoyao on 14-12-5.
 */
/// <reference path="DefinitelyTyped/express/express.d.ts" />

var express = require("express");
var app = express();
var ipify = require('ipify');

app.get("/", function (req, res) {
    ipify(function (err, ip) {
        res.send(ip);
    });
});

app.listen(8888, function () {
    console.log("Server has started");
});