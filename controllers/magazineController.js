const Magazine = require('../models/magazine'); // Assurez-vous que votre modèle est nommé Magazine

// Ajouter un magazine
exports.addMagazine = async (req, res) => {
    console.log("Reçu :", req.body);

    const newMagazine = new Magazine(req.body);

    try {
        const savedMagazine = await newMagazine.save();
        res.status(200).send(savedMagazine);
    } catch (error) {
        console.error("Erreur lors de la sauvegarde du magazine:", error);
        res.status(400).json({ status: error.message });
    }
};

// Supprimer un magazine
exports.deleteMagazine = async (req, res) => {
    try {
        let data = await Magazine.findByIdAndDelete(req.params.id);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Obtenir tous les magazines
exports.getMagazines = async (req, res) => {
    try {
        let data = await Magazine.find();
        res.status(200).send({ "magazines": data });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

// Mettre à jour un magazine
exports.updateMagazine = async (req, res) => {
    let id = req.params.id;
    let updatedData = req.body;
    let options = { new: true };

    try {
        let data = await Magazine.findByIdAndUpdate(id, updatedData, options);
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
