import React, { useEffect, useState } from "react"
import axios from "axios"
import { Card, Container, Row, Col } from "react-bootstrap"

const Feed = ({ postURL }) => {
    //Will have many modes:
    //1. show all posts
    //2. show posts user is following
    //3. show posts by user
    //4. show posts mentioning user (HD)
    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios
            .get(postURL)
            .then((response) => {
                setPosts(response.data)
                // console.log(response.data)
            })
            .catch((response) => {
                console.log(response)
            })
    }, [postURL])

    useEffect(() => {
        axios.get("http://localhost:3001/api/users").then((response) => {
            setUsers(response.data)
        })
    })

    //Pretty inefficient way of doing it. Picture is being filtered for every post, why do a function call for each post
    // when a user could be making multiple posts.
    const getAvatar = (u) => {
        const av = users.filter((name) => name.username === u)
        return av[0].avatar
    }

    return posts.map((data) => (
        <Card id="Card" style={{ width: "44rem" }}>
            <Card.Header>{data.timestamp}</Card.Header>
            <Container>
                <Row>
                    <Col md={2}>
                        <Card.Img
                            style={{ width: "6rem" }}
                            variant="top"
                            src={getAvatar(data.user)}
                        />
                    </Col>
                    <Col>
                        <Card.Body>
                            <Card.Link href={"/profile/" + data.user}>
                                @{data.user}
                            </Card.Link>
                            <Card.Text
                                dangerouslySetInnerHTML={{
                                    __html: data.content,
                                }}
                            ></Card.Text>
                            <i>Likes: {data.likes.length}</i>
                        </Card.Body>
                    </Col>
                </Row>
            </Container>
        </Card>
    ))
}

export default Feed
