// PLAY Component
import { GetRocket, Score, PlayerGrid, NPCGrid} from '../components'

const Play = () => {

    return (
        <section>
            <GetRocket />
            <Score />
            <PlayerGrid />
            <NPCGrid />
        </section>     
    )
}

export default Play;