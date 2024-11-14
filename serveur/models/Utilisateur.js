const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   username: {
      type: String,
      required: true,
      unique: true,
      trim: true
   },
   password: {
      type: String,
      required: true
   },
   role: {
      type: String,
      maxlength: 50,
      required: true,
      enum: ['admin', 'user'],
      default: 'user'
   },
   firstName: {
      type: String,
      trim: true
   },
   lastName: {
      type: String,
      trim: true
   },
   address: {
      type: String,
      trim: true
   },
   phoneNumber: {
      type: String,
      trim: true
   }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
