/**
 * Created by yaoyao on 14-12-5.
 */
/// <reference path="DefinitelyTyped/express/express.d.ts" />

var express = require("express");
var app = express();
var archiver = require('archiver');
var p = require('path');
var fs = require('fs');

app.get("/", function (req, res) {
    var archive = archiver('zip');
    res.attachment('archive-name.zip');
    archive.pipe(res);
    var files = [__dirname + '/fixtures/file1.txt', __dirname + '/fixtures/file2.txt'];
    for (var i in files) {
        archive.append(fs.createReadStream(files[i]), {name: p.basename(files[i])});
    }
    archive.finalize();
});

app.listen(8888, function () {
    console.log("Server has started");
});