import React from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
} from "react-router-dom"

const NavBar = (props) => {
    return (
        //ADD LOGO ON THE LEFT
        //ADD SEARCH BAR ON THE LEFT
        <Router>
            <div>
                <Link to="/">Home</Link>
                <Link to="/explore">Explore</Link>
                <Link to="/profile/:username">Profile</Link>
                <Link to="/login">Login</Link>
            </div>

            <Switch>
                <Route path="/">{/* TODO: Home page component */}</Route>
                <Route path="/explore">{/* TODO: Explore all tweets */}</Route>
                <Route path="/profile/:username">
                    {/* TODO: Individual profile feed */}
                </Route>
                <Route path="/login">{/* TODO: Login page */}</Route>
            </Switch>
        </Router>
    )
}

export default NavBar
