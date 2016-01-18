/**
 * Created by yaoyao on 14-12-4.
 */
/// <reference path="DefinitelyTyped/express/express.d.ts" />
/// <reference path="DefinitelyTyped/redis/redis.d.ts" />
var express = require("express");
var app = express();
app.get("/", function (req, res) {
    var redis = require("redis"), client = redis.createClient();
    var result;
    client.on("error", function (err) {
        result += "Error " + err;
    });
    client.set("string key", "string val", redis.print);
    client.hset("hash key", "hashtest 1", "some value", redis.print);
    client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
    client.hkeys("hash key", function (err, replies) {
        result += replies.length + " replies:";
        replies.forEach(function (reply, i) {
            result += "    " + i + ": " + reply;
        });
        res.send(result);
        client.quit();
    });
});
app.listen(8888, function () {
    console.log("Server has started");
});
//# sourceMappingURL=redis.demo.js.map