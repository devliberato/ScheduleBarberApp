const express = require("express");
const router = express.Router();
const BarberController = require("../controllers/BarberController");


//helpers
const verifyToken = require("../helpers/verify-token");


router.post("/login", BarberController.login);
router.get("/getallappointments", verifyToken, BarberController.getAllAppointments);

module.exports = router;