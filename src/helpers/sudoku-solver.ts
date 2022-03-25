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

const setNumber = (sudokuMap: SudokuHelperCell[][], number: number, x: number, y: number): void => {
	console.log(`%cFound Value ${number} for ${y}-${x}`, 'color: red')
	// console.table(sudokuMap[y][x])
	sudokuMap[y][x].value = number
	sudokuMap[y][x].candidates = []
	sudokuMap[y][x].classname = "text-blue-500"
	eliminateCandidate(sudokuMap, number, x, y)
}

const eliminateCandidate = (sudokuMap: SudokuHelperCell[][], candidate: number, x: number, y: number): void => {
	for (let i = 0; i < 9; i++) {
		sudokuMap[i][x].candidates = sudokuMap[i][x].candidates.filter(v => v !== candidate)
		if (sudokuMap[i][x].candidates.length === 1) setNumber(sudokuMap, sudokuMap[i][x].candidates[0], x, y)
	}
	for (let j = 0; j < 9; j++) {
		sudokuMap[y][j].candidates = sudokuMap[y][j].candidates.filter(v => v !== candidate)
		if (sudokuMap[y][j].candidates.length === 1) setNumber(sudokuMap, sudokuMap[y][j].candidates[0], x, y)
	}
	const firstX = findFirstCoordinate(x)
	const firstY = findFirstCoordinate(y)
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			sudokuMap[i + firstY][j + firstX].candidates = sudokuMap[i + firstY][j + firstX].candidates.filter(v => v !== candidate)
			if (sudokuMap[i + firstY][j + firstX].candidates.length === 1) setNumber(sudokuMap, sudokuMap[i + firstY][j + firstX].candidates[0],j + firstX, i + firstY)
		}
	}
}

const findCandidates = (sudokuMap: SudokuHelperCell[][]): SudokuHelperCell[][] => {
	const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9]
	for (let y = 0; y < 9; y++) {
		for (let x = 0; x < 9; x++) {
			if (sudokuMap[y][x].value === 0) {
				const line = extractNumbers(sudokuMap, Shape.LINE, x, y)
				const column = extractNumbers(sudokuMap, Shape.COLUMN, x, y)
				const square = extractNumbers(sudokuMap, Shape.SQUARE, x, y)
				sudokuMap[y][x].candidates = difference(
					candidates,
					column.concat(square, line),
				)
				if (sudokuMap[y][x].candidates.length === 1) {
					setNumber(sudokuMap, sudokuMap[y][x].candidates[0], x, y)
				}
			}
		}
	}
	let newIteration = 0
	do {
		newIteration = selectByElimination(sudokuMap)
	} while (newIteration);
	return sudokuMap
}

const extractCandidates = (
	sudoku: SudokuHelperCell[][],
	shape: Shape,
	x: number,
	y: number,
): number[] => {
	switch (shape) {
		case Shape.LINE: {
			const candidates = sudoku[y].reduce((candidates, cell, i) => {
				if (i !== x)
					return candidates.concat(cell.candidates as any)
				return candidates
			}, [])
			return [...new Set(candidates) as any]
		}
		case Shape.COLUMN: {
			const candidates: number[] = []
			for (let i = 0; i < 9; i++) {
				if (i !== y) {
					sudoku[i][x].candidates.forEach(c => {
						candidates.push(c)
					})
				}
			}
			return [...new Set(candidates) as any]
		}
		case Shape.SQUARE: {
			const firstX = findFirstCoordinate(x)
			const firstY = findFirstCoordinate(y)
			const candidates: number[] = []
			for (let i = 0; i < 3; i++) {
				for (let j = 0; j < 3; j++) {
					if (i + firstY !== y || j + firstX !== x) {
						sudoku[i + firstY][j + firstX].candidates.forEach(c => {
							candidates.push(c)
						})
					}
				}
			}
			return [...new Set(candidates) as any]
		}
		default:
			return []
	}
}

const eliminationByShape = (sudokuMap: SudokuHelperCell[][], shape: Shape, x: number, y: number): number => {
	const otherCandidates = extractCandidates(sudokuMap, shape, x, y)
	const foundValues = sudokuMap[y][x].candidates.filter(v => !otherCandidates.includes(v))
	if (foundValues.length === 1) {
		setNumber(sudokuMap, foundValues[0], x, y)
		return 1
	}
	return 0
}

const selectByElimination = (sudokuMap: SudokuHelperCell[][]): number => {
	let foundNumbers = 0
	for (let y = 0; y < 9; y++) {
		for (let x = 0; x < 9; x++) {
			foundNumbers += eliminationByShape(sudokuMap, Shape.LINE, x, y)
			foundNumbers += eliminationByShape(sudokuMap, Shape.COLUMN, x, y)
			foundNumbers += eliminationByShape(sudokuMap, Shape.SQUARE, x, y)
		}
	}
	return foundNumbers
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

const backtracking = (sudokuMap: SudokuHelperCell[][], index: number): boolean => {
	console.log(`Index ${index}`)
	const x = Math.floor(index / 9)
	const y = index % 9
	if (index === 81) return true
	if (sudokuMap[y][x].value !== 0) {
		return backtracking(sudokuMap, index + 1)
	}
	const allPossibleCandidates = [1, 2, 3, 4, 5, 6, 7, 8, 9]
	const line = extractNumbers(sudokuMap, Shape.LINE, x, y)
	const column = extractNumbers(sudokuMap, Shape.COLUMN, x, y)
	const square = extractNumbers(sudokuMap, Shape.SQUARE, x, y)
	const candidates = difference(
		allPossibleCandidates,
		column.concat(square, line),
	)
	console.log(`Candidates ${candidates}`)
	for (const c of candidates) {
		sudokuMap[y][x].value = c
		sudokuMap[y][x].candidates = []
		sudokuMap[y][x].classname = 'text-green-500'
		if (backtracking(sudokuMap, index + 1)) {
			return true
		}
	}
	sudokuMap[y][x].value = 0
	return false
}

export {
	extractNumbers,
	extractCandidates,
	isEveryElementUnique,
	checkValidNumbers,
	findCandidates,
	createSudokuMap,
	eliminateCandidate,
	backtracking,
	Shape,
}
export type { SudokuHelperCell }
