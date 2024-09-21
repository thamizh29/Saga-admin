import React from "react";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Form,
  FormControl,
  CardHeader,
  CardBody,
} from "react-bootstrap";

const Profile = () => {
  return (
    <React.Fragment>
      <Container>
        <Col>
          <Row>
            <Card>
              <CardHeader>
              <Card.Title>Profile</Card.Title>
              </CardHeader>
              <CardBody>
                <span>Name</span>
              </CardBody>

            </Card>  
          </Row>        
        </Col>
      </Container>
    </React.Fragment>
  );
};

export default Profile;
