const profilpatient = require('../models/profilpatient');

// Ajouter un patient
exports.addpatient = async (req, res) => {
    // Vérifiez si le fichier image a été téléchargé
    if (!req.file) {
        return res.status(400).json({ status: "L'image est requise." });
    }

    // Créer un nouveau profil patient avec l'image incluse
    let data = new profilpatient({
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


// Obtenir tous les patients
exports.getpatient = async (_req, res) => {
    try {
        let data = await profilpatient.find();
        res.status(200).send({ "patients": data });
    } catch (error) {
        res.status(500).json({ 'error': error.message });
    }
};
// obtenir un patient
exports.getpatientByEmail = async (_req, res) => {
    try {
        const query = {};
        query["email"] = _req.params.attribute;
        let data = await profilpatient.find(query);

        res.status(200).json(
            {
                
                "patients": data
            }


        );

        
      //  res.status(200).send({ "patients": data });
        console.log("patients",data);
    } catch (error) {
        res.status(500).json({ 'error': error.message });
        console.log(error);
    }
};


// Mettre à jour un patient
exports.updatepatient = async (req, res) => {
    let id = req.params.id;
    let updatedData = req.body;
    let options = { new: true };

    try {
        let data = await profilpatient.findByIdAndUpdate(id, updatedData, options);
        if (!data) {
            return res.status(404).send({ message: "Patient non trouvé" });
        }
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({ 'error': error.message });
    }
};

// Supprimer un patient
exports.deletepatient = async (req, res) => {
    try {
        let data = await profilpatient.findByIdAndDelete(req.params.id);
        if (!data) {
            return res.status(404).send({ message: "Patient non trouvé" });
        }
        res.status(200).send({ message: "Patient supprimé avec succès" });
    } catch (error) {
        res.status(500).send({ 'error': error.message });
    }
};
