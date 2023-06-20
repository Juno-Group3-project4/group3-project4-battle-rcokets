// HEADER Component 
import { Link } from "react-router-dom";
import { Typewriter} from "react-simple-typewriter"

const Header = () => {
    return (
        <header>
            <Link to="/">
                <h1>
                    <Typewriter
                        words={['BATTLE ROCKETS']}
                        loop={1}
                        cursor
                        cursorStyle='|'
                        typeSpeed={100}
                    />
                </h1>                  
            </Link>
        </header>
    )
}

export default Header;