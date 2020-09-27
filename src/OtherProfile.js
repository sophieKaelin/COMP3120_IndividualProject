import React, { useState, useEffect } from "react"
import axios from "axios"
import Card from "react-bootstrap/Card"

function OtherProfile() {
    const [theUser, setTheUser] = useState([])
    const temp = window.location.href.split("/")
    const tempUser = temp[temp.length - 1]

    useEffect(() => {
        axios
            .get("http://localhost:3001/api/users/" + tempUser)
            .then((response) => {
                setTheUser(response.data)
            })
    }, [])
    return (
        <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={theUser.avatar} />
            <Card.Body>
                <Card.Title>@{theUser.username}</Card.Title>
                <Card.Text>
                    Following: {theUser.follows ? theUser.follows.length : 1}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default OtherProfile
