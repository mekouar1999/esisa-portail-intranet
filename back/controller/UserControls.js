const User = require('../models/UserModel');

const CreateUser = async(req,res)=>{
    const email = req.body.email;
    const findUser = await User.findOne({email:email});
    if(!findUser){
        const newUser = await User.create(req.body);
        res.json({newUser})
    }
    else{
        res.json({
            msg:"Utilisateur Existant",
            success:false
        })
    }
}

module.exports = { CreateUser}