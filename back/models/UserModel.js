const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    
    Prénom: {
        type: String,
        required: true,
    },
    Nom: {
        type: String,
        required: true,
    },
    Date_Naissance: {
        type: String,
        required: true,
    },
    PaysOrigine: {
        type: String,
        default :"Maroc"
    },
    NumCneBac: {
        type: String,
    },
    cin: {
        type: String,
    },
    NumCardId: {
        type: String,
        default :"none",
        unique:false

    },
    uploadedDocuments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document'
    }],
    role: {
        type: String,
        default: 'etudiant',
    },
    refreshToken: {
        type: String,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    isBlocked: {
        type: Boolean,
        default: false,
    },
    Sexe: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        default :"etudiantEsisa@gmail.com"
    },
    mobile: {
        type: String,
        default :"0661626587"
    },
    password: {
        type: String,
        default :"123456"

    },
    AnneeScolaireEnCours: {
        type: String,
    },
    groupe: {
        type: String,
    },

    ESISA: [{
        annee: {
            type: String,
            required: true,
        },
        groupe: {
            type: String,
            required: true,
        },
        anneeScolaire: {
            type: String,
            required: true,
        }
    }]
   
},

{
    timestamps: true,
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSaltSync(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    const isMatched = await bcrypt.compare(enteredPassword, this.password);
    console.log('Password Matched:', isMatched);
    return isMatched;
};

userSchema.methods.createpasswordResetToken = async function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    return resetToken;
};

module.exports = mongoose.model('User', userSchema);


