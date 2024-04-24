// !mdbgum

const mongoose = require('mongoose');

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
});

userSchema.pre("save", async function (next){
const salt = bcrypt.genSaltSync(10);
this.password = await bcrypt.hash(this.password,salt)

       
})

//Export the model
module.exports = mongoose.model('User', userSchema);