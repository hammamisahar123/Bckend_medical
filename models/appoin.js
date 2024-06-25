const mongoose = require("mongoose");

let dataSchema = new mongoose.Schema({
  formulaire: {
    name: { type: String, required: true },
    prenom: { type: String, required: true },
    phone: { type: String, required: true },
    adresse: {
        ville: { type: String, required: true },
        rue: { type: String, required: true }
    },
    gêner: { type: String, required: true }
},
Date: { type: String, required: true },  
time: { type: String, required: true }   
}, 
)
// module.exports=mongoose.model("nom de collection",dataSchema)                         
module.exports = mongoose.model("Rendezvous", dataSchema);