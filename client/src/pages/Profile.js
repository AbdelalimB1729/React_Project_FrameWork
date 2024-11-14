import React, { useEffect, useState } from 'react';
import { Container, Card, ListGroup, Tab, Tabs, Spinner } from 'react-bootstrap';
import api from '../services/api';  

function Profile() {
  const [userData, setUserData] = useState(null);   
  const [loading, setLoading] = useState(true);     
  const [error, setError] = useState('');           

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/user/me');  
        setUserData(response.data.data);            
      } catch (err) {
        setError('Failed to load profile data');
      } finally {
        setLoading(false);                          
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <Spinner animation="border" variant="primary" className="d-block mx-auto my-5" />;
  }

  if (error) {
    return <p className="text-center text-danger my-5">{error}</p>;
  }

  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center">User Profile</h2>

      <Tabs defaultActiveKey="userInfo" id="profile-tabs" className="mb-4">
        <Tab eventKey="userInfo" title="User Information">
          <Card className="p-3 mb-4 shadow-sm">
            <Card.Body>
              <h4 className="card-title">Personal Details</h4>
              <ListGroup variant="flush">
                <ListGroup.Item><strong>Name:</strong> {userData.firstName} {userData.lastName}</ListGroup.Item>
                <ListGroup.Item><strong>Email:</strong> {userData.username}</ListGroup.Item>
                <ListGroup.Item><strong>Phone:</strong> {userData.phoneNumber}</ListGroup.Item>
                <ListGroup.Item><strong>Address:</strong> {userData.address}</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Tab>

      </Tabs>
    </Container>
  );
}

export default Profile;
