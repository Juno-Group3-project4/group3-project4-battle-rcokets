// SCORE Component
import { useState } from "react";


const Score = () => {
    return (
        <>
        <h2>Score Board</h2>
            <div className="scoreBoard">
                <div className="player">
                    <h3>Player</h3>
                    <p>Hit:</p>
                    <p>Missed:</p>
                    <p>Rocket Destroyed:</p>
                </div>
                <div className="nonplayer">
                    <h3>Non-player:</h3>
                    <p>Hit:</p>
                    <p>Missed:</p>
                    <p>Rocket Destroyed:</p>
                </div>
            </div>
        </>
    )
}

export default Score;