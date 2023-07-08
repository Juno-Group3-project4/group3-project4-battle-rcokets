// import { newNPCGridRef } from "./generateComputerGrid"; 
// import npcTurn from "./npcTurn";
import boomSound from "../sounds/boom.wav";
import arcadeExplosion from "../sounds/arcade-Explo-A.wav"

let clickCount = 100;

// Function to determine which player's turn it is
const playerTurn = (selectedGrid, playerGridDivRef, handleHit) => {
        // console.log('PLAYER TURN BEGINS');

        // human player logic 
        // console.log(selectedGrid);
        // console.log("gridRef", newNPCGridRef);

        // let copyNPCGridRef = JSON.parse(JSON.stringify(newNPCGridRef));
        // console.log("copyNPCGridRef", copyNPCGridRef)
        
        // if(newNPCGridRef.includes(selectedGrid.id)) {
        //         console.log("yes");
        
        //         // if 'hit', change grid cell to red
        //         selectedGrid.style.backgroundColor = "red";
        //         const audio2 = new Audio(arcadeExplosion);
        //         audio2.play();

        //         // stores number of targets to hit (Health Bar)
        //         // const arrayLength = newNPCGridRef.length; // return length of the computers ship array

        //         // remove selected grid from copyNPCGridRef array
        //         // copyNPCGridRef.splice(copyNPCGridRef.indexOf(selectedGrid.id), 1); 
        
        //         // newNPCGridRef.splice(selectedGrid.id, 1);
        //         // console.log('newNPCGridRef updated', newNPCGridRef);
        //         // console.log("copyNPCGridRef updated", copyNPCGridRef)
        //         // update clickCounter
        //         // let turnScore = newNPCGridRef.length * clickCount;
        //         console.log("turn score", turnScore); // use for score board
        
        //         // trigger message => "hit" (simple <p> tag on screen => "status: hit emoji/sound effect?")
        //         handleHit(true);

        //         // computer turn => return key word to end turn? => style to indicate computer's turn; grey out other grid?

        //         } else {
        //         // if 'miss' change grid cell to yellow
        //         selectedGrid.style.backgroundColor = "yellow";
        //         // create an audio object to play sounds
        //         const audio1 = new Audio(boomSound);
        //         audio1.play();
        
        //         // message => "miss" (simple <p> tag on screen => "status: miss emoji/sound effect?")
        //         handleHit(false);
        // }

        // update click count on each guess/click on grid
        clickCount = clickCount - 1;
        // console.log(clickCount);

        // call new function called NPC turn
        // console.log( '...END PLAYERS TURN...' );
        // npcTurn(playerGridDivRef);


        // confirm if grid cell has rocket placed there
                // if true (hit) = 1) cell colour changes to red
                        // 2) updates score => state (health bar)
                        // 3) keep track of clicks
                        // 4) update/relay message when player's or NPC's turn => true/false state (setTimeOut function) => use styling on grid to visually inform turn
                        // 5) message saying 'hit' (stretch goal - sound effect?)

                // if false (miss) = 1) cell colour changes to yellow
                                // 2) display message saying 'miss' (stretch goal - sound effect?)
                                // 3) keep track of clicks
                                // 4) update turn state

}

const scoreCalc = () => {

};

export default playerTurn;