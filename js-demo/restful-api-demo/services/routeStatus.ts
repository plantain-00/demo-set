export function getName(value) {
    if (value == 0) {
        return "normal";
    }
    throw "invalid route status";
}

export function getValue(name) {
    if (name == "normal") {
        return 0;
    }
    throw "invalid route status";
}