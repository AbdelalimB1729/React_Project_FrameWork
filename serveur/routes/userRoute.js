// routes/userRoutes.js
const express = require('express');
const User = require('../models/Utilisateur');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router();

router.post('/register', async (req, res) => {
   const { username, password, role, firstName, lastName, address, phoneNumber } = req.body;
   try {
      const existingUser = await User.findOne({ username });
      if (existingUser) return res.status(400).json({ success: false, message: 'Nom d utilisateur déjà pris' });

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
         username,
         password: hashedPassword,
         role,
         firstName,
         lastName,
         address,
         phoneNumber
      });
      await newUser.save();
      res.status(201).json({ success: true, message: 'Utilisateur créé avec succès' });
   } catch (error) {
      res.status(500).json({ success: false, message: 'Erreur serveur' });
   }
});


router.post('/login', async (req, res) => {
   const { username, password } = req.body;
   try {
      const user = await User.findOne({ username });
      if (!user) return res.status(400).json({ success: false, message: 'Utilisateur ou mot de passe incorrect' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ success: false, message: 'Utilisateur ou mot de passe incorrect' });

      const token = jwt.sign({ id: user._id, role: user.role }, 'SECRET_KEY', { expiresIn: '1h' });

      res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 3600000 });
      res.json({ success: true, message: 'Connexion réussie' });
   } catch (error) {
      res.status(500).json({ success: false, message: 'Erreur serveur' });
   }
});


router.post('/logout', (req, res) => {
   res.clearCookie('token');
   res.json({ success: true, message: 'Déconnexion réussie' });
});


router.get('/me', authenticateToken, async (req, res) => {
   try {
      const user = await User.findById(req.user.id).select('-password');
      if (!user) return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
      res.json({ success: true, data: user });
   } catch (error) {
      res.status(500).json({ success: false, message: 'Erreur serveur' });
   }
});

module.exports = router;
