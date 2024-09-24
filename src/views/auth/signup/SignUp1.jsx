import React from 'react';
import { Card, Row, Col, Form } from 'react-bootstrap';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import TurnstileWidget from '../verification/cloudfare';
import Verify from '../verification/verify';

const SignUp1 = () => {
  const [email, setemail] = useState('');
  const [user, setuser] = useState('');
  const [mobile, setmobile] = useState('');
  const [password, setpassword] = useState('');
  const [company, setcompany] = useState('');
  const [turnstileToken, setTurnstileToken] = useState(null);
  const [shouldRedirect, setshouldRedirect] = useState(false);
  const [cpassword, setcpassword] = useState('')
  const navigate = useNavigate()
  const handleSignup = async (e) => {
    e.preventDefault()
    const url = `http://192.168.1.18:8000/api/method/sagasuite.customer_api.insert_value?customer_name=${user}&company_name=${company}&customer_type=&email_id=${email}&password=${password}&status=&premium_customer=&phone_number_verified=&email_id_verified=&subscription_plan=&cf_turnstile_response=${turnstileToken}`;
    if (turnstileToken) {
      if (password === cpassword){
        try {
          const result = await axios.post(url);
          if (result.data.message[0] === "This mail id was already exist please go to login page") {
            window.alert(result.data.message[0])
            navigate('/signin')
          }
          else {
            setshouldRedirect(true);
          }
        }
        catch (error) { console.log(error) }
      }
      else {
        window.alert("password miss match")
      }
    }
    else {
      window.alert("verify the cloudfare")
    }
  }
  const handleVerify = (token) => {
    setTurnstileToken(token)
  }
  if (shouldRedirect) {
    return <Verify />
  }
  sessionStorage.setItem('email', email);
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
                      <Form.Control controlId="validationCustom01" type="name" className="form-control" onChange={(e) => (setuser(e.target.value))} placeholder="User name" required />
                    </div>
                    <div className="input-group mb-4">
                      <Form.Control type="name" className="form-control" onChange={(e) => (setcompany(e.target.value))} placeholder="Company name" required />
                    </div>
                    <div className="input-group mb-4">
                      <Form.Control type="email" className="form-control" onChange={(e) => (setemail(e.target.value))} placeholder="Email address" required />
                    </div>
                    <div className="input-group mb-4">
                      <Form.Control type="phonenumber" className="form-control" onChange={(e) => (setmobile(e.target.value))} placeholder="Mobile number" required />
                    </div>
                    <div className="input-group mb-4">
                      <Form.Control type="password" className="form-control" onChange={(e) => (setpassword(e.target.value))} placeholder="Password" required />
                    </div>
                    <div className="input-group mb-4">
                      <Form.Control type="password" className="form-control" onChange={(e) => (setcpassword(e.target.value))} placeholder="Confirm Password" required />
                    </div>
                    <div className="input-group mb-4">
                      <TurnstileWidget siteKey="0x4AAAAAAAi_zSCc2ZfoWGds" onVerify={handleVerify} />
                    </div>
                    <button type='submit' className="btn btn-primary mb-4">Sign up</button>
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
