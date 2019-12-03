package main

import (
	"fmt"
)

func main() {
	input := []int{1, 1, 0, 3, 1, 1, 2, 3, 1, 3, 4, 3, 1, 5, 0, 3, 2, 1, 13, 19, 1, 9, 19, 23, 1, 6, 23, 27, 2, 27, 9, 31, 2, 6, 31, 35, 1, 5, 35, 39, 1, 10, 39, 43, 1, 43, 13, 47, 1, 47, 9, 51, 1, 51, 9, 55, 1, 55, 9, 59, 2, 9, 59, 63, 2, 9, 63, 67, 1, 5, 67, 71, 2, 13, 71, 75, 1, 6, 75, 79, 1, 10, 79, 83, 2, 6, 83, 87, 1, 87, 5, 91, 1, 91, 9, 95, 1, 95, 10, 99, 2, 9, 99, 103, 1, 5, 103, 107, 1, 5, 107, 111, 2, 111, 10, 115, 1, 6, 115, 119, 2, 10, 119, 123, 1, 6, 123, 127, 1, 127, 5, 131, 2, 9, 131, 135, 1, 5, 135, 139, 1, 139, 10, 143, 1, 143, 2, 147, 1, 147, 5, 0, 99, 2, 0, 14, 0}

	// Part One
	partOneInput := copyArray(input)
	partOneInput[1] = 12
	partOneInput[2] = 2
	partOneResult := getPartOneResult(partOneInput)[0]
	fmt.Printf("Part One Result is: %d\n", partOneResult)

	// Part Two
	partTwoResult := getPartTwoResult(input, 19690720)
	fmt.Printf("Part Two Result is: %d\n", partTwoResult)
}

func getPartTwoResult(input []int, target int) int {
	input = copyArray(input)
	input[1] = 0
	input[2] = 0
	result := getPartOneResult(input)

	for result[0] <= target {
		input[1]++
		result = getPartOneResult(input)
	}

	input[1]--
	result = getPartOneResult(input)

	noun := input[1]
	verb := target - result[0]

	return 100*noun + verb
}

func getPartOneResult(input []int) []int {
	input = copyArray(input)
	for i := 0; i < len(input)-4; i += 0 {
		opCode := input[i]
		firstVal := input[input[i+1]]
		secondVal := input[input[i+2]]
		targetIndex := input[i+3]

		switch opCode {
		case 1:
			input[targetIndex] = firstVal + secondVal
		case 2:
			input[targetIndex] = firstVal * secondVal
		case 99:
			return input
		}

		i += 4
	}
	return input
}

func copyArray(input []int) []int {
	result := make([]int, len(input))
	for i, item := range input {
		result[i] = item
	}
	return result
}
