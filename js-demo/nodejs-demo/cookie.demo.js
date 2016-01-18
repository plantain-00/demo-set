/**
 * Created by yaoyao on 14-12-7.
 */
/// <reference path="DefinitelyTyped/express/express.d.ts" />
var express = require("express");
var app = express();
app.use(require('cookie-parser')('your cookie secret goes here'));
app.get("/", function (req, res) {
    res.cookie('monster', 'nom nom');
    res.cookie('signed_monster', 'nom nom', { signed: true });
    res.send("Hello World");
});
app.listen(8888, function () {
    console.log("Server has started");
});
//# sourceMappingURL=cookie.demo.js.map