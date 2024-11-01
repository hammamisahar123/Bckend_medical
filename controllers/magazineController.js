const Magazine = require('../models/magazine'); // Assurez-vous que votre modèle est nommé Magazine

// Ajouter un magazine
exports.addMagazine = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ status: "L'image est requise." });
    }

    // Créer un nouveau profil patient avec l'image incluse
    let data = new Magazine({
        ...req.body,
        imageUrl: req.file.filename // Le nom du fichier image
    });

    try {
        let dataToStore = await data.save();
        res.status(200).send(dataToStore);
    } catch (error) {
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
