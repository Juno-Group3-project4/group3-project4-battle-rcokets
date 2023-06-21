// GET ROCKET Component
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import shipOneImg from '../assets/spaceX_rocket_4.png';
// import shipTwo from '../assets/spaceX_rocket_3.png';

import NPCGrid from './NPCGrid.js';


const GetRocket = () => {
    // set rocket data in variable
    const [rockets, setRockets] = useState([]);

    // call api data on mount
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

    
    return (
        <div className="wrapper">
            <h2>Select up to 3 rockets</h2>
            <form>
                {/* Map through the Rocket API array stored in rockets state and display on the screen for user to select */}
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
                                    {/* <p>{`Boosters: ${rocket.boosters}`}</p>
                                    <p>{`Height: ${rocket.height.meters} meters, ${rocket.height.feet} feet`}</p>
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

    //                     <div className="grid__rightPlayArea">

    //                         {/* Grid row A */}
    //                         <div className="aRow">
    //                             <div className="cell" onDragOver={handleOnDrag} onDrop={handleDrop} id="A1" valuex="1" valuey="1"></div>
    //                             <div className="cell" onDragOver={handleOnDrag} onDrop={handleDrop} id="A2" valuex="1" valuey="2"></div>
    //                             <div className="cell" onDragOver={handleOnDrag} onDrop={handleDrop} id="A3" valuex="1" valuey="3"></div>
    //                             <div className="cell" onDragOver={handleOnDrag} onDrop={handleDrop} id="A4" valuex="1" valuey="4"></div>
    //                             <div className="cell" onDragOver={handleOnDrag} onDrop={handleDrop} id="A5" valuex="1" valuey="5"></div>
    //                             <div className="cell" onDragOver={handleOnDrag} onDrop={handleDrop} id="A6" valuex="1" valuey="6"></div>
    //                             <div className="cell" onDragOver={handleOnDrag} onDrop={handleDrop} id="A7" valuex="1" valuey="7"></div>
    //                             <div className="cell" onDragOver={handleOnDrag} onDrop={handleDrop} id="A8" valuex="1" valuey="8"></div>
    //                             <div className="cell" onDragOver={handleOnDrag} onDrop={handleDrop} id="A9" valuex="1" valuey="9"></div>
    //                             <div className="cell" onDragOver={handleOnDrag} onDrop={handleDrop} id="A10" valuex="1" valuey="10"></div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>

    )
}

export default GetRocket;