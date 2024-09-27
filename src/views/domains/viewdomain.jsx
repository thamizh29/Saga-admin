import React, { useState } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import axios from 'axios';

export default function AddEmail() {
  const company = sessionStorage.getItem('company');
  const [domain, setDomain] = useState('');
  const [role, setRole] = useState('');
  const [user, setUser] = useState('');
  const IP = import.meta.env.VITE_BACKEND_IP_ADDRESS;
  const data = sessionStorage.getItem('domain');

  const handleDomain = async (e) => {
    e.preventDefault();

    const url = `http://${IP}/api/method/sagasuite.email_acc_api.add_email_accs?domain_name=${domain}&user_name=${user}&role=${role}&company_name=${company}`;
    try {
      const result = await axios.post(url);
      if (result.data.message.Message === "This Email already exists in mailcow") {
        window.alert(result.data.message.Message);
      } else if (result.data.message.Message === "This Domain Name is Not Registered in Domain Name Doctype") {
        window.alert(result.data.message.Message);
      } else {
        console.log(result);
        window.alert("Email added successfully");
      }
    } catch (error) {
      console.log(error);
      window.alert("server error");
    }
  };

  const [drop, setDrop] = useState('');

  const handleSelect = (eventKey) => {
    setDrop(eventKey); // Update the dropdown state
    setDomain(eventKey); // Update the domain with the selected value
  };


  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Email</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Form onSubmit={handleDomain}>
                  <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                    <Form.Label column sm="2">Username (left part of an email address)</Form.Label>
                    <Col>
                      <InputGroup className="mb-3">
                        <Form.Control
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                          onChange={(e) => setUser(e.target.value)}
                        />
                        <DropdownButton
                          variant="outline-secondary"
                          title={drop || 'Select domain'} // Display the selected value in the dropdown title
                          id="input-group-dropdown-2"
                          align="end"
                          onSelect={handleSelect}
                        >
                          <Dropdown.Item eventKey={data}>{data}</Dropdown.Item>
                        </DropdownButton>
                      </InputGroup>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="formBasicRole">
                    <Form.Label column sm="2">Role</Form.Label>
                    <Col>
                      <Form.Control
                        as="select"
                        className="mb-3"
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value="">Select Role</option>
                        <option>Admin</option>
                        <option>Employee</option>
                      </Form.Control>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">Templates</Form.Label>
                    <Col>
                      <Form.Control type="text" disabled />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">Full name</Form.Label>
                    <Col>
                      <Form.Control type="text" disabled />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">password</Form.Label>
                    <Col>
                      <Form.Control type="password" disabled />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">Confirm password</Form.Label>
                    <Col>
                      <Form.Control type="text" disabled />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">Templates</Form.Label>
                    <Col>
                      <Form.Control type="text" disabled />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">Tags</Form.Label>
                    <Col>
                      <Form.Control type="text" disabled />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">Quota</Form.Label>
                    <Col>
                      <Form.Control type="text" disabled />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">Domain quota</Form.Label>
                    <Col>
                      <Form.Control type="text" disabled />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">Domain quota</Form.Label>
                    <Col>
                      <Form.Control type="text" disabled />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">Quarantine notification</Form.Label>
                    <Col>
                      <Form.Control type="text" disabled />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">Domain quota</Form.Label>
                    <Col>
                      <Form.Control type="text" disabled />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">Domain quota</Form.Label>
                    <Col>
                      <Form.Control type="text" disabled />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">Domain quota</Form.Label>
                    <Col>
                      <Form.Control type="text" disabled />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">Domain quota</Form.Label>
                    <Col>
                      <Form.Control type="text" disabled />
                    </Col>
                  </Form.Group>

                  <Button type="submit" variant="primary">Save changes</Button>
                </Form>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}
