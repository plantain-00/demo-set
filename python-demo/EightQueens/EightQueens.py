def IsValid(queens):
    queen1X = len(queens) - 1
    queen1Y = queens[len(queens) - 1]
    for i in range(0, len(queens) - 1):
        queen2X = i
        queen2Y = queens[i]
        if queen1X == queen2X:
            return False
        if queen1Y == queen2Y:
            return False
        if queen1X - queen2X == queen1Y - queen2Y:
            return False
        if queen1X - queen2X + queen1Y - queen2Y == 0:
            return False
    return True


def Xxx(result, maxDepth, depth, queens):
    if maxDepth == 1:
        result.append([0])
        return
    for i in range(0, maxDepth):
        newArray = queens + [i]
        if depth == 1:
            Xxx(result, maxDepth, depth + 1, newArray)
            continue
        if not IsValid(newArray):
            continue
        if depth == maxDepth:
            result.append(newArray)
        else:
            Xxx(result, maxDepth, depth + 1, newArray)


for i in range(0, 10):
    result = []
    Xxx(result, i + 1, 1, [])
    print(len(result))