import Sudoku from "./components/Sudoku"

function App() {
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
	return (
		<section className="text-center">
			<h1>Sudoku Resolver</h1>
			<ol>
				<li>Faire un tableau de 9x9 cases</li>
				<li>Mettre en place les regles de validation d'un sudoku</li>
				<li>Créer une fonction qui cherche à remplir le sudoku</li>
			</ol>
			<div id="sudoku">
				<Sudoku numbers={sudokuArray} />
			</div>
			<button>Solve Sudoku</button>
		</section>
	)
}

export default App
