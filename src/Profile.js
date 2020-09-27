import React, { useEffect } from "react"
import axios from "axios"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"

const Profile = ({ user }) => {
    console.log("username::: ", { user })
    var userInfo = []

    useEffect(() => {
        console.log("site = http://localhost:3001/api/users/" + user.user)
        axios
            .get("http://localhost:3001/api/users/" + user.user)
            .then((response) => {
                userInfo = response
                console.log("response:", response.data)
            })
            .catch((response) => {
                console.log(response)
            })
    }, [user])
    console.log("user is ", userInfo)
    console.log("user: ** ", user)

    return (
        <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={user.avatar} />
            <Card.Body>
                <Card.Title>@{user.username}</Card.Title>
                <Card.Text>Following: {user.follows}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Profile
