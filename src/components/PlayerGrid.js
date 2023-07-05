import { useState, useRef, useEffect } from "react";
import BattleGrid from "./BattleGrid";
import shipDataArray from "./shipDataArray";
import GenerateComputerGrid from "./GenerateComputerGrid";
import Score from "./Score";
import playerTurn from "./playerTurn";
import npcTurn from "./npcTurn";
import { playerGridDivRef, addToPlayerGridDivRef } from "./playerGridUtils";


// PLAYER GRID Component 
const PlayerGrid = ({ selectedRockets }) => {

    // STATEFUL VARIABLES:
    // set rocket ship grid data
    const [shipData, setShipData] = useState([]);
    // set current rocket that user is dragging
    const [currentShip, setCurrentShip] = useState('');
    // array of player's grid refs to be passed as props to GenerateComputerGrid
    const [rocketRefs, setRocketRefs] = useState([]);
    // new player grid div ref
    // const [playerGridDivRef, setPlayerGridDivRef] = useState([]);
    const playerGridDivRef = useRef([]);
    console.log('playerGridDivRef-->', playerGridDivRef.current.length );

    // useState to determine if all rockets have been placed on grid
    const [rocketsPlaced, setRocketsPlaced] = useState(false);
    // useState to launch game (Non player grid will be displayed)
    const [readyToLaunch, setReadyToLaunch] = useState(false);

    const [toggleDisplay, setToggleDisplay] = useState(false);

    // MUTABLE (useRef) VARIABLES:
    // store all the grids references
    const allCellDivs = useRef([]);
    // store individual rocket divs
    const rocketImage = useRef([]);
    
    // DEFINED GLOBAL VARIABLES:
    // store all player's grid references into one consolidated array
    const newPlayerGridRef = [];

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
                playerGridRef: filteredShip.playerGridRef
            }
        )
    }) // used rocketsToDisplay array (regular variable) in jsx to return images onto dom

    // filter sizes of each user selected rocket to pass as props to GenerateComputerGrid, so player & NPC have same number of targets
    const userRocketSizes = [];
    rocketsToDisplay.filter((rocket) => {
        userRocketSizes.push(rocket.spaces);
        return userRocketSizes;
    });
    
    // useEffect for finding all the grid cells and converting the nodeList into an array which then we can access the cell elements and perform operations on later using allCellsDivs.current
    useEffect(() => {
        const cells = document.querySelectorAll('.gridCell');
        allCellDivs.current = Array.from(cells);
    }, []);

    useEffect(() => {
        // update shipData with rocket data of user selected rockets only
        setShipData(rocketsToDisplay);
    }, []); // read u can use >1 useEffect in same component
    // terminal says: React Hook useEffect has a missing dependency: 'rocketsToDisplay'. Either include it or remove the dependency array

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
        // Target Ship Divs using useRef Hook
        const ships = rocketImage.current;
        // When user clicks reset grid button, we map through shipData and reset all the data in the shipData array
        const updatedShipData = shipData.map((ship) => ({
            ...ship,
            playerGridRef:[],
            orientation: "vertical"
        }));
        // For each selection that has been placed on the grid, wipe the Array reset colours and put image back on webpage - if image was placed horizontally, includes a conditional statement to ensure image was reset vertically
        ships.forEach((ship) => {
            ship.style.display = 'flex';
            if (ship.children[1].style.transform === 'rotate(90deg)') {
                return ship.children[1].style.transform = 'rotate(0)'
            }
        })
        allCellDivs.current.forEach((cell) => {
            cell.style.backgroundColor = '#002C2E';
        })
        // Reset shipData state
        setShipData(updatedShipData);
        setRocketsPlaced(false);
        setReadyToLaunch(false);
        
    }

    // event listener for placing ship on grid
    const handleDrop = (e) => {
        playerGridDivRef.length = 0;

        // Spread of shipData useState 
        const shipDataArr = [...shipData];

        // Store in a new State 
        // setCurrentShip(shipDataArr);

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

                            // change the colour of the currentCell
                            currentCell.style.backgroundColor = "blue";
                            playerGridDivRef.current.push(currentCell);
                            console.log(currentCell);
                            // setPlayerGridDivRef((prevArray) => [...prevArray, currentCell]);

                            // const tempArray = [];
                            // tempArray.push(currentCell);

                            // for (let i = 0; i < tempArray.length; i++) {
                            //     (tempArray[i]);
                            // }

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

        console.log(playerGridDivRef);
        
        // Push all PlayerGridRefs to one large array (newPlayerGridRef)
        for (let key in shipData) {
            const newArray = shipData[key].playerGridRef;
            newArray.map((array) => {
                newPlayerGridRef.push(array);
            })
        }

        // ERROR HANDLING to check for duplicates in Array (i.e. user places rocket on a grid where another rocket exists)
        let duplicates = newPlayerGridRef.filter((item, index) => newPlayerGridRef.indexOf(item) !==index);
        
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
        setRocketRefs(newPlayerGridRef);
        console.log(newPlayerGridRef);

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

        if (clickShip.style.transform !== 'rotate(90deg)') {
            clickShip.style.transform = 'rotate(90deg)';

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
        setReadyToLaunch(true);
    }

    // handle click for each div in grid
    const handleClick = (e) => {
        let selectedGrid = e.target;
        console.log(selectedGrid);

        playerTurn(selectedGrid, playerGridDivRef);

    }

    return (
        <>
            {readyToLaunch ? null :
                <div>
                    <p className="placement-instructions"> Drag your ships onto the grid</p>
                    <p className="placement-instructions"> Hover over the cell you want the top of your ship to be</p>
                    <p className="placement-instructions"> Left click on a rocket to deploy it in a horizontal attack position</p>
                    {rocketsPlaced ? <button className="launch" onClick={handleLaunch} >LAUNCH GAME</button> : null}
                    <button className="reset-button" onClick={handleReset} >RESET GRID</button>
                </div>
            }

            <div className="gridContainers">
                <div className="playerGridContainer">
                    <h2>Player Grid</h2>
                    <BattleGrid
                        handleOnDrag={handleOnDrag}
                        handleDrop={handleDrop}
                    />
                </div>
                
                <div className="nonPlayerGridContainer" style={{display: readyToLaunch ? 'block' : 'none'}} >
                    {readyToLaunch ?
                        <>
                            <h2>Computer Grid</h2>
                            <GenerateComputerGrid 
                                handleClick={handleClick}
                                userRocketSizes={userRocketSizes}
                                rocketRefs={rocketRefs}
                            />
                        </>
                        : null}
                </div> 
            </div> 
            {readyToLaunch ? <> 
                <Score playerOneFleetLength={playerGridDivRef.current.length} />  
                <button className="back-button" onClick={handleReset}>BACK! <i className="fa-solid fa-rotate-left"></i></button>
                </>: null}
            {/* Ships */}
            <div className="shipContainer">
                {rocketsToDisplay.map((rocket, index) => {
                    return (
                        <div
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
        </>
    )
}

export default PlayerGrid;