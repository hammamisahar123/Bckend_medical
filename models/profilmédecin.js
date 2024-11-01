//cerate schema 
const mongoose = require("mongoose");

let dataSchema = new mongoose.Schema({

   
    'Prenom': {
        required: true,
        type: String
    },
    'Nom': {
        required: true,
        type: String
    },
    'Email':{
        required:true,
        type:String

    },
'Telephone': {
        required: true,
        type: String
    },
    'Adresse': {
        required: true,
        type: String
    },
    'specialite':{
        required:true,
        type:String

    },
 
    'Description': {
        required: true,
        type: String
    },
    'image': { 
        type: String, 
        required: true 
    },




})
// module.exports=mongoose.model("nom de collection",dataSchema)                         
module.exports = mongoose.model("prmedecin", dataSchema);