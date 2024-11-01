
const mongoose = require("mongoose");

let dataSchema = new mongoose.Schema({

    'name': {
        required: true,
        type: String
    },
    'prix': {
        required: true,
        type: String
    },
   
    'type': {
        required: true,
        type: String
    },
    'categorie': {
        required: true,
        type: String
    },
   'quantite': {
        required: true,
        type: String
    },
    'classe': {
        required: true,
        type: String
    },
    'image': {
        required: false,
        type: String
    },
   



})
// module.exports=mongoose.model("nom de collection",dataSchema)                         
module.exports = mongoose.model("produits", dataSchema);