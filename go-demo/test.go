package main

import (
	"fmt"
	"math"
)

func add(x int, y int) int {
	return x + y
}

func swap(x, y string) (string, string) {
	return y, x
}

var sum = 0

func main() {
	fmt.Println(math.Abs(-1))
	fmt.Println("Hello, world")
	fmt.Println(add(1, 2))
	a, b := swap("hello", "world")
	fmt.Println(a, b)

	for i := 0; i < 10; i++ {
		sum += i
	}
	fmt.Println(sum)
}
