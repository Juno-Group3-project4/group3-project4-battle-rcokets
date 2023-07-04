// SCORE Component
import { useState } from "react";
import { Typewriter } from "react-simple-typewriter"

const Score = () => {
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
                      <p className="score-total">0</p> 
                    </div>
                    <p>STATUS:
                        <span id="playerStatus"></span>
                    </p>
                    <p>Fleet Destruction:</p>
                    <div className="fleetBarCont">
                        <div className="playerFleetBar"></div>
                    </div>
                </div>
                <div className="nonplayer">
                    <div className="score">
                        <h3>NON-PLAYER:</h3>
                        <p className="score-total">0</p>
                    </div>
                    <p>STATUS:
                        <span id="nonPlayerStatus"></span>
                    </p>
                    <p>Fleet Destruction:</p>
                    <div className="fleetBarCont">
                        <div className="nonPlayerFleetBar"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Score;