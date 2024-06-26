const Medecin = require('./models/medecin'); // Assurez-vous que votre modèle est nommé Medecin

// Ajouter un médecin
exports.add_medecin = async (req, res) => {
    console.log("Reçu :", req.body);

    const { password, specialite, email } = req.body;
    if (!password || !specialite || !email) {
        return res.status(400).json({ status: "password, specialite, et email sont requis." });
    }

    const newMedecin = new Medecin(req.body);

    try {
        const savedMedecin = await newMedecin.save();
        res.status(200).send(savedMedecin);
    } catch (error) {
        console.error("Erreur lors de la sauvegarde du medecin:", error);
        res.status(400).json({ status: error.message });
    }
};

// Supprimer un médecin
exports.delet_medecin = async (req, res) => {
    try {
        let data = await Medecin.findByIdAndDelete(req.params.id);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Obtenir tous les médecins
exports.get_medecin = async (_req, res) => {
    try {
        let data = await Medecin.find();
        res.status(200).send({ "medecins": data });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

// Obtenir un médecin par nom
exports.get_medecin_byName = async (req, res) => {
    try {
        const query = { name: req.params._Nom };
        let data = await Medecin.find(query);
        res.status(200).json({ "status": "200", "medecin": data });
    } catch (error) {
        res.status(500).json(error.message);
    }
};
