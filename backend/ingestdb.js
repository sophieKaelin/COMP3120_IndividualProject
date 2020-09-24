require("dotenv").config()
const mongoose = require("mongoose")
const { User, Post } = require("./schemas")
const fs = require("fs")

//READ IN USER DATA
const userData = fs.readFileSync("../../sampledata.json") //TODO: Add link to the real sample data file
const userJson = JSON.parse(userData)

userJson.users.map((thing) => {
    console.log(thing)
    const newThing = new User({
        username: thing.id,
        password: thing.password,
        avatar: thing.avatar,
        follows: thing.follows,
    })

    newThing.save().then((result) => {
        console.log("new user added")
    })
})

userJson.posts.map((thing) => {
    const newThing = new Post({
        user: thing.user,
        timestamp: thing.timestamp,
        content: thing.content,
        likes: thing.likes,
    })

    newThing.save().then((result) => {
        console.log("new post added")
    })
})
