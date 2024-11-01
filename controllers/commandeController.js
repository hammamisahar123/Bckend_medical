const commande = require('../models/commande');

// Ajouter un rendez-vous
exports.add_commande = async (req, res) => {
    console.log("Result", req.body);

    // Création d'un nouveau rendez-vous avec les données du corps de la requête
    let data = new commande(req.body);

    try {
        let dataToStore = await data.save();
        res.status(200).send(dataToStore); // Réponse en cas de succès
    } catch (error) {
        res.status(400).json({ 'status': error.message }); // Réponse en cas d'erreur
    }
};

// Import du modèle de commande
const Commande = require('../models/commande');

// Fonction pour obtenir les commandes par date
// Fonction pour obtenir les commandes par date
exports.getcommandeByDate = async (req, res) => {
    try {
        const selectedDate = new Date(req.params._Date);
        const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0)); // Début du jour
        const endOfDay = new Date(selectedDate.setHours(23, 59, 59, 999)); // Fin du jour

        const commandes = await Commande.find({
            date_commande: {
                $gte: startOfDay,  // >= début du jour
                $lt: endOfDay      // < fin du jour
            }
        });

        res.status(200).json({ status: "200", commande: commandes });
    } catch (error) {
        res.status(500).json({ 'error': error.message });
    }
};


exports.getcommande = async (_req, res) => {
    try {
        let data = await commande.find(); // Récupération de tous les rendez-vous
        res.status(200).send({ "commande": data });
    } catch (error) {
        res.status(500).json({ 'error': error.message }); // Réponse en cas d'erreur serveur
    }
};

// Mettre à jour un rendez-vous
exports.updatecommande = async (req, res) => {
    const commandeId = req.params.id; // Récupérer l'ID du rendez-vous à mettre à jour
    const updatedData = req.body; // Données mises à jour
    const options = { new: true }; // Option pour renvoyer les nouvelles données après la mise à jour

    try {
        const updatecommande = await commande.findByIdAndUpdate(commandeId, updatedData, options);
        res.status(200).json(updatecommande); // Réponse avec les nouvelles données mises à jour
    } catch (error) {
        res.status(500).json({ 'error': error.message }); // Réponse en cas d'erreur serveur
    }
};

// Supprimer une commande
exports.deletecommande = async (req, res) => {
    try {
        const commandeId = req.params.id; // Récupérer l'ID du rendez-vous à supprimer
        const deletecommande = await commande.findByIdAndDelete(commandeId);
        res.status(200).json(deletecommande); // Réponse avec les données supprimées
    } catch (error) {
        res.status(500).json({ 'error': error.message }); // Réponse en cas d'erreur serveur
    }
};
