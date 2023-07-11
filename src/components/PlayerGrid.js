// PlayerGrid.js
import { useState, useRef, useEffect } from "react";
import BattleGrid from "./BattleGrid";
import Score from "./Score";
import Modal from "./Modal";
import shipDataArray from "./shipDataArray";
import gridData from "./gridData";
import playerTurn from "./playerTurn";
import { npcTurn } from "./npcTurn";
import { Typewriter } from "react-simple-typewriter";
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
    // store all computer's rocket grid references 
    const [npcComparisonArray, setNpcComparisonArray] = useState([]);
    // store all player's rocket grid references 
    const [playerComparisonArray, setPlayerComparisonArray] = useState([]);
    // store cell id values as they are clicked
    const [clickedCells, setClickedCells] = useState([]);
    // store grid reference values as generated by computer player
    const [guessedCells, setGuessedCells] = useState([]);
    // state to determine players' turn
    const [activePlayer, setActivePlayer] = useState(true);
    // usState to manage open/close Modal based on Game status
    const [openModal, setOpenModal] = useState(false);
    // useState to track game progress. State will update to "win" or "lose"
    const [gameStatus, setGameStatus] = useState(false);
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

    // useEffect for finding all grid cells & storing into an array
    useEffect(() => {
        const cells = document.querySelectorAll('.gridCell.div');
        allCellDivs.current = Array.from(cells);
    }, []);

    // useEffect to filter & map over shipDataArray to return only data for rockets selected by user
    useEffect(() => {
        const displayPlayerRockets = () => {
            // return array of data for rockets selected by user only
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
        // call function to display rockets to drag & drop
        displayPlayerRockets();
    }, [selectedRockets]);

    // useEffect to update grid reference comparison arrays for game & score logic
    useEffect(() => {
        // make shallow copy of npcShipData
        const copyNpcShipData = [...npcShipData];
        // variable to store NPC's ship locations only
        const newNPCGridRef = [];

        // map over shallow copy to return ship locations for each NPC's rocket
        const mappedCopyNpcShipData = copyNpcShipData.map((npcShip) => {
            return npcShip.NPCGridRef;
        })

        // for loop to push each grid location into one array
        for (let i = 0; i < mappedCopyNpcShipData.length; i++) {
            for (let j = 0; j < mappedCopyNpcShipData[i].length; j++) {
                // push each grid reference item into defined array
                newNPCGridRef.push(mappedCopyNpcShipData[i][j]);
            }
        }

        // make shallow copy of shipData
        const copyShipData = [...shipData];
        // variable to store player's ships locations only
        const newPlayerGridRef = [];

        // map over shallow copy to return ship locations for each player's rocket
        const mappedCopyShipData = copyShipData.map((playerShip) => {
            return playerShip.playerGridRef;
        })

        // for loop to push each grid location into one array
        for (let i = 0; i < mappedCopyShipData.length; i++) {
            for (let j = 0; j < mappedCopyShipData[i].length; j++) {
                // push each grid reference item into defined array
                newPlayerGridRef.push(mappedCopyShipData[i][j]);
            }
        }

        // set states for variables to be used in game & score logic
        setNpcComparisonArray(newNPCGridRef);
        setPlayerComparisonArray(newPlayerGridRef);
        setNonPlayerFleetLength(newNPCGridRef.length);
        setPlayerFleetLength(newPlayerGridRef.length);

    }, [npcShipData, shipData]);

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
        // For each rocket selection placed on grid wipe the grid ref arrays, reset orientation to vertical and put images back on webpage
        ships.forEach((ship) => {
            ship.style.display = 'flex';
            if (ship.children[1].style.transform === 'rotate(-90deg)') {
                return ship.children[1].style.transform = 'rotate(0)'
            }

        })

        // Ensure all cells are back to original grid colour 
        allCellDivs.current.forEach((cell) => {
            cell.style.backgroundColor = '#002C2E';
        });

        // Reset all States
        setShipData(initialShipData);
        setNpcShipData(updatedNPCShipData);
        setCurrentShip('');
        setRocketsPlaced(false);
        setReadyToLaunch(false);
        setOpenModal(false);
        setGameStatus(false);
        setHit('');
        setHitVisible(false);
        setActivePlayer(true);
        setClickedCells([]);
        setNpcComparisonArray([]);
        setGuessedCells([]);
        setPlayerComparisonArray([]);
        setPlayerClicks(100);
        setPlayerScore(0);
        setNonPlayerScore(0);
        setNonPlayerFleetLength(0);
        setPlayerFleetLength(0);
        setPlayerFleetHealth(100);
        setNonPlayerFleetHealth(100);
    }

    // event listener for placing (droppig) ship on grid
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
                            let currentCellValueX = currentCell.attributes.valuex.textContent;

                            // find valueY of currentCell & add 1 to target the next column over
                            let currentCellValueY = Number(currentCell.attributes.valuey.textContent) + 1;

                            let tempNextCol = allCellDivs.current.filter((value) => {
                                const valuexAttr = value.getAttribute('valuex');
                                return valuexAttr && currentCellValueX.includes(valuexAttr);
                            });

                            // Add the grid reference to the shipData array
                            shipData[i].playerGridRef.push(currentCell.attributes.id.textContent);

                            // change the colour of the currentCell
                            currentCell.style.backgroundColor = "blue";

                            // push currentCell to player grid ref array
                            playerGridDivRef.current.push(currentCell);

                            // iterate through the temporary array and if it finds valuey that matches the currentCells valueX then store that div as the new currentCell
                            for (let i = 0; i < tempNextCol.length; i++) {
                                if (tempNextCol[i].attributes.valuey.textContent.includes(currentCellValueY)) {
                                    currentCell = tempNextCol[i];
                                }
                            };
                            // Remove Rocket from display
                            removeRocket();
                        }
                    } // end of for loop
                }
            }
        }

        // Push all PlayerGridRefs to one large array (newPlayerGridRef) for error handling logic
        for (let key in shipData) {
            const newArray = shipData[key].playerGridRef;
            newArray.map((array) => {
                return newPlayerGridRef.push(array);
            })
        }

        // ERROR HANDLING to check for duplicates in Array (i.e. user places rocket on a grid where another rocket exists)
        let duplicates = newPlayerGridRef.filter((item, index) => newPlayerGridRef.indexOf(item) !== index);

        let gridDuplicates = playerGridDivRef.current.filter((item, index) => playerGridDivRef.current.indexOf(item) !== index)

        let discardedGrid = [];
        for (let item of playerGridDivRef.current) {
            if (!gridDuplicates.includes(item) && clickedShipObjTmp.playerGridRef.includes(item.id)) {
                discardedGrid.push(item);
            }
        }

        if ((gridDuplicates.length > 0 && discardedGrid.length > 0) || gridDuplicates.length > 0) {
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
        // Reset duplicates array
        duplicates = [];
        discardedData = [];
    };

    // event listener to drag ship to grid
    const handleDrag = (e) => {
        setCurrentShip(e.target.attributes.name.textContent)
    };

    // event listener for handling onDrag
    const handleOnDrag = (e) => {
        e.preventDefault();
    };

    // event listener for handling orientation for rocket
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

    // function to start game
    const handleLaunch = () => {
        // set ready to launch state to true
        setReadyToLaunch(true);
        // call function to place rockets for computer grid
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

    // function to handle messaging during game
    const handleHit = (hit) => {
        // increment keyCounter
        setKeyCounter((prevCounter) => prevCounter + 1);
        if (hit) {
            setHit(
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
        setHitVisible(true);
    };


    // handle click for each div in grid
    const handleClick = (e) => {
        // store selected grid in variable
        let selectedGrid = e.target;
        let targetedId = selectedGrid.id;

        // adds each clicked grid cell reference to state
        setClickedCells(prevClickedCells => [...prevClickedCells, targetedId]);

        // call playerTurn function
        let hitOrMiss = playerTurn(targetedId, npcComparisonArray, handleHit);

        // updating and tracking the players click counts
        let remainingClicks = playerClicks - 1;

        // updating state with the remaining clicks left
        setPlayerClicks(remainingClicks);

        // conditional to check if players Turn returns a hit(true) or a miss (false). If false nothing happens.
        if (hitOrMiss[0]) {
            // Player score calculation:

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

        // logic for computer's turn
        setTimeout(() => {
            // store random grid value in a variable
            let computerGuess = npcTurn();

            // store each guessed value as generated by computer's guessing logic into state
            setGuessedCells(prevGuessedCells => [...prevGuessedCells, computerGuess]);

            // conditional to check if the computers guess is present in the playerComparisonArray
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
            // set player active state to true after computer's turn
            setActivePlayer(true);
        }, 2500);
        // call function to check if game has ended
        handleGameEnd();
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

    // function to track which grid cells have been clicked
    const isCellClicked = (id) => {
        return clickedCells.includes(id);
    }

    // function to track all computer guesses
    const isCellGuessed = (id) => {
        return guessedCells.includes(id);
    }

    // function to close the modal
    const closeModal = (e) => {
        setOpenModal(false);
    };

    return (
        <> {openModal ? (
            <Modal
                open={openModal}
                gameStatus={gameStatus}
                onClick={closeModal}
                handleReset={handleReset}
                playerTotalScore={playerScore}
            />
        ) : (
            <>
                {readyToLaunch ? null : (
                    <div>
                        <p className="placement-instructions"> Drag your ships onto the grid</p>
                        <p className="placement-instructions"> Hover over the cell you want the top of your ship to be</p>
                        <p className="placement-instructions"> Left click on a rocket to deploy it in a horizontal attack position</p>
                        {rocketsPlaced ? (
                            <button className="launch" onClick={handleLaunch} >LAUNCH GAME</button>
                        ) : null}
                        <button className="reset-button" onClick={handleReset} >RESET GRID</button>
                    </div>
                )}
                {hitVisible && <p className="hit-message">{hit}</p>}
                {readyToLaunch ? <p className='nextTurn'>{activePlayer ? 'Player' : 'Computer'}'s Turn</p> : null}
            <div className="gridContainers">
                <div className="playerGridContainer">
                    <h2>Player Grid</h2>
                    <BattleGrid>
                        {Array.from(gridData).map((gridRow, index) => {
                            return (
                                <div key={index} id={index} className="gridRow">
                                    {Array.from(gridRow).map((gridColumn) => {
                                        const npcCellId = gridColumn.id
                                        const backgroundColor = playerComparisonArray.includes(npcCellId) ? 'red' : 'yellow';
                                        const cellGuessed = isCellGuessed(npcCellId);
                                        const cellGridColour = {
                                            background: cellGuessed ? backgroundColor : '',
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
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </BattleGrid>
                </div>
                <div className="nonPlayerGridContainer" style={{ display: readyToLaunch ? 'block' : 'none' }} >
                    {readyToLaunch ? (
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
                                                    >
                                                        <span className="sr-only">{gridColumn.id}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </BattleGrid>
                        </>
                    ) : null}
                </div>
            </div>
            {readyToLaunch ? (
                <>
                    <Score
                        playerScore={playerScore}
                        nonPlayerScore={nonPlayerScore}
                        playerFleetHealth={playerFleetHealth}
                        nonPlayerFleetHealth={nonPlayerFleetHealth} />
                    <button className="back-button" onClick={handleReset}>BACK! <i className="fa-solid fa-rotate-left"></i></button>
                </>
            ) : null}
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
                    );
                })}
            </div>
        </>
    )
}
    </>
);

}

export default PlayerGrid;
