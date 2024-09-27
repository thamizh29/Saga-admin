import React from 'react';
import { Card, Row, Col, Form, Button, Modal, InputGroup } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import TurnstileWidget from '../verification/cloudfare';
import Verify from '../verification/verify';
import CryptoJS from 'crypto-js';

const SignUp1 = () => {
  const [email, setemail] = useState('');
  const [user, setuser] = useState('');
  const [mobile, setmobile] = useState('');
  const [password, setpassword] = useState('');
  const [company, setcompany] = useState('');
  const [turnstileToken, setTurnstileToken] = useState(null);
  const [shouldRedirect, setshouldRedirect] = useState(false);
  const [cpassword, setcpassword] = useState('')
  const [template,setTemplate] = useState('select plan')
  const settemplate = (plan) => {
    setTemplate(plan);
    handleModalClose();
  }
  const navigate = useNavigate()
  const IP = import.meta.env.VITE_BACKEND_IP_ADDRESS;

  const handleSignup = async (e) => {
    e.preventDefault();
    const url = `http://${IP}/api/method/sagasuite.customer_api.insert_value?customer_name=${user}&company_name=${company}&email_id=${email}&password=${password}&cf_turnstile_response=${turnstileToken}&templates=${template}`;

    if (turnstileToken) {
      if (password === cpassword) {
        try {
          const result = await axios.post(url);
          if (result.data.message[0] === "This mail id was already exist please go to login page") {
            window.alert(result.data.message[0])
            navigate('/signin')
          } else {
            setshouldRedirect(true);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        window.alert("Password mismatch");
      }
    } else {
      window.alert("Please verify the Cloudflare");
    }
  }

  const handleVerify = (token) => {
    setTurnstileToken(token);
  }

  if (shouldRedirect) {
    return <Verify />
  }

  const SecretKey = import.meta.env.VITE_SECRET_KEY;
  const Bdata = email;
  const encrypt = CryptoJS.AES.encrypt(Bdata, SecretKey).toString();
  sessionStorage.setItem('data', encrypt);

  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);
  console.log(template)
  return (
    <React.Fragment>
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <Card className="borderless">
            <Row className="align-items-center">
              <Col>
                <Card.Body className="text-center">
                  <div className="mb-4">
                    <i className="feather icon-user-plus auth-icon" />
                  </div>
                  <h3 className="mb-4">Create account</h3>
                  <Form onSubmit={handleSignup}>
                    <div className="input-group mb-4">
                      <Form.Control type="name" className="form-control" onChange={(e) => setuser(e.target.value)} placeholder="User name" required />
                    </div>
                    <div className="input-group mb-4">
                      <Form.Control type="name" className="form-control" onChange={(e) => setcompany(e.target.value)} placeholder="Company name" required />
                    </div>
                    <div className="input-group mb-4">
                      <Form.Control type="email" className="form-control" onChange={(e) => setemail(e.target.value)} placeholder="Email address" required />
                    </div>
                    <div className="input-group mb-4">
                      <Form.Control type="phonenumber" className="form-control" onChange={(e) => setmobile(e.target.value)} placeholder="Mobile number" required />
                    </div>
                    <div className="input-group mb-4">
                      <Form.Control type="password" className="form-control" onChange={(e) => setpassword(e.target.value)} placeholder="Password" required />
                    </div>
                    <div className="input-group mb-4">
                      <Form.Control type="password" className="form-control" onChange={(e) => setcpassword(e.target.value)} placeholder="Confirm Password" required />
                    </div>
                    <div className="input-group mb-4">
                      <InputGroup className="mb-3">
                      
                        <Form.Control
                          aria-label="Selected plan"
                          aria-describedby="basic-addon1"
                          readOnly
                          Value={template}
                        />
                        <Button variant="primary" onClick={handleModalOpen}>
                        Open Plans
                      </Button>
                      </InputGroup>
                      <Modal size='xl' show={showModal} onHide={handleModalClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Select a Plan</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Row>
                            <Col md={4}>
                              <Card>
                                <center>
                                <Card.Body>
                                  <Card.Title>Basic Plan</Card.Title>
                                  <Card.Text>
                                    Essential features for personal use.
                                  </Card.Text>
                                  <h4>10GB </h4>
                                  <h4>$9.99/month</h4>
                                  <Button variant="primary" onClick={()=>settemplate("basic")}>Select Plan</Button>
                                </Card.Body>
                                </center>
                              </Card>
                            </Col>

                            <Col md={4}>
                              <Card>
                              <center>
                                <Card.Body>
                                  <Card.Title>Standard Plan</Card.Title>
                                  <Card.Text>
                                    More features and flexibility.
                                  </Card.Text>
                                  <h4>60GB</h4>
                                  <h4>$19.99/month</h4>
                                  <Button variant="primary" onClick={()=>settemplate("standard")}>Select Plan</Button>
                                </Card.Body>
                                </center>
                              </Card>
                            </Col>

                            <Col md={4}>
                              <Card>
                              <center>
                                <Card.Body>
                                  <Card.Title>Premium Plan</Card.Title>
                                  <Card.Text>
                                    Advanced tools and support for businesses.
                                  </Card.Text>
                                  <h4>150GB</h4>
                                  <h4>$29.99/month</h4>
                                  <Button variant="primary" onClick={()=>settemplate("premium")}>Select Plan</Button>
                                </Card.Body>
                                </center>
                              </Card>
                            </Col>
                          </Row>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="danger" onClick={handleModalClose}>
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                    <div className="input-group mb-4">
                      <TurnstileWidget siteKey="0x4AAAAAAAi_zSCc2ZfoWGds" onVerify={handleVerify} />
                    </div>
                    <button type="submit" className="btn btn-primary mb-4">Sign up</button>
                  </Form>
                  <p className="mb-2">
                    Already have an account?{' '}
                    <NavLink to={'/signin'} className="f-w-400">
                      Login
                    </NavLink>
                  </p>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignUp1;
