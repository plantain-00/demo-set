export function getName(value) {
    if (value == 0) {
        return "上班";
    }
    if (value == 1) {
        return "下班";
    }
    throw "invalid route direction";
}

export function getValue(name) {
    if (name == "上班") {
        return 0;
    }
    if (name == "下班") {
        return 1;
    }
    throw "invalid route direction";
}