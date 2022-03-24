enum Shape {
	LINE,
	COLUMN,
	SQUARE,
}

type SudokuHelperCell = {
	value: number
	candidates: number[]
	classname: string
}

const checkValidNumbers = (numbers: number[]): boolean => {
	const posNumbers = numbers.filter((n) => n > 0)
	return new Set(posNumbers).size === posNumbers.length
}

const isEveryElementUnique = (numbers: number[]): boolean => {
	return new Set(numbers).size === numbers.length
}

const findFirstCoordinate = (x: number): number => {
	let firstX
	if (x >= 6) firstX = 6
	else if (x >= 3) firstX = 3
	else firstX = 0
	return firstX
}

const extractNumbers = (
	sudoku: SudokuHelperCell[][],
	shape: Shape,
	x: number,
	y: number,
): number[] => {
	if (shape === Shape.LINE) return sudoku[y].map(c => c.value)
	if (shape === Shape.COLUMN) {
		const column = []
		for (let index = 0; index < 9; index++) column.push(sudoku[index][x].value)
		return column
	}
	if (shape === Shape.SQUARE) {
		const square = []
		const firstX = findFirstCoordinate(x)
		const firstY = findFirstCoordinate(y)
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				square.push(sudoku[i + firstY][j + firstX].value)
			}
		}
		return square
	}
	return []
}

const difference = (first: number[], second: number[]): number[] => {
	return first.filter((x) => !second.includes(x))
}

const findCandidates = (sudokuMap: SudokuHelperCell[][]): SudokuHelperCell[][] => {
	const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9]
	const newSudokuMap: SudokuHelperCell[][] = []
	for (let i = 0; i < sudokuMap.length; i++) {
		const line = extractNumbers(sudokuMap, Shape.LINE, 0, i)
		newSudokuMap.push([])
		for (let j = 0; j < line.length; j++) {
			let potentialCandidates: number[] = []
			let classname = ""
			let value = sudokuMap[i][j].value
			if (value === 0) {
				const column = extractNumbers(sudokuMap, Shape.COLUMN, j, i)
				const square = extractNumbers(sudokuMap, Shape.SQUARE, j, i)
				potentialCandidates = difference(
					candidates,
					column.concat(square, line),
				)
				if (potentialCandidates.length === 1) {
					value = potentialCandidates[0]
					potentialCandidates.pop()
				}
				classname = "text-blue-500"
			}
			newSudokuMap[i].push({
				value,
				candidates: potentialCandidates,
				classname,
			})
		}
	}
	selectByElimination(newSudokuMap)
	return newSudokuMap
}

const extractCandidates = (
	sudoku: SudokuHelperCell[][],
	shape: Shape,
	x: number,
	y: number,
): number[] => {
	switch (shape) {
		case Shape.LINE:
			return sudoku[y].reduce((candidates, cell, index) => {
				if (index !== x)
					return candidates.concat(cell.candidates as any)
				return candidates
			}, [])
		case Shape.COLUMN:
			const candidates: number[] = []
			for (let j = 0; j < 9; j++) {
				sudoku[x][j].candidates.forEach(c => candidates.push(c))
			}
			return candidates
		default:
			return []
	}
}

const selectByElimination = (sudokuMap: SudokuHelperCell[][]): SudokuHelperCell[][] => {
	for (let i = 0; i < sudokuMap.length; i++) {
		for (let j = 0; j < sudokuMap[i].length; j++) {
			const otherCandidates = extractCandidates(sudokuMap, Shape.LINE, j, i)
			const otherCandidatesColumn = extractCandidates(sudokuMap, Shape.COLUMN, j, i)
			// [1,7,8]
			const foundValue = sudokuMap[i][j].candidates.filter(v => !otherCandidates.includes(v) || !otherCandidatesColumn.includes(v))
			if (foundValue. length === 1)
				console.log(`Found Value ${foundValue} for ${i}-${j}`)
		}
	}
	return sudokuMap
}

const createSudokuMap = (sudoku: number[][]): SudokuHelperCell[][] => {
	const sudokuHelper: SudokuHelperCell[][] = []
	for (let i = 0; i < sudoku.length; i++) {
		const line = sudoku[i]
		sudokuHelper.push([])
		for (let j = 0; j < line.length; j++) {
			sudokuHelper[i].push({
				value: sudoku[i][j],
				candidates: [],
				classname: "",
			})
		}
	}
	return sudokuHelper
}

export {
	extractNumbers,
	isEveryElementUnique,
	checkValidNumbers,
	findCandidates,
	createSudokuMap,
	Shape,
}
export type { SudokuHelperCell }
