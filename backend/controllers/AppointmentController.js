const Appointment = require("../models/Appointment")

const getAvailableTimes = require("../helpers/getAvailable-times")


module.exports = class AppointmentController {
   
    static async getAvailableTimesForDate(req, res) {
        const {date} = req.params;

        const availableTimes = await getAvailableTimes(date);
         if(!availableTimes) {
            return res.status(400).json({message: "Sem horários disponiveis!"})
         }
         if(availableTimes.length === 0) {
                 return res.status(400).json({message: "Sem mais horários disponíveis!"})
         }

        res.status(200).json({message: availableTimes})
    }



    static async book(req, res) {

       const {date, time} = req.body;



       if(!date) {
       return  res.status(400).json({message: "Insira uma data!"})
       }

          if(!time) {
      return  res.status(400).json({message: "Insira um horário!"})
       }

             

       const existAppointment = await Appointment.findOne({where: {date, UserId: req.user.id}});

       if(existAppointment) {
        return res.status(400).json({message: "Você já possui um agendamento nesta data!"})
       }

       const appointment = await Appointment.create({date, time, UserId: req.user.id})

       res.status(200).json({message: "Agendamento realizado com sucesso!", appointment})

    }

    static async deleteBook (req, res) {

        const {id} = req.params;

        const appointment = await Appointment.findOne({where: {id, UserId: req.user.id}});

        if(!appointment) {
             return res.status(400).json({message: "Agendamento não encontrado para realizar a exclusão"})
         }

        await appointment.destroy();

        res.status(200).json({message: "Agendamento excluído com sucesso!", appointment})
        
    }

    static async getAllBooks(req, res) {

        const appointments = await Appointment.findAll({raw: true, where: {UserId: req.user.id}})

        if(!appointments || appointments.length === 0) {
        return res.status(400).json({message: "Sem agendamentos!"})
        }

        res.status(200).json({message: "Agendamentos resgatados com sucesso!", appointments})

    }

    static async getBookById (req, res) {
         const {id} = req.params;

        const appointment = await Appointment.findOne({raw: true, where: {id: id}})

        if(!appointment) {
            return res.status(400).json({message: "Agendamento não encontrado!"})
        }

        res.status(200).json({message: "Agendamento encontrado!", appointment})

    }

    static async editBook (req, res) {
        const {id} = req.params;

        const {date, time} = req.body;

        if(!date) {
            return res.status(400).json({message: "Preencha a data para realizar a edição"})
        }

         if(!time) {
            return res.status(400).json({message: "Preencha o horário para realizar a edição"})
        }

         await Appointment.update({date, time}, {where: {id: id}})

         res.status(200).json({message: "Agendamento atualizado com sucesso!"})
    }
}