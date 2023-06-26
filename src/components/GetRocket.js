// GET ROCKET Component
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import { useHistory } from "react-router-dom";


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

    // useHistory hook to manually redirect the user to the "/play" route once the form is submitted. What is happening right now is the form doesn't have a chance to submit as the button is wrapped in a Link component. Not working as useHistory hook is not being recognised.
    // const history = useHistory();
    // // Error handling and form submission function
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log('submitted');
    //     history.push("/play");
    // }
    
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
                                    <img src={rocket.flickr_images} alt={`${rocket.name}`} />
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
                    <button type="submit">START GAME!</button>
                </Link> 
            </form>
        </div>

        // NEXT STEPS         
        // Create another state and store users selected rockets in state?
        // add error handling
        // Game will start following form submission and will take to player grid component?
        // Needs to be responsive

    )
}

export default GetRocket;