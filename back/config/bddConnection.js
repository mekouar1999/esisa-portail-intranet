const { default : mongose} = require('mongoose');

const bddConnect = () => {
    try{
        const connectionBdd = mongose.connect('mongodb://localhost:27017/IntranetEsisa');
        console.log("connexion a la BDD avec succès XD");

    }
    catch(error){
        console.log("connexion impossible a la BDD");
    }
}

module.exports = bddConnect;