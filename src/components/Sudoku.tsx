import { SudokuHelperCell } from "../helpers/sudoku-solver"

type SudokuProps = {
	map: SudokuHelperCell[][]
}

const Sudoku = ({ map }: SudokuProps) => {
	if (map?.length !== 9) return <p>Not a correct Sudoku</p>
	else if (!map.every((line) => line.length === 9))
		return <p>Not a correct Sudoku</p>

	return (
		<table className="m-auto">
			<tbody>
				{map.map((line: SudokuHelperCell[], lineIndex: number) => (
					<tr key={lineIndex}>
						{line.map((cell: SudokuHelperCell, cellIndex) => (
							<td key={`${lineIndex}${cellIndex}`} className="relative">
								<span className=" absolute top-0 left-0 text-xs">
									{cell.candidates.toString()}
								</span>
								<span className={`${cell.classname} text-xl`}>
									{!!cell.value && cell.value}
								</span>
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default Sudoku
