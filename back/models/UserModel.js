// !mdbgum

const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
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
    Sexe:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    password:{
        type:String,
    },
});

//Export the model
module.exports = mongoose.model('User', userSchema);