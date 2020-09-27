import React, { useEffect } from "react"
import axios from "axios"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"

const Profile = ({ user }) => {
    return (
        <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={user.avatar} />
            <Card.Body>
                <Card.Title>@{user.username}</Card.Title>
                <Card.Text>
                    Following: {user.follows ? user.follows.length : 1}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Profile
