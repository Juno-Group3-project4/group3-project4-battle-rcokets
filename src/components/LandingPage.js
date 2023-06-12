import GetRocket from "./GetRocket";
import { Link, Route, Routes } from "react-router-dom";

// LANDING PAGE Component
const LandingPage = () => {
    return (
        <section>
            <h2>Instructions</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste eum vero eveniet sint, accusamus molestias non fuga ad quaerat nesciunt consequuntur repudiandae reiciendis quis deleniti, officia harum minus magni explicabo tempora atque ullam quae culpa, rerum corrupti. Necessitatibus, iusto nesciunt, tempora aliquid non, est odit id pariatur voluptates consequuntur aspernatur quaerat corporis ad quas? Quibusdam quam natus praesentium, optio dolorum ea nam nulla neque aut in placeat repudiandae ipsum at laborum laboriosam quis accusamus excepturi nostrum. Nam esse, eos ullam rem laborum laudantium accusamus tempora, et atque itaque rerum? Esse quis minus amet sapiente recusandae, quisquam magnam, maiores doloribus aspernatur ipsa odio libero dolorum? Nemo officia sed quis doloremque deserunt atque hic perspiciatis odio facilis dignissimos, porro, maiores excepturi rem pariatur recusandae explicabo assumenda voluptatum.</p>
            <Link to="/rocket-selection">
                <button>PLAY GAME</button>
            </Link>
        </section>
    )
}

export default LandingPage;