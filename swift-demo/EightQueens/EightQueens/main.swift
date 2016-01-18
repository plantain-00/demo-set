func IsValid(queens: [Int]) -> Bool {
    var queen1X = queens.count - 1
    var queen1Y = queens[queens.count - 1]
    for i in 0 ... queens.count - 2 {
        var queen2X = i
        var queen2Y = queens[i]
        if queen1X == queen2X {
            return false
        }
        if queen1Y == queen2Y {
            return false
        }
        if queen1X - queen2X == queen1Y - queen2Y {
            return false
        }
        if queen1X - queen2X + queen1Y - queen2Y == 0 {
            return false
        }
    }
    return true
}

var result: [[Int]] = []

func Xxx(maxDepth: Int, depth: Int, queens: [Int]) {
    if maxDepth == 1 {
        result.append([0])
        return
    }
    for i in 0 ... maxDepth - 1 {
        var newArray: [Int] = queens
        newArray.append(i)
        if depth == 1 {
            Xxx(maxDepth, depth + 1, newArray)
            continue
        }
        if !IsValid(newArray) {
            continue
        }
        if depth == maxDepth {
            result.append(newArray)
        } else {
            Xxx(maxDepth, depth + 1, newArray)
        }
    }
}

for i in 0 ... 8 {
    Xxx(i + 1, 1, [])
    println(result.count)
    result = []
}