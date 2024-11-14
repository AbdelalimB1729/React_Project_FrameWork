const mongoose = require('mongoose');
require('dotenv').config()
const connexion = mongoose.connect("mongodb://localhost:27017/React-Project").then(()=>{
    console.log('Connexion à la base de données MongoDB réussie !');
}).catch((error)=>{
    console.log('Erreur de connexion à la base de données MongoDB :', error);
});
module.exports = connexion;