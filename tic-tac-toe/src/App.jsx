import './App.css'
import {useState} from "react";
import {TURNS} from "./constants.js";
import {checkWinner} from "./logic/board.js";
import {WinnerModal} from "./components/WinnerModal.jsx";
import {GameBoard} from "./components/GameBoard.jsx";
import {TurnIndicator} from "./components/TurnIndicator.jsx";


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
            <GameBoard board={board} updateActions={updateActions}/>
            <TurnIndicator turn={turn}/>
            <WinnerModal resetGame={resetGame} winner={winner}/>
        </main>
    )
}

export default App
