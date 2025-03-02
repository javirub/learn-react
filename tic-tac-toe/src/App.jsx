import './App.css'
import {useState} from "react";

const TURNS = {
    X: 'x',
    O: 'o'
}

const WINNERS = {
    X: 'x',
    O: 'o',
    TIE: 'Tie'
}

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const Square = ({children, isSelected, updateBoard, index}) => {
    const className = `square ${isSelected ? 'is-selected' : ''}`

    const handleClick = () => {
        updateBoard(index)
    }
    return (
        <div onClick={handleClick} className={className}>
            {children}
        </div>
    )
}

function App() {
    const [board, setBoard] = useState(
        Array(9).fill(null)
    )

    const [turn, setTurn] = useState(TURNS.X)
    const [winner, setWinner] = useState(null)

    const checkWinner = (boardToCheck) => {
        for (const combination of WINNING_COMBINATIONS) {
            const [a, b, c] = combination
            if
                (boardToCheck[a] &&
                boardToCheck[a] === boardToCheck[b] &&
                boardToCheck[a] === boardToCheck[c]) {
                return boardToCheck[a] === TURNS.X ? WINNERS.X : WINNERS.O;
                }
        }
        return null
    }

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
        } else if (newBoard.every(square => square !== null)) {
            setWinner(WINNERS.TIE)
        }

        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
        setTurn(newTurn)


    }

    return (
        <main className='board'>
            <h1>Tic Tac Toe</h1>
            <section className="game">
                {
                    board.map((_, index) => {
                        return (
                            <Square
                                key={index}
                                index={index}
                                updateBoard={updateActions}
                            >
                                {board[index]}
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
                            <header className={"win"}>
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
