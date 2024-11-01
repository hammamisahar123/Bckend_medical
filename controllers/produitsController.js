const Product = require('../models/produits');

// Ajouter un produit
exports.add_produits = async (req, res) => {
    console.log("Données reçues :", req.body);

    // Vérifiez si tous les champs requis sont présents
    const { name, prix, type, categorie, quantite, classe } = req.body;
    if (!name || !prix || !type || !categorie || !quantite || !classe) {
        return res.status(400).json({ 'status': 'Tous les champs sont requis.' });
    }

    let data = new Product(req.body);

    try {
        let dataToStore = await data.save();
        console.log("Produit ajouté avec succès :", dataToStore);
        res.status(200).send(dataToStore);
    } catch (error) {
        console.error("Erreur lors de l'ajout du produit :", error.message);
        res.status(400).json({ 'status': error.message });
    }
};

exports.addproduits = async (req, res) => {
    // Vérifiez si le fichier image a été téléchargé
    if (!req.file) {
        return res.status(400).json({ status: "L'image est requise." });
    }

    // Créer un nouveau profil patient avec l'image incluse
    let data = new Product({
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

// Met
exports.updateproduits = async (req, res) => {
    let id = req.params.id;
    console.log("ID reçu:", id);  // Vérification de l'ID
    console.log("Données mises à jour reçues:", req.body);  // Vérification des données

    let updatedData = req.body;
    let options = { new: true };  // Retourner le document mis à jour

    try {
        let product = await Product.findById(id);
        if (!product) {
            return res.status(404).send({ message: "Produit non trouvé pour l'ID : " + id });
        }

        // Mise à jour du produit
        let updatedProduct = await Product.findByIdAndUpdate(id, updatedData, options);
        res.status(200).send(updatedProduct);
    } catch (error) {
        // Gestion des erreurs d'ID invalide ou d'autres erreurs serveur
        if (error.kind === "ObjectId") {
            return res.status(400).send({ message: "ID de produit invalide" });
        }
        res.status(500).send({ message: "Erreur serveur" });
    }
};


// Supprimer un produit
exports.deletproduits= async (req, res) => {
    try {
        let data = await Product.findByIdAndDelete(req.params.id);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
