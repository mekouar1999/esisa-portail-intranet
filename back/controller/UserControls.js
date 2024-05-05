const User = require('../models/UserModel');
const Document = require('../models/documentModel');
const fs = require('fs');

const asyncHandler = require("express-async-handler");
const {generateRefreshToken} = require('../config/refreshToken');
const sendEmail = require("./emailControl");
const multer = require('multer'); // Pour gérer les téléchargements de fichiers

const {generateToken} = require('../config/jwtToken');

const validateMongoDbId = require("../utils/validateMongodbId");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const CreateUser = async(req,res)=>{
    const email = req.body.email;
    const findUser = await User.findOne({email:email});
    if(!findUser){
        const newUser = await User.create(req.body);
        res.json("Utilisateur crée avec succés");  
      } 
    else{
        res.json({
            msg:"Utilisateur Existant",
            success:false
        })
    }
}
const loginUserControl = asyncHandler(async (req, res) => {
    const { NumCardId, password } = req.body;
    console.log("NumCardId from request:", NumCardId);
    console.log("Password from request:", password);

    // Vérifier si l'utilisateur existe ou non
    const findUser = await User.findOne({ NumCardId });
    console.log("User found in database:", findUser);

    if (findUser) {
        console.log("Calling isPasswordMatched function for user:", findUser);
        const passwordMatched = await findUser.isPasswordMatched(password);
        console.log("Password Matched:", passwordMatched);

        if (passwordMatched) {
            const refreshToken = await generateRefreshToken(findUser?.id); 
            const updatedUser = await User.findByIdAndUpdate(
                findUser.id,
                { refreshToken: refreshToken },
                { new: true }
            );

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                maxAge: 3 * 24 * 60 * 60 * 1000,
            });

            res.json({
                _id: findUser?.id,
                firstname: findUser?.firstname, 
                lastname: findUser?.lastname,
                NumCardId: findUser?.NumCardId,
                email: findUser?.email,
                mobile: findUser?.mobile,
                datedeNaissance: findUser?.datedeNaissance,
                PaysOrigine: findUser?.PaysOrigine,
                password: findUser?.password,
                NumCneBac: findUser?.NumCneBac,
                Sexe: findUser?.Sexe,
                groupe: findUser?.groupe,
                AnneeScolaireEnCours:findUser?.AnneeScolaireEnCours,
                token: generateToken(findUser?.id),
            });
        } else {
            throw new Error("Mot de passe incorrect");
        }
    } else {
        throw new Error("Utilisateur non trouvé");
    }
});



// admin login

const loginProf = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // check if user exists or not
    const findAdmin = await User.findOne({ email });
    if (findAdmin.role !== "professeur") throw new Error("Not Authorised");
    if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
      const refreshToken = await generateRefreshToken(findAdmin?._id);
      const updateuser = await User.findByIdAndUpdate(
        findAdmin.id,
        {
          refreshToken: refreshToken,
        },
        { new: true }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });
      res.json({
        _id: findAdmin?._id,
        firstname: findAdmin?.firstname,
        lastname: findAdmin?.lastname,
        email: findAdmin?.email,
        mobile: findAdmin?.mobile,
        token: generateToken(findAdmin?._id),
      });
    } else {
      throw new Error("Invalid Credentials");
    }
  });
  
  // handle refresh token
  
  const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    console.log(cookie);
    if (!cookie?.refreshToken) {
      throw new Error("Pas de Refresh Token dans les cookies");
    }
    const refreshToken = cookie.refreshToken;
    console.log(refreshToken);
    const user = await User.findOne({
      refreshToken,
    });
    if (!user) {
      throw new Error("no refresh token present in db or not matchee");
    }
    //res.json(user);
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
      //console.log("decoded", decoded);
      if (err || user.id !== decoded.id) {
        throw new Error("Quelque chose ne vas pas avec le REFRESH TOKEN");
      }
      const accessToken = generateToken(user?.id);
      res.json(accessToken);


    });
  });
  
  // deconnection
  
  const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) {
      throw new Error("Pas de Refresh Token dans les cookies");
    }
    const refreshToken = cookie.refreshToken;
  
    const user = await User.findOne({
      refreshToken,
    });
    if (!user) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      });
      return res.sendStatus(204);
    }
    await User.findOneAndUpdate(
      { refreshToken: refreshToken },
      { $set: { refreshToken: "" } }
    );
  
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    res.sendStatus(204); // forbidden
  });
  
  // get All user
  
  const getAllUser = asyncHandler(async (req, res) => {
    try {
      const getAllUsers = await User.find();
      res.json(getAllUsers);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  // get A user
  
  const getAUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
      const userTrouver = await User.findById(id);
      res.json(userTrouver);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  // delete A user
  
  const deleteAUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
  
    console.log(id);
    try {
      const deleteAUser = await User.findByIdAndDelete(id);
      res.json(deleteAUser);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  // update A user
  
  const updateAUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    // const { id } = req.params; on recuprer le params et on le passer a la requete pour recuperer le user
    validateMongoDbId(_id);
    console.log("req.params : ", req.params);
    console.log("req.user : ", req.user);
  
    try {
      // premier param ce que tu passe pour le trouvé retrouve grace au params
      // 2eme ce que tu permet a changer body
      const updatedAUser = await User.findByIdAndUpdate(
        //id pour le param quon recuperer depuis le params
        _id,
        {
          firstname: req?.body?.firstname,
          lastname: req?.body?.lastname,
          email: req?.body?.email,
          phone: req?.body?.phone,
          password: req?.body?.password,
        },
        {
          new: true,
        }
      );
      res.json(updatedAUser);
    } catch (error) {
      throw new Error(error);
    }
  });


  // bloquer et debloquer un User

const blockUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    validateMongoDbId(id);
  
    try {
      const blockedUser = await User.findByIdAndUpdate(
        id,
        {
          isBlocked: true,
        },
        {
          new: true,
        }
      );
      res.json({
        blockedUser,
      });
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const unblockUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    validateMongoDbId(id);
  
    try {
      const unblockedUser = await User.findByIdAndUpdate(
        id,
        {
          isBlocked: false,
        },
        {
          new: true,
        }
      );
      res.json({
        unblockedUser,
      });
    } catch (error) {
      throw new Error(error);
    }
  });


  const updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { password } = req.body; // Assurez-vous de déstructurer correctement le champ password
    validateMongoDbId(_id);
  
    try {
      // find user
      const user = await User.findById(_id);
  
      if (password) {
        user.password = password; // Assurez-vous que password est une chaîne
        const updatedUser = await user.save();
        res.json(updatedUser);
      } else {
        res.json(user);
      }
    } catch (error) {
      // Gérer les erreurs de manière appropriée
      res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
  });
  
  const forgotPasswordToken = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found with this email");
    }
    try {
      const token = await user.createpasswordResetToken();
      await user.save();
      const resetURL = `Bonjour,<br><br>Veuillez suivre ce lien pour réinitialiser votre mot de passe. Ce lien est valide pendant 30 minutes à partir de maintenant :<br><br><a style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;" href='http://localhost:3000/api/user/reset-password/${token}'>Réinitialiser le mot de passe</a><br><br>Cordialement,<br> Core Team Support, ESISA`;
      const data = {
        to: email,
        text: "Hey ESISA INTRANET User",
        subject: "Lien de modification du mot de passe",
        html: resetURL,
      };
      sendEmail(data);
      res.json(token);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) {
      throw new Error("Token expires , Please try Again later");
    }
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetToken = undefined; // car mdp a change donc plus besoin
    await user.save();
    res.json(user);
  });
  const getWishlist = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    console.log("_id:", _id); // Add this line for debugging
    try {
      const findUser = await User.findById(_id).populate("wishlist");
      res.json(findUser);
    } catch (error) {
      console.error("Error in getWishlist:", error);
      res
        .status(500)
        .json({ status: "fail", message: error.message, stack: error.stack });
    }
  });


  const uploadDocument = async (req, res) => {
    try {
        console.log("Requête de téléchargement de fichiers reçue :", req.files);

        // Récupérez l'ID de l'utilisateur à partir de req.user
        const { _id } = req.user;
        console.log("ID de l'utilisateur extrait de req.user :", _id);

        // Traitez chaque champ de fichier
        const documents = [];
        const fileFields = ['releveBac', 'diplomeBac', 'cin', 'photo', 'attestationHebergement'];

        fileFields.forEach(fieldName => {
            if (req.files[fieldName]) {
                const files = req.files[fieldName];
                console.log(`Nombre de fichiers pour le champ ${fieldName} :`, files.length);
                files.forEach(file => {
                    documents.push({
                        user: _id, // Utilisez l'ID de l'utilisateur récupéré
                        fileType: file.mimetype,
                        fileData: file.buffer.toString('base64') // Convertir en base64
                    });
                });
            }
        });

        console.log("Documents à enregistrer dans la base de données :", documents);

        // Enregistrez les documents dans la base de données
        const savedDocuments = await Document.insertMany(documents);

        console.log("Documents enregistrés dans la base de données :", savedDocuments);

        res.json(savedDocuments); // Répondez avec les détails des documents téléchargés
    } catch (error) {
        console.error("Erreur lors du téléchargement des fichiers : ", error);
        res.status(500).json({ error: 'Une erreur est survenue lors du téléchargement des fichiers.' });
    }
};

const associateDocuments = async (req, res) => {
  console.log("Lancement de associate");
  try {
    console.log("Requête d'association des documents reçue :", req.body);

    // Vérifiez si uploadedFiles est défini dans la requête
    if (!req.body.uploadedFiles || !Array.isArray(req.body.uploadedFiles)) {
      console.log("Aucun fichier n'a été téléchargé.");
      return res.status(400).json({ error: "Aucun fichier n'a été téléchargé." });
    }

    const { uploadedFiles } = req.body;
    const { _id } = req.user;

    console.log("ID de l'utilisateur extrait de req.user :", _id);

    const user = await User.findById(_id);

    console.log("Utilisateur trouvé dans la base de données :", user);

    if (!user) {
      console.log("Utilisateur non trouvé dans la base de données.");
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }

    // Assurez-vous que uploadedFiles est un tableau avant de l'itérer
    if (!Array.isArray(uploadedFiles)) {
      console.log("uploadedFiles n'est pas un tableau valide.");
      return res.status(400).json({ error: "uploadedFiles n'est pas un tableau valide." });
    }

    // Ajoutez les identifiants des documents à uploadedDocuments de l'utilisateur
    uploadedFiles.forEach(async (file) => {
      try {
        // Créez le document et récupérez son ID
        const newDocument = await Document.create({
          user: _id,
          fileType: file.fileType,
          fileData: file.fileData
        });
        // Ajoutez l'ID du document à uploadedDocuments de l'utilisateur
        user.uploadedDocuments.push(newDocument._id);
      } catch (error) {
        console.error("Erreur lors de la création du document :", error);
      }
    });

    // Enregistrez les modifications apportées à l'utilisateur
    await user.save();

    console.log("Documents associés à l'utilisateur avec succès.");

    res.status(200).send("Les documents ont été associés à l'utilisateur avec succès.");
  } catch (error) {
    console.error("Erreur lors de l'association des documents à l'utilisateur : ", error);
    res.status(500).json({ error: "Une erreur est survenue lors de l'association des documents à l'utilisateur." });
  }
};

// Fonction pour obtenir les relevés de notes des années étudiées à l'ESISA pour un utilisateur donné



const getRelevesNotesESISA = async (req, res) => {
  try {
      // Récupérez l'ID de l'utilisateur à partir de req.user
      const userId = req.user._id;
      console.log("ID de l'utilisateur extrait de req.user :", userId);

      // Recherchez l'utilisateur dans la base de données
      const user = await User.findById(userId);
      if (!user) {
          throw new Error("Utilisateur introuvable");
      }

      // Filtrer les relevés de notes pour les années étudiées à l'ESISA
      const relevesNotesESISA = user.uploadedDocuments.filter(document => {
          return user.ESISA.some(esisaYear => esisaYear.anneeEtudiee === document.annee);
      });

      res.json(relevesNotesESISA); // Répondez avec les relevés de notes de l'ESISA
  } catch (error) {
      console.error("Erreur lors de la récupération des relevés de notes de l'ESISA :", error);
      res.status(500).json({ error: "Une erreur est survenue lors de la récupération des relevés de notes de l'ESISA." });
  }
};

// Exemple d'utilisation de la fonction pour obtenir les relevés de notes de l'ESISA pour un utilisateur donné
// Remarque : Vous n'avez pas besoin de passer l'ID de l'utilisateur comme argument






  
  
  

module.exports = { CreateUser, loginUserControl, loginProf, handleRefreshToken, logout, getAllUser,
    getAUser,deleteAUser, updateAUser, blockUser, unblockUser, updatePassword, forgotPasswordToken, resetPassword, uploadDocument,associateDocuments , getRelevesNotesESISA}