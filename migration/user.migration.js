const {getDB} = require("../db/db")
const User = require("../models/user")

let db = getDB()
db.then(() => {

    User.create()

}).catch(e => console.error(e))