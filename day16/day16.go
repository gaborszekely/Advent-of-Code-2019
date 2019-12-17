package main

import (
	"fmt"
	"io/ioutil"
	"strconv"
)

func main() {
	input, err := ioutil.ReadFile("input.txt")
	if err != nil {
		fmt.Println("File reading error", err)
		return
	}
	inputStr := string(input)

	res1 := partOneSolution(inputStr, 100)
	fmt.Printf("Part One Solution: %s\n", res1) // 53296082
}

func partOneSolution(input string, phases int) string {
	inputLen := len(input)
	basePattern := [4]int{0, 1, 0, -1}
	currentInput := input

	// Each phase
	for i := 0; i < phases; i++ {
		newInput := ""

		// Each cycle
		for j := 1; j < inputLen+1; j++ {
			pattern := getPatternForPosition(basePattern, j, inputLen)
			patternLength := len(pattern)
			total := 0

			// Each number in input
			for k, char := range currentInput {
				digit := int(char) - '0'
				patternNum := pattern[k%patternLength]
				total += digit * patternNum
			}

			newInput += strconv.Itoa(getLastNum(total))
		}
		currentInput = newInput
	}
	return substring(currentInput, 0, 8)
}

func getPatternForPosition(basePattern [4]int, set int, inputLen int) []int {
	patternLen := set * len(basePattern)
	maxLen := min(patternLen, inputLen)
	result := make([]int, maxLen)
	currIndex := 0
	first := true

Outer:
	for j := range basePattern {
		for i := 0; i < set; i++ {
			if first == true {
				first = false
				continue
			}
			result[currIndex] = basePattern[j]
			currIndex++

			if currIndex == maxLen {
				break Outer
			}

		}
	}

	if inputLen > patternLen {
		result[maxLen-1] = basePattern[0]
	}
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

func min(a int, b int) int {
	if a < b {
		return a
	}
	return b
}
