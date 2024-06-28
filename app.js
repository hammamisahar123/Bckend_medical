const express = require("express")
const mongoose = require('mongoose');

const app = express();
const path = require('path'); // Add this line to import the path module

const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const timeRoutes = require('./routes/temps');
const medecinRoutes = require('./routes/medecin');
const magazineRoutes = require('./routes/magazine');
const appointmentRoutes = require('./routes/agenda');

app.use(express.static(path.join(__dirname, "public"))); //***// */

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use('/', userRoutes);
app.use('/', productRoutes);
app.use('/', timeRoutes);
app.use('/', medecinRoutes);
app.use('/', magazineRoutes);
app.use('/', appointmentRoutes);



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




app.use(errHandler)




app.listen(5000, () => {

    console.log("connected on port 5000")
})