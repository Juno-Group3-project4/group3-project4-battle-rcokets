// Score Component
import { Typewriter } from "react-simple-typewriter";

const Score = ({ playerScore, nonPlayerScore, playerFleetHealth, nonPlayerFleetHealth }) => {
    // A style object for the players health bar to dynamically update the width with the fleet health value 
    const playerHealthBarStyle = {
        width: `${playerFleetHealth}%`,
    };

    // A style object for the non-players health bar to dynamically update the width with the fleet health value 
    const nonPlayerHealthBarStyle = {
        width: `${nonPlayerFleetHealth}%`,
    };

    return (
        <>
            <h2>
                <Typewriter
                    words={['Score Board']}
                    loop={1}
                    typeSpeed={70}
                />
            </h2>
            <div className="scoreBoard">
                <div className="player">
                    <div className="score">
                        <h3>PLAYER:</h3>
                        <p className="score-total">{playerScore}</p>
                    </div>
                    <p>Fleet Destruction:</p>
                    <div className="fleetBarCont">
                        <div className="playerFleetBar" style={playerHealthBarStyle}></div>
                    </div>
                </div>
                <div className="nonplayer">
                    <div className="score">
                        <h3>NON-PLAYER:</h3>
                        <p className="score-total">{nonPlayerScore}</p>
                    </div>
                    <p>Fleet Destruction:</p>
                    <div className="fleetBarCont">
                        <div className="nonPlayerFleetBar" style={nonPlayerHealthBarStyle}></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Score;