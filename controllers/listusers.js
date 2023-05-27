const User = require("../model/user");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

require("dotenv").config();

const listUsers = async(req, res, next)=> {
    try {
        const oldUser = await User.find();

    } catch(err) {
        console.log(err);
    }
}