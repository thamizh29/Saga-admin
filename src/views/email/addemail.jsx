import React from 'react';
import { Row, Col, Card, Form, Button, InputGroup } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
export default function AddEmail() {
  const company = sessionStorage.getItem('company');
  const [domain, setdomain] = useState('')
  const [role,setrole] = useState('')
  const[user,setuser] = useState('');
  const IP = import.meta.env.VITE_BACKEND_IP_ADDRESS;
  //const email = sessionStorage.getItem('email')
  const handledomain = async (e) => {
    e.preventDefault();
    
      const url = `http://${IP}/api/method/sagasuite.email_acc_api.add_email_accs?domain_name=${domain}&user_name=${user}&role=${role}&company_name=${company}`;
      try {
          const result = await axios.post(url);
          if(result.data.message.Message === "This Email already exists in mailcow"){
              window.alert(result.data.message.Message)
          }
          else if(result.data.message.Message === "This Domain Name is Not Registered in Domain Name Doctype"){
              window.alert(result.data.message.Message)
          }
          else{
          console.log(result)
          console.error()
          window.alert("Email added succesfully")
          }
      }
      catch (error) {
          console.log(error)
          window.alert("server error")
      }                                                    

  }
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
                <Form onSubmit={handledomain}>
                  <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                    <Form.Label column sm="2">Username (left part of an email address)</Form.Label>
                    <Col>
                      <InputGroup className="mb-3">
                        <Form.Control
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2" onChange={(e)=>setuser(e.target.value)}
                        />
                        <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
                      </InputGroup>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" controlId="formBasicChecbox">
                    <Form.Label column sm="2">Domain</Form.Label>
                    <Col>
                      {/* <Form.Control as="select" className="mb-3">
                        <option>Domain</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Form.Control> */}
                       <Form.Control type="text" onChange={(e)=>setdomain(e.target.value)} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" controlId="formBasicChecbox">
                    <Form.Label column sm="2">Role</Form.Label>
                    <Col>
                      <Form.Control as="select" className="mb-3" onClick={(e)=>setrole(e.target.value)}>
                        <option>Admin</option>
                        <option>Employee</option>
                      </Form.Control>
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
                  <Button type='submit' variant="primary">Save changes</Button>
                </Form>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

