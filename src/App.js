import React, { useState, useEffect } from "react"
import "./App.css"
import NavBar from "./NavBar.js"
// import Content from "./Content.js"
import Profile from "./Profile.js"
import Feed from "./Feed.js"
import PostComposer from "./PostComposer.js"
import Login from "./Login.js"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
    const [user, setUser] = useState(null)
    const [feed, setMode] = useState(1)

    const FsetUser = (user) => {
        setUser(user)
    }
    //Feed will have various modes (show all users posts, show some, show one etc. More details in Feed.js)
    const FsetMode = (mode) => {
        setMode(mode)
    }

    useEffect(() => {
        const localUser = JSON.parse(localStorage.getItem("user"))
        if (localUser) {
            setUser(localUser)
        }
    }, [])

    return (
        <Router>
            <Switch>
                <Route path="/explore">
                    <NavBar user={user} setUser={FsetUser} setMode={FsetMode} />
                    {/* TODO: Unrestricted feed, view all posts */}
                    <Feed feed={feed} />
                </Route>
                <Route path="/profile/:username">
                    <NavBar user={user} setUser={FsetUser} setMode={FsetMode} />
                    <Profile />
                    <Feed feed={feed} />
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
                    <NavBar user={user} setUser={FsetUser} setMode={FsetMode} />
                    <PostComposer />
                    <Feed feed={feed} />
                    {/* TODO: Restrict feed just to posts of people in following list*/}
                </Route>
            </Switch>
        </Router>
    )
}

export default App
