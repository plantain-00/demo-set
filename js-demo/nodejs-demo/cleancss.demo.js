/**
 * Created by yaoyao on 14-12-5.
 */
/// <reference path="DefinitelyTyped/express/express.d.ts" />
var express = require("express");
var app = express();
var CleanCSS = require('clean-css');
app.get("/", function (req, res) {
    var source = 'a{font-weight:bold;}';
    var minimized = new CleanCSS().minify(source);
    res.send(minimized);
});
app.listen(8888, function () {
    console.log("Server has started");
});
//# sourceMappingURL=cleancss.demo.js.map