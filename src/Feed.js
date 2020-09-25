import React, { useEffect, useState } from "react"
import axios from "axios"
import { defaultModifiers } from "@popperjs/core/lib/popper-lite"

const Feed = ({ feed }) => {
    //Will have many modes:
    //1. show all posts
    //2. show posts user is following
    //3. show posts by user
    //4. show posts mentioning user (HD)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3001/api/posts").then((response) => {
            setPosts(response.data)
            console.log("yeeeehawwww")
            console.log(response.data)
        })
    }, [])

    console.log(posts)
    return posts.map((data) => (
        <div>
            <h2>@{data.user}</h2>
            <p>{data.content}</p>
            <p>
                <i>Likes: {data.likes.length}</i>
            </p>
        </div>
    ))
}

export default Feed
