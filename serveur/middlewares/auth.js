// auth.js
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
   const token = req.cookies.token; 

   if (!token) {
      return res.status(401).json({ success: false, message: 'Accès refusé : token manquant' });
   }

   jwt.verify(token, 'SECRET_KEY', (err, user) => {
      if (err) {
         return res.status(403).json({ success: false, message: 'Token invalide' });
      }
      req.user = user;
      next();
   });
}

function authorizeAdmin(req, res, next) {
   if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Accès refusé : administrateur requis' });
   }
   next();
}

module.exports = { authenticateToken, authorizeAdmin };
