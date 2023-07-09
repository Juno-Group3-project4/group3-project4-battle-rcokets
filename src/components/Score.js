// Score.js

import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import PlayerGrid from "./PlayerGrid";

const Score = ({ playerScore, nonPlayerScore, playerFleetHealth } ) => {

    // console.log('playerOneFleetLength', playerOneFleetLength );

    // Create a style object to dynamically update the width
    const playerHealthBarStyle = {
        width: `${playerFleetHealth}%`,
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
                        <div className="playerFleetBar"></div>
                    </div>
                </div>
                <div className="nonplayer">
                    <div className="score">
                        <h3>NON-PLAYER:</h3>
                        <p className="score-total">{nonPlayerScore}</p>
                    </div>
                    <p>Fleet Destruction:</p>
                    <div className="fleetBarCont">
                        <div className="nonPlayerFleetBar" style={playerHealthBarStyle}></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Score;