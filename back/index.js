const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000;
const bddConnect = require('./config/bddConnection');

bddConnect();

app.use('/',(req,res)=>{
    res.send('Hello World from Server Side')
})
app.listen(PORT,() =>{
    console.log(`Serveur est en cours d'execution dans le port ${PORT}`)
})

