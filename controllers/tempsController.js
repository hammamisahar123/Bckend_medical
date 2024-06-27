const Time = require('../models/temps'); // Assurez-vous que votre modèle est nommé Time

// Ajouter un temps
exports.add_temps = async (req, res) => {
    console.log("Result", req.body);

    let data = new Time(req.body);

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
        let data = await Time.findByIdAndUpdate(id, updatedData, options);
        res.status(200).send(data);
        console.log(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Supprimer un temps
exports.delet_temps = async (req, res) => {
    try {
        let data = await Time.findByIdAndDelete(req.params.id);
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
