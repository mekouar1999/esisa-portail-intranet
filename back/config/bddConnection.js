require('dotenv').config();
const mongoose = require('mongoose');

const bddConnect = async () => {
    try {
        console.log("Tentative de connexion à la base de données...");
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connexion à la base de données réussie.");
    } catch (error) {
        console.error("Erreur lors de la connexion à la base de données :", error);
    }
}

module.exports = bddConnect;
