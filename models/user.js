//cerate schema 

const mongoose = require("mongoose");

let dataSchema = new mongoose.Schema({

    'name': {
        required: false,
        type: String
    },
    'email': {
        required: true,
        type: String
    },
    'password': {
        required: true,
        type: String
    },
    'sexe': {
        required: false,
        type: String
    },
    'phoneNumber': {
        required: false,
        type: String
    },
    'height': {
        required: false,
        type: String
    },
    'weight': {
        required: false,
        type: String
    },
    'adress': {
        required: false,
        type: String
    }, 'image': {
        required: false,
        type: String
    }




})
// module.exports=mongoose.model("nom de collection",dataSchema)                         
module.exports = mongoose.model("users", dataSchema);