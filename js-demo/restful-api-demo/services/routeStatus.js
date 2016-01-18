function getName(value) {
    if (value == 0) {
        return "normal";
    }
    throw "invalid route status";
}
exports.getName = getName;
function getValue(name) {
    if (name == "normal") {
        return 0;
    }
    throw "invalid route status";
}
exports.getValue = getValue;
//# sourceMappingURL=routeStatus.js.map