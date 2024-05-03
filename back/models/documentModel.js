const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    fileType: {
        type: String,
        required: true,
    },
    fileData: {
        type: String, // Stocker les données base64 du fichier
    },
    // Autres champs pour stocker les détails du document
});

module.exports = mongoose.model('Document', documentSchema);
