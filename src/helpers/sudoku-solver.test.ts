import { extractNumbers, Shape, checkValidNumbers, isEveryElementUnique } from "./sudoku-solver"

const sudokuArray = [
	[0, 2, 0, 0, 0, 7, 0, 3, 0],
	[0, 0, 0, 6, 0, 0, 1, 9, 7],
	[9, 0, 0, 3, 0, 0, 2, 0, 4],
	[0, 6, 0, 0, 5, 0, 8, 4, 0],
	[0, 0, 8, 0, 2, 0, 3, 0, 0],
	[0, 9, 4, 0, 6, 0, 0, 5, 0],
	[6, 0, 2, 0, 0, 4, 0, 0, 1],
	[3, 4, 9, 0, 0, 8, 0, 0, 0],
	[0, 7, 0, 2, 0, 0, 0, 8, 0],
]

describe("extractNumbers", () => {
	test("should return first line", () => {
		const result = extractNumbers(sudokuArray, Shape.LINE, 0, 0)
		expect(result).toEqual([0, 2, 0, 0, 0, 7, 0, 3, 0])
	})

	test("should return 9nth line", () => {
		const result = extractNumbers(sudokuArray, Shape.LINE, 0, 8)
		expect(result).toEqual([0, 7, 0, 2, 0, 0, 0, 8, 0])
	})

	test("should return first column", () => {
		const result = extractNumbers(sudokuArray, Shape.COLUMN, 0, 0)
		expect(result).toEqual([0, 0, 9, 0, 0, 0, 6, 3, 0])
	})

	test("should return 9nth colum", () => {
		const result = extractNumbers(sudokuArray, Shape.COLUMN, 8, 0)
		expect(result).toEqual([0, 7, 4, 0, 0, 0, 1, 0, 0])
	})

	test("should return first square", () => {
		const result = extractNumbers(sudokuArray, Shape.SQUARE, 0, 0)
		expect(result).toEqual([0, 2, 0, 0, 0, 0, 9, 0, 0])
	})

	test("should return 9nth square", () => {
		const result = extractNumbers(sudokuArray, Shape.SQUARE, 8, 8)
		expect(result).toEqual([0, 0, 1, 0, 0, 0, 0, 8, 0])
	})
})

describe("checkValidNumbers", () => {
	test("should return true if no duplicates (beside 0s)", () => {
		const result = checkValidNumbers([9, 0, 0, 3, 0, 0, 2, 0, 4])
		expect(result).toBe(true)
	})

	test("should return false if duplicates", () => {
		const result = checkValidNumbers([9, 0, 0, 3, 0, 9, 2, 0, 4])
		expect(result).toBe(false)
	})
})

describe("isEveryElementUnique", () => {
	test("should return false if array has duplicates", () => {
		const result = isEveryElementUnique([9, 1, 4, 3, 5, 7, 2, 8, 4])
		expect(result).toBe(false)
	})

	test("should return true if array has no duplicates", () => {
		const result = isEveryElementUnique([9, 1, 4, 3, 5, 7, 2, 8, 6])
		expect(result).toBe(true)
	})
})
