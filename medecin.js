//cerate schema 
const mongoose = require("mongoose");

let dataSchema = new mongoose.Schema({

   
    'password': {
        required: true,
        type: String
    },
    'email': {
        required: true,
        type: String
    },
    'specialite':{
        required:true,
        type:String

    },




})
// module.exports=mongoose.model("nom de collection",dataSchema)                         
module.exports = mongoose.model("medecin", dataSchema);