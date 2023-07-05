import { newNPCGridRef } from "./GenerateComputerGrid"; 
import npcTurn from "./npcTurn";
import boomSound from "../sounds/boom.wav"

let clickCount = 100;

// Function to determine which player's turn it is
const playerTurn = (selectedGrid, playerGridDivRef) => {
        console.log('PLAYER TURN BEGINS');

        // human player logic 
        console.log(selectedGrid);
        console.log("gridRef", newNPCGridRef);
        
        if(newNPCGridRef.includes(selectedGrid.id)) {
                console.log("yes");
        
        // if 'hit', change grid cell to red
        selectedGrid.style.backgroundColor = "red";

        // stores number of targets to hit (Health Bar)
        const arrayLength = newNPCGridRef.length; // return length of the computers ship array

        // remove selected grid from newNPCGridRef array
        newNPCGridRef.splice(newNPCGridRef.indexOf(selectedGrid.id), 1); 
        
        // newNPCGridRef.splice(selectedGrid.id, 1);
        console.log('newNPCGridRef updated', newNPCGridRef);

        // update clickCounter
        let turnScore = newNPCGridRef.length * clickCount;
        console.log("turn score", turnScore); // use for score board
        
        // trigger message => "hit" (simple <p> tag on screen => "status: hit emoji/sound effect?")

        // computer turn => return key word to end turn? => style to indicate computer's turn; grey out other grid?

        } else {
        // if 'miss' change grid cell to yellow
        selectedGrid.style.backgroundColor = "yellow";
        // create an audio object to play sounds
        const audio = new Audio(boomSound);
        audio.play();
        // message => "miss" (simple <p> tag on screen => "status: miss emoji/sound effect?")
        }

        // update click count on each guess/click on grid
        clickCount = clickCount - 1;
        console.log(clickCount);

        // call new function called NPC turn
        console.log( '...END PLAYERS TURN...' );
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