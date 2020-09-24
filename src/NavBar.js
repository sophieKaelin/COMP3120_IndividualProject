import React from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
} from "react-router-dom"
import BNav from "react-bootstrap/Nav"
import "./style/NavBar.css"

const NavBar = (props) => {
    return (
        //ADD LOGO ON THE LEFT
        //ADD SEARCH BAR ON THE LEFT
        <BNav variant="tabs" activeKey="/home">
            <BNav.Item>
                <BNav.Link class="float-right" href="/">
                    Home
                </BNav.Link>
            </BNav.Item>
            <BNav.Item>
                <BNav.Link href="/explore">Explore</BNav.Link>
            </BNav.Item>
            <BNav.Item>
                <BNav.Link href="/profile/:username">Profile</BNav.Link>
            </BNav.Item>
            <BNav.Item>
                <BNav.Link href="/login">Login</BNav.Link>
            </BNav.Item>
        </BNav>
    )
}

export default NavBar
