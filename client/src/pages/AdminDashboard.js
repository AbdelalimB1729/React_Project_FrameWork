import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import { Container, Table, Button, Form, Col, Row, Card } from 'react-bootstrap';

function AdminDashboard() {
   const [products, setProducts] = useState([]);
   const [editingProduct, setEditingProduct] = useState(null);

   useEffect(() => {
      fetchProducts();
   }, []);

   const fetchProducts = async () => {
      try {
         const response = await axios.get('/Produit', { withCredentials: true });
         setProducts(response.data.data);
      } catch (error) {
         console.error("Erreur lors de la récupération des produits :", error);
      }
   };

   const handleAddOrUpdateProduct = async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const productData = {
         nom: formData.get("nom"),
         description: formData.get("description"),
         prix: parseFloat(formData.get("prix")),
         imageUrl: formData.get("imageUrl"),
         categorie: formData.get("categorie"), 
      };

      console.log("Données envoyées :", productData); 

      try {
         if (editingProduct) {
            await axios.put(`/Produit/${editingProduct._id}`, productData, { withCredentials: true });
         } else {
            await axios.post('/Produit', productData, { withCredentials: true });
         }
         fetchProducts();
         setEditingProduct(null); 
         event.target.reset();    
      } catch (error) {
         console.error("Erreur lors de l'ajout ou de la mise à jour du produit :", error);
      }
   };

   const handleDeleteProduct = async (id) => {
      try {
         await axios.delete(`/Produit/${id}`, { withCredentials: true });
         fetchProducts();
      } catch (error) {
         console.error("Erreur lors de la suppression du produit :", error);
      }
   };

   const handleEditProduct = (product) => {
      setEditingProduct(product); 
   };

   return (
      <Container className="fade-in mt-4">
         <h1>Tableau de Bord Administrateur</h1>
         
         <Card className="mb-4 shadow-sm">
            <Card.Body>
               <h5>{editingProduct ? "Modifier le Livre" : "Créer un Nouveau Livre"}</h5>
               <Form onSubmit={handleAddOrUpdateProduct}>
                  <Row>
                     <Col md={6}>
                        <Form.Group controlId="formNom" className="mb-3">
                           <Form.Label>Nom du Livre</Form.Label>
                           <Form.Control 
                              type="text" 
                              name="nom" 
                              placeholder="Nom du livre" 
                              defaultValue={editingProduct?.nom || ""}
                              required 
                           />
                        </Form.Group>
                     </Col>
                     <Col md={6}>
                        <Form.Group controlId="formPrix" className="mb-3">
                           <Form.Label>Prix (€)</Form.Label>
                           <Form.Control 
                              type="number" 
                              name="prix" 
                              placeholder="Prix" 
                              defaultValue={editingProduct?.prix || ""}
                              required 
                           />
                        </Form.Group>
                     </Col>
                  </Row>
                  <Form.Group controlId="formCategorie" className="mb-3">
                     <Form.Label>Catégorie</Form.Label>
                     <Form.Control 
                        type="text" 
                        name="categorie" 
                        placeholder="Catégorie du livre" 
                        defaultValue={editingProduct?.categorie || ""}
                        required 
                     />
                  </Form.Group>
                  <Form.Group controlId="formDescription" className="mb-3">
                     <Form.Label>Description</Form.Label>
                     <Form.Control 
                        as="textarea" 
                        rows={2} 
                        name="description" 
                        placeholder="Brève description du livre" 
                        defaultValue={editingProduct?.description || ""}
                        required 
                     />
                  </Form.Group>
                  <Form.Group controlId="formImageUrl" className="mb-3">
                     <Form.Label>URL de l'image</Form.Label>
                     <Form.Control 
                        type="text" 
                        name="imageUrl" 
                        placeholder="Lien de l'image" 
                        defaultValue={editingProduct?.imageUrl || ""}
                     />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="me-2">
                     {editingProduct ? "Mettre à Jour" : "Créer"}
                  </Button>
                  {editingProduct && (
                     <Button 
                        variant="secondary" 
                        onClick={() => setEditingProduct(null)} 
                     >
                        Annuler
                     </Button>
                  )}
               </Form>
            </Card.Body>
         </Card>
         
         <Table striped bordered hover responsive className="mt-4">
            <thead>
               <tr>
                  <th>Image</th>
                  <th>Nom</th>
                  <th>Description</th>
                  <th>Prix</th>
                  <th>Catégorie</th>
                  <th>Actions</th>
               </tr>
            </thead>
            <tbody>
               {products.map((product) => (
                  <tr key={product._id}>
                     <td>
                        <img 
                           src={product.imageUrl || 'path/to/default-image.jpg'} 
                           alt={product.nom} 
                           style={{ width: '60px', height: '60px', objectFit: 'cover' }} 
                        />
                     </td>
                     <td>{product.nom}</td>
                     <td>{product.description}</td>
                     <td>{product.prix} €</td>
                     <td>{product.categorie}</td>
                     <td>
                        <Button 
                           variant="warning" 
                           className="me-2" 
                           onClick={() => handleEditProduct(product)}
                        >
                           Modifier
                        </Button>
                        <Button 
                           variant="danger" 
                           onClick={() => handleDeleteProduct(product._id)}
                        >
                           Supprimer
                        </Button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </Table>
      </Container>
   );
}
export default AdminDashboard;