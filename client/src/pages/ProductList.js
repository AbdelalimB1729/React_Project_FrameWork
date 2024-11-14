import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import ProductCard from '../components/ProductCard';
import ProductFilter from '../components/ProductFilter';
import { Container, Row, Spinner, Alert } from 'react-bootstrap';

function ProductList() {
   const [products, setProducts] = useState([]);
   const [category, setCategory] = useState('');
   const [sort, setSort] = useState('');
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      fetchProducts();
   }, [category, sort]);

   const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
         const response = await axios.get(`/Produit`, {
           params: { categorie: category, sort }
         });
         let fetchedProducts = response.data.data;
   
         if (sort === 'asc') {
           fetchedProducts = fetchedProducts.sort((a, b) => a.price - b.price);
         } else if (sort === 'desc') {
           fetchedProducts = fetchedProducts.sort((a, b) => b.price - a.price);
         }
   
         setProducts(fetchedProducts);
       } catch (err) {
         setError('Erreur de récupération des produits');
      } finally {
         setLoading(false);
      }
   };

   return (
      <Container className="fade-in" style={{ minHeight: '80vh' }}>
         <h1 className="my-4 text-center">Liste des Livres</h1>

         <ProductFilter setCategory={setCategory} setSort={setSort} />

         {error && <Alert variant="danger" className="text-center">{error}</Alert>}

         {loading ? (
            <div className="d-flex justify-content-center my-5">
               <Spinner animation="border" variant="light" />
            </div>
         ) : (
            <Row className="justify-content-center">
               {products.length > 0 ? (
                  products.map((product) => (
                     <ProductCard key={product._id} product={product} />
                  ))
               ) : (
                  <p className="text-center">Aucun produit trouvé.</p>
               )}
            </Row>
         )}
      </Container>
   );
}

export default ProductList;
