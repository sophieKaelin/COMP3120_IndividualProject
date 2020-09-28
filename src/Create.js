import React, { useState } from "react"
import axios from "axios"
import { Form, Button, Card } from "react-bootstrap"
import { Redirect } from "react-router-dom"

const loginURL = "/api/create"

const Create = ({ user, setUser }) => {
    const create = ({ username, password }) => {
        return axios
            .post(loginURL, { username, password })
            .then((response) => response.data)
    }

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const formHandler = (event) => {
        event.preventDefault()
        create({ username, password })
            .then((data) => {
                console.log("Success:", data)
                setUser(data)
                localStorage.setItem("user", JSON.stringify(data))
                return <Redirect to="/" />
            })
            .catch((error) => {
                console.log("Error:", error)
            })
    }

    if (user) {
        return <Redirect to="/" />
    } else {
        return (
            <div>
                <Form onSubmit={formHandler}>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        name="username"
                        type="username"
                        placeholder="Enter Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <br></br>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        name="password"
                        type="password"
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br></br>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        name="password"
                        type="password"
                        placeholder="Confirm Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br></br>
                    <Button type="submit">Login</Button>
                </Form>
            </div>
        )
    }
}

export default Create
