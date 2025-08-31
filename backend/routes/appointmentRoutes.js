const express = require("express");
const router = express.Router();
const AppointmentController = require("../controllers/AppointmentController");


//middlewars
const verifyToken = require("../helpers/verify-token")

router.get("/availabletimes/:date", AppointmentController.getAvailableTimesForDate);
router.post("/book", verifyToken, AppointmentController.book);
router.delete("/delete/:id", verifyToken, AppointmentController.deleteBook)
router.get("/books", verifyToken, AppointmentController.getAllBooks);
router.get("/book/:id", verifyToken, AppointmentController.getBookById);
router.patch("/editbook/:id", verifyToken, AppointmentController.editBook);


module.exports = router;