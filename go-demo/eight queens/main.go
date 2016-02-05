package main

import (
	"fmt"
	"time"
)

const N = 12

func IsValid(queens [N]int, length int) bool {
	// the last point
	px := length - 1
	py := queens[px]

	for i := 0; i < px; i++ {
		// |
		if px == i {
			return false
		}
		// -
		if py == queens[i] {
			return false
		}
		deltaX := px - i
		deltaY := py - queens[i]
		// \
		if deltaX == deltaY {
			return false
		}
		// /
		if deltaX+deltaY == 0 {
			return false
		}
	}
	return true
}

func Xxx(result int, maxDepth int, depth int, queens [N]int, queensCount int) int {
	if maxDepth == 1 {
		return result + 1
	}
	for i := 0; i < maxDepth; i++ {
		queens[queensCount] = i
		if depth == 1 {
			result = Xxx(result, maxDepth, depth+1, queens, queensCount+1)
			continue
		}
		if !IsValid(queens, queensCount+1) {
			continue
		}
		if depth == maxDepth {
			result++
		} else {
			result = Xxx(result, maxDepth, depth+1, queens, queensCount+1)
		}
	}
	return result
}

func main() {
	var counts [N]int
	var queens [N]int

	now := time.Now()

	for i := 0; i < N; i++ {
		counts[i] = Xxx(0, i+1, 1, queens, 0)
	}

	duration := time.Now().Sub(now)

	for i := 0; i < N; i++ {
		fmt.Println(counts[i])
	}
	fmt.Println(duration) //release:0.41-0.49
}
