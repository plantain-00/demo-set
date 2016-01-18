/**
 * Created by yaoyao on 14-12-4.
 */
/// <reference path="DefinitelyTyped/express/express.d.ts" />

var express = require("express");
var exec = require("child_process").exec;
var app = express();
app.get("/", function (req, res) {
    exec("ls -lah", function (error, stdout, stderr) {
        res.send(stdout);
    });
});
app.listen(8888, function () {
    console.log("Server has started");
});