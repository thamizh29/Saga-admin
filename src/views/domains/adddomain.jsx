import React from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
//import CryptoJS from 'crypto-js';
export default function AddDomain(){
  const [data, setdata] = useState('');
    //const SecretKey = import.meta.env.VITE_SECRET_KEY;
    // const bytes = CryptoJS.AES.decrypt(encrypt, SecretKey);
    // const decrypt = bytes.toString(CryptoJS.enc.Utf8);
    const email =  sessionStorage.getItem('email')
    const IP = import.meta.env.VITE_BACKEND_IP_ADDRESS;
    const template = sessionStorage.getItem('template')
    const handledomain = async (e) => {
      e.preventDefault();
        const url = `https://${IP}/api/method/sagasuite.dom_name_api.insert_value?domain_name=${data}&user_name=${email}&templates=${template}`;
        try {
            const result = await axios.post(url);
            if (result.data.message.Message === "This domain name was already exists") {
                window.alert("This Domain was exists")
            }
            else {
                console.log(result)
                window.alert("Domain added succesfully")
            }
        }
        catch (error) {
            console.log(error)
        }

    }
  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Domains</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                  <Form onSubmit={handledomain}>
                    <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                      <Form.Label column sm="2">Domain</Form.Label>
                      <Col>
                      <Form.Control type="text"  onChange={(e)=>setdata(e.target.value)}/>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                      <Form.Label column sm="2">Description</Form.Label>
                      <Col>
                      <Form.Control type="text"  disabled/>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formBasicChecbox">
                        <Form.Label column sm="2">Templates</Form.Label>
                        <Col>
                        <Form.Control as="select" className="mb-3" disabled>
                    <option>Default</option>
                    <option>1</option>
                    <option>2</option>
                  </Form.Control>
                  </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">Tags</Form.Label>
                      <Col>
                      <Form.Control type="text" disabled />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">Max. possible aliases</Form.Label>
                        <Col>
                      <Form.Control type="text"  disabled/>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">Max. possible mailboxes</Form.Label>
                        <Col>
                      <Form.Control type="text" disabled />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">Default mailbox quota</Form.Label>
                        <Col>
                      <Form.Control type="text" disabled />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">Max. quota per mailbox (MiB)</Form.Label>
                        <Col>
                      <Form.Control type="text"  disabled/>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">Total domain quota (MiB)</Form.Label>
                        <Col>
                      <Form.Control type="text" disabled />
                      </Col>
                    </Form.Group>
                    <Form.Group style={{marginLeft:"17rem"}}  className="mb-3">
                    <Form.Check  type="checkbox" id="checkbox1" label="Check this custom checkbox" disabled />
                    <Form.Check type="checkbox" id="checkbox1" label="Check this custom checkbox" disabled />
                  </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">Rate limit</Form.Label>
                        <Col>
                      <Form.Control type="text" disabled />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">Selector</Form.Label>
                        <Col>
                      <Form.Control type="text" disabled  />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">DKIM key length (bits)</Form.Label>
                        <Col>
                        <Form.Control as="select" className="mb-3"disabled>
                    <option>2048</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
                  </Col>
                    </Form.Group>
                    <Button type='submit' variant="primary">Add domain</Button>
                  </Form>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

