import {
	extractNumbers,
	Shape,
	checkValidNumbers,
	isEveryElementUnique,
	createSudokuMap,
	findCandidates,
	eliminateCandidate,
	SudokuHelperCell,
	extractCandidates,
} from "./sudoku-solver"

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

const sudokuMap = createSudokuMap(sudokuArray)

describe("extractNumbers", () => {
	test("should return first line", () => {
		const result = extractNumbers(sudokuMap, Shape.LINE, 0, 0)
		expect(result).toEqual([0, 2, 0, 0, 0, 7, 0, 3, 0])
	})

	test("should return 9nth line", () => {
		const result = extractNumbers(sudokuMap, Shape.LINE, 0, 8)
		expect(result).toEqual([0, 7, 0, 2, 0, 0, 0, 8, 0])
	})

	test("should return first column", () => {
		const result = extractNumbers(sudokuMap, Shape.COLUMN, 0, 0)
		expect(result).toEqual([0, 0, 9, 0, 0, 0, 6, 3, 0])
	})

	test("should return 9nth colum", () => {
		const result = extractNumbers(sudokuMap, Shape.COLUMN, 8, 0)
		expect(result).toEqual([0, 7, 4, 0, 0, 0, 1, 0, 0])
	})

	test("should return first square", () => {
		const result = extractNumbers(sudokuMap, Shape.SQUARE, 0, 0)
		expect(result).toEqual([0, 2, 0, 0, 0, 0, 9, 0, 0])
	})

	test("should return 9nth square", () => {
		const result = extractNumbers(sudokuMap, Shape.SQUARE, 8, 8)
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

describe("eliminateCandidate", () => {
	const emptyMap = createSudokuMap([
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
	])
	test("should eliminate all 5s on correct square, line and column", () => {
		findCandidates(emptyMap)
		eliminateCandidate(emptyMap, 5, 4, 3)
		const result = emptyMap.reduce((acc: any, curr) => {
			return [
				...acc,
				curr.map((c) => {
					return +c.candidates.includes(5)
				}),
			]
		}, [])
		const expected = [
			[1, 1, 1, 1, 0, 1, 1, 1, 1],
			[1, 1, 1, 1, 0, 1, 1, 1, 1],
			[1, 1, 1, 1, 0, 1, 1, 1, 1],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[1, 1, 1, 0, 0, 0, 1, 1, 1],
			[1, 1, 1, 0, 0, 0, 1, 1, 1],
			[1, 1, 1, 1, 0, 1, 1, 1, 1],
			[1, 1, 1, 1, 0, 1, 1, 1, 1],
			[1, 1, 1, 1, 0, 1, 1, 1, 1],
		]
		expect(result).toEqual(expected)
	})
})

describe("extractCandidates", () => {
	test("should extract candidates by square", () => {
		const fakeSudokuMap: SudokuHelperCell[][] = []
		for (let y = 0; y < 9; y++) {
			const line: SudokuHelperCell[] = []
			for (let x = 0; x < 9; x++) {
				line.push({
					value: 0,
					candidates: [3 * (y % 3) + (x % 3) + 1],
					classname: "",
				})
			}
			fakeSudokuMap.push(line)
		}
		expect(extractCandidates(fakeSudokuMap, Shape.SQUARE, 0, 0)).toEqual([2, 3, 4, 5, 6, 7, 8, 9])
		expect(extractCandidates(fakeSudokuMap, Shape.SQUARE, 1, 0)).toEqual([1, 3, 4, 5, 6, 7, 8, 9])
		expect(extractCandidates(fakeSudokuMap, Shape.SQUARE, 1, 1)).toEqual([1, 2, 3, 4, 6, 7, 8, 9])
	})

	test("should extract candidates by line", () => {
		const fakeSudokuMap: SudokuHelperCell[][] = []
		for (let y = 0; y < 9; y++) {
			const line: SudokuHelperCell[] = []
			for (let x = 0; x < 9; x++) {
				line.push({
					value: 0,
					candidates: [1 + x],
					classname: "",
				})
			}
			fakeSudokuMap.push(line)
		}
		expect(extractCandidates(fakeSudokuMap, Shape.LINE, 0, 0)).toEqual([2, 3, 4, 5, 6, 7, 8, 9])
		expect(extractCandidates(fakeSudokuMap, Shape.LINE, 1, 0)).toEqual([1, 3, 4, 5, 6, 7, 8, 9])
		expect(extractCandidates(fakeSudokuMap, Shape.LINE, 8, 5)).toEqual([1, 2, 3, 4, 5, 6, 7, 8])
	})

	test("should extract candidates by column", () => {
		const fakeSudokuMap: SudokuHelperCell[][] = []
		for (let y = 0; y < 9; y++) {
			const line: SudokuHelperCell[] = []
			for (let x = 0; x < 9; x++) {
				line.push({
					value: 0,
					candidates: [1 + y],
					classname: "",
				})
			}
			fakeSudokuMap.push(line)
		}
		expect(extractCandidates(fakeSudokuMap, Shape.COLUMN, 0, 0)).toEqual([2, 3, 4, 5, 6, 7, 8, 9])
		expect(extractCandidates(fakeSudokuMap, Shape.COLUMN, 1, 1)).toEqual([1, 3, 4, 5, 6, 7, 8, 9])
		expect(extractCandidates(fakeSudokuMap, Shape.COLUMN, 2, 8)).toEqual([1, 2, 3, 4, 5, 6, 7, 8])
	})
})
