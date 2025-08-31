import api from "../axios/api";

import { useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import {toast} from "react-toastify";
import "./EditBook.css"

const EditBook = () => {

  const {id} = useParams();
  const token = localStorage.getItem("token");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getBook = async() => {
    try {
      const response = await api.get(`appointment/book/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await response.data.appointment;

     
    
      setTime(data.time);
  
    } catch (error) {
      
    }
  }

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
   getBook();
   getAvaileTimesForDate(date)
  }, [date])

  const handleEditSubmit = async (e) => {
   e.preventDefault();

   const editBook = {
    date, time
   }

   setLoading(true);

   try {

    const response = await api.patch(`appointment/editbook/${id}`, editBook, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
   if(response) {
    setLoading(false);
     toast.success(response.data.message);
    navigate("/appointments");
   }
   } catch (error) {
    toast.error(error.response.data.message);
    setLoading(false);
   }
  }

  return (
    <div className="book-container">
      <h2>Editar agendamento:</h2>
      <form onSubmit={handleEditSubmit}>
        <div className="control-form">
          <label htmlFor="date">Data</label>
          <input type="date" name="date"  onChange={(e) => setDate(e.target.value)}/>
        </div>
              <div className="control-form">
          <label htmlFor="time">Horário que será alterado: {time}</label>
           <div className="available-times">
            {availableTimes.map((availableTime, index) => (
              <button key={index} type="button" className={`time-button ${time === availableTime ? "selected" : ""}`} onClick={() => setTime(availableTime)}>
                {availableTime}
              </button>
            ))}
          </div>
        </div>
          <input type="submit" disabled={loading} value={loading ? "Editando..." : "Editar"} className="edit-btn" />
      </form>
    </div>
  )
}

export default EditBook