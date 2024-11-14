const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
   nom: {
      type: String,
      required: true,
      trim: true
   },
   prix: {
      type: Number,
      required: true,
      min: 0
   },
   description: {
      type: String,
      trim: true
   },
   categorie: {
      type: String,
      required: true,
      trim: true
   },
   imageUrl: {
      type: String,
      trim: true
   }
}, { timestamps: true }); 

module.exports = mongoose.model('Product', productSchema);
