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

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// V
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());

app.use(cors({
  origin: 'https://esisa-portail-intranet.vercel.app',
  credentials: true // autorise les en-têtes d'authentification comme les cookies et les jetons
}));

// app.use(cors({
//   origin: '*', // Autorise toutes les origines
//   credentials: true // Autorise les en-têtes d'authentification comme les cookies et les jetons
// }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/contact", contactRoutes);


app.use("/api/user", authRouter);


// Montage des routes de téléchargement de fichiers sur le préfixe '/api'
app.use('/api/upload', uploadRoutes);



app.get('/', (req, res) => {
  res.send('Bonjour, vous êtes sur la page d\'accueil !');
});

// middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(PORT,() => {
  console.log(`Serveur est en cours d'exécution dans le port ${PORT}`)
});