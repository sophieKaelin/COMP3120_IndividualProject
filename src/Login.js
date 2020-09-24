import React, { useState, useEffect } from "react"
import axios from "axios"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

const loginURL = "http://localhost:3001/api/login"

const Login = ({ user, setUser }) => {
    const login = ({ username, password }) => {
        return axios
            .post(loginURL, { username, password })
            .then((response) => response.data)
    }

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const formHandler = (event) => {
        event.preventDefault()
        login({ username, password })
            .then((data) => {
                console.log("Success:", data)
                setUser(data)
                localStorage.setItem("user", JSON.stringify(data))
            })
            .catch((error) => {
                console.log("Error:", error)
            })
    }

    if (user) {
        return <h2>RETURN TO HOME, YOU ARE LOGGED IN</h2>
    } else {
        return (
            <Form onSubmit={formHandler}>
                <Form.Label>Username</Form.Label>
                <Form.Control
                    name="username"
                    type="username"
                    placeholder="Enter Username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Form.Label>Password</Form.Label>
                <Form.Control
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit">Login</Button>
            </Form>
        )
    }
}

export default Login
