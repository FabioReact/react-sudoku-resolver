import { render, screen } from "@testing-library/react"
import { createSudokuMap } from '../helpers/sudoku-solver'
import Sudoku from "./Sudoku"

test("should render an error if sudoku is not valid 1x1", () => {
	const sudokuArray = [[]]
	render(<Sudoku map={sudokuArray} />)
	const error = screen.getByText(/not a correct sudoku/i)
	expect(error).toBeInTheDocument()
})

test("should render an error if sudoku is not valid 9x1", () => {
	const sudokuArray = [[], [], [], [], [], [], [], [], []]
	render(<Sudoku map={sudokuArray} />)
	const error = screen.getByText(/not a correct sudoku/i)
	expect(error).toBeInTheDocument()
})

test("should render a sudoku table is array is valid", () => {
	const sudokuArray = [
    [0,2,0,0,0,7,0,3,0],
    [0,0,0,6,0,0,1,9,7],
    [9,0,0,3,0,0,2,0,4],
    [0,6,0,0,5,0,8,4,0],
    [0,0,8,0,2,0,3,0,0],
    [0,9,4,0,6,0,0,5,0],
    [6,0,2,0,0,4,0,0,1],
    [3,4,9,0,0,8,0,0,0],
    [0,7,0,2,0,0,0,8,0],
  ]
	const initialMap = createSudokuMap(sudokuArray)
	render(<Sudoku map={initialMap} />)
	const table = screen.getByRole('table')
	expect(table).toBeInTheDocument()
})