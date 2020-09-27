require("dotenv").config()
const mongoose = require("mongoose")
const { User, Post } = require("./schemas")
const fs = require("fs")
const bcrypt = require("bcrypt")

//READ IN USER DATA
const userData = fs.readFileSync("../sampledata.json") //TODO: Add link to the real sample data file
const userJson = JSON.parse(userData)

userJson.users.map((thing) => {
    console.log(thing)
    thing.password = bcrypt.hash(thing.password, 10).then((newPassword) => {
        const newThing = new User({
            username: thing.id,
            password: newPassword,
            avatar: thing.avatar,
            follows: thing.follows,
        })
        console.log(newThing)
        newThing.save().then((result) => {
            console.log("new user added")
        })
    })
})

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

userJson.posts.map((thing) => {
    const newThing = new Post({
        user: thing.user,
        timestamp: thing.timestamp,
        content: getContent(thing.content),
        likes: thing.likes,
    })

    newThing.save().then((result) => {
        console.log("new post added")
    })
})
