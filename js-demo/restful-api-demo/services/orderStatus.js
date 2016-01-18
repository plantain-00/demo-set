function getName(value) {
    if (value == 0) {
        return "normal";
    }
    if (value == 1) {
        return "cancelled";
    }
    throw "invalid order status";
}
exports.getName = getName;
function getValue(name) {
    if (name == "normal") {
        return 0;
    }
    if (name == "cancelled") {
        return 1;
    }
    throw "invalid order status";
}
exports.getValue = getValue;
//# sourceMappingURL=orderStatus.js.map