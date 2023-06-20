// GET ROCKET Component
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import shipOneImg from '../assets/spaceX_rocket_4.png';
// import shipTwo from '../assets/spaceX_rocket_3.png';

import NPCGrid from './NPCGrid.js';


const GetRocket = () => {

    const [rockets, GetRockets] = useState([]);
    useEffect(() => {
        axios({
            url: 'https://api.spacexdata.com/v4/rockets',
            method: 'GET',
            dataResponse: 'json'
        }).then((response) => {
            // console.log(response.data);
            GetRockets(response.data)
        })
    }, []);

    // Map through the Rocket API array stored in rockets state and display on the screen for user to select. 

   return (
        <div className="wrapper">
            <h2>Select up to 3 rockets!</h2>
            <form>
               <ul className="flexContainer">
                {rockets.map((rocket) => {
                    return (
                            <li className="rocketContainer" key={rocket.id}>
                                <input type="checkbox" id={`${rocket.id}`} name={rocket.name} value={rocket.name}></input>
                                <label htmlFor={`${rocket.id}`}>
                                    <img src={rocket.flickr_images} alt={`an image of ${rocket.name}`} />
                                    <div className="descriptionContainer">
                                        <h3>{rocket.name}</h3>
                                        <p className="description">{rocket.description}</p>
                                    </div>
                                    {/* <p>{`Boosters: ${rocket.boosters}`}</p> */}
                                    {/* <p>{`Height: ${rocket.height.meters} meters, ${rocket.height.feet} feet`}</p>
                                    <p>{`Engine: Number: ${rocket.engines.number}, type: ${rocket.engines.type}, version: ${rocket.engines.version}`}</p> */}
                                </label>
                            </li>
                    )
                })}
               </ul>
               <Link to="/play">
                   <button>START!</button>
               </Link> 
            </form>
        </div>

    // need to create a handle Submit function and pass it to the form element <form onSubmit={handleSubmit}
    //     const handleSubmit = (event) => {
    //     event.preventDefault();
    //      error handling if someone doesn't check a max of 3 rockets
    // }
        
    // Create another state and store users selected rockets in state. 
    // Game will start following submission and will take to player grid component?

   )
      


    // Temp PlayerGrid Code
    // all cells that have the class name 'cell'
    // const cells = document.querySelectorAll('.cell');

    // const [shipData, setShipOne] = useState([
    //     {
    //         'shipName': 'shipOne',
    //         'spaces': 4,
    //         'orientation': 'vertical',
    //         'gridRef': []
    //     }
    // ]
    // );

    // const [currentShip, setCurrentShip] = useState(null);

    // const handleDrop = (e) => {

    //     // e.target.style.border = "1px solid #000";

    //     // 1) storing the dropped Value in a variable

    //     const droppedValueX = Number(e.target.attributes.valuex.textContent); // X coordinate
    //     const droppedValueY = Number(e.target.attributes.valuey.textContent); // Y coordinate

    //     console.log('drop X = :', droppedValueX, 'drop y = :', droppedValueY);
    //     console.log(e.target);

    //     // 4a) calculate the cell range of the ship based off the dropped value and ship spaces and orientation
    //     console.log('currentShip', currentShip); // shipOne
    //     console.log('spaces = ', currentShip);

    //     shipData.map((ship) => {
    //         if (ship.shipName === currentShip) {
    //             console.log("true");
    //             console.log(ship.spaces);

    //             let currentCell = e.target;
    //             for (let j = 0; j < ship.spaces; j++) {
    //                 if (currentCell) {
    //                     // Add the grid reference to the shipData array
    //                     ship.gridRef.push(currentCell.attributes.id.textContent);

    //                     // change the colour of the cells
    //                     currentCell.style.backgroundColor="blue";

    //                     // Move to the next sibling cell
    //                     currentCell = currentCell.nextElementSibling;
    //                 }
    //             }
    //         }
    //     });
    //     console.log( shipData[0].gridRef );
    // };

    
    
    // const handleDrag = (e) => {
    //     // 2) How many spaces does this ship take up?
    //     // console.log('spaces: ', Number(e.target.attributes.value.textContent)); // 4

        // 3) What orientation is the ship when dropped?
        // console.log('orientation: ', shipOne.orientation); // vertical or horizontal
    //     setCurrentShip(e.target.attributes.name.textContent) // ShipName (ShipOne)
    // };
    
    // // const handleDrop = (e) => {
    // //     e.preventDefault();
    // //     console.log('handleDrop =', e.target);
        
    // // };

    // const handleOnDrag = (e) => {
    //     e.preventDefault();
    // };



    // return (
    //     <>
    //         <form action="GET">
    //             <label htmlFor="rocket">SELECT UP TO 4 ROCKETS!</label>
    //             <select name="" id="">
    //                 <option value=""></option>
    //                 <option value=""></option>
    //                 <option value=""></option>
    //                 <option value=""></option>
    //             </select>
    //         </form>

    //         <section>
    //             <div className="grid__Container">
    //                 <h1>Battle Rockets</h1>
    //                 {/* Grid top row */}
    //                 <div className="grid__Top__Header">

    //                     {/* top row column numbers */}
    //                     <div className="cellTopHeader" value="0"></div>
    //                     <div className="cellTopHeader" value="1">A</div>
    //                     <div className="cellTopHeader" value="2">B</div>
    //                     <div className="cellTopHeader" value="3">C</div>
    //                     <div className="cellTopHeader" value="4">D</div>
    //                     <div className="cellTopHeader" value="5">E</div>
    //                     <div className="cellTopHeader" value="6">F</div>
    //                     <div className="cellTopHeader" value="7">G</div>
    //                     <div className="cellTopHeader" value="8">H</div>
    //                     <div className="cellTopHeader" value="9">I</div>
    //                     <div className="cellTopHeader" value="10">J</div>
    //                 </div>

    //                 {/* Grid bottom section */}
    //                 <div className="grid__bottom">

    //                     {/* Bottom row header letters */}
    //                     <div className="grid__Left__Header">
    //                         <div className="cellLeftHeader" value="1">1</div>
    //                         <div className="cellLeftHeader" value="2">2</div>
    //                         <div className="cellLeftHeader" value="3">3</div>
    //                         <div className="cellLeftHeader" value="4">4</div>
    //                         <div className="cellLeftHeader" value="5">5</div>
    //                         <div className="cellLeftHeader" value="6">6</div>
    //                         <div className="cellLeftHeader" value="7">7</div>
    //                         <div className="cellLeftHeader" value="8">8</div>
    //                         <div className="cellLeftHeader" value="9">9</div>
    //                         <div className="cellLeftHeader" value="10">10</div>
    //                     </div>

    //                     <div className="grid__rightPlayArea">

                //         <div className="grid__rightPlayArea">

                //             {/* Grid row A */}
                //             <div className="aRow">
                //                 <div className="cell" onDragOver={handleOnDrag} onDrop={handleDrop} id="A1" valuex="1" valuey="1"></div>
                //                 <div className="cell" onDragOver={handleOnDrag} onDrop={handleDrop} id="A2" valuex="1" valuey="2"></div>
                //                 <div className="cell" onDragOver={handleOnDrag} onDrop={handleDrop} id="A3" valuex="1" valuey="3"></div>
                //                 <div className="cell" onDragOver={handleOnDrag} onDrop={handleDrop} id="A4" valuex="1" valuey="4"></div>
                //                 <div className="cell" onDragOver={handleOnDrag} onDrop={handleDrop} id="A5" valuex="1" valuey="5"></div>
                //                 <div className="cell" onDragOver={handleOnDrag} onDrop={handleDrop} id="A6" valuex="1" valuey="6"></div>
                //                 <div className="cell" onDragOver={handleOnDrag} onDrop={handleDrop} id="A7" valuex="1" valuey="7"></div>
                //                 <div className="cell" onDragOver={handleOnDrag} onDrop={handleDrop} id="A8" valuex="1" valuey="8"></div>
                //                 <div className="cell" onDragOver={handleOnDrag} onDrop={handleDrop} id="A9" valuex="1" valuey="9"></div>
                //                 <div className="cell" onDragOver={handleOnDrag} onDrop={handleDrop} id="A10" valuex="1" valuey="10"></div>
                //             </div>
                //         </div>
                //     </div>
                // </div>

                {/* Ships */}
    //             <div className="shipOne">
    //                 <img src={shipOneImg} alt="" onDragStart={handleDrag} value="4" name={shipData[0].shipName} draggable="true" />
    //             </div>
    //         </section>
    //     </>
    // )
}

export default GetRocket;