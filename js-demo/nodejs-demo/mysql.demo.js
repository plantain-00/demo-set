/**
 * Created by yaoyao on 14-12-4.
 */
/// <reference path="DefinitelyTyped/express/express.d.ts" />
/// <reference path="DefinitelyTyped/mysql/mysql.d.ts" />
var express = require("express");
var app = express();
app.get("/", function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'localuser',
        password: 'localuser',
        database: 'test'
    });
    connection.connect();
    connection.query('select count(*) from User', function (err, rows, fields) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(rows[0]);
        }
    });
    connection.end();
});
app.listen(8888, function () {
    console.log("Server has started");
});
//# sourceMappingURL=mysql.demo.js.map