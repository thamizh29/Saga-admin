import React from "react";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  CardHeader,
  CardBody,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const Profile = () => {
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
};


  return (
    <React.Fragment>
      <Container>
        <Col>
          <Row>
            <Card>
              <CardHeader>
              <Card.Title>User Inter face</Card.Title>
              </CardHeader>
              <CardBody>
                <span>Welcome user !</span>
                <Button onClick={handleLogout} ><Link to={'/login'}>Loguot</Link></Button>
              </CardBody>

            </Card>  
          </Row>        
        </Col>
      </Container>
    </React.Fragment>
  );
};

export default Profile;
