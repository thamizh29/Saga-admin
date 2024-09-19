import React from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';

export default function EditDomain() {
  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Edit Domain</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Form>
                  <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                    <Form.Label column sm="2">Domain</Form.Label>
                    <Col>
                      <Form.Control plaintext readOnly defaultValue="sagasoft.io" />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">Description</Form.Label>
                    <Col>
                      <Form.Control type="text" />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" controlId="formBasicChecbox">
                    <Form.Label column sm="2">Templates</Form.Label>
                    <Col>
                      <Form.Control as="select" className="mb-3">
                        <option>Default</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Form.Control>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">Tags</Form.Label>
                    <Col>
                      <Form.Control type="text" />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">Max. possible aliases</Form.Label>
                    <Col>
                      <Form.Control type="text" />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">Max. possible mailboxes</Form.Label>
                    <Col>
                    <Form.Control type="text" />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">Default mailbox quota</Form.Label>
                    <Col>
                    <Form.Control type="text" />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">Max. quota per mailbox (MiB)</Form.Label>
                    <Col>
                    <Form.Control type="text" />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">Domain quota</Form.Label>
                    <Col>
                    <Form.Control type="text" />
                    </Col>
                  </Form.Group>
                  <Form.Group style={{marginLeft:"17rem"}} >
                    <Form.Label>Relay options</Form.Label>
                    <Form.Check type="checkbox" id="checkbox1" label="Check this custom checkbox" />
                    <Form.Check type="checkbox" id="checkbox1" label="Check this custom checkbox" />
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

