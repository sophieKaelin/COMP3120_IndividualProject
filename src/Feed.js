import React, { useEffect, useState } from "react"
import axios from "axios"
import Card from "react-bootstrap/Card"

const Feed = ({ postURL }) => {
    //Will have many modes:
    //1. show all posts
    //2. show posts user is following
    //3. show posts by user
    //4. show posts mentioning user (HD)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios
            .get(postURL)
            .then((response) => {
                setPosts(response.data)
                console.log(response.data)
            })
            .catch((response) => {
                console.log(response)
            })
    }, [postURL])

    return posts.map((data) => (
        <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={data.avatar} />
            <Card.Body>
                <Card.Link href={"/profile/" + data.user}>
                    @{data.user}
                </Card.Link>
                <Card.Text
                    dangerouslySetInnerHTML={{ __html: data.content }}
                ></Card.Text>
                <i>Likes: {data.likes.length}</i>
            </Card.Body>
        </Card>
    ))
}

export default Feed
