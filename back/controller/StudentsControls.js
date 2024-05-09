const Student1 = require('../models/students/StudentModelAnnee1');
const Student2 = require('../models/students/StudentModelAnnee2');
const Student3 = require('../models/students/StudentModelAnnee3');

const asyncHandler = require("express-async-handler");
const { generateToken } = require('../config/jwtToken');
const validateMongoDbId = require("../utils/validateMongodbId");


const CreateStudent = async (req, res) => {
    const { cin, annee } = req.body;
    
    let StudentModel;

    // Sélectionner le modèle d'étudiant en fonction de l'année
    switch (annee) {
        case "1":
            StudentModel = Student1;
            break;
        case "2":
            StudentModel = Student2;
            break;
        case "3":
            StudentModel = Student3;
            break;
        default:
            return res.status(400).json({ message: "Année d'étude non valide" });
    }

    try {
        const findStudent = await StudentModel.findOne({ cin });

        if (!findStudent) {
            const newStudent = await StudentModel.create(req.body);
            res.json({ msg: "Utilisateur créé avec succès", success: true, newStudent });
        } else {
            res.json({ msg: "Utilisateur existant", success: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la création de l'utilisateur" });
    }
};


const CreateMultipleStudents = async (req, res) => {
    const { students, annee } = req.body;
    
    let StudentModel;

    // Sélectionner le modèle d'étudiant en fonction de l'année
    switch (annee) {
        case "1":
            StudentModel = Student1;
            break;
        case "2":
            StudentModel = Student2;
            break;
        case "3":
            StudentModel = Student3;
            break;
        default:
            return res.status(400).json({ message: "Année d'étude non valide" });
    }

    try {
        // Tableau pour stocker les nouveaux utilisateurs créés
        const newStudents = [];

        // Parcourir la liste des étudiants envoyée dans la requête
        for (const student of students) {
            // Vérifier si l'utilisateur existe déjà dans la base de données
            const findStudent = await StudentModel.findOne({ cin: student.cin });

            // Si l'utilisateur n'existe pas, le créer
            if (!findStudent) {
                const newStudent = await StudentModel.create(student);
                newStudents.push(newStudent);
            }
        }

        // Renvoyer les utilisateurs créés avec succès
        res.json({ msg: "Utilisateurs créés avec succès", success: true, newStudents });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la création des utilisateurs" });
    }
};



const getAllStudents = asyncHandler(async (req, res) => {
    try {
        // Récupérer tous les étudiants de chaque année
        const students1 = await Student1.find();
        const students2 = await Student2.find();
        const students3 = await Student3.find();

        // Fusionner les listes d'étudiants de chaque année
        const allStudents = [...students1, ...students2, ...students3];

        // Renvoyer tous les étudiants
        res.json(allStudents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des étudiants" });
    }
});




const getAStudent = asyncHandler(async (req, res) => {
    const { cin } = req.params;
    console.log(cin);
    try {
        // Recherche dans Student1
        let student = await Student1.findOne({ cin });
        
        // Si l'étudiant n'est pas trouvé dans Student1, rechercher dans Student2
        if (!student) {
            student = await Student2.findOne({ cin });
        }

        // Si l'étudiant n'est pas trouvé dans Student2, rechercher dans Student3
        if (!student) {
            student = await Student3.findOne({ cin });
        }

        // Envoyer la réponse
        res.json(student);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {
    getAllStudents,
    CreateStudent,
    CreateMultipleStudents,
    getAStudent
};

