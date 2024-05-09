const mongoose = require('mongoose');

// Définition du schéma
const studentSchema41 = new mongoose.Schema({
    _id: String,
    nomComplet: String,
    notes: {
        dp: Number,
        webXML: Number,
        gLog: Number,
        ccna34: Number,
        oracle: Number,
        tec: Number,
        anglais: Number,
        moyenneTEC_Anglais: Number
    },
    resultatSemestreS1: String,
    classement: Number,
    moyenneS1: Number
});

// Création du modèle
const Student41 = mongoose.model('Student41', studentSchema41);

module.exports = Student41;
