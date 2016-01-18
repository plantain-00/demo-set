/**
 * Created by yaoyao on 14-12-4.
 */
/// <reference path="DefinitelyTyped/express/express.d.ts" />
/// <reference path="DefinitelyTyped/mongodb/mongodb.d.ts" />

var express = require("express");
var app = express();
app.get("/", function (req, res) {
    var mongoClient = require('mongodb').MongoClient
    var assert = require('assert');

    // Connection URL
    var url = 'mongodb://localhost:27017/myproject';
    // Use connect method to connect to the Server
    mongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        // Get the documents collection
        var collection = db.collection('documents');
        // Insert some documents
        collection.insert([
            {a: 1}, {a: 2}, {a: 3}
        ], function (err, result) {
            assert.equal(err, null);
            assert.equal(3, result.result.n);
            assert.equal(3, result.ops.length);
            res.send("Inserted 3 documents into the document collection");
            db.close();
        });
    });
});
app.listen(8888, function () {
    console.log("Server has started");
});