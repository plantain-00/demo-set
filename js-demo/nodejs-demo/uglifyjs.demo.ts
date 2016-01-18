/**
 * Created by yaoyao on 14-12-5.
 */
/// <reference path="DefinitelyTyped/express/express.d.ts" />

var express = require("express");
var app = express();
var jsp = require("uglify-js").parser;
var pro = require("uglify-js").uglify;

app.get("/", function (req, res) {
    var orig_code = "new Array(1,                    2, 3, 4)";
    var ast = jsp.parse(orig_code); // parse code and get the initial AST
    ast = pro.ast_mangle(ast); // get a new AST with mangled names
    ast = pro.ast_squeeze(ast); // get an AST with compression optimizations
    var final_code = pro.gen_code(ast); // compressed code here
    res.send(final_code);
});

app.listen(8888, function () {
    console.log("Server has started");
});