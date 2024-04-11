const { default : mongose} = require('mongoose');


const bddConnect = () => {
    try{
        const connectionBdd = mongose.connect(process.env.MONGODB_URL);
        console.log("connexion a la BDD avec succès XD");

    }
    catch(error){
        console.log("connexion impossible a la BDD");
    }
}

module.exports = bddConnect;