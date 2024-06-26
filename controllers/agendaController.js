const Appointment = require('./models/Appointment'); // Assurez-vous que votre modèle est nommé Appointment

// Ajouter un rendez-vous
exports.addAppointment = async (req, res) => {
    console.log("Reçu :", req.body);

    const newAppointment = new Appointment(req.body);

    try {
        const savedAppointment = await newAppointment.save();
        res.status(200).send(savedAppointment);
    } catch (error) {
        console.error("Erreur lors de la sauvegarde du rendez-vous:", error);
        res.status(400).json({ status: error.message });
    }
};

// Obtenir un rendez-vous par date
exports.getAppointmentByDate = async (req, res) => {
    try {
        const query = { date: req.params._Date };
        let data = await Appointment.find(query);
        res.status(200).json({ status: "200", "Rendezvous": data });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

// Obtenir tous les rendez-vous
exports.getAppointments = async (req, res) => {
    try {
        let data = await Appointment.find();
        res.status(200).send({ "rendezvous": data });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

// Mettre à jour un rendez-vous
exports.updateAppointment = async (req, res) => {
    const appointmentId = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(appointmentId, updatedData, options);
        res.status(200).json(updatedAppointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer un rendez-vous
exports.deleteAppointment = async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);
        res.status(200).json(deletedAppointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
