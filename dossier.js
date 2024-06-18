
const mongoose = require("mongoose");

let dataSchema = new mongoose.Schema({

    'fichier': {
        required: true,
        type: String
    },
    'examen': {
        required: true,
        type:String
    },
   'note':{ 
    require: true,
    type: String
   },
  

})
// module.exports=mongoose.model("nom de collection",dataSchema)                         
module.exports = mongoose.model("dossiers", dataSchema);