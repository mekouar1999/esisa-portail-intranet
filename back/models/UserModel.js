const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    datedeNaissance: {
        type: String,
        required: true,
    },
    PaysOrigine: {
        type: String,
        required: true,
    },
    NumCneBac: {
        type: String,
        required: true,
    },
    NumCardId: {
        type: String,
        required: true,
        unique: true,
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
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
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
        },
        bulletinSemestre1: {
            data: Buffer,
            contentType: String,
        },
        bulletinSemestre2: {
            data: Buffer,
            contentType: String,
        },
        releveNotesSemestre1: {
            data: Buffer,
            contentType: String,
        },
        releveNotesSemestre2: {
            data: Buffer,
            contentType: String,
        },
        emploiDuTempsSemestre1: {
            data: Buffer,
            contentType: String,
        },
        emploiDuTempsSemestre2: {
            data: Buffer,
            contentType: String,
        },
        AttestationScolariteSemestre1: {
            data: Buffer,
            contentType: String,
        },
        AttestationScolariteSemestre2: {
            data: Buffer,
            contentType: String,
        },
    }]
}, {
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
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000;
    return resetToken;
};

module.exports = mongoose.model('User', userSchema);


