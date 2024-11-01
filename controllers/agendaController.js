const Rendezvous = require('../models/appoin'); // Assurez-vous que votre modèle est nommé Rendezvous

// Ajouter un rendez-vous
exports.add_rendez = async (req, res) => {
    console.log("Result", req.body);

    // Création d'un nouveau rendez-vous avec les données du corps de la requête
    let data = new Rendezvous(req.body);

    try {
        let dataToStore = await data.save();
        res.status(200).send(dataToStore); // Réponse en cas de succès
    } catch (error) {
        res.status(400).json({ 'status': error.message }); // Réponse en cas d'erreur
    }
};

// Obtenir un rendez-vous par date
exports.getAppointmentByDate = async (req, res) => {
    try {
        const query = { date: req.params._Date }; // Requête pour obtenir un rendez-vous en fonction de la date
        let data = await Rendezvous.find(query);
        res.status(200).json({ status: "200", "Rendezvous": data });
    } catch (error) {
        res.status(500).json({ 'error': error.message }); // Réponse en cas d'erreur serveur
    }
};

// Obtenir tous les rendez-vous

exports.getAppointmentsByName = async (req, res) => {
    try {
        // Extracting 'name' and 'prenom' from query parameters
        const { name, prenom } = req.query;

        // Check if either 'name' or 'prenom' is missing
        if (!name || !prenom) {
            return res.status(400).json({ error: "Name and prenom are required" });
        }

        // Fetch appointments that match the given 'name' and 'prenom'
        const data = await Rendezvous.find({
            'formulaire.name': name,
            'formulaire.prenom': prenom
        });

        // If no appointments are found
        if (data.length === 0) {
            return res.status(404).json({ message: "No appointments found for the given name and prenom" });
        }

        // Return the found appointments
        res.status(200).json({ rendezvous: data });
    } catch (error) {
        // Log the error for debugging
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Mettre à jour un rendez-vous
exports.updateAppointment = async (req, res) => {
    const appoinId = req.params.id; // Récupérer l'ID du rendez-vous à mettre à jour
    const updatedData = req.body; // Données mises à jour
    const options = { new: true }; // Option pour renvoyer les nouvelles données après la mise à jour

    try {
        const updatedAppointment = await Rendezvous.findByIdAndUpdate(appoinId, updatedData, options);
        res.status(200).json(updatedAppointment); // Réponse avec les nouvelles données mises à jour
    } catch (error) {
        res.status(500).json({ 'error': error.message }); // Réponse en cas d'erreur serveur
    }
};

// Supprimer un rendez-vous
exports.deleteAppointment = async (req, res) => {
    try {
        const appoinId = req.params.id; // Récupérer l'ID du rendez-vous à supprimer
        
        // Vérifiez si l'ID est valide
        if (!appoinId) {
            return res.status(400).json({ message: 'ID du rendez-vous manquant.' });
        }
        
        const deletedAppointment = await Rendezvous.findByIdAndDelete(appoinId);
        
        if (!deletedAppointment) {
            return res.status(404).json({ message: 'Rendez-vous non trouvé.' });
        }

        res.status(200).json(deletedAppointment); // Réponse avec les données supprimées
    } catch (error) {
        res.status(500).json({ error: error.message }); // Réponse en cas d'erreur serveur
    }
};
