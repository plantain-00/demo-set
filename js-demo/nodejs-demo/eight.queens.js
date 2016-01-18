/**
 * Created by yaoyao on 14/12/22.
 */
function IsValid(queens) {
    var queen1X = queens.length - 1;
    var queen1Y = queens[queens.length - 1];
    for (var i = 0; i < queens.length - 1; i++) {
        var queen2X = i;
        var queen2Y = queens[i];
        if (queen1X == queen2X) {
            return false;
        }
        if (queen1Y == queen2Y) {
            return false;
        }
        if (queen1X - queen2X == queen1Y - queen2Y) {
            return false;
        }
        if (queen1X - queen2X + queen1Y - queen2Y == 0) {
            return false;
        }
    }
    return true;
}
function Xxx(result, maxDepth, depth, queens) {
    if (maxDepth == 1) {
        result.push([0]);
        return;
    }
    for (var i = 0; i < maxDepth; i++) {
        var newArray = queens.concat(i);
        if (depth == 1) {
            Xxx(result, maxDepth, depth + 1, newArray);
            continue;
        }
        if (!IsValid(newArray)) {
            continue;
        }
        if (depth == maxDepth) {
            result.push(newArray);
        }
        else {
            Xxx(result, maxDepth, depth + 1, newArray);
        }
    }
}
for (var i = 0; i < 10; i++) {
    var result = [];
    Xxx(result, i + 1, 1, []);
    console.log(result.length);
}
//# sourceMappingURL=eight.queens.js.map