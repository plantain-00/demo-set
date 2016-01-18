/**
 * Created by yaoyao on 14-12-5.
 */
/// <reference path="DefinitelyTyped/express/express.d.ts" />

var express = require("express");
var app = express();
var usb = require('usb')

app.get("/", function (req, res) {
    var devices = usb.getDeviceList();
    res.send("devices' number:" + devices.length);
});

app.listen(8888, function () {
    console.log("Server has started");
});