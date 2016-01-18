function getName(value) {
    if (value == 0) {
        return "normal";
    }
    throw "invalid order status";
}
exports.getName = getName;
function getValue(name) {
    if (name == "normal") {
        return 0;
    }
    throw "invalid order status";
}
exports.getValue = getValue;
//# sourceMappingURL=orderVendorStatus.js.map