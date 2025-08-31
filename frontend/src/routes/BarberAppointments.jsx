import { useState, useEffect } from "react"
import "./BarberAppointments.css"

import {toast} from "react-toastify"

import api from "../axios/api"

const BarberAppointments = () => {

const [barberAppointments, setBarberAppointments] = useState("");
const [originalAppointments, setOriginalAppointments] = useState([])
const token = localStorage.getItem("token");


const getAllBarberAppointments = async() => {
  

    try {

        const response = await api.get("/barber/getallappointments", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    const data = await response.data;
    console.log(data);
   setBarberAppointments(data.appointments)
   setOriginalAppointments(data.appointments);
  toast.success(response.data.message);
  
        
    } catch (error) {
        toast.error(error.response.data.message);
    }
}

useEffect(() => {
    getAllBarberAppointments();
  }, [])

  const FilterOnlyToday = (barberAppointment) => {
       
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

      const todayAppointments =   barberAppointment.filter((barber) => {
        const appointmentDate = new Date(barber.date);
        appointmentDate.setUTCHours(0, 0, 0, 0);
      
        if(appointmentDate.getTime() === today.getTime()) {
          return true;
        }
      })


      return todayAppointments;
      
  }

  const FilterOnlyTomorrow = (barberAppointment) => {
     

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    tomorrow.setUTCHours(0, 0, 0, 0);

    const tomorrowAppointments = barberAppointment.filter((barber) => {
      const appointmentDate = new Date(barber.date);
      appointmentDate.setUTCHours(0, 0, 0, 0);
      if(appointmentDate.getTime() === tomorrow.getTime()) {
return true;
      }
   
      
      
    })
    

    return tomorrowAppointments;
    

  }


  return (
    <div className="barber-container">
       <h2>Meus Clientes Agendados:</h2>
       <button onClick={() =>    setBarberAppointments(originalAppointments)}>Filtrar Todos Agendamentos</button>
          <button onClick={() => setBarberAppointments(FilterOnlyToday(originalAppointments))}>Apenas Hoje</button>
             <button onClick={() => setBarberAppointments(FilterOnlyTomorrow(originalAppointments))}>Todos Amanhã</button>
  <div className="barber-appointments">
   {!barberAppointments ? (<p>Carregando...</p>) : barberAppointments.length === 0 ? (<div className="no-barber-appointments">
    <p>Sem agendamentos</p>
   </div>) : (barberAppointments.map((barberAppointment) => (
    <div className="barber-appointment-list" key={barberAppointment.id}>
      <div className="barber-appointment-info">
      <p>Agendado</p>
     <p>Nome: {barberAppointment["User.name"]}</p>
     <p>Telefone: {barberAppointment["User.phone"]}</p>
       <p>Data agendada: {barberAppointment.date}</p>
        <p>Horário agendado: {barberAppointment.time}</p>
   <p>Confirmar Whatsapp: <a href={`https://wa.me/${barberAppointment["User.phone"]}`} target="_blank">
   <i className="fab fa-whatsapp"></i>
   </a></p>
      </div>
    </div>
      
   )))}

  </div>

    </div>
  )
}

export default BarberAppointments