import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

function ProductFilter({ setCategory, setSort }) {
  return (
    <Form className="filter-container p-3 rounded shadow-sm bg-light mb-4">
      <Row className="gy-3 align-items-center">
        <Col xs={12} md={6}>
          <Form.Group controlId="categoryFilter">
            <Form.Label className="fw-bold text-muted">Catégorie</Form.Label>
            <Form.Select 
              onChange={(e) => setCategory(e.target.value)} 
              aria-label="Filtrer par catégorie" 
              className="filter-select"
            >
              <option value="">Toutes les catégories</option>
              <option value="POLICIER">POLICIER</option>
              <option value="LITTERATURE">LITTERATURE</option>
              <option value="FICTION">FICTION</option>
              <option value="CALORIES-DIETES">CALORIES-DIETES</option>
              <option value="CUISINE">CUISINE</option>
              <option value="BANDE DESSINEE">BANDE DESSINEE</option>
              <option value="AMOUR">AMOUR</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          <Form.Group controlId="sortFilter">
            <Form.Label className="fw-bold text-muted">Trier par</Form.Label>
            <Form.Select 
              onChange={(e) => setSort(e.target.value)} 
              aria-label="Trier par prix" 
              className="filter-select"
            >
              <option value="">Trier par</option>
              <option value="asc">Prix croissant</option>
              <option value="desc">Prix décroissant</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}

export default ProductFilter;
