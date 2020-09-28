import React, { useState, useEffect } from "react"
import axios from "axios"
import NavBar from "./NavBar.js"
import Profile from "./Profile.js"
import Create from "./Create.js"
import OtherProfile from "./OtherProfile.js"
import Feed from "./Feed.js"
import PostComposer from "./PostComposer.js"
import Login from "./Login.js"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Container, Row, Col, Dropdown } from "react-bootstrap/"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

function App() {
    const [user, setUser] = useState("")

    const FsetUser = (user) => {
        setUser(user)
    }

    useEffect(() => {
        const localUser = JSON.parse(localStorage.getItem("user"))
        if (localUser) {
            axios.get("/api/users/" + localUser.username).then((response) => {
                setUser(response.data)
            })
        }
    }, [])

    return (
        <Router>
            <Switch>
                <Route path="/explore">
                    <NavBar user={user} setUser={FsetUser} />
                    {/* TODO: Unrestricted feed, view all posts */}
                    <Container float="center" fluid>
                        <Row>
                            <Col />
                            <Col>
                                <Feed postURL={"/api/posts"} user={user} />
                            </Col>
                            <Col />
                        </Row>
                    </Container>
                </Route>
                <Route path="/myprofile">
                    <NavBar user={user} setUser={FsetUser} />
                    <Container>
                        <Row>
                            <Col>
                                <Profile user={user} />
                                <br></br>
                                <Dropdown>
                                    <Dropdown.Toggle
                                        variant="success"
                                        id="dropdown-basic"
                                    >
                                        My Tunes 🎵
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">
                                            {/* https://developer.spotify.com/documentation/widgets/generate/embed/ */}
                                            <iframe
                                                src="https://open.spotify.com/embed/album/1DFixLWuPkv3KT3TnV35m3"
                                                width="300"
                                                height="80"
                                                frameborder="0"
                                                allowtransparency="true"
                                                allow="encrypted-media"
                                            ></iframe>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col>
                                <Feed
                                    postURL={
                                        "/api/users/posts/" + user.username
                                    }
                                    user={user}
                                />
                            </Col>
                        </Row>
                    </Container>
                </Route>
                {/* TODO: HIDE THIS PATH IF USER IS LOGGED IN */}
                <Route path="/logout">
                    <NavBar user={user} setUser={FsetUser} />
                </Route>
                <Route path="/login">
                    <NavBar user={user} setUser={FsetUser} />
                    <Login user={user} setUser={FsetUser} />
                </Route>
                <Route path="/create">
                    <NavBar user={user} setUser={FsetUser} />
                    <Create user={user} setUser={FsetUser} />
                </Route>
                <Route path="/profile/:username">
                    <NavBar user={user} setUser={FsetUser} />
                    <Container>
                        <Row>
                            <Col>
                                <OtherProfile />
                            </Col>
                            <Col>
                                <Feed postURL={""} user={user} />
                            </Col>
                        </Row>
                    </Container>
                </Route>
                <Route path="/">
                    <NavBar user={user} setUser={FsetUser} />
                    <Container float="center" fluid>
                        <Row>
                            <Col>
                                {user ? (
                                    <PostComposer user={user} />
                                ) : (
                                    <br></br>
                                )}{" "}
                            </Col>
                        </Row>
                        <Row>
                            <Col />
                            <Col>
                                <Feed
                                    postURL={
                                        "/api/users/" +
                                        user.username +
                                        "/followers"
                                    }
                                    user={user}
                                />
                            </Col>
                            <Col />
                        </Row>
                    </Container>
                    {/* TODO: Restrict feed just to posts of people in following list*/}
                </Route>
            </Switch>
        </Router>
    )
}

export default App
