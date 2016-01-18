export function getName(value:number):string {
    if (value == 0) {
        return "normal";
    }
    if (value == 1) {
        return "cancelled";
    }
    throw "invalid order status";
}

export function getValue(name:string):number {
    if (name == "normal") {
        return 0;
    }
    if (name == "cancelled") {
        return 1;
    }
    throw "invalid order status";
}