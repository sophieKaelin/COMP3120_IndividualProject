import React from "react"
import Card from "react-bootstrap/Card"

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
