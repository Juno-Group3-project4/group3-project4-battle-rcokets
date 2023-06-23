import { useState, useRef, useEffect } from "react";
import shipOneImg from '../assets/spaceX_rocket_4.png';
// import shipTwo from '../assets/spaceX_rocket_3.png';
import NPCGrid from "./NPCGrid";

// PLAYER GRID Component 
const PlayerGrid = () => {

    // set rocket ship grid data
    const [shipData, setShipData] = useState([
        {
            'shipName': 'shipOne',
            'spaces': 2,
            'orientation': 'vertical',
            'playerGridRef': [],
            'NPCGridRef': []
        },
        {
            'shipName': 'shipTwo',
            'spaces': 3,
            'orientation': 'vertical',
            'playerGridRef': [],
            'NPCGridRef': []
        },
        {
            'shipName': 'shipThree',
            'spaces': 4,
            'orientation': 'vertical',
            'playerGridRef': [],
            'NPCGridRef': []
        },
        {
            'shipName': 'shipFour',
            'spaces': 5,
            'orientation': 'vertical',
            'playerGridRef': [],
            'NPCGridRef': []
        },

    ]
    );

    // useRef to store all the grids references
    const allCellDivs = useRef([]);

    // useEffect for finding all the grid cells and converting the nodeList into an array which then we can access the cell elements and perform operations on later using allCellsDivs.current
    useEffect(() => {
        const cells = document.querySelectorAll('.gridCell');
        allCellDivs.current = Array.from(cells);
    }, []);
    console.log( 'allCellDivs', allCellDivs.current );


    // set current ship that user is dragging
    const [currentShip, setCurrentShip] = useState('');

    // event listener for placing ship on grid
    const handleDrop = (e) => {
        // 1) storing the dropped Value in a variable
        const droppedValueX = Number(e.target.attributes.valuex.textContent); // X coordinate
        const droppedValueY = Number(e.target.attributes.valuey.textContent); // Y coordinate

        // console.log('drop X = :', droppedValueX, 'drop y = :', droppedValueY);
        // console.log(e.target);

        // 4a) calculate the cell range of the ship based off the dropped value and ship spaces and orientation
        // console.log('currentShip', currentShip); // shipOne
        // console.log('spaces = ', currentShip);

        if (shipData[0].orientation === 'vertical') {

            shipData.map((ship) => {
                if (ship.shipName === currentShip) {
                    // console.log("true");
                    // console.log(ship.spaces);
                    let currentCell = e.target;
                    for (let j = 0; j < ship.spaces; j++) {
                        if (currentCell) {
                            // Add the grid reference to the shipData array
                            ship.playerGridRef.push(currentCell.attributes.id.textContent);
                            // change the colour of the cells
                            currentCell.style.backgroundColor = "blue";
                            // Move to the next sibling cell
                            currentCell = currentCell.nextElementSibling;
                        }
                    }
                }
            });
        } else {
            console.log('horizontal');
            shipData.map((ship) => {
                if (ship.shipName === currentShip) {
                    let currentCell = e.target;

                    // Find valueY and store in a variable
                    let currentCellValueY = currentCell.attributes.valuey.textContent;// finds the y value of the click and store in a temp variable (y = 6) This is constant when in horizontal mode
                    console.log('currentCellValueY', currentCellValueY);

                    // find the valueX of the currentCell and add 1 to target the next column over
                    let currentCellValueX = Number(currentCell.attributes.valuex.textContent) + 1;// finds th x value of the click and adds 1 tot eh value and stores in a temp variable (x = 4 + 1 = 5). This helps to target the cell to the right since E would have an valuex of 5
                    console.log("currentCellValueX", currentCellValueX);

                    // create a temporary Array that stores all the divs that have the matching valueY as the currentCell
                    // allCellDivs.current is the array the stores all the references to the grid divs. value is the individual div while the getAttribute method retrieves the valuey attribute for the div and stores that in a variable.
                    // we return into tempNextCol an array of all the divs that have a matching valuey attribute by using the valueyAttr variable and checking if its undefined or has a value. If it has a value then check if it matches what is stored in the currentCellValueY variable.
                    let tempNextCol = allCellDivs.current.filter((value)=>{
                        const valueyAttr = value.getAttribute('valuey');
                        return valueyAttr && currentCellValueY.includes(valueyAttr);
                    });
                    console.log('tempNextCol', tempNextCol);

                    // for each ship space store the PlayerGridRef in an array
                    for (let j = 0; j < ship.spaces; j++) {
                        if (currentCell) {
                            // Add the grid reference to the shipData array
                            ship.playerGridRef.push(currentCell.attributes.id.textContent);

                            console.log('currentCell', currentCell);
                            // change the colour of the currentCell
                            currentCell.style.backgroundColor = "blue";
                            
                        
                            // iterate through the temporary array and if it finds valuex that matches the currentCells valueX then store that div as the new currentCell
                            tempNextCol.map((col) => {
                                if (col.attributes.valuex.textContent.includes(currentCellValueX)) {
                                    currentCell = col;
                                }
                                // looks at all the divs stored in tempNextCol array and if it finds one that has the valuex that matches the currentCellValueX then store that div(cell) as the new currentCell
                                // Then the code will loop through again using the new cell reference pushing it to the playerGridRef array - loops through 4 times 
                            });
                        }
                    } // end of for loop
                }
            })

        }


        console.log(shipData[0].playerGridRef);
    };

    // event listener to drag ship to grid
    const handleDrag = (e) => {
        setCurrentShip(e.target.attributes.name.textContent) // ShipName (ShipOne)
        
    };

    // event listener for handling onDrag
    const handleOnDrag = (e) => {
        e.preventDefault();
    };

    // event listener to change ship orientation
    const handleOrientation = (e) => {
        const clickShip = e.target;
        console.log('clicked')
        if (clickShip.style.transform !== 'rotate(90deg)') {
            clickShip.style.transform = 'rotate(90deg)';
            setShipData(prevShipData => {
                const updatedShipData = [...prevShipData];
                const clickShip = updatedShipData[0];
                clickShip.orientation = 'horizontal';
                return updatedShipData;
            })

        } else {
            clickShip.style.transform = 'rotate(0)';
            setShipData(prevShipData => {
                // Create a copy of the shipData array
                const updatedShipData = [...prevShipData];
                // Access the "shipOne" object
                const clickShip = updatedShipData[0];
                // Update the orientation property
                clickShip.orientation = 'vertical';
                // Return the updated shipData array
                return updatedShipData;
            })
        }
    }

    return (
        <>
            <h1>Player Grid</h1>
            <p>Drag your ships onto the grid</p>
            <p>Hover over the cell you want the top of your ship to be</p>


            <NPCGrid
                handleOnDrag={handleOnDrag}
                handleDrop={handleDrop}
            />

            {/* Ships */}
            <div className="shipOne">
                <img src={shipOneImg} alt="" onDragStart={handleDrag} value="4" name={shipData[0].shipName} draggable="true" onClick={handleOrientation} />
            </div>
        </>

    )
}

export default PlayerGrid;