const Profilmed = require('../models/profilmédecin');

// Ajouter un utilisateur
exports.addprofil = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ status: "L'image est requise." });
    }

    // Créer un nouveau profil patient avec l'image incluse
    let data = new Profilmed({
        ...req.body,
        image: req.file.filename // Le nom du fichier image
    });

    try {
        let dataToStore = await data.save();
        res.status(200).send(dataToStore);
    } catch (error) {
        res.status(400).json({ status: error.message });
    }
};
/////////////rechercher
// profilmedController.js

// Fonction pour obtenir tous les médecins
exports.getDoctors = async (req, res) => {
    try {
        const doctors = await Profilmed.find({});
        res.json(doctors);
    } catch (error) {
        console.error("Erreur lors de la récupération des médecins:", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

// Fonction pour rechercher les médecins
// profilmedController.js

// Fonction pour rechercher les médecins par prénom et nom
exports.searchDoctors = async (req, res) => {
    const { Prenom, Nom } = req.params; // Récupérer les paramètres de l'URL

    try {
        const doctors = await Profilmed.find({
            $and: [
                { Prenom: { $regex: Prenom, $options: "i" } }, // Ignorer la casse
                { Nom: { $regex: Nom, $options: "i" } }
            ]
        });

        // Retourner les résultats
        res.json(doctors);
    } catch (error) {
        console.error("Erreur lors de la recherche des médecins:", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};


exports.getmedcinByEmail = async (_req, res) => {
    try {
        const query = {};
        query["Email"] = _req.params.attribute;
        let data = await Profilmed.find(query);

        res.status(200).json(
            {
                
                "medecin": data
            }


        );

        
      //  res.status(200).send({ "patients": data });
        console.log("medecin",data);
    } catch (error) {
        res.status(500).json({ 'error': error.message });
        console.log(error);
    }
};
// Obtenir tous les utilisateurs
exports.getprofil = async (_req, res) => {
    try {
        let data = await Profilmed.find();
        res.status(200).send({ "users": data });
    } catch (error) {
        res.status(500).json(error.message);
    }
};



// Mettre à jour un utilisateur
exports.updateprofil = async (req, res) => {
    let id = req.params.id;
    let updatedData = req.body;
    let options = { new: true };

    try {
        let data = await User.findByIdAndUpdate(id, updatedData, options);
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Supprimer un utilisateur
exports.deletprofil = async (req, res) => {
    try {
        let data = await Profilmed.findByIdAndDelete(req.params.id);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


