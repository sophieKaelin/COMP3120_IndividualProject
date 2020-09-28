require("dotenv").config()

const path = require("path")

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

//Converts content so that users can be tagged in posts
const getContent = (content) => {
    let temp = content.split(" ")
    temp = temp.map((data) =>
        data.startsWith("@")
            ? " <a href='/profile/" +
              data.substring(1) +
              "'>@" +
              data.substring(1) +
              "</a>"
            : data
    )
    temp = "<p>" + temp.join(" ") + "</p>"
    console.log("temp ", temp)
    return temp
}

//Retrieve User data from a username
const getUser = async (user) => {
    // console.log(user)
    return await User.findOne({ username: user }).then((result) => {
        return result
    })
}

//returns an array of json objects of all people a user follows
const getFollowers = async (user) => {
    return await User.find({ username: user }).then((result) => {
        return [...result[0].follows, user]
    })
}

//Fetch posts ONLY by users a person follows
app.get("/api/users/:username/followers", async (request, response) => {
    const user = String(request.params.username)
    const followers = await getFollowers(user)
    console.log("followers: ", followers)
    await Post.find({ user: followers })
        .sort({ timestamp: -1 })
        .then((result) => {
            // console.log(result)
            response.json(result)
        })
})

//Fetch all Users
app.get("/api/users", (request, response) => {
    User.find({}).then((result) => {
        // console.log(result)
        response.json(result)
    })
})

//Fetch Single Users
//TODO: add a catch for when a user isn't found
app.get("/api/users/:username", (request, response) => {
    const user = String(request.params.username)
    User.find({ username: user }).then((result) => {
        // console.log(result)
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
    Post.find({})
        .sort({ timestamp: -1 })
        .then((result) => {
            // console.log(result)
            response.json(result)
        })
})

//Fetch Single Post
//TODO: add a catch for when a post isn't found
app.get("/api/posts/:id", (request, response) => {
    const postID = String(request.params.id)
    Post.find({ _id: postID }).then((result) => {
        response.json(result[0])
    })
})

//Fetch Posts by a User
app.get("/api/users/posts/:username", (request, response) => {
    const user = String(request.params.username)
    Post.find({ user: user })
        .sort({ timestamp: -1 })
        .then((result) => {
            response.json(result)
        })
})

//Make a Post
//Fetch all Posts
app.post("/api/posts", (request, response) => {
    const body = request.body
    if (body.content === "") {
        return response.status(400).json({ error: "Can't submit empty post" })
    }

    const post = new Post({
        user: body.user,
        timestamp: body.timestamp,
        content: getContent(body.content),
        likes: [],
    })

    post.save().then((savedPost) => {
        response.json(savedPost)
    })
})

app.post("/api/login", async (request, response) => {
    const username = request.body.username
    const password = request.body.password

    const user = await getUser(username)
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

app.post("/api/create", async (request, response) => {
    const username = request.body.username
    const password = request.body.password
    if ((await getUser(username)) !== null) {
        console.log("User Already Exists")
        response.status(400).json({ error: "User Already Exists" })
    } else {
        const user = {
            username: username,
            password: password,
            avatar: "http://robohash.org/jim",
            follows: [],
        }

        user.password = bcrypt.hash(user.password, 10).then((newPassword) => {
            const newThing = new User({
                username: user.username,
                password: newPassword,
                avatar: user.avatar,
                follows: user.follows,
            })
            console.log(newThing)
            newThing.save().then((result) => {
                console.log("new user added")
            })
        })
    }
})

app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "../build/index.html"))
})

app.delete("/api/posts/:id", async (request, response) => {
    const id = request.params.id
    await Post.deleteOne({ _id: id }).then((result) => {
        console.log("result: ", result)
        response.json(result)
    })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
