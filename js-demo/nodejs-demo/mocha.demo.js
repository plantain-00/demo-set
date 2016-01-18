/**
 * Created by yaoyao on 15/1/8.
 */
var assert = require("assert")

describe('mocha.demo', function () {
    describe('#TestMethod()', function () {
        it('should pass', function () {
        })
    })
    describe('#TestMethod()', function () {
        it('should fail when where is an exception', function () {
            a.show();
        })
    })
    describe('#TestMethod()', function () {
        it('should fail when invoking fail method', function () {
            assert.fail();
        })
    })
})