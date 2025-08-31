const Appointment = require("../models/Appointment")



let availableTimes = [
  "08:00", "09:00", "10:00", "11:00", 
   "13:00", "14:00", "15:00", 
  "16:00", "17:00", "18:00", "19:00", "20:00"
];

const getAvailableTimes = async (date) => {

 

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0)

  const dateObj = new Date(date);
  dateObj.setUTCHours(0, 0, 0, 0)

   if(dateObj.getDay() === 6 || dateObj.getDay() === 0) {
  return [];
 }
if(dateObj.getDay() === 5) {
    availableTimes = ["8:00", "9:00", "10:00", "11:00", "12:00"]
 } else {
  availableTimes = [
  "08:00", "09:00", "10:00", "11:00", 
   "13:00", "14:00", "15:00", 
  "16:00", "17:00", "18:00", "19:00", "20:00"
];

 }
 

if(dateObj.getTime() === today.getTime()) {
  const now = new Date();
  const current = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;



  const upcoming = availableTimes.filter(time => time > current);

  
  const getAppointments = await Appointment.findAll({ where: { date } });
  const booked = getAppointments.map(a => a.time.substring(0, 5));

  return upcoming.filter(time => !booked.includes(time));
  
} 


if(dateObj.getDate() < today.getDate()) {
  return [];
}

 if(dateObj.getMonth() !== today.getMonth()) {
  return [];

 }
 if(dateObj.getFullYear() > today.getFullYear() || dateObj.getFullYear() < today.getFullYear())  {
  return [];
 }

 




    const getAppointments = await Appointment.findAll({where: {date}})

  const bookedTimes = getAppointments.map(appointment => appointment.time.substring(0, 5))

  const available = availableTimes.filter(time => !bookedTimes.includes(time));

  return available;



}
module.exports = getAvailableTimes;