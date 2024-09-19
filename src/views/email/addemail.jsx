import React from 'react';
import { Row, Col, Card, Form, Button, InputGroup } from 'react-bootstrap';

export default function AddEmail() {
  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Add Email</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Form>
                  <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                    <Form.Label column sm="2">Username (left part of an email address)</Form.Label>
                    <Col>
                      <InputGroup className="mb-3">
                        <Form.Control
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                        />
                        <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
                      </InputGroup>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" controlId="formBasicChecbox">
                    <Form.Label column sm="2">Domain</Form.Label>
                    <Col>
                      <Form.Control as="select" className="mb-3">
                        <option>Domain</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Form.Control>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">Full name</Form.Label>
                    <Col>
                      <Form.Control type="text" />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">password</Form.Label>
                    <Col>
                      <Form.Control type="password" />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">Confirm password</Form.Label>
                    <Col>
                      <Form.Control type="text" />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">Templates</Form.Label>
                    <Col>
                      <Form.Control type="text" disabled/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">Tags</Form.Label>
                    <Col>
                      <Form.Control type="text" disabled/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">Quota</Form.Label>
                    <Col>
                      <Form.Control type="text" disabled/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">Domain quota</Form.Label>
                    <Col>
                      <Form.Control type="text" disabled/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">Domain quota</Form.Label>
                    <Col>
                      <Form.Control type="text" disabled/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">Quarantine notification</Form.Label>
                    <Col>
                      <Form.Control type="text" disabled/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">Domain quota</Form.Label>
                    <Col>
                      <Form.Control type="text" disabled/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">Domain quota</Form.Label>
                    <Col>
                      <Form.Control type="text" disabled/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">Domain quota</Form.Label>
                    <Col>
                      <Form.Control type="text" disabled/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">Domain quota</Form.Label>
                    <Col>
                      <Form.Control type="text" disabled/>
                    </Col>
                  </Form.Group>
                  <Button variant="primary">Save changes</Button>
                </Form>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

