/**
 * Created by yaoyao on 14-12-5.
 */
/// <reference path="DefinitelyTyped/express/express.d.ts" />
var express = require("express");
var prettyBytes = require('pretty-bytes');
var app = express();
app.get("/", function (req, res) {
    res.send("1337->" + prettyBytes(1337));
});
app.listen(8888, function () {
    console.log("Server has started");
});
//# sourceMappingURL=prettyBytes.demo.js.map