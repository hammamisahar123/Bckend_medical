const Product = require('./models/produits');

// Ajouter un produit
exports.add_produits = async (req, res) => {
    console.log("Result", req.body);

    let data = new Product(req.body);

    try {
        let dataToStore = await data.save();
        res.status(200).send(dataToStore);
    } catch (error) {
        res.status(400).json({ 'status': error.message });
    }
};

// Obtenir tous les produits
exports.get_produits = async (req, res) => {
    try {
        let data = await Product.find();
        res.status(200).send({ "produits": data });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

// Obtenir des produits par nom
exports.get_produits_byName = async (req, res) => {
    try {
        const query = { name: req.params._Nom };
        let data = await Product.find(query);
        res.status(200).json({ "status": "200", "produits": data });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

// Obtenir des produits par catégorie
exports.get_produits_byCategorie = async (req, res) => {
    try {
        const query = { categorie: req.params._Categorie };
        let data = await Product.find(query);
        res.status(200).json({ "status": "200", "produits": data });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

// Obtenir des produits par type
exports.get_produits_byType = async (req, res) => {
    try {
        const query = { type: req.params._Type };
        let data = await Product.find(query);
        res.status(200).json({ "status": "200", "produits": data });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

// Mettre à jour un produit
exports.updateproduits = async (req, res) => {
    let id = req.params.id;
    let updatedData = req.body;
    let options = { new: true };

    try {
        let data = await Product.findByIdAndUpdate(id, updatedData, options);
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Supprimer un produit
exports.deletproduits = async (req, res) => {
    try {
        let data = await Product.findByIdAndDelete(req.params.id);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
