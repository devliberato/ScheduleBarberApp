const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.KEY_SECRET;

const createToken = async(user, req, res) => {
    const token = jwt.sign({
        name: user.name,
        id: user.id,
        role: user.role
    }, secret)

    res.status(201).json({message: "Você está autenticado!", token: token, id: user.id, role: user.role});

    return token;
}

module.exports = createToken;

