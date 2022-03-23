enum Shape {
	LINE,
	COLUMN,
	SQUARE,
}

const checkValidNumbers = (numbers: number[]): boolean => {
	const posNumbers = numbers.filter(n => n > 0)
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

const extractNumbers = (sudoku: number[][], shape: Shape, x: number, y: number): number[] => {
	if (shape === Shape.LINE)
		return sudoku[y]
	if (shape === Shape.COLUMN) {
		const column = []
		for (let index = 0; index < 9; index++)
			column.push(sudoku[index][x])
		return column
	}
	if (shape === Shape.SQUARE) {
		const square = []
		const firstX = findFirstCoordinate(x)
		const firstY = findFirstCoordinate(y)
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				square.push(sudoku[i + firstY][j + firstX])
			}
		}
		return square
	}
	return []
}

export { extractNumbers, isEveryElementUnique, checkValidNumbers, Shape }