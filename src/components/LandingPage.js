import { Link } from "react-router-dom";
import landing from '../assets/moon-landing-art.png';



// LANDING PAGE Component
const LandingPage = () => {

    return (
        <section className="landing-page">
            <h2 className="landing-headings">IT’S A RACE TO MARS…</h2>
            <img src={landing} className="mars-AI-landing-pic" alt="Moon Landing Art" />
            <p>The future of planet Earth is at risk as it buckles under the strain of human population, consumption and inane TikTok trends. As corporations and global agencies fund missions to make the colonization of Mars possible, rogue AI rockets plan to thwart any form of human migration into space.</p><p>Join SpaceX in protecting the future of humanity by helping vanquish the evil ‘AI Space Army’ in a <strong>Battle of Rockets</strong>!</p>
            <h2 className="landing-headings">Instructions</h2>
            <ol>
                <li className="instructions-list">After clicking Play Game, select 3 rockets on the 'Rocket Selection' page. </li>
                <li className="instructions-list">Drag and drop all your rockets on the Battle Rocket Grid then click Launch Game!</li>
                <li className="instructions-list">Click on a cell on the AI's non-playerGrid to launch a SpaceX attack!</li>
                <li className="instructions-list">It's the AI's (non-player) turn now - they will make their move and attempt to destroy your rockets!! </li>
                    <ul>
                        <li className="indent">If you hit one of the AI's rockets during your turn, the cell will turn red.</li>
                        <li className="indent">If you miss one of the AI's rockets during your turn, the cell will turn yellow.</li>
                    </ul>
                <li className="instructions-list">The game will continue until you destroy all of the AI's rockets, or they destroy all of yours!</li>
                <li className="instructions-list">If you win, congratulations! You have successfully protected the future of humanity!!</li>
                <li className="instructions-list">If you lose, you can press "Play again" to attempt to defeat the AI.</li>
            </ol>
            {/* <ScoreBoard /> */}
            <Link to="/form">
                <button>PLAY GAME</button>
            </Link>
        </section>
    )
}

export default LandingPage;