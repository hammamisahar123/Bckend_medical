const express = require("express");
const mongoose = require('mongoose');
const path = require('path');
const http = require('http'); // Add this line to import the http module

const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const timeRoutes = require('./routes/temps');
const medecinRoutes = require('./routes/medecin');
const magazineRoutes = require('./routes/magazine');
const appointmentRoutes = require('./routes/agenda');
const profilRoutes = require('./routes/profil');
const authRoutes = require('./routes/auth');
const prPatientRoutes = require('./routes/prpatient'); // Check this path
const commandeRoutes = require('./routes/commande');
const dossierRoutes = require('./routes/dossier');
const proRoutes = require('./routes/promedecin');


// Create the Express app
const app = express();

// Create an HTTP server
const server = http.createServer(app);

// Initialize socket.io with the HTTP server
const io = require('socket.io')(server);
io.on('connection', (socket) => {
    console.log("Connected successfully", socket.id);

    socket.on('disconnect', () => {
        console.log("Disconnected", socket.id);
    });

    socket.on('message', (data) =>{
        print('Message received: $data'); // Ajout pour déboguer
      
        setState(()=> {
          _messages.add({
            'text': data['message'], // Assurez-vous que la clé correspond à ce que le backend envoie
            'profileId': data['sentByMe'], // Utilisez la clé correcte selon le backend
            'time': DateTime.now(),
          });
        });
      
        // Émettre un message au backend n'est pas nécessaire ici, sauf si vous souhaitez renvoyer une réponse ou autre chose
      });
      
      
      
    
      });
    


// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/public", express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up routes
app.use('/', userRoutes);
app.use('/', productRoutes);
app.use('/', timeRoutes);
app.use('/', medecinRoutes);
app.use('/', magazineRoutes);
app.use('/', appointmentRoutes);
app.use('/', profilRoutes);
app.use('/', authRoutes);
app.use('/', prPatientRoutes);
app.use('/', commandeRoutes);
app.use('/', dossierRoutes);
app.use('/', proRoutes);



// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Prodmedical', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected successfully");
}).catch(err => {
    console.error("MongoDB connection error:", err);
});

// Error handler middleware
function errHandler(err, req, res, next) {
    if (err) {
        res.json({
            success: 0,
            message: err.message
        });
    }
}


//////cette fonction pour vérification de code par email
app.get("/api/getverficationcode/:attribute", async (req, res) => {

    try {
        //const query = {};
        //query["bodyPart"] = req.params.attribute;
        var theEmail = req.params.attribute;
        function generateRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        const verificationCode = generateRandomNumber(100000, 999999);
        var nodemailer = require('nodemailer');
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'benchaabensahar789@gmail.com',
                pass: 'fbze gfph nimm simc'
            }
        });

        var mailOptions = {
            from: 'benchaabensahar789@gmail.com',
            to: theEmail,
            subject: 'Code de vérification du sahar APP ',

            text: `Votre code de vérification est : ${verificationCode}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        res.status(200).json(
            {

                "code": verificationCode
            }


        );

    } catch (error) {
        res.status(500).json(error.message);

    }


},)
////////////////////////////////////////////////////////////////validation de commande 
app.post("/api/sendOrderConfirmation/:email/:orderId", async (req, res) => {

    try {
        var clientEmail = req.params.email;
        var orderId = req.params.orderId;

        var nodemailer = require('nodemailer');
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                 user: 'benchaabensahar789@gmail.com',
                pass: 'fbze gfph nimm simc'
            }
        });

        // Définition du contenu de l'email
        var mailOptions = {
            from: 'benchaabensahar789@gmail.com',
            to: clientEmail,
            subject: 'Confirmation de validation de votre commande',
            text: `sahar hammami,

Merci pour votre commande. Votre commande avec l'ID ${orderId} a été validée avec succès.

Nous vous informerons de l'expédition dans les plus brefs délais.

Cordialement,
L'équipe Sahar pharmacies`
        };

        // Envoi de l'email
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return res.status(500).json({ error: "Une erreur est survenue lors de l'envoi de l'email." });
            } else {
                console.log('Email sent: ' + info.response);
                return res.status(200).json({ message: "Email de confirmation envoyé avec succès." });
            }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});



////////////////refuser
app.post("/api/sendOrderrefuser/:email/:orderId", async (req, res) => {

    try {
        var clientEmail = req.params.email;
        var orderId = req.params.orderId;

        var nodemailer = require('nodemailer');
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                 user: 'benchaabensahar789@gmail.com',
                pass: 'fbze gfph nimm simc'
            }
        });

        // Définition du contenu de l'email
        var mailOptions = {
            from: 'benchaabensahar789@gmail.com',
            to: clientEmail,
            subject: 'Confirmation de validation de votre commande',
            text: `sahar hammami,

Merci pour votre commande. Votre commande avec l'ID ${orderId} a été refusé désolé.


Cordialement,
L'équipe Sahar pharmacies`
        };

        // Envoi de l'email
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return res.status(500).json({ error: "Une erreur est survenue lors de l'envoi de l'email." });
            } else {
                console.log('Email sent: ' + info.response);
                return res.status(200).json({ message: "Email de confirmation envoyé avec succès." });
            }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});
app.post("/api/sendOrderconfirmer/:email/:orderId", async (req, res) => {

    try {
        var clientEmail = req.params.email;
        var orderId = req.params.orderId;

        var nodemailer = require('nodemailer');
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                 user: 'benchaabensahar789@gmail.com',
                pass: 'fbze gfph nimm simc'
            }
        });

        // Définition du contenu de l'email
        var mailOptions = {
            from: 'benchaabensahar789@gmail.com',
            to: clientEmail,
            subject: 'Confirmation de votre rendez-vous',
            text: `Sahar hammami,

Merci pour votre rendez-vous. Votre rendez-vous avec l'ID ${orderId} a été confirmée avec succès.

Nous vous informerons de l'expédition dans les plus brefs délais.

Cordialement,
cabinet Dhaker lahidheb`
        };

        // Envoi de l'email
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return res.status(500).json({ error: "Une erreur est survenue lors de l'envoi de l'email." });
            } else {
                console.log('Email sent: ' + info.response);
                return res.status(200).json({ message: "Email de confirmation envoyé avec succès." });
            }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});
///////////////////rappel
app.post("/api/sendOrderrappel/:email/:orderId/:ordertime/:orderdate", async (req, res) => {

    try {
        var clientEmail = req.params.email;
        var orderId = req.params.orderId;
        var orderdate = req.params.orderdate;
        var ordertime = req.params.ordertime;

        var nodemailer = require('nodemailer');
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                 user: 'benchaabensahar789@gmail.com',
                pass: 'fbze gfph nimm simc'
            }
        });

        // Définition du contenu de l'email
        var mailOptions = {
            from: 'benchaabensahar789@gmail.com',
            to: clientEmail,
            subject: 'Rappel de votre rendez-vous',
            text: `Sahar hammami,

Merci pour votre rendez-vous. Votre rendez-vous avec l'ID ${orderId} a été trés proche
sera ${ordertime}et${orderdate} .

Nous vous informerons de l'expédition dans les plus brefs délais.

Cordialement,
cabinet Dhaker lahidheb`
        };

        // Envoi de l'email
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return res.status(500).json({ error: "Une erreur est survenue lors de l'envoi de l'email." });
            } else {
                console.log('Email sent: ' + info.response);
                return res.status(200).json({ message: "Email de confirmation envoyé avec succès." });
            }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});
app.use(errHandler);

// Start the server
const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
