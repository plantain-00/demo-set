/**
 * Created by yaoyao on 14-12-5.
 */
/// <reference path="DefinitelyTyped/express/express.d.ts" />

var express = require("express");
var prettyMs = require('pretty-ms');
var app = express();

app.get("/", function (req, res) {
    res.send("1337000000->" + prettyMs(1337000000));
});

app.listen(8888, function () {
    console.log("Server has started");
});