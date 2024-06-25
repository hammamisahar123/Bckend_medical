
const mongoose = require("mongoose");

let dataSchema = new mongoose.Schema({

    'date': {
        required: true,
        type: String
    },
    'tempsdebut': {
        required: true,
        type: String
    },
   'tempsfin':{ 
    require: true,
    type: String
   },
  

})
// module.exports=mongoose.model("nom de collection",dataSchema)                         
module.exports = mongoose.model("temps_Medecin", dataSchema);