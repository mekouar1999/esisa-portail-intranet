const mongoose = require('mongoose');

const studentSchema3 = new mongoose.Schema({
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
    JAVA: {
        type: String,
        required: true,
    },
    "C#": {
        type: String,
        required: true,
    },
    "Moyenne_JAVA_et_C#": {
        type: String,
        required: true,
    },
    SI: {
        type: String,
        required: true,
    },
    RO: {
        type: String,
        required: true,
    },
    "Ana_Don_I": {
        type: String,
        required: true,
    },
    "Ana_Num_II": {
        type: String,
        required: true,
    },
    "Moyenne_Ana_Don_I_et_Ana Num_U": {
        type: String,
        required: true,
    },
    "Sys_Exp": {
        type: String,
        required: true,
    },
    "Python_avancé": {
        type: String,
        required: true,
    },
    "Moyenne_Sys_Exp_et_Python_avancé": {
        type: String,
        required: true,
    },
    "TEC_V": {
        type: String,
        required: true,
    },
    "Anglais_V": {
        type: String,
        required: true,
    },
    "Moyenne_TEC_5_et_Anglais_5": {
        type: String,
        required: true,
    },
    "Resultat_Semestre_S5": {
        type: String,
        required: true,
    },
    "Moyenne_Semestre_S5": {
        type: String,
        required: true,
    },
    Classement: {
        type: Number,
        required: true,
    },
    JAVA__1: {
        type: String,
        required: true,
    },
    "Dot_Net": {
        type: String,
        required: true,
    },
    "Moyenne_Java_et_Dot_Net": {
        type: String,
        required: true,
    },
    UML: {
        type: String,
        required: true,
    },
    WEB: {
        type: String,
        required: true,
    },
    "Moyenne_UML_et_WEB": {
        type: String,
        required: true,
    },
    "Ana_D_II": {
        type: String,
        required: true,
    },
    BI: {
        type: String,
        required: true,
    },
    "Moyenne_Ana_D_II_et_BI": {
        type: String,
        required: true,
    },
    "Int_Res": {
        type: String,
        required: true,
    },
    "Adm_Unix": {
        type: String,
        required: true,
    },
    "Ins_Pro": {
        type: String,
        required: true,
    },
    Stage: {
        type: String,
        required: true,
    },
    "Moyenne_Mod_Stage": {
        type: String,
        required: true,
    },
    "Resultat_Semestre_S6": {
        type: String,
        required: true,
    },
    "Moyenne_Semestre_S5__1": {
        type: String,
        required: true,
    },
    "Moyenne_Semestre_S6": {
        type: String,
        required: true,
    },
    "Moyenne_Annuel": {
        type: String,
        required: true,
    },
    "Resultat_Annéee": {
        type: String,
        required: true,
    },
    Mention: {
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

module.exports = mongoose.model('Student3', studentSchema3);
