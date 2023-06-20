// PLAY Component
import GetRocket from "./GetRocket";
import Score from "./Score";
import PlayerGrid from "./PlayerGrid";
import NPCGrid from "./NPCGrid";

const Play = () => {

    return (
        <section>
            <GetRocket />
            <Score />
            <PlayerGrid />
            {/* <NPCGrid /> */}
        </section>     
    )
}

export default Play;