import { Link, Route, Routes } from "react-router-dom";

// LANDING PAGE Component
const LandingPage = () => {
    return (
        <section>
            <h2>IT’S A RACE TO MARS…</h2>
            <p>The future of planet Earth is at risk as it buckles under the strain of human population, consumption and inane TikTok trends. As corporations and global agencies fund missions to make the colonization of Mars possible, rogue AI rockets plan to thwart any form of human migration into space. Join SpaceX in protecting the future of humanity by helping vanquish the evil ‘AI Space Army’ in a <strong>Battle of Rockets</strong>!</p>
            <h2>Instructions</h2>
            <ol>
                <li className="instructions-list">Select your rockets on the 'Rocket Selection' page after clicking play; select up to four rockets for your fleet</li>
                <li className="instructions-list">Place your rockets on the grid by clicking on the cells provided to place your rockets - each rocket will ocupy a set number of adjacnet cells</li>
                <li className="instructions-list"> Play Game - it's your turn to attack! Click on a cell on the AI's grid to launch a SpaceX attack
                    <ul>
                        <li className="indent">If you hit one of the AI's rockets during your turn, the cell will turn red</li>
                        <li className="indent">If you miss one of the AI's rockets during your turn, the cell will turn black</li>
                    </ul>
                </li>
                <li className="instructions-list">It's the AI's turn now - they will make their move and attempt to destroy your rockets now</li>
                <li className="instructions-list">Game will continue until you destroy all of the AI's rockets, or they destroy all of yours</li>
                <li className="instructions-list">If you win, congratulations! You have successfully protected the future of humanity.</li>
                <li className="instructions-list">If you lose, you can press "Play again"  to improve your skills and defeat the AI</li>
            </ol>
            <Link to="/rocket-selection">
                <button>PLAY GAME</button>
            </Link>
        </section>
    )
}

export default LandingPage;