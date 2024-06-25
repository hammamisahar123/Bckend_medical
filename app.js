const express = require("express")
const mongoose = require('mongoose');

const app = express();
const path = require('path'); // Add this line to import the path module

const User = require("./models/user");
const produits = require("./models/produits");
const magazine = require("./models/magazine");
const temps = require("./models/temps");
const dossier = require("./models/dossier");
const medecin = require("./models/medecin");
const appointment = require("./models/appoin");
app.use(express.static(path.join(__dirname, "public"))); //***// */

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));




//const methodOverride = require("method-override");
//app.use(methodOverride("_method", { methods: ["POST", "GET"] }));

//connsect ro mongoose
mongoose.connect('mongodb://localhost:27017/Prodmedical');
app.use(express.json());

function errHandler(err, req, res, next) {
    if (err) {
        res.json({
            sucess: 0,
            message: err.message
        })
    }
}




app.use(errHandler);



//users

app.post("/api/add_user", async (req, res) => {
    console.log("Result", req.body);


    let data = User(req.body);

    try {

        let dataToStore = await data.save();

        //l reponse ali n7bha tetb3ath bl status ali n7bou send response 
        res.status(200).send(dataToStore);

    } catch (error) {
        res.status(400).json(
            {
                'status': error.message
            }
        );

    }


})

app.get("/api/get_users", async (req, res) => {


    try {
        //find all product 
        let data = await User.find();
        //send response fl status ali n7b aliih bl message 
        //wela fichier json ali n7b 3leha najm nasna3eha eni
        res.status(200).send(
            {
                "users": data
            }

        );

    } catch (error) {
        res.status(500).json(error.message);

    }


})

//get by id 
//get api
app.get("/api/get_user/:_id", async (req, res) => {

    try {
        //find all product 
        let data = await User.findById(req.params._id);
        //send response fl status ali n7b aliih bl message 
        //wela fichier json ali n7b 3leha najm nasna3eha eni
        res.status(200).json(
            {
                "status": "200",
                "user": data
            }


        );


    } catch (error) {
        res.status(500).json(error.message);

    }


})

app.put("/api/updateUser/:id", async (req, res) => {



    let id = req.params.id;
    let updatedData = req.body;
    let options = { new: true };
    try {


        let data = await User.findByIdAndUpdate(id, updatedData, options);
        res.status(200).send(data);
        console.log(data);

    } catch (error) {
        res.send(error.message);
    }


})



//delete

app.delete("/api/deleteUser/:id", async (req, res) => {


    try {

        let data = await User.findByIdAndDelete(req.params.id);
        // lfonction hadhi t returni l data ali deleted
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error.message);
    }



})

app.get("/api/get_user_byEmail/:attribute", async (req, res) => {

    try {
        
        const query = {};
        query["email"] = req.params.attribute;

        let data = await User.find(query);
        
        res.status(200).json(
            {
                "status": "200",
                "user": data
            }


        );

    } catch (error) {
        res.status(500).json(error.message);

    }


});


///////////////////////////////////////////////////////////////////////////produits



app.post("/api/add_produits", async (req, res) => {
    console.log("Result", req.body);


    let data = produits(req.body);

    try {

        let dataToStore = await data.save();

        //l reponse ali n7bha tetb3ath bl status ali n7bou send response 
        res.status(200).send(dataToStore);

    } catch (error) {
        res.status(400).json(
            {
                'status': error.message
            }
        );

    }


})



app.get("/api/get_produits", async (req, res) => {


    try {
        //find all product 
        let data = await produits.find();
        //send response fl status ali n7b aliih bl message 
        //wela fichier json ali n7b 3leha najm nasna3eha eni
        res.status(200).send(
            {
                "produits": data
            }

        );

    } catch (error) {
        res.status(500).json(error.message);

    }


})
//get par nom pour la recherche
app.get("/api/get_produits_byName/:_Nom", async (req, res) => {

    try {
        const query = {};
        
        query["name"] = req.params._Nom;
        //find all product 
        let data = await produits.find(query);
        //send response fl status ali n7b aliih bl message 
        //wela fichier json ali n7b 3leha najm nasna3eha eni
        res.status(200).json(
            {
                "status": "200",
                "produits": data
            }


        );


    } catch (error) {
        res.status(500).json(error.message);

    }


})
app.get("/api/get_produits_byCategorie/:_Categorie", async (req, res) => {

    try {
        const query = {};
        
        query["categorie"] = req.params._Categorie;
        //find all product 
        let data = await produits.find(query);
        //send response fl status ali n7b aliih bl message 
        //wela fichier json ali n7b 3leha najm nasna3eha eni
        res.status(200).json(
            {
                "status": "200",
                "produits": data
            }


        );


    } catch (error) {
        res.status(500).json(error.message);

    }


})
app.get("/api/get_produits_byType/:_Type", async (req, res) => {

    try {
        const query = {};
        
        query["type"] = req.params._Type;
        //find all product 
        let data = await produits.find(query);
        //send response fl status ali n7b aliih bl message 
        //wela fichier json ali n7b 3leha najm nasna3eha eni
        res.status(200).json(
            {
                "status": "200",
                "produits": data
            }


        );


    } catch (error) {
        res.status(500).json(error.message);

    }


})
///PUT
app.put("/api/updateproduits/:id", async (req, res) => {



    let id = req.params.id;
    let updatedData = req.body;
    let options = { new: true };
    try {


        let data = await produits.findByIdAndUpdate(id, updatedData, options);
        res.status(200).send(data);
        console.log(data);

    } catch (error) {
        res.send(error.message);
    }


})

//delet 
app.delete("/api/deletproduits/:id", async (req, res) => {


    try {

        let data = await produits.findByIdAndDelete(req.params.id);
        // lfonction hadhi t returni l data ali deleted
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error.message);
    }



})


///////////////////////////////////////////////////////////////////////////////////////////////temps
//ajouter
app.post("/api/add_temps", async (req, res) => {
    console.log("Result", req.body);


    let data = temps(req.body);

    try {

        let dataToStore = await data.save();

        //l reponse ali n7bha tetb3ath bl status ali n7bou send response 
        res.status(200).send(dataToStore);

    } catch (error) {
        res.status(400).json(
            {
                'status': error.message
            }
        );

    }


})
//modifier


app.put("/api/update_temps/:id", async (req, res) => {



    let id = req.params.id;
    let updatedData = req.body;
    let options = { new: true };
    try {


        let data = await temps.findByIdAndUpdate(id, updatedData, options);
        res.status(200).send(data);
        console.log(data);

    } catch (error) {
        res.send(error.message);
    }


})

//delet 
app.delete("/api/delet_temps/:id", async (req, res) => {


    try {

        let data = await temps.findByIdAndDelete(req.params.id);
        // lfonction hadhi t returni l data ali deleted
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error.message);
    }



})
app.get("/api/get_temps_byId/:_Id", async (req, res) => {

    try {
        const query = {};
        
        //query["name"] = req.params._Id;
        let data = await temps.findById(req.params._Id);
        //find all product 
       // let data = await temps.find(query);
        //send response fl status ali n7b aliih bl message 
        //wela fichier json ali n7b 3leha najm nasna3eha eni
        res.status(200).json(
            {
                "status": "200",
                "temps": data
            }


        );


    } catch (error) {
        res.status(500).json(error.message);

    }


})
////////////////////////////////////////////////////////////////////////////////////////medecin
app.post("/api/add_medecin", async (req, res) => {
    console.log("Reçu :", req.body);

    // Valider les données avant de créer le modèle
    const { password, specialite,  email } = req.body;
    if (!password|| !specialite || !email) {
        return res.status(400).json({ status: "password, specialite, et email sont requis." });
    }

    // Créer une nouvelle instance du modèle Medecin avec les données de la requête
    const newMedecin = new medecin(req.body);

    try {
        // Essayer de sauvegarder le nouveau medecin dans la base de données
        const savedMedecin = await newMedecin.save();

        // Envoyer une réponse de succès avec les données du medecin sauvegardé
        res.status(200).send(savedMedecin);
    } catch (error) {
        // En cas d'erreur, l'erreur est loguée et une réponse 400 est envoyée avec le message d'erreur
        console.error("Erreur lors de la sauvegarde du medecin:", error);
        res.status(400).json({ status: error.message });
    }
});

app.delete("/api/delet_medecin/:id", async (req, res) => {


    try {

        let data = await medecin.findByIdAndDelete(req.params.id);
        // lfonction hadhi t returni l data ali deleted
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error.message);
    }



})
app.get("/api/get_medecin", async (req, res) => {


    try {
        //find all product 
        let data = await medecin.find();
        //send response fl status ali n7b aliih bl message 
        //wela fichier json ali n7b 3leha najm nasna3eha eni
        res.status(200).send(
            {
                "medecin": data
            }

        );

    } catch (error) {
        res.status(500).json(error.message);

    }


})
app.get("/api/get_medecin_byName/:_Nom", async (req, res) => {

    try {
        const query = {};
        
        query["name"] = req.params._Nom;
        //find all product 
        let data = await medecin.find(query);
        //send response fl status ali n7b aliih bl message 
        //wela fichier json ali n7b 3leha najm nasna3eha eni
        res.status(200).json(
            {
                "status": "200",
                "connexion": data
            }


        );


    } catch (error) {
        res.status(500).json(error.message);

    }


})


/////////////////////////////////////////////////////////////////////////magazine
app.post("/api/add_magazine", async (req, res) => {
    console.log("Result", req.body);


    let data = magazine(req.body);

    try {

        let dataToStore = await data.save();

        //l reponse ali n7bha tetb3ath bl status ali n7bou send response 
        res.status(200).send(dataToStore);

    } catch (error) {
        res.status(400).json(
            {
                'status': error.message
            }
        );

    }


})
app.delete("/api/delet_magazine/:id", async (req, res) => {


    try {

        let data = await articles.findByIdAndDelete(req.params.id);
        // lfonction hadhi t returni l data ali deleted
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error.message);
    }



})
app.get("/api/get_magazine", async (req, res) => {


    try {
        //find all product 
        let data = await magazine.find();
        //send response fl status ali n7b aliih bl message 
        //wela fichier json ali n7b 3leha najm nasna3eha eni
        res.status(200).send(
            {
                "articles": data
            }

        );

    } catch (error) {
        res.status(500).json(error.message);

    }


})

app.put("/api/update_magazine/:id", async (req, res) => {



    let id = req.params.id;
    let updatedData = req.body;
    let options = { new: true };
    try {


        let data = await articles.findByIdAndUpdate(id, updatedData, options);
        res.status(200).send(data);
        console.log(data);

    } catch (error) {
        res.send(error.message);
    }


})

////////////////////////////////////dossier


app.post("/api/addDossier", async (req, res) => {
    console.log("Result", req.body);


    let data = dossier(req.body);

    try {

        let dataToStore = await data.save();

        //l reponse ali n7bha tetb3ath bl status ali n7bou send response 
        res.status(200).send(dataToStore);

    } catch (error) {
        res.status(400).json(
            {
                'status': error.message
            }
        );

    }


})
//////////////////////////////////////////////////////////////////////////////////////////////rendezvous
app.post("/api/add_appointment", async (req, res) => {
    console.log("Result", req.body);

    let data = appointment(req.body);

    try {
        let dataToStore = await data.save();
        res.status(200).send(dataToStore);
    } catch (error) {
        res.status(400).json({
            'status': error.message
        });
    }
});
///GET PAR DATE
app.get("/api/get_appointment_byDate/:_Date", async (req, res) => {

    try {
        const query = {};
        
        query["date"] = req.params._Date;
        //find all product 
        let data = await appointment.find(query);
        //send response fl status ali n7b aliih bl message 
        //wela fichier json ali n7b 3leha najm nasna3eha eni
        res.status(200).json(
            {
                "status": "200",
                "Rendezvous": data
            }


        );


    } catch (error) {
        res.status(500).json(error.message);

    }


})



///GET
app.get("/api/get_appointment", async (req, res) => {


    try {
        //find all product 
        let data = await appointment.find();
        //send response fl status ali n7b aliih bl message 
        //wela fichier json ali n7b 3leha najm nasna3eha eni
        res.status(200).send(
            {
                "rendezvous": data
            }

        );

    } catch (error) {
        res.status(500).json(error.message);

    }


});
app.put("/api/update_appointment/:id", async (req, res) => {
    const appointmentId = req.params.id;
    const updatedData = req.body;
    const options = { new: true };
    try {
        const updatedappointment = await appointmentId.findByIdAndUpdate(appointmentId, updatedData, options);
        res.status(200).json(updatedappointment); // Renvoie les données mises à jour
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.delete("/api/delete_appointment/:id", async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const deletedappointment = await appointmentId.findByIdAndDelete(appointmentId);
        res.status(200).json(deletedappointment); // Renvoie les données supprimées
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




app.listen(5000, () => {

    console.log("connected on port 5000")
})