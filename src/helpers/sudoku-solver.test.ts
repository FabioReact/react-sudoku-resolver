import { extractNumbers, Shape } from "./sudoku-solver"

describe("extractNumbers", () => {
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

	test("should return first line", () => {
		const result = extractNumbers(sudokuArray, Shape.LINE, 0, 0)
		expect(result).toEqual([0, 2, 0, 0, 0, 7, 0, 3, 0])
	})

	test("should return 9nth line", () => {
		const result = extractNumbers(sudokuArray, Shape.LINE, 8, 0)
		expect(result).toEqual([0, 7, 0, 2, 0, 0, 0, 8, 0])
	})
})
