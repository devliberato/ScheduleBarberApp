const express = require("express"); 
const cors  = require("cors");
const conn = require("./db/conn");
const barberRoutes = require("./routes/barberRoutes")
const userRoutes = require("./routes/userRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes")

const User = require("./models/User");
const Appointment = require("./models/Appointment");
const Barber = require("./models/Barber");

const app = express();
require("dotenv").config();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());

app.use("/barber", barberRoutes);
app.use("/appointment", appointmentRoutes);
app.use("/user", userRoutes);





app.use(express.static("public"));

conn.sync().then(() => {
    app.listen(port, () => {
        console.log("Rodando o servidor")
    })
});