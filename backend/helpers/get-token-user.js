const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.KEY_SECRET;
const User = require("../models/User");


const getTokenUser = async(token) => {
    if(!token) {
        return res.status(422).json({message: "Token inválido"})
    }

    const decoded =  jwt.verify(token, secret);
    const userId = decoded.id;
    const user = await User.findOne({raw: true, where: {id: userId}});
    
    return user;
    
}

module.exports = getTokenUser;