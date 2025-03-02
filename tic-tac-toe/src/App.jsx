import './App.css'
import {useState} from "react";
import {Square} from "./components/Square.jsx";
import {TURNS, WINNERS} from "./constants.js";
import {checkWinner} from "./logic/board.js";


function App() {
    const [board, setBoard] = useState(
        Array(9).fill(null)
    )

    const [turn, setTurn] = useState(TURNS.X)
    const [winner, setWinner] = useState(null)

    const resetGame = () => {
        setBoard(Array(9).fill(null))
        setTurn(TURNS.X)
        setWinner(null)
    }

    const updateActions = (index) => {
        if (board[index] || winner) return

        const newBoard = [...board]
        newBoard[index] = turn
        setBoard(newBoard)

        const newWinner = checkWinner(newBoard)
        if (newWinner) {
            setWinner(newWinner)
        }

        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
        setTurn(newTurn)
    }

    return (
        <main className='board'>
            <h1>Tic Tac Toe</h1>
            <button onClick={resetGame}>Reset game</button>
            <section className="game">
                {
                    board.map((square, index) => {
                        return (
                            <Square
                                key={index}
                                index={index}
                                updateBoard={updateActions}
                            >
                                {square}
                            </Square>
                        )
                    })
                }
            </section>
            <section className="turn">
                <Square isSelected={turn === TURNS.X}>
                    {TURNS.X}
                </Square>
                <Square isSelected={turn === TURNS.O}>
                    {TURNS.O}
                </Square>
            </section>
            {
                winner !== null && (
                    <section className="winner">
                        <div className="text">
                            <h2>
                                {
                                    winner === WINNERS.TIE
                                        ? ''
                                        : 'Winner is:'
                                }
                            </h2>
                            <header className="win">
                                {winner && <Square>{winner}</Square>}
                            </header>

                            <footer>
                                <button onClick={resetGame}>Empezar de nuevo</button>
                            </footer>
                        </div>
                    </section>
                )
            }
        </main>
    )
}

export default App
