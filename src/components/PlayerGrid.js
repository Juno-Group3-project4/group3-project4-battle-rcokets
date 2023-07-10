// PlayerGrid.js
import { useState, useRef, useEffect } from "react";
import BattleGrid from "./BattleGrid";
import shipDataArray from "./shipDataArray";
import Score from "./Score";
import { npcTurn } from "./npcTurn";
import playerTurn from "./playerTurn";
import Modal from "./Modal";
import { Typewriter } from "react-simple-typewriter";
import gridData from "./gridData";
import { generateRandomLocation, npcRocketData } from "./generateComputerGrid";

// PLAYER GRID Component 
const PlayerGrid = ({ selectedRockets }) => {

    // STATEFUL VARIABLES:
    // set rocket ship grid data
    const [shipData, setShipData] = useState([]);
    // set NPC rocket ship grid data
    const [npcShipData, setNpcShipData] = useState([]);
    // set current rocket that user is dragging
    const [currentShip, setCurrentShip] = useState('');
    // useState to determine if all rockets have been placed on grid
    const [rocketsPlaced, setRocketsPlaced] = useState(false);
    // useState to launch game (Non player grid will be displayed)
    const [readyToLaunch, setReadyToLaunch] = useState(false);
    // usState to manage open/close Modal based on Game status
    const [openModal, setOpenModal] = useState(false);
    // useState to track game progress. State will update to "win" or "lose"
    const [gameStatus, setGameStatus] = useState(false);
    // useState to show modal if player's rocket has been fully attacked (OPTIONAL)
    const [attackedModal, setAttackedModal] = useState(false);
    // useState to show modal if player has fully destroyed the nonplayer's rocket (OPTIONAL)
    const [destroyedModal, setDestroyedModal] = useState(false);
    const [activePlayer, setActivePlayer] = useState(true);
    // useState to handle Hit/Miss message upon use turn
    const [hit, setHit] = useState('');
    const [hitVisible, setHitVisible] = useState(false);
    // useState to track users remaining clicks
    const [playerClicks, setPlayerClicks] = useState(100);
    // useState to track users score
    const [playerScore, setPlayerScore] = useState(0);
    // useState to track users score
    const [nonPlayerScore, setNonPlayerScore] = useState(0);
    // useState to store the players fleet length (the amount of cells remaining)
    const [nonPlayerFleetLength, setNonPlayerFleetLength] = useState(0)
    // useState to store the players fleet length (the amount of cells remaining)
    const [playerFleetLength, setPlayerFleetLength] = useState(0)
    // player Fleet health bare state variable
    const [playerFleetHealth, setPlayerFleetHealth] = useState(100);
    // player Fleet health bare state variable
    const [nonPlayerFleetHealth, setNonPlayerFleetHealth] = useState(100);


    // MUTABLE (useRef) VARIABLES:
    // store all the grids references
    const allCellDivs = useRef([]);
    // store individual rocket divs
    const rocketImage = useRef([]);
    // store player grid cell references for placed rockets
    const playerGridDivRef = useRef([]);

    // DEFINED GLOBAL VARIABLES:
    // store all player's grid references into one consolidated array
    const newPlayerGridRef = [];

    // useEffect for finding all the grid cells and converting the nodeList into an array which then we can access the cell elements and perform operations on later using allCellsDivs.current
    useEffect(() => {
        const cells = document.querySelectorAll('.gridCell.div');
        allCellDivs.current = Array.from(cells);
        displayPlayerRockets();
    }, []);


    useEffect(() => {
        const copyNpcShipData = [...npcShipData];
        const newNPCGridRef = [];

        const mappedCopyNpcShipData = copyNpcShipData.map((npcShip) => {
            return npcShip.NPCGridRef;
        })

        for (let i = 0; i < mappedCopyNpcShipData.length; i++) {
            for (let j = 0; j < mappedCopyNpcShipData[i].length; j++) {
                newNPCGridRef.push(mappedCopyNpcShipData[i][j]);
            }
        }

        const copyShipData = [...shipData];
        const newPlayerGridRef = [];

        const mappedCopyShipData = copyShipData.map((playerShip) => {
            return playerShip.playerGridRef;
        })

        for (let i = 0; i < mappedCopyShipData.length; i++) {
            for (let j = 0; j < mappedCopyShipData[i].length; j++) {
                newPlayerGridRef.push(mappedCopyShipData[i][j]);
            }
        }

        setNpcComparisonArray(newNPCGridRef);
        setPlayerComparisonArray(newPlayerGridRef);
        console.log('newNPCGridRef=>>', newNPCGridRef.length );
        console.log('newPlayerGridRef=>>', newPlayerGridRef.length );
        setNonPlayerFleetLength(newNPCGridRef.length);
        setPlayerFleetLength(newPlayerGridRef.length);

    }, [npcShipData, shipData]);
    
   
    // console.log("allCellDivsCurrent", allCellDivs.current);
    
    // filter & map over shipDataArray to return only data for rockets selected by user
    const displayPlayerRockets = () => {
        // return array that only includes data for rockets selected by user
        const rocketsToDisplay = shipDataArray.filter((ship) => {
            return selectedRockets.some((removeItem) => removeItem === ship.stringName);
        }).map((filteredShip) => {
            return (
                {
                    stringName: filteredShip.stringName,
                    imageSource: filteredShip.image,
                    shipName: filteredShip.shipName,
                    spaces: filteredShip.spaces,
                    orientation: filteredShip.orientation,
                    playerGridRef: filteredShip.playerGridRef,
                    attackedCells: filteredShip.attackedCells
                }
            )
        });
        setShipData(rocketsToDisplay);
    }
    
    // METHOD TO REMOVE ROCKET FROM DISPLAY ONCE PLACED ON GRID
    const removeRocket = () => {

        // Target Ship Divs using useRef Hook
        const ships = rocketImage.current;

        // Iterate through with conditionals so that if current placed ship's name equals the classname declared in the JSX
        ships.forEach((ship) => {
            if (ship.className === currentShip) {
                ship.style.display = 'none';
            }
        })
    }

    // METHOD TO RESET GRID PLACEMENTS ONCE BUTTON IS CLICKED
    const handleReset = () => {
        // When user clicks reset grid button, we map through shipData and reset all the data in the shipData array
        const initialShipData = shipData.map((ship) => ({
            ...ship,
            playerGridRef: [],
            orientation: "vertical",
        }));

        // Clear the newPlayerGridRef array and playerGRidDivRef array
        playerGridDivRef.current = [];
        newPlayerGridRef.length = 0;
       
        // Target Ship Divs using useRef Hook
        const ships = rocketImage.current;

        // reset computer's grid reference array
        const updatedNPCShipData = npcShipData.map((npcRocket) => ({
            ...npcRocket, 
            NPCGridRef: [],
            attackedCells: []
        }));
        // For each selection that has been placed on the grid, wipe the Array reset colours and put image back on webpage - if image was placed horizontally, includes a conditional statement to ensure image was reset vertically
        ships.forEach((ship) => {
            ship.style.display = 'flex';
            if (ship.children[1].style.transform === 'rotate(-90deg)') {
                return ship.children[1].style.transform = 'rotate(0)'
            }
            
        })

        // Reset all State
        setNpcShipData(updatedNPCShipData);
        setCurrentShip('');
        setRocketsPlaced(false);
        setReadyToLaunch(false);
        setOpenModal(false);
        setGameStatus(false);
        setAttackedModal(false);
        setDestroyedModal(false);
        setHit('');
        setHitVisible(false);

        // Reset ship data
        setShipData(initialShipData);

        // Ensure all cells are yellow 
        allCellDivs.current.forEach((cell) => {
            cell.style.backgroundColor = '#002C2E';
        })
        setClickedCells([]);
        setNpcComparisonArray([]);
        setGuessedCells([]);
        setPlayerComparisonArray([]);
        // console.log(newPlayerGridRef, "RESET SUCCESS")
    }

    // event listener for placing ship on grid
    const handleDrop = (e) => {
        // prevent page refresh 
        e.preventDefault();
        // Spread of shipData useState 
        const shipDataArr = [...shipData];

        // Store in a new State 
        setCurrentShip(shipDataArr);

        // Create Object to store playerGrid Ref
        let clickedShipObjTmp = {};
        for (const key in shipDataArr) {
            if (shipDataArr[key].shipName === currentShip) {
                clickedShipObjTmp = shipDataArr[key];
                // console.log(clickedShipObjTmp)
            }
        }
    
        // HORIZONTAL LOGIC
        if (clickedShipObjTmp.orientation === 'horizontal') {
            for (let i = 0; i < shipData.length; i++) {
                if (shipData[i].shipName === currentShip) {
                    let currentCell = e.target;
                    let x = Number(currentCell.getAttribute('valuex'));
                    for (let j = 0; j < shipData[i].spaces; j++) {
                        if (x - 1 + shipData[i].spaces > 10) {
                            alert("Oops! Make sure to place the rocket inside of the space grid!");
                            return;
                        } else {
                                // Add the grid reference to the shipData array
                                shipData[i].playerGridRef.push(currentCell.attributes.id.textContent);
                                // change the colour of the cells
                                currentCell.style.backgroundColor = "blue";

                                playerGridDivRef.current.push(currentCell);
                                // Move to the next sibling cell
                                currentCell = currentCell.nextElementSibling;
                                // Remove Rocket from display
                                removeRocket();
                        }    
                    }
                }
            }
        } else {
            // VERTICAL LOGIC
            for (let i = 0; i < shipData.length; i++) {
                if (shipData[i].shipName === currentShip) {
                    let currentCell = e.target;

                    let y = Number(currentCell.getAttribute('valuey'));

                    for (let j = 0; j < shipData[i].spaces; j++) {
                        if (y - 1 + shipData[i].spaces > 10) {
                            alert("Oops! Make sure to place the rocket inside of the space grid!");
                            return;
                        } else {
                            // Find valueX and store in a variable
                            let currentCellValueX = currentCell.attributes.valuex.textContent;// finds the x value of the click and store in a temp variable (x = 6) This is constant when in vertical mode

                            // find the valueY of the currentCell and add 1 to target the next column over
                            let currentCellValueY = Number(currentCell.attributes.valuey.textContent) + 1;

                            let tempNextCol = allCellDivs.current.filter((value) => {
                                const valuexAttr = value.getAttribute('valuex');
                                return valuexAttr && currentCellValueX.includes(valuexAttr);
                            });

                            // Add the grid reference to the shipData array
                            shipData[i].playerGridRef.push(currentCell.attributes.id.textContent);
                            // console.log("playerGridRef", shipData[i].playerGridRef);


                            // change the colour of the currentCell
                            currentCell.style.backgroundColor = "blue";

                            playerGridDivRef.current.push(currentCell);

                            // iterate through the temporary array and if it finds valuey that matches the currentCells valueX then store that div as the new currentCell
                            for (let i = 0; i < tempNextCol.length; i++) {
                                if (tempNextCol[i].attributes.valuey.textContent.includes(currentCellValueY)) {
                                    currentCell = tempNextCol[i];
                                }
                                // looks at all the divs stored in tempNextCol array and if it finds one that has the valuex that matches the currentCellValueX then store that div(cell) as the new currentCell
                                // Then the code will loop through again using the new cell reference pushing it to the playerGridRef array - loops through 4 times 
                            };
                            removeRocket();
                        }
                    } // end of for loop
                }
            }
        }
        // console.log(playerGridDivRef);
        
        // Push all PlayerGridRefs to one large array (newPlayerGridRef)
        for (let key in shipData) {
            const newArray = shipData[key].playerGridRef;
            newArray.map((array) => {
                newPlayerGridRef.push(array);
            })
            console.log("newPlayerGridRef", newPlayerGridRef);
            // console.log("newPlayerGridRef", newPlayerGridRef);
        }

        // ERROR HANDLING to check for duplicates in Array (i.e. user places rocket on a grid where another rocket exists)
        let duplicates = newPlayerGridRef.filter((item, index) => newPlayerGridRef.indexOf(item) !==index);
        console.log("Duplicates", duplicates);

        let gridDuplicates = playerGridDivRef.current.filter((item, index) => playerGridDivRef.current.indexOf(item) !== index)

        let discardedGrid = [];
        for (let item of playerGridDivRef.current) {
            if (!gridDuplicates.includes(item) && clickedShipObjTmp.playerGridRef.includes(item.id)) {
                discardedGrid.push(item);
            }
        }

        if (gridDuplicates.length > 0 && discardedGrid.length > 0 || gridDuplicates.length > 0) {
            playerGridDivRef.current = [...new Set(playerGridDivRef.current.filter(item => !discardedGrid.includes(item)))];
        }

        // Array for storing cells which aren't located in the newPlayerGridref, but are also part of the the placement with one or more duplicate values
        let discardedData = [];
        for (let item in clickedShipObjTmp.playerGridRef) {
            if (!duplicates.includes(clickedShipObjTmp.playerGridRef[item])) {
                // Add the non-duplicate value to a new array
                discardedData.push(clickedShipObjTmp.playerGridRef[item]);
            }
        }

        // If cell grid is located both within the discarded Data array and duplicates array, run an alert message for user - then put Rocket back in display and clear its playerGridRef array
        if (duplicates.length > 0 && discardedData.length >= 0) {
            alert("Oops! Make sure you are not placing rockets in a cell where another rocket already exists.")
            allCellDivs.current.forEach((cell) => {
                if (discardedData.includes(cell.id)) {
                    cell.style.backgroundColor = '#002C2E'
                }
            })
            const ships = rocketImage.current;
            ships.forEach((ship) => {
                if (ship.className === currentShip) {
                    ship.style.display = 'flex';
                }
            })
            clickedShipObjTmp.playerGridRef = [];
        }

        // if all rockets placed on grid, then update rocketsPlaced state to display launch button
        if (
                shipData[0].playerGridRef.length === shipData[0].spaces && 
                shipData[1].playerGridRef.length === shipData[1].spaces && 
                shipData[2].playerGridRef.length === shipData[2].spaces
            ) {
            setRocketsPlaced(!false);
        };
        console.log("newPlayerGridRef", newPlayerGridRef);
        // Reset duplicates array
        duplicates = [];
        discardedData = []; 
        console.log(playerGridDivRef.current)
    };

    // event listener to drag ship to grid
    const handleDrag = (e) => {
        setCurrentShip(e.target.attributes.name.textContent) // ShipName (ShipOne)
    };

    // event listener for handling onDrag
    const handleOnDrag = (e) => {
        e.preventDefault();
    };

    const handleOrientation = (e) => {
        const clickShip = e.target;
        const shipId = clickShip.getAttribute('name');

        if (clickShip.style.transform !== 'rotate(-90deg)') {
            clickShip.style.transform = 'rotate(-90deg)';

            setShipData(prevShipData => {
                // Create a copy of the shipData array
                const updatedShipData = [...prevShipData];
            
                // Find the clicked ship and update its orientation
                const clickedShipObjTmp = updatedShipData.find(ship => ship.shipName === shipId);
                if (clickedShipObjTmp) {
                    clickedShipObjTmp.orientation = 'horizontal';
                }
                return updatedShipData;
            });
        } else {
            clickShip.style.transform = 'rotate(0)';

            setShipData(prevShipData => {
                // Create a copy of the shipData array
                const updatedShipData = [...prevShipData];

                // Find the clicked ship and update its orientation
                const clickedShipObjTmp = updatedShipData.find(ship => ship.shipName === shipId);
                if (clickedShipObjTmp) {
                    clickedShipObjTmp.orientation = 'vertical';
                }
                return updatedShipData;
            });
        }
    };

    const handleLaunch = () => {
        // set ready to launch state to true
        setReadyToLaunch(true);
        // call function to 
        generateRandomLocation();

        // to equalize game, filter & map over npcGridRockets to return same rocket data for computer grid
        const npcGridRockets = npcRocketData.filter((npcRocket) => {
            return selectedRockets.some((removeItem) => removeItem === npcRocket.stringName);
        }).map((filteredRocket) => {
            return (
                {
                    stringName: filteredRocket.stringName,
                    spaces: filteredRocket.spaces,
                    NPCGridRef: filteredRocket.NPCGridRef,
                    attackedCells: []
                }
            )
        });
        // set npcShipData state
        setNpcShipData(npcGridRockets);
        
        
    }

    // Function to ensure 'Hit' or 'Miss' message is displayed on each Player click
    const [keyCounter, setKeyCounter] = useState(0)

        
    const handleHit = (hit) => {
        // increment keyCounter
        setKeyCounter((prevCounter) => prevCounter + 1);
        if (hit) { setHit(
            <Typewriter 
                key={`hit-${keyCounter}`}
                words={['HIT! \uD83D\uDCA5']}
                loop={1}
                typeSpeed={50}
            />)
        } else {
            setHit(
                <Typewriter
                    key={`miss-${keyCounter}`}
                    words={['MISS! Try Again.']}
                    loop={1} n 
                    typeSpeed={50}
                />)
        }
        setHitVisible(true)
    };

    const [clickedCells, setClickedCells] = useState([]);
    const [guessedCells, setGuessedCells] = useState([]);
    const [npcComparisonArray, setNpcComparisonArray] = useState([]);
    const [playerComparisonArray, setPlayerComparisonArray] = useState([]);

    

    console.log('npcComparisonArrayLength=>',npcComparisonArray);
    console.log('playerComparisonArrayLength=>',playerComparisonArray);
    console.log(clickedCells);
    
    
    // handle click for each div in grid
    const handleClick = (e) => {

        let selectedGrid = e.target;
        let targetedId = selectedGrid.id;

        setClickedCells(prevClickedCells => [...prevClickedCells, targetedId]);
        let hitOrMiss = playerTurn(targetedId, npcComparisonArray, handleHit);

        // updating and tracking the players click counts
        let remainingClicks = playerClicks - 1;

        // updating state with the remaining clicks left
        setPlayerClicks(remainingClicks);

        // conditional to check if players Turn returns a hit(true) or a miss (false). If false nothing happens.
        if (hitOrMiss[0]) {
            // Player score calculation

            // when a hit is registered subtract 1 from length
            let updatedNonPlayerFleetLength = nonPlayerFleetLength - 1;

            // variable to calculate the score on that turn
            let turnScore = playerClicks * nonPlayerFleetLength;

            // variable to combine the total score with the turn score
            let newTotalScore = playerScore + turnScore;

            // storing the newly updated total score in the state
            setPlayerScore(newTotalScore);

            // update the nonPlayerFleetLength state variable
            setNonPlayerFleetLength(updatedNonPlayerFleetLength);

            // Non Player HealthBar calculation
            let nonPlayerHealth = 100 / npcComparisonArray.length * updatedNonPlayerFleetLength;

            // updating state with the updated value 
            setNonPlayerFleetHealth(nonPlayerHealth);

            // Game End modal conditional
            handleGameEnd(hitOrMiss[1]);
        }

        setTimeout(() => {
            let computerGuess = npcTurn();
            setGuessedCells(prevGuessedCells => [...prevGuessedCells, computerGuess]);

            // conditional to check if the computers guess is present in the playerComparisonArray.
            if (playerComparisonArray.includes(computerGuess)) {
                // Non Player score calculation //

                // when a hit is registered subtract 1 from length
                let updatedPlayerFleetLength = playerFleetLength - 1;

                // variable to calculate the score on that turn
                let nonPlayerTurnScore = playerClicks * playerFleetLength;

                // variable to combine the total score with the turn score
                let newNonPlayerTotalScore = nonPlayerScore + nonPlayerTurnScore;

                // storing the newly updated total score in the state
                setNonPlayerScore(newNonPlayerTotalScore);

                // update the playerFleetLength state variable
                setPlayerFleetLength(updatedPlayerFleetLength);

                // Non Player HealthBar calculation
                let playerHealth = 100 / playerComparisonArray.length * updatedPlayerFleetLength;

                // updating state with the updated value 
                setPlayerFleetHealth(playerHealth);

                // Game End modal conditional
                handleGameEnd(hitOrMiss[1]);
            }
            setActivePlayer(true);
        }, 2500);
        handleGameEnd();
    }
    const isCellClicked = (id) => {
        return clickedCells.includes(id);
    }
    
    const isCellGuessed = (id) => {
        return guessedCells.includes(id);
    }

    // this function will run when the game is concluded i.e. playergridref array or NPCgridref array is === 0. GameStatus stated will updated to true or false
    const handleGameEnd = (hitOrMiss) => {

        if (hitOrMiss === playerComparisonArray.length) {
            setGameStatus(!false); // if player wins
            setOpenModal(!false);
        } else if
            (hitOrMiss === npcComparisonArray.length) {
                setGameStatus(false); // if player losses
                setOpenModal(!false);
            }
    };

    // function to close the modal
    const closeModal = (e) => {
        // console.log('clicked');
        setOpenModal(false);
    };


    return (
        <>
            {readyToLaunch  ? null :
                <div>
                    <p className="placement-instructions"> Drag your ships onto the grid</p>
                    <p className="placement-instructions"> Hover over the cell you want the top of your ship to be</p>
                    <p className="placement-instructions"> Left click on a rocket to deploy it in a horizontal attack position</p>
                    {rocketsPlaced ? <button className="launch" onClick={handleLaunch} >LAUNCH GAME</button> : null}
                    <button className="reset-button" onClick={handleReset} >RESET GRID</button>
                </div>
            }
            {hitVisible && <p className="hit-message">{hit}</p>}
            <div className="gridContainers">
                <div className="playerGridContainer">
                    <h2>Player Grid</h2>
                    <BattleGrid>
                        {Array.from(gridData).map((gridRow, index) => {
                            return (
                                <div key={index} id={index} className="gridRow">
                                    {Array.from(gridRow).map((gridColumn) => {
                                        const npcCellId = gridColumn.id
                                        const backgroundColor = playerComparisonArray.includes(npcCellId) ? 'red' : 'yellow'
                                        const cellGuessed = isCellGuessed(npcCellId);
                                        const cellGridColour = {
                                            background: cellGuessed ? backgroundColor: '',
                                        };
                                        const addClassName = cellGuessed ? 'targeted' : '';

                                        return (
                                            <div
                                                className={`${gridColumn.className} player ${addClassName}`}
                                                style={cellGridColour}
                                                key={gridColumn.id}
                                                id={gridColumn.id}
                                                onDragOver={handleOnDrag}
                                                onDrop={handleDrop}
                                                valuex={gridColumn.x_value}
                                                valuey={gridColumn.y_value}
                                            >
                                                <span className="sr-only">{gridColumn.id}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </BattleGrid>
                </div>
       
                <div className="nonPlayerGridContainer" style={{display: readyToLaunch ? 'block' : 'none'}} >
                    {readyToLaunch ?
                        <>  
                            <h2>Computer Grid</h2>
                            <BattleGrid>
                                {Array.from(gridData).map((gridRow, index) => {
                                    return (
                                        <div key={index} id={index} className="gridRow">
                                            {Array.from(gridRow).map((gridColumn) => {
                                                const cellId = gridColumn.id;
                                                const hitOccupiedCell = npcComparisonArray.includes(cellId) ? 'hit' : 'miss'
                                                const cellClicked = isCellClicked(cellId);
                                                const addClassName = cellClicked ? hitOccupiedCell : '';
                                                
                                                return (
                                                    <div
                                                        className={`${gridColumn.className} npcDiv ${addClassName}`}
                                                        key={gridColumn.id}
                                                        id={gridColumn.id}
                                                        onClick={
                                                            activePlayer ?
                                                                (e) => {
                                                                    handleClick(e)
                                                                    setActivePlayer(false);
                                                                } : null
                                                        }
                                                        valuex={gridColumn.x_value}
                                                        valuey={gridColumn.y_value}
                                                    >
                                                        <span className="sr-only">{gridColumn.id}</span>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )
                                })}
                            </BattleGrid>
                        </>
                        : null}
                </div> 
            </div> 
            {readyToLaunch ? <> 
                <Score 
                    playerScore={playerScore} 
                    nonPlayerScore={nonPlayerScore} 
                    playerFleetHealth={playerFleetHealth} 
                    nonPlayerFleetHealth={nonPlayerFleetHealth} />  
                <button className="back-button" onClick={handleReset}>BACK! <i className="fa-solid fa-rotate-left"></i></button>
                </>: null}
            {/* Ships */}
            <div className="shipContainer">
                {shipData.map((rocket, index) => {
                    return (
                        <div
                            tabIndex={0}
                            key={index}
                            className={rocket.shipName}
                            ref={(e) => rocketImage.current[index] = e}
                        >
                            <h3 className="spaces-title">{rocket.stringName}</h3>
                            <img src={rocket.imageSource} alt={`${rocket.stringName} rocket`} onDragStart={handleDrag} value={`${index + 1}`} name={rocket.shipName} draggable="true" onClick={handleOrientation} className="rocket-image" />
                            <p className="rocket-spaces">{rocket.spaces}</p>
                        </div>
                    )
                })}
            </div>
            <Modal 
                open={openModal} gameStatus={gameStatus} onClick={closeModal} handleReset={handleReset} />
        </>
    )
}

export default PlayerGrid;
