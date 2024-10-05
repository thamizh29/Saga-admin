import React, { useState } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, DropdownButton, Dropdown, Spinner } from 'react-bootstrap';
import axios from 'axios';
import AlertMessage from 'views/Alert';

export default function AddEmail() {
  const company = sessionStorage.getItem('company');
  const [domain, setDomain] = useState('');
  const [role, setRole] = useState('');
  const [user, setUser] = useState('');
  const IP = import.meta.env.VITE_BACKEND_IP_ADDRESS;
  const data = sessionStorage.getItem('domain');
  const [showAlert, setShowAlert] = useState(false);
  const [alertBody, setAlertBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleDomain = async (e) => {
    e.preventDefault();

    const url = `https://${IP}/api/method/sagasuite.email_acc_api.add_email_accs?domain_name=${domain}&user_name=${user}&role=${role}&company_name=${company}`;
    try {
      setIsLoading(true)
      const result = await axios.post(url);
      if (result.data.message.Status === "Success") {
        setAlertBody("User has been created successfully!");
        setShowAlert(true);
      } else {
        setAlertBody("Something went wrong :(");
        setShowAlert(true);
      }
    } catch (error) {
      console.log(error);
    }
    finally{
      setIsLoading(false)
    }
  };

  const [drop, setDrop] = useState('');

  const handleSelect = (eventKey) => {
    setDrop(eventKey); // Update the dropdown state
    setDomain(eventKey); // Update the domain with the selected value
  };
  const [gender, setGender] = useState('');

  const handleGender = (eventKey) => {
    setGender(eventKey);
  };

  return (
    <React.Fragment>
     {showAlert && <AlertMessage body={alertBody} show={showAlert} onClose={() => setShowAlert(false)} />}
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Email</Card.Title>
            </Card.Header>
            <Card.Body>
            <div className='form-back'>
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
                  <Form.Group as={Row} className="mb-4" >
                    <Form.Label column sm="2">First name</Form.Label>
                    <Col>
                      <Form.Control type="text" disabled />
                    </Col>
                    <Form.Label column sm="2">Last name</Form.Label>
                    <Col>
                      <Form.Control type="text" disabled />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-4" >
                    <Form.Label column sm="2">Phone number</Form.Label>
                    <Col>
                      <Form.Control type="text" disabled />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-4" >
                    <Form.Label column sm="2">Date of Birth</Form.Label>
                    <Col>
                      <Form.Control type="date" disabled />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-4" >
                    <Form.Label column sm="2">Date of Joining</Form.Label>
                    <Col>
                      <Form.Control type="text" disabled />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-4">
                    <Col xs="2" className="d-flex align-items-center">
                      <Form.Label className="mr-3">Gender</Form.Label>
                    </Col>
                    <Col >
                      <DropdownButton
                       variant="outline-secondary"
                        id="gender-dropdown"
                        title={gender || "Select Gender"}
                        onSelect={handleGender}
                        className="ml-5 ml-md-0"
                      >
                        <Dropdown.Item eventKey="male">Male</Dropdown.Item>
                        <Dropdown.Item eventKey="female">Female</Dropdown.Item>
                        <Dropdown.Item eventKey="other">Other</Dropdown.Item>
                      </DropdownButton>
                    </Col>
                  </Form.Group>


                  <Form.Group as={Row} className="mb-4" >
                    <Form.Label column sm="2">Upload Image</Form.Label>
                    <Col>
                    {/* <Form.File
                       id="custom-file"
                       label='Choose file...'
                       
                      
                    /> */}
                    </Col>
                  </Form.Group>
                  {isLoading ? (
                    <div className="text-center">
                      <Spinner animation="border" role="status" aria-label="Loading..." />
                    </div>
                  ) : (
                  <Button type="submit" variant="primary">Add</Button>
                  )}
                </Form>
              </Row>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
     
    </React.Fragment>
  );
}
