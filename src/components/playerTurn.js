import boomSound from "../sounds/boom.wav";
import arcadeExplosion from "../sounds/arcade-Explo-A.wav"

let count = 0;
let playerTurnArr = [];

// Function to determine which player's turn it is
const playerTurn = (selectedGridID, npcComparisonArray, handleHit) => {
        // if selected cell is occupied by a rocket
        if (npcComparisonArray.includes(selectedGridID)) {
                // play audio sound
                const audio2 = new Audio(arcadeExplosion);
                audio2.play();

                // message 
                handleHit(true);

                // update clickCounter
                count = count + 1;

                // update array with data
                playerTurnArr = [true, count];

                // returns true if there is a hit plus returns the count
                return playerTurnArr    
        } else {
                // create an audio object to play sounds
                const audio1 = new Audio(boomSound);
                audio1.play();
        
                // message 
                handleHit(false);

                // update array with data
                playerTurnArr = [false, count];

                // returns true if there is a hit plus returns the count
                return playerTurnArr; 
        }
}

export default playerTurn;