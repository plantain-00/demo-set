/**
 * Created by yaoyao on 14-12-5.
 */
/// <reference path="DefinitelyTyped/express/express.d.ts" />

var express = require("express");
var app = express();
var DecompressZip = require('decompress-zip');

app.get("/", function (req, res) {
    var unzipper = new DecompressZip("test.zip");
    unzipper.extract({
        path: '.'
    });
    res.send("Success.");
});

app.listen(8888, function () {
    console.log("Server has started");
});