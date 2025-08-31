const {DataTypes} = require("sequelize");
const db = require("../db/conn");

const Barber = db.define("Barber", {
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
    }
})

module.exports = Barber;