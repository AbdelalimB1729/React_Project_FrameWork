import React, { useEffect, useState } from "react";
import axios from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Carousel,
  Button,
  Badge,
  Image,
} from "react-bootstrap";

function Home() {
  const [popularBooks, setPopularBooks] = useState([]);
  const navigate = useNavigate();
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "Bahae",
      text: "A vast collection of books with incredible quality and service!",
      imageUrl: "../FoundersImages/Bahae.jpg",
    },
    {
      id: 2,
      name: "Rayane",
      text: "The book selection here is unbeatable, and the prices are great.",
      imageUrl: "../FoundersImages/Rayane.jpg",
    },
    {
      id: 3,
      name: "Tahir",
      text: "Quick delivery and amazing titles that are hard to find elsewhere.",
      imageUrl: "../FoundersImages/Tahir.jpg",
    },
  ]);

  useEffect(() => {
    fetchPopularBooks();
  }, []);

  const fetchPopularBooks = async () => {
    try {
      const response = await axios.get("/Produit");
      const allBooks = response.data?.data;
      if (!Array.isArray(allBooks)) {
        throw new Error("Invalid data format: Expected an array of books.");
      }

      const sortedBooks = allBooks
        .filter(book => book.prix != null) 
        .sort((a, b) => b.prix - a.prix)  
        .slice(0, 4);                       
      setPopularBooks(sortedBooks);
    } catch (error) {
      console.error("Error fetching popular books:", error.message || error);
      alert("An error occurred while fetching popular books. Please try again later.");
    }
  };
  

  return (
    <div>
      <section
        className="hero-banner position-relative text-center text-white d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: "url(/path/to/banner-image.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          position: "relative",
          backgroundAttachment: "fixed",
        }}
      >
        <div
          style={{
            background: "rgba(0, 0, 0, 0.75)",
            padding: "60px 40px",
            borderRadius: "20px",
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.5)",
            maxWidth: "650px",
            textAlign: "center",
            backdropFilter: "blur(4px)",
            color: "#f8f9fa",
          }}
        >
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "700",
              letterSpacing: "1px",
            }}
          >
            Welcome to Our Online Book Store
          </h1>
          <p
            className="lead"
            style={{
              fontSize: "1.25rem",
              lineHeight: "1.75",
              marginTop: "20px",
              marginBottom: "30px",
            }}
          >
            Discover a world of literature at your fingertips. From timeless
            classics to modern bestsellers, our curated collection offers
            something for every reader.
          </p>
          <Button
            variant="outline-light"
            size="lg"
            className="mt-3"
            style={{
              padding: "12px 30px",
              fontWeight: "bold",
              borderColor: "#ffffff",
              boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.2)",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#ffffff";
              e.target.style.color = "#333";
              e.target.style.boxShadow =
                "0px 6px 15px rgba(255, 255, 255, 0.4)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#ffffff";
              e.target.style.boxShadow =
                "0px 4px 10px rgba(255, 255, 255, 0.2)";
            }}
            onClick={() => navigate("/books")}
          >
            Browse Collection
          </Button>
        </div>
      </section>

      <Container className="mt-5">
        <section className="categories-section mb-5 text-center">
          <h2 className="mb-4">Explore by Category</h2>
          <Row>
            {[
              "FICTION",
              "BANDE DESSINEE",
              "CUISINE",
              "POLICIER",
              "LITTERATURE",
              "AMOUR",
            ].map((category, index) => (
              <Col md={4} key={index} className="mb-3">
                <Card
                  className="p-3 shadow-sm border-0"
                  style={{ backgroundColor: "#f8f9fa" }}
                  onMouseEnter={(e) => (e.currentTarget.style.cursor = "pointer")}
                  onClick={() => navigate("/books")}
                >
                  <h5>{category}</h5>
                  <p className="text-muted">Discover the best in {category}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        <section className="popular-books-section mb-5">
          <h2 className="mb-4">Popular Books</h2>
          <Row>
            {popularBooks && popularBooks.length > 0 ? (
              popularBooks.map((book) => (
                <Col md={3} key={book._id} className="mb-4">
                  <Card className="book-card h-100 shadow-sm border-0">
                    <div style={{ overflow: "hidden", height: "250px" }}>
                      <Card.Img
                        variant="top"
                        src={book.imageUrl || "/path/to/default-image.jpg"}
                        className="img-fluid"
                        alt={book.title}
                      />
                    </div>
                    <Card.Body>
                      <h5 className="text-truncate">
                        {book.title || "Untitled Book"}
                      </h5>
                      <p className="text-muted text-truncate">
                        {book.description || "No description available"}
                      </p>
                      <Badge bg="success" className="mb-2">
                        {book.prix ? `${book.prix} €` : "Price Unavailable"}
                      </Badge>
                      <Button variant="outline-dark" className="w-100 mt-2" onClick={()=>navigate("/books")}>
                        View Details
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Col className="text-center">
                <p>No popular books available at the moment.</p>
              </Col>
            )}
          </Row>
        </section>

        <section className="testimonials-section py-5">
          <h2 className="mb-5 text-center display-4" style={{ color: "#333" }}>
            What Our Customers Say
          </h2>
          <Carousel indicators={false} controls={false} interval={2000} fade>
            {testimonials.map((testimonial) => (
              <Carousel.Item key={testimonial.id}>
                <div
                  className="testimonial d-flex flex-column align-items-center justify-content-center text-center p-5"
                  style={{
                    background: "linear-gradient(135deg, #f8f8f8, #e0e0e0)",
                    borderRadius: "15px",
                    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
                    maxWidth: "800px",
                    margin: "0 auto",
                  }}
                >
                  <Image
                    src={testimonial.imageUrl}
                    roundedCircle
                    style={{
                      width: "120px",
                      height: "120px",
                      marginBottom: "20px",
                      border: "5px solid #333",
                    }}
                    alt={`${testimonial.name}'s testimonial`}
                  />
                  <p
                    className="mb-4"
                    style={{
                      fontSize: "1.5rem",
                      fontStyle: "italic",
                      lineHeight: "1.6",
                      color: "#555",
                      maxWidth: "700px",
                    }}
                  >
                    "{testimonial.text}"
                  </p>
                  <h5 style={{ color: "#333" }}>- {testimonial.name}</h5>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </section>
      </Container>
    </div>
  );
}

export default Home;
