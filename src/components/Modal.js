// MODAL COMPONENT TO BE DISPLAYED AT THE END OF THE GAME
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import ScoreBoard from "./ScoreBoard";


const Modal = ({ open, gameStatus, playerTotalScore } ) => {
    if (open === false) return null; 
    return (
        <div className="modalContainer">
            {/* If player wins first condition will run, if player loses then second condition runs */}
                <h2> {gameStatus ?
                    <Typewriter
                        words={['CONGRATULATIONS, YOU WIN!!!']}
                        loop={1}
                        typeSpeed={70}
                    /> :
                    <Typewriter
                        words={['GAME OVER, YOU LOST']}
                        loop={1}
                        typeSpeed={70}
                    /> 
                }
                </h2>
                <div className="btnContainer">
                    {/* add onClick to closeGameBtn, the "playAgainBtn" link will redirect to landingPage*/}
                    <Link to="/" >
                        <button className="playAgainBtn">Play Again?</button>
                    </Link>
                </div>
                {/* Scoreboard from scoreboard component will be displayed */}
            <div className="leaderBoard">
                <ScoreBoard playerTotalScore={playerTotalScore} />
            </div>
        </div>
    )
}

export default Modal;