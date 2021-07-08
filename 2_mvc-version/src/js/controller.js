import {model} from "./model.js"
import {view}  from './view.js'

const parseGuess = (guess) => {
    const alphabet = ["A", "B", "C", "D", "E", "F", "G"]
    
    if (guess === null || guess.length !== 2) {
        alert("Oops, please enter a letter and a number on the board.")
    } else {
        const firstChar = guess.charAt(0)
        const row = alphabet.indexOf(firstChar)
        const column = guess.charAt(1)
        
        if (isNaN(row) || isNaN(column)) {
            alert("Oops, that isn't on the board.")
        } else if (row < 0 || row >= model.boardSize ||
            column < 0 || column >= model.boardSize) {
            alert("Oops, that's off the board!")
        } else {
            return row + column
        }
    }
    return null
}

const handleFireButton = () => {
    const guessInput = document.getElementById("guessInput");
    const guess = guessInput.value.toUpperCase();
    
    controller.processGuess(guess);
    
    guessInput.value = "";
}

export const controller = {
    guesses: 0,
    
    processGuess: function(guess) {
        const location = parseGuess(guess)
        
        if (location) {
            this.guesses++
            const hit = model.fire(location)
            
            if (hit && model.shipsSunk === model.numShips) {
                view.displayMessage(`You sank all my battleships, in ${ this.guesses } guesses`)
            }
        }
    },
    
    fire() {
        const fireButton = document.getElementById("fireButton");
        fireButton.onclick = handleFireButton;
    }
}
