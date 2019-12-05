package main

import (
	"fmt"
)

func main() {
	rangeStart := 240920
	rangeEnd := 789857
	fmt.Printf("The solution to Part One is: %d", partOneSolution(rangeStart, rangeEnd))
	fmt.Printf("The solution to Part Two is: %d", partTwoSolution(rangeStart, rangeEnd))
}

func partOneSolution(rangeStart, rangeEnd) {
	result := 0
	for i := rangeStart; i < rangeEnd; i++ {
		if meetsPartOneReq(i) {
			result++
		}
	}
	return result
}
