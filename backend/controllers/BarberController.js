const Barber = require("../models/Barber");
const Appointment = require("../models/Appointment")
const bcrypt = require("bcrypt");


require("dotenv").config();


//helpers
const createToken = require("../helpers/create-token");

const User = require("../models/User");


module.exports = class BarberController {
static async login(req, res){
const {email, password} = req.body;

if(!email) {
    return res.status(400).json({message: "Insira o e-mail para login!"})
}

if(!password) {
    return res.status(400).json({message: "Insira a senha para o login!"})
}

const barberExists = await Barber.findOne({raw: true, where: {email: email}});

if(!barberExists) {
    return res.status(400).json({message: "E-mail ou senha inválidas"})
}


if(barberExists.password !== password) {
    return res.status(400).json({message: "E-mail ou senha inválidas"})
}




await createToken(barberExists, req, res);

}



static async getAllAppointments(req, res) {
    
    const appointments = await Appointment.findAll({raw: true, include: {model: User, attributes: ["name", "phone"]}})
    if(!appointments) {
        return res.status(400).json({message: "Sem pessoas agendadas!"})
    }
    res.status(200).json({message: "Clientes agendados"})
}
}