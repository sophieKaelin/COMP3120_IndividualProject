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
        console.log("Could not connect to db")
    })

const usersSchema = new mongoose.Schema({
    username: String,
    password: String,
    avatar: String,
    follows: Array,
})

const User = mongoose.model("User", usersSchema)

module.exports = User

/*TODO: Maybe add later? Depends if I want to close the connection or not */
// note.save().then((result) => {
//     console.log("db updated")
//     mongoose.connection.close()
// })
