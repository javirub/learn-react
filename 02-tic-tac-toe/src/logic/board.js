import {TURNS, WINNERS, WINNING_COMBINATIONS} from "../constants.js";
import confetti from "canvas-confetti";

export const checkWinner = (boardToCheck) => {
    for (const combination of WINNING_COMBINATIONS) {
        const [a, b, c] = combination
        if
        (boardToCheck[a] &&
            boardToCheck[a] === boardToCheck[b] &&
            boardToCheck[a] === boardToCheck[c]) {
            confetti()
            return boardToCheck[a] === TURNS.X ? WINNERS.X : WINNERS.O;
        }
    }
    if (!boardToCheck.includes(null)) {
        return WINNERS.TIE;
    }
    return null
}