import boomSound from "../sounds/boom.wav";
import arcadeExplosion from "../sounds/arcade-Explo-A.wav"

let turnScore;
// let clickCount = 100;
let count = 0;

// Function to determine which player's turn it is
const playerTurn = (selectedGridID, npcComparisonArray, handleHit) => {
        
        // stores number of targets to hit (Health Bar)
        const arrayLength = npcComparisonArray.length;

        // if selected cell is occupied by a rocket
        if (npcComparisonArray.includes(selectedGridID)) {
                // play audio sound
                const audio2 = new Audio(arcadeExplosion);
                audio2.play();

                // message 
                handleHit(true);

                // update clickCounter
                count = count + 1;
                
                // returns true if there is a hit
                return true;      
        } else {
                // create an audio object to play sounds
                const audio1 = new Audio(boomSound);
                audio1.play();
        
                // message 
                handleHit(false);

                // returns false if there is a miss
                return false;
        }

        // // update click count on each guess/click on grid
        // clickCount = clickCount - 1;
        // turnScore =  arrayLength * clickCount;
        // console.log("turn score", turnScore);
        // console.log(clickCount);
        // console.log("count", count);
        // console.log(arrayLength);

        if(count === arrayLength) {
                console.log("YOU WIN!");
                console.log(`YOUR FINAL SCORE IS ${turnScore}!`);
        }
}

export default playerTurn;