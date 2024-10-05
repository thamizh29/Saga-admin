import React from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Form,
  FormControl,
  CardHeader,
  CardBody,
  Image,
  FormLabel,
  FormGroup
} from "react-bootstrap";
import Cookies from 'js-cookie';

const Profile = () => {
  const email = sessionStorage.getItem('email'); // Retrieving email from sessionStorage
  const avatar = sessionStorage.getItem('avatar')
  const user = Cookies.get('user');

  return (
    <React.Fragment>
      <Container>
        <Card className="my-5">
          <CardHeader>
            <Card.Title >Profile</Card.Title>
          </CardHeader>
          <CardBody>
            <Row className="justify-content-center">
              {/* User Profile Picture */}
              <Col xs="auto" className="text-center">
                <Image
                  style={{
                    height: '200px',
                    width: '200px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                  src={avatar} // Adjust the path if necessary
                  alt="User Avatar"
                />
              </Col>
            </Row>

            <Row className="mt-4 justify-content-center">
              <Col xs={12} md={6}>
                <Card>
                  <CardBody >
                    <Form>
                    <FormGroup as={Row} className="mb-3">
                        <FormLabel column sm={4}>Full Name</FormLabel>
                        <Col sm={8}>
                          <FormControl
                           plaintext
                            readOnly 
                            defaultValue={(":" + " " + user) || "Your name here"}/>
                        </Col>
                      </FormGroup>
                      {/* Email Field */}
                      <FormGroup as={Row} className="mb-3">
                        <FormLabel column sm={4}>Email</FormLabel>
                        <Col sm={8}>
                          <FormControl
                            plaintext
                            readOnly
                            defaultValue={(":" + " " + email) || "email@example.com"}
                          />
                        </Col>
                      </FormGroup>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default Profile;
