import Header from "../components/Header"
import About from "../components/About"
import Check from "../components/Check"
import Payment from "../components/Payment"
import Profile from "../components/Profile"
import Contact from "../components/Contact"

export default function LandingPage(){
    return(
        <>
            <Header/>
            <div id="about">
                <About/>
            </div>
            <div id="check">
                <Check/>
            </div>
            <div id="payment">
                <Payment/>
            </div>
            <div id="profile">
                <Profile/>
            </div>
            <div id="contact">
                <Contact/>
            </div>
        </>
    )
}