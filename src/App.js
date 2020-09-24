import React from "react"
import "./App.css"
import NavBar from "./NavBar.js"
import Content from "./Content.js"
import Profile from "./Profile.js"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/">
                    <NavBar />
                </Route>
                <Route path="/explore">
                    <NavBar />
                </Route>
                <Route path="/profile/:username">
                    <NavBar />
                </Route>
                <Route path="/login">
                    <NavBar />
                </Route>
            </Switch>
        </Router>
    )
}

export default App
