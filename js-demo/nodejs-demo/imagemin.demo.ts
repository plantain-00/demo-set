/**
 * Created by yaoyao on 14-12-5.
 */
/// <reference path="DefinitelyTyped/express/express.d.ts" />

var express = require("express");
var app = express();
var Imagemin = require('imagemin');

app.get("/", function (req, res) {
    var imagemin = new Imagemin()
        .src('*.{gif,jpg,png,svg}')
        .dest('images')
        .use(Imagemin.jpegtran({progressive: true}));

    imagemin.run(function (err, files) {
        if (err) {
            throw err;
        }
        res.send(files[0]);
    });
});

app.listen(8888, function () {
    console.log("Server has started");
});