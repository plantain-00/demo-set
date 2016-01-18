export function getName(value:number):string {
    if (value == 0) {
        return "normal";
    }
    throw "invalid order status";
}

export function getValue(name:string):number {
    if (name == "normal") {
        return 0;
    }
    throw "invalid order status";
}