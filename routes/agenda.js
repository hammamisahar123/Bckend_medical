const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/agendaController');

router.post("/api/add_rendez", appointmentController.add_rendez);
router.get('/api/getAppointmentByDate/:_Date', appointmentController.getAppointmentByDate);
router.get("/api/getAppointmentsByName/", appointmentController.getAppointmentsByName);
router.put("/api/updateAppointment/:_id", appointmentController.updateAppointment);
router.delete("/api/deleteAppointment/:id", appointmentController.deleteAppointment);

module.exports = router;
