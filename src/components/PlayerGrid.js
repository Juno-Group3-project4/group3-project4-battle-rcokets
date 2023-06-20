import { useState } from "react";
import shipOneImg from '../assets/spaceX_rocket_4.png';
import shipTwo from '../assets/spaceX_rocket_3.png';
import NPCGrid from "./NPCGrid";

// PLAYER GRID Component 
    const PlayerGrid = () => {
        
        // set rocket ship grid data
        const [shipData, setShipData] = useState([
            {
                'shipName': 'shipOne',
                'spaces': 4,
                'orientation': 'vertical',
                'gridRef': []
            }
        ]
        );

        // set current ship that user is dragging
        const [currentShip, setCurrentShip] = useState(null);

        // event listener for placing ship on grid
        const handleDrop = (e) => {
            // e.target.style.border = "1px solid #000";
            // 1) storing the dropped Value in a variable
            const droppedValueX = Number(e.target.attributes.valuex.textContent); // X coordinate
            const droppedValueY = Number(e.target.attributes.valuey.textContent); // Y coordinate

            console.log('drop X = :', droppedValueX, 'drop y = :', droppedValueY);
            console.log(e.target);

            // 4a) calculate the cell range of the ship based off the dropped value and ship spaces and orientation
            console.log('currentShip', currentShip); // shipOne
            console.log('spaces = ', currentShip);

            shipData.map((ship) => {
                if (ship.shipName === currentShip) {
                    console.log("true");
                    console.log(ship.spaces);
                    let currentCell = e.target;
                    for (let j = 0; j < ship.spaces; j++) {
                        if (currentCell) {
                            // Add the grid reference to the shipData array
                            ship.gridRef.push(currentCell.attributes.id.textContent);
                            // change the colour of the cells
                            currentCell.style.backgroundColor = "blue";
                            // Move to the next sibling cell
                            currentCell = currentCell.nextElementSibling;
                        }
                    }
                }
            });

            console.log(shipData[0].gridRef);
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
            if(clickShip.style.transform !== 'rotate(90deg)') {
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
                    const updatedShipData = [...prevShipData];
                    const clickShip = updatedShipData[0];
                    clickShip.orientation = 'vertical';
                    return updatedShipData;
                })
            }
        }

    return (
        <>
            <h1>Player Grid</h1>

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