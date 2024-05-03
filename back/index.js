const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000;
const bddConnect = require('./config/bddConnection');
const authRouter = require("./routes/AuthentificationRoute");
const contactRoutes = require("./routes/contactRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const bodyParser = require('body-parser');
const morgan = require("morgan");
const cors = require("cors");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");

bddConnect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/contact", contactRoutes);


app.use("/api/user", authRouter);


// Montage des routes de téléchargement de fichiers sur le préfixe '/api'
app.use('/api/upload', uploadRoutes);


app.listen(PORT,() => {
  console.log(`Serveur est en cours d'exécution dans le port ${PORT}`)
});

// middlewares
app.use(notFound);
app.use(errorHandler);
