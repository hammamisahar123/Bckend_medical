const Profil = require('../models/profil');

// Ajouter un utilisateur
exports.add_profil = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ status: "L'image est requise." });
    }

    // Créer un nouveau profil patient avec l'image incluse
    let data = new Profil({
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

// Obtenir tous les utilisateurs
exports.get_profil_by_email = async (req, res) => {
    const email = req.params.email; // Récupérer l'email depuis les paramètres de la requête
    try {
        // Rechercher un profil par email (champ correct)
        const profil = await Profil.findOne({ Email: email }); // Assurez-vous que le champ ici est "Email"

        if (!profil) {
            return res.status(404).json({ message: "Profil non trouvé" });
        }

        // Envoyer le profil trouvé
        res.status(200).json(profil); // Utilisez json() pour renvoyer l'objet
    } catch (error) {
        // Meilleure gestion des erreurs
        console.error(error); // Enregistrer l'erreur pour le débogage
        res.status(500).json({ message: "Erreur lors de la récupération du profil", error: error.message });
    }
};


// Mettre à jour un utilisateur
exports.update_profil = async (req, res) => {
    const id = req.params.id; // Récupérer l'ID de l'utilisateur à partir des paramètres de la requête
    const updatedData = req.body; // Récupérer les données mises à jour depuis le corps de la requête
    const options = { new: true }; // Renvoie le document mis à jour

    // Validation des données d'entrée
    if (!id || !updatedData) {
        return res.status(400).send({ message: 'ID de l’utilisateur et données à mettre à jour requis.' });
    }

    try {
        // Mise à jour de l'utilisateur dans la base de données
        const data = await User.findByIdAndUpdate(id, updatedData, options);

        // Vérifier si l'utilisateur a été trouvé et mis à jour
        if (!data) {
            return res.status(404).send({ message: 'Utilisateur non trouvé.' });
        }

        res.status(200).send(data); // Retourner les données mises à jour
    } catch (error) {
        // Gérer les erreurs de mise à jour
        res.status(500).send({ message: 'Erreur lors de la mise à jour de l’utilisateur.', error: error.message });
    }
};


// Supprimer un utilisateur
exports.delet_profil = async (req, res) => {
    try {
        let data = await profil.findByIdAndDelete(req.params.id);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


