require("dotenv").config()

const mongoose = require("mongoose") //node library that connects to MongoDB

const url = process.env.MONGODB_URI

//Check for password to access DB
if (process.argv.length < 3) {
    console.log(
        "Missing password, structure arguments like: node mongo.js <password>"
    )
    process.exit(1)
}

const password = process.argv[2]

//Connect to the DB
mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((result) => {
        console.log("You are connected to the DB")
    })
    .catch((error) => {
        console.log(error)
        console.log("Could not connect to DB")
    })

const usersSchema = new mongoose.Schema({
    username: String,
    password: String,
    avatar: String,
    follows: Array,
})

const User = mongoose.model("User", usersSchema)

const postsSchema = new mongoose.Schema({
    user: String,
    timestamp: String,
    content: String,
    likes: Array,
})

const Post = mongoose.model("Post", postsSchema)

module.exports = { User, Post }
