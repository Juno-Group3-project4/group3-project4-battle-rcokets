// MODAL (Error handling) Component
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

const Modal = ( { open, gameStatus, closeModal} ) => {
    if (open === false) return null;
    return (
        <div className="backGroundContainer">
            <div className="modalContainer">
                <h2> {gameStatus ?
                    <Typewriter
                        words={[' CONGRATULATIONS YOU WIN!!!']}
                        loop={1}
                        typeSpeed={70}
                    /> :
                    <Typewriter
                        words={['GAME OVER! YOU LOST!']}
                        loop={1}
                        typeSpeed={70}
                    /> 
                }
                </h2>
                <div className="btnContainer">
                    {/* add onClick to closeGameBtn, the "playAgainBtn" link will redirect to landingPage*/}
                    <Link to="/">
                        <button className="playAgainBtn">Play Again?</button>
                    </Link>
                    <button onClick={closeModal} className="closeGameBtn">Close X</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;