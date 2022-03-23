enum Shape {
	LINE,
	COLUMN,
	SQURE,
}

const extractNumbers = (sudoku: number[][], shape: Shape, x: number, y: number): number[] => {
	if (shape === Shape.LINE)
		return sudoku[x]
	return []
}

const verifyCombination = (line: number[]): boolean => {
	return false
}

export { verifyCombination, extractNumbers, Shape }