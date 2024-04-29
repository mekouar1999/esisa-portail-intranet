const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000;
const bddConnect = require('./config/bddConnection');
const authRouter = require("./routes/AuthentificationRoute");
const bodyParser = require('body-parser');
const morgan = require("morgan");
const cors = require("cors");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");

bddConnect();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

app.use(morgan("dev"));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/user",authRouter);

app.listen(PORT,() =>{
    console.log(`Serveur est en cours d'execution dans le port ${PORT}`)
})

// middlewares
app.use(notFound);
app.use(errorHandler);