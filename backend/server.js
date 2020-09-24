const express = require("express")
const app = express()

const cors = require("cors")
const fs = require("fs")
const { User, Post } = require("./schemas")

app.use(express.static("build"))

app.use(cors())
app.use(express.json())

//returns an array of json objects
const getFollowers = async ({ user }) => {
    let followers = []
    await User.find({ username: user }).then((result) => {
        followers = result[0].follows
    })
}

//Fetch all Users
app.get("/api/users", (request, response) => {
    User.find({}).then((result) => {
        console.log(result)
        response.json(result)
    })
})

//Fetch Single Users
//TODO: add a catch for when a user isn't found
app.get("/api/users/:username", (request, response) => {
    const user = String(request.params.username)
    User.find({ username: user }).then((result) => {
        console.log(result)
        response.json(result[0])
    })
})

//Fetch Users following a user
app.get("/api/followers/:username", (request, response) => {
    const user = String(request.params.username)
    response.json(getFollowers({ user }))
})

//Fetch all Posts
app.get("/api/posts", (request, response) => {
    Post.find({}).then((result) => {
        console.log(result)
        response.json(result)
    })
})

//Fetch Single Users
//TODO: add a catch for when a post isn't found
app.get("/api/posts/:id", (request, response) => {
    const postID = String(request.params.id)
    Post.find({ _id: postID }).then((result) => {
        console.log(result)
        response.json(result[0])
    })
})

//Fetch Posts by a User
app.get("/api/users/posts/:username", (request, response) => {
    const user = String(request.params.username)
    Post.find({ user: user }).then((result) => {
        console.log(result)
        response.json(result)
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
