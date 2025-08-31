import api from "../axios/api"
import { useState, useEffect } from "react"
import {toast} from "react-toastify"
import "./BookAppointment.css"
import { useNavigate} from "react-router-dom"

const BookAppointment = () => {
const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
const [availableTimes, setAvailableTimes] = useState([]);
 const token = localStorage.getItem("token");


const getAvaileTimesForDate = async(selectedDate) => {

if(!selectedDate) return;

  try {
    const response = await api.get(`appointment/availabletimes/${selectedDate}`)
setAvailableTimes(response.data.message);

  } catch (error) {
    toast.error(error.response.data.message);
    setAvailableTimes([]);
  }
}
useEffect(() => {
getAvaileTimesForDate(date);
}, [date])




  const handleBookSubmit = async (e) => {
    e.preventDefault();

    const book = {
      date, time
    }

    setLoading(true);

    try {

      const response = await api.post("appointment/book", book, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
       if(response) {
        toast.success(response.data.message)
       navigate("/appointments")
       setLoading(false);
       }

    } 
   
    catch (error) {
      if(!date);
      if(!time);
toast.error(error.response.data.message);
setLoading(false);
      
    }
  }
  


  return (
    <div className="book-container">
      <h2>Faça o seu agendamento abaixo:</h2>
      <form onSubmit={handleBookSubmit}>
        <div className="control-form">
          <label htmlFor="date"> Data</label>
          <input type="date" name="date" onChange={(e) => setDate(e.target.value)}/>
        </div>
              <div className="control-form">
          <label htmlFor="time">Horários disponíveis:</label>
          <div className="available-times">
            {availableTimes.map((availableTime, index) => (
              <button key={index} type="button" className={`time-button ${time === availableTime ? "selected" : ""}`} onClick={() => setTime(availableTime)}>
                {availableTime}
              </button>
            ))}
          </div>
        </div>
          <input type="submit" disabled={loading} value={loading ? "Agendando..." : "Agendar"} className="btn" />
      {availableTimes.length > 0 && (<p className="appointment-status open">Aberto</p>)}
         {availableTimes.length === 0 && (<p className="appointment-status close">Fechado</p>)}
      </form>
     
    </div>
  )
}

export default BookAppointment