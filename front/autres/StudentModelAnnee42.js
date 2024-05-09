const mongoose = require('mongoose');

// Définition du schéma
const studentSchema42 = new mongoose.Schema({
    _id: String,
    nomComplet: String,
    notes: {
        archiDis: Number,
        dotNet: Number,
        adroide: Number,
        gestProj: Number,
        prTutore: Number,
        dataMining: Number,
        dataWarehouse: Number,
        moyenneDataMining_DataWarehouse: Number
    },
    resultatSemestreS2: String,
    moyenneS1: Number,
    moyenneS2: Number,
    moyenneAnnuelle: Number,
    resultatAnnee: String
});

// Création du modèle
const Student42 = mongoose.model('Student42', studentSchema42);

module.exports = Student42;
