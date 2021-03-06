import React, { useEffect, useState } from "react"
import axios from "axios"
import { Card, Container, Row, Col, Button } from "react-bootstrap"

const Feed = ({ postURL, user }) => {
    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])

    if (postURL === "") {
        const temp = window.location.href.split("/")
        const tempUser = temp[temp.length - 1]
        postURL = "/api/users/posts/" + tempUser
    }
    useEffect(() => {
        axios
            .get(postURL)
            .then((response) => {
                setPosts(response.data)
            })
            .catch((response) => {
                console.log("response: ", response)
            })
    }, [postURL])

    useEffect(() => {
        axios.get("/api/users").then((response) => {
            setUsers(response.data)
        })
    })
    //Pretty inefficient way of doing it. Picture is being filtered for every post, why do a function call for each post
    // when a user could be making multiple posts.
    const getAvatar = (u) => {
        const av = users.filter((name) => name.username === u)
        return av[0].avatar
    }

    const deleteReq = ({ id }) => {
        return axios
            .delete("/api/posts/" + id, { id })
            .then((response) => response.data)
    }

    const deletePost = (event) => {
        event.preventDefault()
        const id = event.target.value
        deleteReq({ id })
            .then((data) => {
                //TODO: Rerender posts, currently doesn't rerender
                setPosts(posts)
            })
            .catch((error) => {
                console.log("Error:", error)
            })
    }

    return posts.map((data) => (
        <Card id="Card" style={{ width: "44rem" }}>
            <Card.Header>
                <Container>
                    <Row>
                        <Col>{data.timestamp} </Col>
                        <Col md={2}>
                            {user.username === data.user ? (
                                <Button
                                    value={data._id}
                                    onClick={deletePost}
                                    md={12}
                                >
                                    Delete
                                </Button>
                            ) : (
                                <br />
                            )}
                        </Col>
                    </Row>
                </Container>
            </Card.Header>
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
