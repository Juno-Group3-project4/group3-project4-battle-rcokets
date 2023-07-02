import { useState, useRef, useEffect } from "react";
import shipOneImg from '../assets/falcon1-shipOne.png';
import shipTwoImg from '../assets/falcon9-shipTwo.png';
import shipThreeImg from '../assets/falconHeavy-shipThree.png';
import shipFourImg from '../assets/starShip-shipFour.png';
import NPCGrid from "./NPCGrid";
import GenerateComputerGrid from "./GenerateComputerGrid";


// PLAYER GRID Component 
const PlayerGrid = () => {

    // set rocket ship grid data
    const [shipData, setShipData] = useState([
        {
            'shipName': 'Falcon1',
            'spaces': 3,
            'orientation': 'vertical',
            'playerGridRef': [],
            'NPCGridRef': []
        },
        {
            'shipName': 'Falcon9',
            'spaces': 4,
            'orientation': 'vertical',
            'playerGridRef': [],
            'NPCGridRef': []

        },
        {
            'shipName': 'FalconHeavy',
            'spaces': 4,
            'orientation': 'vertical',
            'playerGridRef': [],
            'NPCGridRef': []
        },
        {
            'shipName': 'Starship',
            'spaces': 5,
            'orientation': 'vertical',
            'playerGridRef': [],
            'NPCGridRef': []
        },
    ]);

    // useRef to store all the grids references
    const allCellDivs = useRef([]);

    // useRef to store individual rocket divs
    const rocketImage = useRef([]);

    const newPlayerGridRef = [];

    // useEffect for finding all the grid cells and converting the nodeList into an array which then we can access the cell elements and perform operations on later using allCellsDivs.current
    useEffect(() => {
        const cells = document.querySelectorAll('.gridCell');
        allCellDivs.current = Array.from(cells);
    }, []);


    // set current rocket that user is dragging
    const [currentShip, setCurrentShip] = useState('');

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
        // Reset ShipData state
        setShipData(updatedShipData);
        
    }

    // event listener for placing ship on grid
    const handleDrop = (e) => {

        // Spread of shipData useState 
        const shipDataArr = [...shipData];

        // Store in a new State 
        // setCurrentShip(shipDataArr);
        console.log('shipDataArr', shipDataArr)

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
            shipData.map((ship) => {
                if (ship.shipName === currentShip) {
                    let currentCell = e.target;
                    let x = Number(currentCell.getAttribute('valuex'));

                    for (let j = 0; j < ship.spaces; j++) {
                        if (x - 1 + ship.spaces > 10) {
                            alert("Oops! Make sure to place the rocket inside of the space grid!");
                            return;
                        } else {                    
                                // Add the grid reference to the shipData array
                                ship.playerGridRef.push(currentCell.attributes.id.textContent);
                                // change the colour of the cells
                                currentCell.style.backgroundColor = "blue";
                                // Move to the next sibling cell
                                currentCell = currentCell.nextElementSibling;
                                // Remove Rocket from display
                                removeRocket();
                        }    
                    }
                }
            });
        } else {
            // VERTICAL LOGIC
            shipData.map((ship) => {
                if (ship.shipName === currentShip) {
                    let currentCell = e.target;
    
                    let y = Number(currentCell.getAttribute('valuey'));

                    for (let j = 0; j < ship.spaces; j++) {
                        if (y - 1 + ship.spaces > 10) {
                            alert("Oops! Make sure to place the rocket inside of the space grid!");
                            return;
                        } else {
                            // Find valueX and store in a variable
                            let currentCellValueX = currentCell.attributes.valuex.textContent;// finds the x value of the click and store in a temp variable (x = 6) This is constant when in vertical mode


                            // find the valueY of the currentCell and add 1 to target the next column over
                            let currentCellValueY = Number(currentCell.attributes.valuey.textContent) + 1;
                            
                            // create a temporary Array that stores all the divs that have the matching valueY as the currentCell
                            // allCellDivs.current is the array the stores all the references to the grid divs. value is the individual div while the getAttribute method retrieves the valuex attribute for the div and stores that in a variable.
                            // we return into tempNextCol an array of all the divs that have a matching valuex attribute by using the valuexAttr variable and checking if its undefined or has a value. If it has a value then check if it matches what is stored in the currentCellValueX variable.
                            let tempNextCol = allCellDivs.current.filter((value) => {
                                const valuexAttr = value.getAttribute('valuex');
                                return valuexAttr && currentCellValueX.includes(valuexAttr);
                            });
                            // Add the grid reference to the shipData array
                            ship.playerGridRef.push(currentCell.attributes.id.textContent);

                            // change the colour of the currentCell
                            currentCell.style.backgroundColor = "blue";

                            // iterate through the temporary array and if it finds valuey that matches the currentCells valueX then store that div as the new currentCell
                            tempNextCol.map((col) => {
                                if (col.attributes.valuey.textContent.includes(currentCellValueY)) {
                                    currentCell = col;
                                }
                                // looks at all the divs stored in tempNextCol array and if it finds one that has the valuex that matches the currentCellValueX then store that div(cell) as the new currentCell
                                // Then the code will loop through again using the new cell reference pushing it to the playerGridRef array - loops through 4 times 
                            });
                            removeRocket();
                        }
                    } // end of for loop
                }
            })
        }

        // Push all PlayerGridRefs to one large array (newPlayerGridRef)

        for (let key in shipData) {
            const newArray = shipData[key].playerGridRef
            newArray.map((array) => {
                newPlayerGridRef.push(array);
            })
        }

        // ERROR HANDLING to check for duplicates in Array (i.e. user places rocket on a grid where another rocket exists)
        let duplicates = newPlayerGridRef.filter((item, index) => newPlayerGridRef.indexOf(item) !==index) 

        // Array for storing cells which aren't located in the newPlayerGridref, but are also part of the the placement with one or more duplicate values
        let discardedData = [];
        for (let item in clickedShipObjTmp.playerGridRef) {
            if (!duplicates.includes(clickedShipObjTmp.playerGridRef[item])) {
                // Add the non-duplicate value to a new array
                discardedData.push(clickedShipObjTmp.playerGridRef[item]);
            }
        }

        // If cell grid is located both within the discarded Data array and duplicates array, run an alert message for user - then put Rocket back in display and clear its playerGridRef array
        if (duplicates.length > 0 && discardedData.length > 0) {
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
        console.log("newPlayerGridRef", newPlayerGridRef);
        console.log("duplicates", duplicates);
        console.log("discardedData", discardedData);

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


    return (
        <>
            <h1>Player Grid</h1>
            <p className="placement-instructions">Drag your ships onto the grid</p>
            <p className="placement-instructions">Hover over the cell you want the top of your ship to be</p>
            <p className="placement-instructions">Left click on a rocket to deploy it in a horizontal attack position</p>
            <button className="reset-button" onClick={handleReset} >RESET GRID</button>

    
            <NPCGrid
                handleOnDrag={handleOnDrag}
                handleDrop={handleDrop}
            />

            <GenerateComputerGrid />

            {/* Ships */}
            <div className="shipContainer">
                <div className="Falcon1" ref={(e) => rocketImage.current[0] = e}>
                    <h3 className="spaces-title">Three Spaces</h3>
                    <img src={shipOneImg} alt="" onDragStart={handleDrag} value="1" name={shipData[0].shipName} draggable="true" onClick={handleOrientation} className="rocket-image" />
                </div>
                <div className="Falcon9" ref={(e) => rocketImage.current[1] = e}>
                    <h3 className="spaces-title">Four Spaces</h3>
                    <img src={shipTwoImg} alt="" onDragStart={handleDrag} value="2" name={shipData[1].shipName} draggable="true" onClick={handleOrientation} className="rocket-image" />
                </div>
                <div className="FalconHeavy" ref={(e) => rocketImage.current[2] = e}>
                    <h3 className="spaces-title">Four Spaces</h3>
                    <img src={shipThreeImg} alt="" onDragStart={handleDrag} value="3" name={shipData[2].shipName} draggable="true" onClick={handleOrientation} className="rocket-image" />
                </div>
                <div className="Starship" ref={(e) => rocketImage.current[3] = e}>
                    <h3 className="spaces-title">Five Spaces</h3>
                    <img src={shipFourImg} alt="" onDragStart={handleDrag} value="4" name={shipData[3].shipName} draggable="true" onClick={handleOrientation} className="rocket-image" />
                </div>

            </div>
        </>

    )
}

export default PlayerGrid;