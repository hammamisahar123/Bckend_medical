const Medecin = require('../models/medecin'); // Assurez-vous que votre modèle est nommé Medecin

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
exports.get_Medecin_ByEmail = async (req, res) => {
    try {
        const email = req.params.email; // Récupère l'email du paramètre de requête
        let data = await Medecin.findOne({ email: email }); // Utilise findOne pour ne récupérer qu'un seul médecin
        if (!data) {
            return res.status(404).json({ message: "Médecin non trouvé." });
        }
        res.status(200).json({ medecin: data });
        console.log("Médecin récupéré:", data);
    } catch (error) {
        res.status(500).json({ 'error': error.message });
        console.log("Erreur:", error);
    }
};

