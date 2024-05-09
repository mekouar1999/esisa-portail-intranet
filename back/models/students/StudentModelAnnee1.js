const mongoose = require('mongoose');

const studentSchema1 = new mongoose.Schema({
    groupe: {
        type: String,
        required: true,
    },
    Nom: {
        type: String,
        required: true,
    },
    Prénom: {
        type: String,
        required: true,
    },
    Date_Naissance: {
        type: String,
        required: true,
    },
    Lieu_Naissance: {
        type: String,
        required: true,
    },
    N_Inscription: {
        type: Number,
        required: true,
    },
    cin: {
        type: String,
        required: true,
        unique: true,
    },
    Nom_complet: {
        type: String,
        required: true,
    },
    Algo_I: {
        type: String,
        required: true,
    },
    Prog_C_I: {
        type: String,
        required: true,
    },
    Archi_I: {
        type: String,
        required: true,
    },
    Elec_N: {
        type: String,
        required: true,
    },
    Compta_I: {
        type: String,
        required: true,
    },
    Bureaut: {
        type: String,
        required: true,
    },
    Moy: {
        type: String,
        required: true,
    },
    Math_I: {
        type: String,
        required: true,
    },
    Stat_I: {
        type: String,
        required: true,
    },
    Moy__1: {
        type: String,
        required: true,
    },
    TEC_I: {
        type: String,
        required: true,
    },
    Anglais_I: {
        type: String,
        required: true,
    },
    Moyenne_TEC_II_Anglais_II: {
        type: String,
        required: true,
    },
    Resultat_Semestre_S1: {
        type: String,
        required: true,
    },
    Classement_groupe: {
        type: Number,
        required: true,
    },
    Classement_promotion: {
        type: Number,
        required: true,
    },
    Moyenne_Semestre_2: {
        type: String,
        required: true,
    },
    Algo_II: {
        type: String,
        required: true,
    },
    Prog_C_II: {
        type: String,
        required: true,
    },
    Archi_II: {
        type: String,
        required: true,
    },
    Elec_A_II: {
        type: String,
        required: true,
    },
    Compta_I__1: {
        type: String,
        required: true,
    },
    Math_II: {
        type: String,
        required: true,
    },
    Stat_II: {
        type: String,
        required: true,
    },
    Moy__2: {
        type: String,
        required: true,
    },
    TEC_II: {
        type: String,
        required: true,
    },
    Anglais_II: {
        type: String,
        required: true,
    },
    Moyenne_TEC_II_Anglais_II: {
        type: String,
        required: true,
    },
    Resultat_Semestre_S2: {
        type: String,
        required: true,
    },
    Moyenne_Semestre_1: {
        type: String,
        required: true,
    },
    Moyenne_Semestre_2__1: {
        type: String,
        required: true,
    },
    Moyenne_année: {
        type: String,
        required: true,
    },
    Classement_groupe__1: {
        type: Number,
        required: true,
    },
    Classement_promotion__1: {
        type: Number,
        required: true,
    },
    resultat_année_scolaire: {
        type: String,
        required: true,
    },
    mention: {
        type: String,
        required: true,
    },
    Sexe: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    annee: {
        type: String,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Student1', studentSchema1);
