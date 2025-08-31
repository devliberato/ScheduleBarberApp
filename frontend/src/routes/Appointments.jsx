import { useState, useEffect } from "react"

import api from "../axios/api";
import barberbrush from "../imgs/barberbrush.svg"

import {toast} from "react-toastify";
import "./Appointments.css"
import {Link} from "react-router-dom"



const Appointments = () => {

  const [appointments, setAppointments] = useState([]);
  const token = localStorage.getItem("token");

  const getAllAppointments = async () => {
    try {
      const response = await api.get("appointment/books", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = response.data.appointments;
    

      setAppointments(data);
    
      
    } catch (error) {

      toast.error(error.response.data.message);
      
    }
  }

  const deleteAppointment = async (appointmentId) => {
    try {

      const response = await api.delete(`appointment/delete/${appointmentId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
   setAppointments(appointments.filter((appointment) => appointment.id !== appointmentId))
      toast.success(response.data.message);
      
    } catch (error) {

      toast.error(error.response.data.message);
      
    }
  }

  useEffect(() => {
getAllAppointments();
   
  }, [])


return (
  <div className="appointments">
    <h2>Seus agendamentos:</h2>
    <div className="appointment-container">
      {!appointments ? (
        <p>Carregando...</p>
      ) : appointments.length === 0 ? (
        <div className="noappointments">
          <p>Sem agendamentos. Faça o seu primeiro na aba "Fazer Agendamento"</p>
          <img src={barberbrush} alt="barber brush" />
          
        </div>
      ) : (
        appointments.map((appointment) => (
          <div className="appointment-list" key={appointment.id}>
            <div className="appointment-info">
              <p>Data agendada: {appointment.date}</p>
              <p>Horário: {appointment.time}</p>
            </div>
            <div className="appointment-actions">
              <button className="edit-btn-book">
                <Link to={`/editbook/${appointment.id}`}>Remarcar</Link>
              </button>
              <button
                className="delete-btn"
                onClick={() => deleteAppointment(appointment.id)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);

}

export default Appointments