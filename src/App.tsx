import { useEffect, useState } from 'react'
import Sudoku from "./components/Sudoku"
import { createSudokuMap, findCandidates } from './helpers/sudoku-solver'
import { sudokuList } from './sudokus/hard'

function App() {
	const sudokuArray = sudokuList[0]
	const [sudokuMap, setSudokuMap] = useState<any>(null)
	useEffect(() => {
		const initialMap = createSudokuMap(sudokuArray)
		setSudokuMap(initialMap)
	}, [])
	

	const solve = () => {
		const newMap = findCandidates(sudokuMap)
		setSudokuMap(newMap)
	}
	return (
		<section className="text-center">
			<h1>Sudoku Resolver</h1>
			<ol>
				<li>Faire un tableau de 9x9 cases</li>
				<li>Mettre en place les regles de validation d'un sudoku</li>
				<li>Créer une fonction qui cherche à remplir le sudoku</li>
			</ol>
			<div id="sudoku">
				<Sudoku map={sudokuMap} />
			</div>
			<button onClick={solve}>Solve Sudoku</button>
		</section>
	)
}

export default App
