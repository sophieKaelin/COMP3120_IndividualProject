import axios from "axios"
import React, { useState, useEffect } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import dateformat from "dateformat"

const postsURL = "http://localhost:3001/api/posts"

//TODO: PASS USER INTO HERE.
const PostComposer = ({ updateFunction, deleteFunction, user }) => {
    const [newPost, setPost] = useState("") //TODO: REFACTOR, into one state variable

    const handleSetPost = (event) => {
        setPost(event.target.value)
    }

    const addToList = (event) => {
        event.preventDefault()

        const postObject = {
            user: user.username,
            timestamp: dateformat(Date.now(), "yyyy-mm-dd hh:mm:ss"),
            content: newPost,
            likes: [],
        }
        if (postObject.content !== "") {
            axios.post(postsURL, postObject).then((response) => {
                //TODO: Force Rerender the app component ? State variable? Call the update function parameter?
            })
        }
    }

    return (
        <Form onSubmit={addToList}>
            <Form.Group>
                <Form.Label>Make a Post: </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="What are you thinking?"
                    value={newPost}
                    onChange={handleSetPost}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Post
            </Button>
        </Form>
    )
}

export default PostComposer
