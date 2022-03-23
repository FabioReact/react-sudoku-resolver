const Sudoku = ({ numbers }: { numbers: number[][] }) => {
	if (numbers.length !== 9)
		return <p>Not a correct Sudoku</p>
	else if (!numbers.every(line => line.length === 9))
		return <p>Not a correct Sudoku</p>

	return (
		<table className="m-auto">
			{numbers.map((line: number[]) => (
				<tr>
					{line.map((cell: number) => (
						<td>{!!cell && cell}</td>
					))}
				</tr>
			))}
		</table>
	)
}

export default Sudoku
