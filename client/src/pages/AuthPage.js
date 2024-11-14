import React, { useState } from 'react';
import api from '../services/api'; 
import { Container, Form, Button, Alert, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AuthPage() {
   const [isRegister, setIsRegister] = useState(false); 
   const [formData, setFormData] = useState({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      address: '',
      phoneNumber: ''
   });
   const [message, setMessage] = useState('');
   const [error, setError] = useState('');
   const navigate = useNavigate();

   const toggleForm = () => {
      setIsRegister(!isRegister);
      setFormData({
         email: '',
         password: '',
         confirmPassword: '',
         firstName: '',
         lastName: '',
         address: '',
         phoneNumber: ''
      });
      setMessage('');
      setError('');
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (isRegister) {
         if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
         }

         try {
            const response = await api.post('/user/register', {
               username: formData.email,
               password: formData.password,
               role: 'user',
               firstName: formData.firstName,
               lastName: formData.lastName,
               address: formData.address,
               phoneNumber: formData.phoneNumber
            });

            if (response.data.success) {
               setMessage("Registration successful! Redirecting to login...");
               setTimeout(() => {
                  setIsRegister(false); 
               }, 1500);
            } else {
               setError("Registration failed. Please try again.");
            }
         } catch (error) {
            setError("Error registering user: " + (error.response?.data?.message || error.message));
         }
      } else {
         try {
            const response = await api.post('/user/login', {
               username: formData.email,
               password: formData.password
            });

            if (response.data.success) {
               setMessage("Login successful! Redirecting...");
               setTimeout(() => {
                  if (formData.email === 'admin@admin.com') {
                    navigate('/admin');
                  } else {
                    navigate('/');
                  }
                }, 1500);
            } else {
               setError("Login failed. Please check your credentials.");
            }
         } catch (error) {
            setError("Error logging in: " + (error.response?.data?.message || error.message));
         }
      }
   };

   return (
      <div
         style={{
            backgroundImage: 'url(/path/to/background.jpg)', 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
         }}
      >
         <Container style={{ maxWidth: '500px' }}>
            <Card className="p-5 shadow-lg" style={{ borderRadius: '15px', backgroundColor: 'rgba(255, 255, 255, 0.85)' }}>
               <h2 className="text-center mb-4" style={{ fontWeight: 'bold', color: '#007bff' }}>{isRegister ? "Create an Account" : "Welcome Back!"}</h2>

               {message && <Alert variant="success">{message}</Alert>}
               {error && <Alert variant="danger">{error}</Alert>}

               <Form onSubmit={handleSubmit}>
                  {isRegister && (
                     <>
                        <Form.Group controlId="formFirstName" className="mb-3">
                           <Form.Label>First Name</Form.Label>
                           <Form.Control
                              type="text"
                              name="firstName"
                              placeholder="Enter your first name"
                              value={formData.firstName}
                              onChange={handleChange}
                              required
                              className="p-2"
                           />
                        </Form.Group>

                        <Form.Group controlId="formLastName" className="mb-3">
                           <Form.Label>Last Name</Form.Label>
                           <Form.Control
                              type="text"
                              name="lastName"
                              placeholder="Enter your last name"
                              value={formData.lastName}
                              onChange={handleChange}
                              required
                              className="p-2"
                           />
                        </Form.Group>

                        <Form.Group controlId="formAddress" className="mb-3">
                           <Form.Label>Address</Form.Label>
                           <Form.Control
                              type="text"
                              name="address"
                              placeholder="Enter your address"
                              value={formData.address}
                              onChange={handleChange}
                              required
                              className="p-2"
                           />
                        </Form.Group>

                        <Form.Group controlId="formPhoneNumber" className="mb-3">
                           <Form.Label>Phone Number</Form.Label>
                           <Form.Control
                              type="tel"
                              name="phoneNumber"
                              placeholder="Enter your phone number"
                              value={formData.phoneNumber}
                              onChange={handleChange}
                              required
                              className="p-2"
                           />
                        </Form.Group>
                     </>
                  )}

                  <Form.Group controlId="formEmail" className="mb-3">
                     <Form.Label>Email</Form.Label>
                     <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="p-2"
                     />
                  </Form.Group>

                  <Form.Group controlId="formPassword" className="mb-3">
                     <Form.Label>Password</Form.Label>
                     <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="p-2"
                     />
                  </Form.Group>

                  {isRegister && (
                     <Form.Group controlId="formConfirmPassword" className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                           type="password"
                           name="confirmPassword"
                           placeholder="Confirm your password"
                           value={formData.confirmPassword}
                           onChange={handleChange}
                           required
                           className="p-2"
                        />
                     </Form.Group>
                  )}

                  <Button variant="primary" type="submit" className="w-100 py-2" style={{ fontSize: '1.1rem' }}>
                     {isRegister ? "Register" : "Login"}
                  </Button>
               </Form>

               <Row className="mt-3">
                  <Col className="text-center">
                     <Button variant="link" onClick={toggleForm} className="text-decoration-none" style={{ fontSize: '0.9rem' }}>
                        {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
                     </Button>
                  </Col>
               </Row>
            </Card>
         </Container>
      </div>
   );
}

export default AuthPage;
