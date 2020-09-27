import React, { useState, useEffect } from "react"
import "./App.css"
import NavBar from "./NavBar.js"
import Profile from "./Profile.js"
import Feed from "./Feed.js"
import PostComposer from "./PostComposer.js"
import Login from "./Login.js"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

const postsURL = "http://localhost:3001/api/posts"

function App() {
    const [user, setUser] = useState("")
    const [posts, setPosts] = useState([])

    const FsetPosts = (p) => {
        setPosts(p)
    }

    const FsetUser = (user) => {
        setUser(user)
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
                    <NavBar user={user} setUser={FsetUser} />
                    {/* TODO: Unrestricted feed, view all posts */}
                    <Feed postURL={"http://localhost:3001/api/posts"} />
                </Route>
                <Route path="/profile/:username">
                    <NavBar user={user} setUser={FsetUser} />
                    <Profile user={user} />
                    <Feed
                        postURL={
                            "http://localhost:3001/api/users/posts/" +
                            user.username
                        }
                    />
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
                    {user ? <PostComposer user={user} /> : <br></br>}
                    <Feed
                        postURL={
                            "http://localhost:3001/api/users/" +
                            user.username +
                            "/followers"
                        }
                    />
                    {/* TODO: Restrict feed just to posts of people in following list*/}
                </Route>
            </Switch>
        </Router>
    )
}

export default App
