import { NavLink, useHistory } from "react-router-dom"
import './Splash.css'
import splash1 from "../images/splash1.jpg"
import splash2 from "../images/splash2.jpg"
import splash3 from "../images/splash3.jpg"
import splash4 from "../images/splash4.jpg"
import splash5 from "../images/splash5.jpg"


function Splash (){
    const history = useHistory()

    return (
            <div className="splash-content">
                <h1 id='inspiration'>Find your inspiration.</h1>
                <h3 id="join-community">Join the Flippr community, home to countless marine life photos and enthusiasts like you! </h3>
                <button id='start-free' onClick={()=>history.push('/signup')}>Start for free</button>
            <div id = "splash-slides">
                <div>
                    <img id="spl-1"  src= {splash1}></img>
                </div>
                <div>
                    <img id="spl-2" src= {splash2}></img>
                </div>
                <div>
                    <img id="spl-3"  src= {splash3}></img>
                </div>
                <div>
                    <img id="spl-4"src= {splash4}></img>
                </div>
                <div>
                    <img id="spl-5"  src= {splash5}></img>
                </div>
              </div>

            </div>
    )
}


export default Splash
