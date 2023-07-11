// MODAL (Error handling) Component
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import battleSounds from "../sounds/battle-sounds.wav";
import ScoreBoard from "./ScoreBoard";


const Modal = ({ open, gameStatus, playerTotalScore } ) => {
    if (open === false) return null; 
    // const audio3 = new Audio(battleSounds);
    // audio3.play();
    return (
        <div className="backGroundContainer">
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
            <p>Your score is:{playerTotalScore}</p>
            {/* <div className="leaderBoard"> */}
                <ScoreBoard playerTotalScore={playerTotalScore} />
            {/* </div> */}
            <div className="btnContainer">
                {/* add onClick to closeGameBtn, the "playAgainBtn" link will redirect to landingPage*/}
                <Link to="/">
                    <button className="playAgainBtn">Play Again?</button>
                </Link>
            </div>
        </div>
    )
}

export default Modal;