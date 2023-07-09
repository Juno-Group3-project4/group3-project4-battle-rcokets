import boomSound from "../sounds/boom.wav";
import arcadeExplosion from "../sounds/arcade-Explo-A.wav"

<<<<<<< HEAD


=======
let turnScore;
>>>>>>> 238cb7a19964a46ab7bf61568586c261eb52ea40
let clickCount = 100;
let count = 0;

// Function to determine which player's turn it is
const playerTurn = (selectedGridID, npcComparisonArray, handleHit) => {
        
        // stores number of targets to hit (Health Bar)
        const arrayLength = npcComparisonArray.length;

<<<<<<< HEAD
        // remove selected grid from newNPCGridRef array
        newNPCGridRef.splice(newNPCGridRef.indexOf(selectedGrid.id), 1); 
        
        // newNPCGridRef.splice(selectedGrid.id, 1);
        console.log('newNPCGridRef updated', newNPCGridRef);

        // update clickCounter
        let turnScore = newNPCGridRef.length * clickCount;
        console.log("turn score", turnScore); // use for score board
        
        // trigger message => "hit" (simple <p> tag on screen => "status: hit emoji/sound effect?")
        handleHit(true);
        return true;
        // computer turn => return key word to end turn? => style to indicate computer's turn; grey out other grid?
=======
        // if selected cell is occupied by a rocket
        if (npcComparisonArray.includes(selectedGridID)) {
                // play audio sound
                const audio2 = new Audio(arcadeExplosion);
                audio2.play();

                // message 
                handleHit(true);
>>>>>>> 238cb7a19964a46ab7bf61568586c261eb52ea40

                // update clickCounter
                count = count + 1;                
        } else {
<<<<<<< HEAD
        // if 'miss' change grid cell to yellow
        selectedGrid.style.backgroundColor = "yellow";
        // create an audio object to play sounds
        const audio1 = new Audio(boomSound);
        audio1.play(); 
       
        // message => "miss" (simple <p> tag on screen => "status: miss emoji/sound effect?")
        handleHit(false);
=======
                // create an audio object to play sounds
                const audio1 = new Audio(boomSound);
                audio1.play();
        
                // message 
                handleHit(false);
>>>>>>> 238cb7a19964a46ab7bf61568586c261eb52ea40
        }

        // update click count on each guess/click on grid
        clickCount = clickCount - 1;
        turnScore =  arrayLength * clickCount;
        console.log("turn score", turnScore);
        console.log(clickCount);
        console.log("count", count);
        console.log(arrayLength);

        if(count === arrayLength) {
                console.log("YOU WIN!");
                console.log(`YOUR FINAL SCORE IS ${turnScore}!`);
        }
}

const scoreCalc = () => {

};

export default playerTurn;