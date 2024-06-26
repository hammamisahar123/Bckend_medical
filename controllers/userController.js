const User = require('./models/user');

// Ajouter un utilisateur
exports.addUser = async (req, res) => {
    console.log("Result", req.body);

    let data = new User(req.body);

    try {
        let dataToStore = await data.save();
        res.status(200).send(dataToStore);
    } catch (error) {
        res.status(400).json({ 'status': error.message });
    }
};

// Obtenir tous les utilisateurs
exports.getUsers = async (_req, res) => {
    try {
        let data = await User.find();
        res.status(200).send({ "users": data });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

// Obtenir un utilisateur par ID
exports.getUserById = async (req, res) => {
    try {
        let data = await User.findById(req.params._id);
        res.status(200).json({ "status": "200", "user": data });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

// Mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
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
exports.deleteUser = async (req, res) => {
    try {
        let data = await User.findByIdAndDelete(req.params.id);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Obtenir un utilisateur par email
exports.getUserByEmail = async (req, res) => {
    try {
        const query = { email: req.params.attribute };
        let data = await User.find(query);
        res.status(200).json({ "status": "200", "user": data });
    } catch (error) {
        res.status(500).json(error.message);
    }
};
