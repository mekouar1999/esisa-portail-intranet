// !mdbgum

const mongoose = require('mongoose');
const crypto = require('crypto');

const bcrypt = require("bcrypt");

var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    datedeNaissance:{
        type:String,
        required:true,
    },
    PaysOrigine:{
        type:String,
        required:true,
    },
    NumCneBac:{
        type:String,
        required:true,
    },
    NumCardId:{
        type:String,
        required:true,
        unique:true,
    },
    role: {
        type: String,
        default: "etudiant",
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
    Sexe:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    mobile:{
        type:String,
        required:true,
        unique:true,

    },
    password:{
        type:String,
    },
    
},
{
    timestamps: true, // pour voir date de creation et d'update
  });


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
  
    const saltRounds = 10;
    const salt = await bcrypt.genSaltSync(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
  });
  
  
  userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    const isMatched = await bcrypt.compare(enteredPassword, this.password);
    console.log("Password Matched:", isMatched);
    return isMatched;
};

  userSchema.methods.createpasswordResetToken = async function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000;
    return resetToken;
  };
  
  

//Export the model
module.exports = mongoose.model('User', userSchema);