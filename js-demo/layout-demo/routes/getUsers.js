/**
 * Created by yaoyao on 15/2/6.
 */
var express = require('express');
var router = express.Router();
var paginator = require('../node_modules/bootstrap.pagination.js/bootstrap.pagination.js');

var allItems = [];
for (var i = 0; i < 123; i++) {
    allItems.push({
        name: (i * i).toString(),
        age: i
    })
}

/* GET users listing. */
router.get('/', function (req, res, next) {
    var page = req.query["page"];
    var name = req.query["name"];
    var age = req.query["age"];
    var isDesc = req.query["isDesc"];
    var column = req.query["column"];

    var skipped = paginator.getSkipped(page, 10);

    var users = [];
    for (var k = 0; k < 10 && k + skipped < allItems.length; k++) {
        users.push(allItems[k + skipped]);
    }

    var pagination = paginator.getPagination(allItems.length, page, 5, 10);
    var json = {
        users: users,
        pagination: pagination
    };

    res.json(json);
});

module.exports = router;