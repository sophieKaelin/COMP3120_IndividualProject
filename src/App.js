import React, { useState, useEffect } from "react"
import "./App.css"
import NavBar from "./NavBar.js"
import Content from "./Content.js"
import Profile from "./Profile.js"
import Feed from "./Feed.js"
import PostComposer from "./PostComposer.js"
import Login from "./Login.js"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
    const [user, setUser] = useState(null)

    const FsetUser = (user) => {
        setUser(user)
    }

    useEffect

    return (
        <Router>
            <Switch>
                <Route path="/explore">
                    <NavBar user={user} setUser={FsetUser} />
                    {/* TODO: Unrestricted feed, view all posts */}
                    <Feed />
                </Route>
                <Route path="/profile/:username">
                    <NavBar user={user} setUser={FsetUser} />
                    <Profile />
                </Route>
                {/* TODO: HIDE THIS PATH IF USER IS LOGGED IN */}
                <Route path="/logout">
                    <NavBar user={user} setUser={FsetUser} />
                </Route>
                <Route path="/login">
                    <NavBar user={user} setUser={FsetUser} />
                    <Login user={user} setUser={FsetUser} />
                </Route>
                <Route path="/">
                    {/* TODO: If User is not logged in, should redirect to the login page */}
                    <NavBar user={user} setUser={FsetUser} />
                    <PostComposer />
                    <Feed />
                    {/* TODO: Restrict feed just to posts of people in following list*/}
                </Route>
            </Switch>
        </Router>
    )
}

export default App
