import React from "react";
import { Card, Button } from "react-bootstrap";

function ProductCard({ product, onDelete }) {
  return (
    <Card className="m-3 fade-in card col-6">
      <Card.Img
        variant="top"
        src={product.imageUrl}
        className="card-img-top"
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{product.nom}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text>Prix : {product.prix} €</Card.Text>
        {onDelete && (
          <Button variant="danger" onClick={() => onDelete(product._id)}>
            Supprimer
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
