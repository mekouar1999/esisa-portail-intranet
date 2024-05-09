const mongoose = require('mongoose');

const studentSchema2 = new mongoose.Schema({
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
        type: String,
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
    Algo_STR_I: {
        type: String,
        required: true,
    },
    Prog_CPlusPlus___1: {
        type: String,
        required: true,
    },
    Unix: {
        type: String,
        required: true,
    },
    Moy: {
        type: String,
        required: true,
    },
    TS: {
        type: String,
        required: true,
    },
    Sys_Emb: {
        type: String,
        required: true,
    },
    Moy__1: {
        type: String,
        required: true,
    },
    Math: {
        type: String,
        required: true,
    },
    Stat: {
        type: String,
        required: true,
    },
    Moy__2: {
        type: String,
        required: true,
    },
    Init_BD: {
        type: String,
        required: true,
    },
    TEC: {
        type: String,
        required: true,
    },
    Anglais: {
        type: String,
        required: true,
    },
    Moy_TEC_ANGLAIS: {
        type: String,
        required: true,
    },
    Resultat_Semestre_S3: {
        type: String,
        required: true,
    },
    Moyenne_Semestre_3: {
        type: String,
        required: true,
    },
    Algo_STR_I__1: {
        type: String,
        required: true,
    },
    Prog_CPlusPlus___1: {
        type: String,
        required: true,
    },
    Python: {
        type: String,
        required: true,
    },
    Ana_Num: {
        type: String,
        required: true,
    },
    Stat__1: {
        type: String,
        required: true,
    },
    Moyenne_Analyse_Numérique_et_Statistique: {
        type: String,
        required: true,
    },
    BD_II: {
        type: String,
        required: true,
    },
    WEB: {
        type: String,
        required: true,
    },
    Moyenne_BD_II_et_Web: {
        type: String,
        required: true,
    },
    TEC__1: {
        type: String,
        required: true,
    },
    Anglais__1: {
        type: String,
        required: true,
    },
    Moyennne_TEC_et_anglais: {
        type: String,
        required: true,
    },
    Resultat_Semestre_2_S4: {
        type: String,
        required: true,
    },
    Moyenne_Semestre_1: {
        type: String,
        required: true,
    },
    Moyenne_Semestre_2: {
        type: String,
        required: true,
    },
    Moyenne_annuelle: {
        type: String,
        required: true,
    },
    Résultat_année: {
        type: String,
        required: true,
    },
    Mention: {
        type: String,
        required: true,
    },
    sexe: {
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

module.exports = mongoose.model('Student2', studentSchema2);
