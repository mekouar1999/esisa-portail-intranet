const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000;
const bddConnect = require('./config/bddConnection');
const authRouter = require("./routes/AuthentificationRoute");
const bodyParser = require('body-parser');

bddConnect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))


app.use("/api/user",authRouter);

app.listen(PORT,() =>{
    console.log(`Serveur est en cours d'execution dans le port ${PORT}`)
})

