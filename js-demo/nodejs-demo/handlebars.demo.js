/**
 * Created by yaoyao on 14-12-6.
 */
/// <reference path="DefinitelyTyped/express/express.d.ts" />
var express = require("express");
var app = express();
var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.get("/", function (req, res) {
    res.render("home");
});
app.get('/data/nursery-rhyme', function (req, res) {
    res.json({
        animal: 'squirrel',
        bodyPart: 'tail',
        adjective: 'bushy',
        noun: 'heck'
    });
});
app.listen(8888, function () {
    console.log("Server has started");
});
//# sourceMappingURL=handlebars.demo.js.map