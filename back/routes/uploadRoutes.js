const express = require('express');
const router = express.Router();
const { uploadDocument, associateDocuments } = require('../controller/UserControls');
const multer = require('multer');
const { authMiddleware } = require('../middlewares/authMiddleware'); // Importez le middleware d'authentification

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Endpoint pour télécharger des fichiers (pour 5 fichiers avec des noms différents)
router.post('/', authMiddleware, upload.fields([
    { name: 'releveBac', maxCount: 1 },
    { name: 'diplomeBac', maxCount: 1 },
    { name: 'cin', maxCount: 1 },
    { name: 'photo', maxCount: 1 },
    { name: 'attestationHebergement', maxCount: 1 }
]), uploadDocument);

// Endpoint pour associer des documents à un utilisateur
router.post('/associate-documents', authMiddleware, associateDocuments);

module.exports = router;
