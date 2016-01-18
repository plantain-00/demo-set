/**
 * Created by yaoyao on 14-12-5.
 */
/// <reference path="DefinitelyTyped/express/express.d.ts" />

var express = require("express");
var app = express();

app.get("/", function (req, res) {
    var Minimize = require('minimize');
    var minimize = new Minimize({empty: true});

    minimize.parse(
        '<h1 id="id">         sss      </h1>',
        function (error, data) {
            res.send(data);
        }
    );
});

app.listen(8888, function () {
    console.log("Server has started");
});