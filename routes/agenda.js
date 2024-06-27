const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.post("/api/add_appointment", appointmentController.addAppointment);
router.get("/api/get_appointment_byDate/:_Date", appointmentController.getAppointmentByDate);
router.get("/api/get_appointment", appointmentController.getAppointments);
router.put("/api/update_appointment/:id", appointmentController.updateAppointment);
router.delete("/api/delete_appointment/:id", appointmentController.deleteAppointment);

module.exports = router;
