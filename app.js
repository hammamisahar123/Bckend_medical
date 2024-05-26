const express = require("express")
const mongoose = require('mongoose');
const app = express();
const User = require("./user");
const produits = require("./produits");
//zdet déclaration produit
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


//produits



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
                "user": data
            }


        );


    } catch (error) {
        res.status(500).json(error.message);

    }


})
//put

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












app.listen(5000, () => {

    console.log("connected on port 5000")
})