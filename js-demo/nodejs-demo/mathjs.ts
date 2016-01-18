/**
 * Created by yaoyao on 14-12-4.
 */
/// <reference path="DefinitelyTyped/express/express.d.ts" />

var express = require("express");
var app = express();

app.get("/", function (req, res) {
    var math = require("mathjs");
    res.send("@: " + math.round(math.e, 6));
});

app.listen(8888, function () {
    console.log("Server has started");
});