package main

import (
	"fmt"
	"strconv"
)

func main() {
	// input, err := ioutil.ReadFile("input.txt")

	// if err != nil {
	// 	fmt.Println("File reading error", err)
	// 	return
	// }

	// inputStr := string(input)
	// res1 := partOneSolution(inputStr, 100)

	base := [4]int{0, 1, 0, -1}
	pattern := getPatternForPosition(base, 2)
	fmt.Println(pattern)

	// fmt.Printf("Test 1: %s\n", partOneSolution("12345678", 1))
	// fmt.Printf("Test 1: %s\n", partOneSolution("12345678", 2))
	// fmt.Printf("Test 1: %s\n", partOneSolution("12345678", 3))
	// fmt.Printf("Test 1: %s\n", partOneSolution("12345678", 4))

	// fmt.Printf("Part One Solution: %s\n", res1) // 53296082
}

func partOneSolution(input string, phases int) string {
	basePattern := [4]int{0, 1, 0, -1}
	currentInput := input

	for i := 0; i < phases; i++ {
		newInput := ""

		for j := 1; j < len(currentInput); j++ {
			pattern := getPatternForPosition(basePattern, j)
			patternLength := len(pattern)
			total := 0

			for k, char := range currentInput {
				digit := int(char)
				patternNum := pattern[k%patternLength]
				total += digit * patternNum
			}

			newInput += strconv.Itoa(getLastNum(total))
		}
		fmt.Println(newInput)
		currentInput = newInput
	}
	return substring(currentInput, 0, 8)
}

// [ ,]

func getPatternForPosition(basePattern [4]int, set int) []int {
	basePatternLength := len(basePattern) * set
	result := make([]int, basePatternLength)
	currIndex := 0
	for j := range basePattern {
		for i := 0; i < set; i++ {
			if j == 3 && i == set-1 {
				break
			}

			if j+1 < 4 {
				result[currIndex] = basePattern[j+1]
			}
			currIndex++
		}
	}

	fmt.Println(result)
	result[basePatternLength-1] = basePattern[0]

	// tmp := result[0]
	// for i, n := range result {
	// 	if i == 0 {
	// 		continue
	// 	}

	// 	result[i-1] = n
	// }

	result[0] = basePattern[1]
	// result[basePatternLength-1] = tmp
	return result
}

// Get last number
func getLastNum(num int) int {
	if num < 0 {
		num *= -1
	}
	return num % 10
}

func substring(str string, start int, end int) string {
	runes := []rune(str)
	// ... Convert back into a string from rune slice.
	return string(runes[start:end])
}
