// MODAL (Error handling) Component
import { Typewriter } from "react-simple-typewriter";
import battleSounds from "../sounds/battle-sounds.wav";
import ScoreBoard from "./ScoreBoard";



const Modal = ({ open, gameStatus, handleClick, playerTotalScore }) => {
    if (open === false) return null;
    // const audio3 = new Audio(battleSounds);
    // audio3.play();
    return (
        <div className="backGroundContainer">
            <div className="modalContainer">
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
            </div>
            <div className="leaderBoard">
                <ScoreBoard playerTotalScore={playerTotalScore} />
            </div>
            <div className="btnContainer">
                {/* add onClick to closeGameBtn, the "playAgainBtn" link will redirect to landingPage*/}
                <button className="playAgainBtn">Play Again?</button>
            </div>
        </div>
    )
}

export default Modal;