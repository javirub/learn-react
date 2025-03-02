import {Square} from "./Square.jsx";

export function GameBoard ({board, updateActions})  {
    return <section className="game">
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
}