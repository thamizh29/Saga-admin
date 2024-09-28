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

const Profile = () => {
  const user = sessionStorage.getItem('email'); // Retrieving email from sessionStorage

  return (
    <React.Fragment>
      <Container>
        <Card className="my-5">
          <CardHeader>
            <Card.Title className="text-center">Profile</Card.Title>
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
                  src="src/assets/images/user/avatar-1.jpg" // Adjust the path if necessary
                  alt="User Avatar"
                />
              </Col>
            </Row>

            <Row className="mt-4 justify-content-center">
              <Col xs={12} md={6}>
                <Card>
                  <CardBody className="text-center">
                    <Form>
                      {/* Email Field */}
                      <FormGroup as={Row} className="mb-3">
                        <FormLabel column sm={4}>Email</FormLabel>
                        <Col sm={8}>
                          <FormControl
                            plaintext
                            readOnly
                            defaultValue={user || "email@example.com"}
                          />
                        </Col>
                      </FormGroup>

                      {/* First Name Field */}
                      <FormGroup as={Row} className="mb-3">
                        <FormLabel column sm={4}>First Name</FormLabel>
                        <Col sm={8}>
                          <FormControl plaintext readOnly defaultValue="John" />
                        </Col>
                      </FormGroup>

                      {/* Last Name Field */}
                      <FormGroup as={Row} className="mb-3">
                        <FormLabel column sm={4}>Last Name</FormLabel>
                        <Col sm={8}>
                          <FormControl plaintext readOnly defaultValue="Doe" />
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
