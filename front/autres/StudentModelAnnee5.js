const mongoose = require('mongoose');

// Définition du schéma
const studentSchema5 = new mongoose.Schema({
    _id: String,
    nom: String,
    Prénom: String,
    notes: {
        siwf: Number,
        sig: Number,
        ssi: Number,
        bigData: Number,
        gestEnt: Number,
        moy: Number,
        moyenneS1: Number,
        stage: Number,
        moyenneS2: Number,
        moyenneAnnee: Number
    },
    mention: String,
    decisionJury: String
});

// Création du modèle
const Student5 = mongoose.model('Student5', studentSchema5);

module.exports = Student5;
