const { DataTypes } = require("sequelize");
const db = require("../db/conn");
const User = require("../models/User");





const Appointment = db.define("Appointment", {
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  }
});

Appointment.belongsTo(User);
User.hasMany(Appointment);
module.exports = Appointment;



