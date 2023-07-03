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
                      <p className="score-total">200</p> 
                    </div>
                    <p>Hit:</p>
                    <p>Missed:</p>
                    <p>Rocket Destroyed:</p>
                </div>
                <div className="nonplayer">
                    <div className="score">
                        <h3>NON-PLAYER:</h3>
                        <p className="score-total">150</p>
                    </div>
                    <p>Hit:</p>
                    <p>Missed:</p>
                    <p>Rocket Destroyed:</p>
                </div>
            </div>
        </>
    )
}

export default Score;