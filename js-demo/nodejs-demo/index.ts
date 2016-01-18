/**
 * Created by yaoyao on 14-12-1.
 */
/// <reference path="DefinitelyTyped/express/express.d.ts" />

var express = require("express");
var app = express();

app.get("/", function (req, res) {

    res.send("Hello World");
});

app.listen(8888, function () {
    console.log("Server has started");
});