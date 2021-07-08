import {view} from './view.js'

export const model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,
    
    ships: [
        { locations: [0, 0, 0], hits: ["", "", ""] },
        { locations: [0, 0, 0], hits: ["", "", ""] },
        { locations: [0, 0, 0], hits: ["", "", ""] }
    ],
    
    fire: function(guess) {
        for (let i = 0; i < this.numShips; i++) {
            const ship = this.ships[i]
            const index = ship.locations.indexOf(guess)
            
            // here's an improvement! Check to see if the ship
            // has already been hit, message the user, and return true.
            if (ship.hits[index] === "hit") {
                view.displayMessage("Oops, you already hit that location!")
                return true
            } else if (index >= 0) {
                ship.hits[index] = "hit"
                view.displayHit(guess)
                view.displayMessage("HIT!")
                
                if (this.isSunk(ship)) {
                    view.displayMessage("You sank my battleship!")
                    this.shipsSunk++
                }
                return true
            }
        }
        view.displayMiss(guess)
        view.displayMessage("You missed.")
        return false
    },
    
    isSunk: function(ship) {
        for (let i = 0; i < this.shipLength; i++)  {
            if (ship.hits[i] !== "hit") {
                return false
            }
        }
        return true
    },
    
    generateShipLocations: function() {
        let locations = null
        
        for (let i = 0; i < this.numShips; i++) {
            do {
                locations = this.generateShip()
            } while (this.collision(locations))
            this.ships[i].locations = locations
        }
        console.log("Ships array: ")
        console.log(this.ships)
    },
    
    generateShip: function() {
        const direction = Math.floor(Math.random() * 2)
        let row = null
        let col = null
        
        if (direction === 1) { // horizontal
            row = Math.floor(Math.random() * this.boardSize)
            col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1))
        } else { // vertical
            row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1))
            col = Math.floor(Math.random() * this.boardSize)
        }
        
        const newShipLocations = []
        for (let i = 0; i < this.shipLength; i++) {
            if (direction === 1) {
                newShipLocations.push(row + "" + (col + i))
            } else {
                newShipLocations.push((row + i) + "" + col)
            }
        }
        return newShipLocations
    },
    
    collision: function(locations) {
        for (let i = 0; i < this.numShips; i++) {
            const ship = this.ships[i]
            
            for (let j = 0; j < locations.length; j++) {
                if (ship.locations.indexOf(locations[j]) >= 0) {
                    return true
                }
            }
        }
        return false
    }
}
