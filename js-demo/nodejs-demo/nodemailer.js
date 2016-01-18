/**
 * Created by yaoyao on 14-12-4.
 */
/// <reference path="DefinitelyTyped/express/express.d.ts" />
var express = require("express");
var app = express();
app.get("/", function (req, res) {
    var nodemailer = require("nodemailer");
    var transporter = nodemailer.createTransport({
        host: 'smtp.163.com',
        auth: {
            user: 'mailkit_test@163.com',
            pass: 'mailkit_password'
        }
    });
    var mailOptions = {
        from: 'Fred Foo ✔ <mailkit_test@163.com>',
        to: 'yaoyao12306@163.com',
        subject: 'Hello ✔',
        text: 'Hello world ✔',
        html: '<b>Hello world ✔</b>' // html body
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            res.send('Message sent: ' + info.response);
        }
    });
});
app.listen(8888, function () {
    console.log("Server has started");
});
//# sourceMappingURL=nodemailer.js.map