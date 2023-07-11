// Form Component. This display all the rockets to chose from which is called from a third party API. Props are passed as below. User prompted to select 3 rockets and then click submit.
const Form = ({ rockets, submitForm, handleChange }) => {
    
    return (
        <form onSubmit={submitForm} >
            <h2>Select 3 rockets!</h2>
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
            <button type="submit">START GAME!</button>
        </form>
    )
}

export default Form;