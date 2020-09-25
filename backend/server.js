require("dotenv").config()
const express = require("express")
const app = express()

const cors = require("cors")
const fs = require("fs")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { User, Post } = require("./schemas")

app.use(express.static("build"))

app.use(cors())
app.use(express.json())

const getUser = async (user) => {
    console.log(user)
    return await User.findOne({ username: user }).then((result) => {
        return result
    })
}

//returns an array of json objects
const getFollowers = async (user) => {
    return await User.find({ username: user }).then((result) => {
        return result[0].follows
    })
}

//Fetch posts ONLY by users a person follows
app.get("/api/users/:username/followers", async (request, response) => {
    const user = String(request.params.username)
    const followers = await getFollowers(user)
    await Post.find({ user: followers }).then((result) => {
        console.log(result)
        response.json(result)
    })
})

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

//Fetch Single Post
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

app.post("/api/login", async (request, response) => {
    const username = request.body.username
    const password = request.body.password

    const user = await getUser(username)
    console.log(user)
    if (!user) {
        //check if the user exists
        return response
            .status(401)
            .json({ error: "invalid username or password" })
    } else {
        if (await bcrypt.compare(password, user.password)) {
            console.log("Password is gooooood")
            const userForToken = {
                id: user.id,
                username: user.username,
            }
            const token = jwt.sign(userForToken, process.env.SECRET_KEY) //TODO: insecurity, put in env file.

            return response
                .status(200)
                .json({ token, username: user.username, name: user.name })
        } else {
            return response
                .status(401)
                .json({ error: "Invalid username or password" })
        }
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
