def IsValid(queens)
  queen1X = queens.length - 1
  queen1Y = queens[queens.length - 1]
  (0..queens.length - 2).each { |i|
    queen2X = i
    queen2Y = queens[i]
    if queen1X == queen2X
      return false
    end
    if queen1Y == queen2Y
      return false
    end
    if queen1X - queen2X == queen1Y - queen2Y
      return false
    end
    if queen1X - queen2X + queen1Y - queen2Y == 0
      return false
    end
  }
  true
end

def Xxx(result, maxDepth, depth, queens)
  if maxDepth == 1
    result.push(Array[0])
    return
  end
  (0..maxDepth-1).each { |i|
    newArray = queens+Array[i]
    if depth == 1
      Xxx(result, maxDepth, depth + 1, newArray)
      next
    end
    unless IsValid(newArray)
      next
    end
    if depth == maxDepth
      result.push(newArray);
    else
      Xxx(result, maxDepth, depth + 1, newArray);
    end
  }
end

(0..10).each { |i|
  result = Array.new
  Xxx(result, i + 1, 1, Array.new)
  puts result.length
}
