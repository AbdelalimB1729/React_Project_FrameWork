import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function ProductForm({ onSubmit }) {
   const [formData, setFormData] = useState({
      nom: '',
      prix: '',
      description: '',
      categorie: '',
      imageUrl: ''
   });

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
   };

   return (
      <Form onSubmit={handleSubmit} className="fade-in">
         <Form.Group className="mb-3">
            <Form.Label>Nom</Form.Label>
            <Form.Control type="text" name="nom" onChange={handleChange} required />
         </Form.Group>

         <Form.Group className="mb-3">
            <Form.Label>Prix</Form.Label>
            <Form.Control type="number" name="prix" onChange={handleChange} required />
         </Form.Group>

         <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" name="description" onChange={handleChange} />
         </Form.Group>

         <Form.Group className="mb-3">
            <Form.Label>Catégorie</Form.Label>
            <Form.Control type="text" name="categorie" onChange={handleChange} required />
         </Form.Group>

         <Form.Group className="mb-3">
            <Form.Label>URL de l'image</Form.Label>
            <Form.Control type="text" name="imageUrl" onChange={handleChange} />
         </Form.Group>

         <Button variant="primary" type="submit" className="w-100">
            Enregistrer le produit
         </Button>
      </Form>
   );
}

export default ProductForm;
