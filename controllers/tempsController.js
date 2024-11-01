const temps_Medecin = require('../models/temps');

// Ajouter un temps
exports.add_temps = async (req, res) => {
    console.log("Result", req.body);

    let data = new temps_Medecin(req.body);

    try {
        let dataToStore = await data.save();
        res.status(200).send(dataToStore);
    } catch (error) {
        res.status(400).json({ 'status': error.message });
    }
};

// Mettre à jour un temps
exports.update_temps = async (req, res) => {
    let id = req.params.id;
    let updatedData = req.body;
    let options = { new: true };

    try {
        let data = await temps_Medecin.findByIdAndUpdate(id, updatedData, options);
        res.status(200).send(data);
        console.log(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Supprimer un temps
exports.delet_temps = async (req, res) => {
    try {
        let data = await temps_Medecin.findByIdAndDelete(req.params.id);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Obtenir un temps par ID
exports.get_temps_byId = async (req, res) => {
    try {
        let data = await Time.findById(req.params._Id);
        res.status(200).json({ "status": "200", "temps": data });
    } catch (error) {
        res.status(500).json(error.message);
    }
};
exports.get_temps_byDate = async (req, res) => {
    try {
        const { date } = req.params; // La date au format 'YYYY-MM-DD'

        // Rechercher les documents avec la date spécifique
        let data = await temps_Medecin.find({
            date: date
        });

        // Si aucune donnée n'est trouvée, renvoyer une réponse 404
        if (data.length === 0) {
            return res.status(404).json({ message: "No data found for this date", status: "404" });
        }

        // Afficher les données trouvées pour débogage
        console.log('Data found:', data);

        // Renvoyer les données trouvées
        res.status(200).json({ "temps": data, "status": "200" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
