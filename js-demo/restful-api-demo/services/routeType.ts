export function getName(value) {
    if (value == 0) {
        return "上班";
    }
    if (value == 1) {
        return "下班";
    }
    if (value == 2) {
        return "上下班";
    }
    throw "invalid route type";
}

export function getValue(name) {
    if (name == "上班") {
        return 0;
    }
    if (name == "下班") {
        return 1;
    }
    if (name == "上下班") {
        return 2;
    }
    throw "invalid route type";
}