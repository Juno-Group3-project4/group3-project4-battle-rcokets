// GET ROCKET Component
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


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
            setRockets(response.data)
        })
    }, []);

    
    return (
        <div className="wrapper">
            <h2>Select 3 rockets!</h2>
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
                                    {/* <p>{`Boosters: ${rocket.boosters}`}</p> */}
                                    {/* <p>{`Height: ${rocket.height.meters} meters, ${rocket.height.feet} feet`}</p>
                                    <p>{`Engine: Number: ${rocket.engines.number}, type: ${rocket.engines.type}, version: ${rocket.engines.version}`}</p> */}
                                </label>
                            </li>
                        )
                    })}
                </ul>

                <Link to="/play">
                    <button>START GAME!</button>
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
}

export default GetRocket;