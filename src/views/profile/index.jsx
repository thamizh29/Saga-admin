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
  CardImg,
  Image,
  CardTitle,
  FormLabel,
  FormGroup
} from "react-bootstrap";
import ProfileCover from "./header";

const Profile = () => {
  return (
    <React.Fragment>
      <Container>
        <Card>
        <CardHeader>
                <Card.Title>Profile</Card.Title>
              </CardHeader>
        <CardBody>
        <Row>
          <Col>
              <Image style={{ height: '200px', width: '200px', borderRadius: '50%', marginLeft: '100px' }} src="src/assets/images/user/img-avatar-2.jpg" />
            </Col>
              <Card>

                <CardBody>
                  <Form>
                    <FormGroup as={Row} className="mb-3" controlId="formPlaintextEmail">

                    <FormLabel column sm={2}>Name</FormLabel>
                    
                    <Col sm={2}>
                    <FormControl plaintext readOnly defaultValue="email@example.com"/>
                    </Col>
                    </FormGroup>
                    <Row>
                    <Col>
                    <FormLabel className="mb-4">Name</FormLabel>
                    </Col>
                    <Col>
                    <FormLabel className="mb-4">Name</FormLabel>
                    </Col>
                    </Row>
                    <Row>
                    <Col>
                    <FormLabel className="mb-4">Name</FormLabel>
                    </Col>
                    <Col>
                    <FormLabel className="mb-4">Name</FormLabel>
                    </Col>
                    </Row>
                    <Row>
                    <Col>
                    <FormLabel className="mb-4">Name</FormLabel>
                    </Col>
                    <Col>
                    <FormLabel className="mb-4">Name</FormLabel>
                    </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
        </Row>
        </CardBody>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default Profile;
