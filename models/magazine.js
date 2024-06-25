
const mongoose = require("mongoose");

let dataSchema = new mongoose.Schema({

    'title': {
        required: true,
        type: String
    },
    'description': {
        required: true,
        type: String
    },
   
    'imageUrl': {
        required: true,
        type: String
    },
    
  

})
// module.exports=mongoose.model("nom de collection",dataSchema)                         
module.exports = mongoose.model("articles", dataSchema);