// routes/productRoutes.js
const express = require('express');
const Product = require('../models/produit');
const { authenticateToken, authorizeAdmin } = require('../middlewares/auth');

const router = express.Router();

router.get('/', async (req, res) => {
   const { categorie, sort } = req.query;
   let filter = {};
   if (categorie) filter.categorie = categorie;

   try {
      let productsQuery = Product.find(filter);

      if (sort) {
         productsQuery = productsQuery.sort({ prix: sort === 'asc' ? 1 : -1 });
      }
      const products = await productsQuery;
      
      res.json({ success: true, data: products });
   } catch (error) {
      res.status(500).json({ success: false, message: 'Erreur serveur' });
   }
});

router.get('/:id', async (req, res) => {
   try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ success: false, message: 'Produit non trouvé' });
      res.json({ success: true, data: product });
   } catch (error) {
      res.status(500).json({ success: false, message: 'Erreur serveur' });
   }
});

router.post('/', authenticateToken, authorizeAdmin, async (req, res) => {
   const { nom, prix, description, categorie, imageUrl } = req.body;
   try {
      const newProduct = new Product({ nom, prix, description, categorie, imageUrl });
      await newProduct.save();
      res.status(201).json({ success: true, data: newProduct });
   } catch (error) {
      res.status(400).json({ success: false, message: 'Erreur de validation des données' });
   }
});

router.put('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
   try {
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedProduct) return res.status(404).json({ success: false, message: 'Produit non trouvé' });
      res.json({ success: true, data: updatedProduct });
   } catch (error) {
      res.status(400).json({ success: false, message: 'Erreur de mise à jour' });
   }
});

router.delete('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
   try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) return res.status(404).json({ success: false, message: 'Produit non trouvé' });
      res.status(204).json({ success: true, message: 'Produit supprimé avec succès' });
   } catch (error) {
      res.status(500).json({ success: false, message: 'Erreur de suppression' });
   }
});

module.exports = router;
