def IsValid( queens: List[Int] ): Boolean = {
    val queen1X = queens.length - 1
    val queen1Y = queens(queens.length - 1)
    for (i <- 0 until queens.length - 1) {
        val queen2X = i
        val queen2Y = queens(i)
        if (queen1X == queen2X) {
            return false
        }
        if (queen1Y == queen2Y) {
            return false
        }
        if (queen1X - queen2X == queen1Y - queen2Y) {
            return false
        }
        if (queen1X - queen2X + queen1Y - queen2Y == 0) {
            return false
        }
    }
    true
}

def Xxx( result: List[List[Int]], maxDepth: Int, depth: Int, queens: List[Int] ): List[List[Int]] = {
    if (maxDepth == 1) {
        return List(0) :: result
    }
    var tmp = result
    for (i <- 0 until maxDepth) {
        tmp = Yyy(tmp, maxDepth, depth, queens, i)
    }
    tmp
}
def Yyy( result: List[List[Int]], maxDepth: Int, depth: Int, queens: List[Int], i: Int ): List[List[Int]] = {
    val newArray = queens ::: List(i)
    if (depth == 1) {
        return Xxx(result, maxDepth, depth + 1, newArray)
    }
    if (!IsValid(newArray)) {
        return result
    }
    if (depth == maxDepth) {
        newArray :: result
    }
    else {
        Xxx(result, maxDepth, depth + 1, newArray)
    }
}
for (i <- 0 until 10) {
    val result = Xxx(Nil, i + 1, 1, Nil)
    println(result.length)
}