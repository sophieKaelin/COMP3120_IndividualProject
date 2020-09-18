require("dotenv").config()
const mongoose = require("mongoose")
const User = require("./models/users")
const fs = require("fs")

const rawData = fs.readFileSync("../sampledata.json") //TODO: Add link to the sample data file
const data = JSON.parse(rawData)

data.users.map((thing) => {
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
