const express = require('express')
const mongoose = require('./Db/mongoose')
const cors = require('cors');

const cookieParser = require('cookie-parser');
const ProduitRoute = require('./routes/ProduitRoute');
const userRoute = require('./routes/userRoute');

const app = express()

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(express.json());
app.use(cookieParser()); 

app.use('/Produit', ProduitRoute);
app.use('/user', userRoute);

module.exports = app ;