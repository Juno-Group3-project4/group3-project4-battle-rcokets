// GET ROCKET Component
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const GetRocket = () => {
    // set rocket data in variable
    const [rockets, setRockets] = useState([]);
    // store users selected rockets in state.
    const [selectedRockets, setSelectedRockets] = useState([]);

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

    // onchange event to listen for users selected choices and update selectedRockets state
    const handleChange = (event) => {
        // console.log(event.target.checked);
        if (event.target.checked) {
        console.log(event.target.value);
        // use spread operater to create a new array and add users selection
        setSelectedRockets([...selectedRockets, event.target.value]);
        } else {
        // using filter method to allow the user to remove a selected rocket from the array
        setSelectedRockets(selectedRockets.filter(rocket => rocket !== event.target.value))
        }
    }

    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('form is submitted');
        if (selectedRockets.length !== 3 ) {
            alert("Please only select 3 rockets!!");
        } else {
            navigate("/play");
        }
    }
    
    return (
        <div className="wrapper">
            <h2>Select 3 rockets!</h2>
            <form onSubmit={handleSubmit} >
                {/* Map through the Rocket API array stored in rockets state and display on the screen for user to select */}
                <ul className="flexContainer">
                    {rockets.map((rocket) => {
                        return (
                            <li className="rocketContainer" key={rocket.id}>
                                <input type="checkbox" id={`${rocket.id}`} name={rocket.name} value={rocket.name} onChange={handleChange}></input>
                                <label htmlFor={`${rocket.id}`}>
                                    <img className="rocket" src={rocket.flickr_images} alt={`${rocket.name}`} />
                                    <div className="descriptionContainer">
                                        <h3>{rocket.name}</h3>
                                        <p className="description">{rocket.description}</p>
                                    </div>
                                    <div className="engineSpecsOverlay">
                                        <p>{`Boosters: ${rocket.boosters}`}</p>
                                        <p>{`Height: ${rocket.height.meters} meters, ${rocket.height.feet} feet`}</p>
                                        <p>{`Engine: Number: ${rocket.engines.number}, Type: ${rocket.engines.type}, Version: ${rocket.engines.version}`}</p>
                                    </div>
                                </label>       
                            </li>
                        )
                    })}
                </ul>

                <button onSubmit={()=>navigate("/play")} type="submit">START GAME!</button>

            </form>
        </div>


        // NEXT STEPS         
    //    Final task is to make this getRocket component page responsive 

    )
}

export default GetRocket;