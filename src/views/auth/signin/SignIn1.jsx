import React from 'react';
import { Card } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import TurnstileWidget from '../verification/cloudfare';
import axios from 'axios';
import Verify from '../verification/verify';

const Signin1 = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [turnstileToken, setTurnstileToken] = useState(null);
  const [shouldRedirect, setshouldRedirect] = useState(false)
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    //const url = `http://192.168.1.18:8000/api/method/sagasuite.customer_api.fetch_value?email_id=${email}&cf_turnstile_response=${turnstileToken}`
    const url = `http://192.168.1.18:8000/api/method/sagasuite.customer_api.fetch_value?email_id=${email}&password=${password}`;
    //Get the data from backend
    //if(turnstileToken){
    try {
      const result = await axios.get(url);
      const data = response.data;

      if (data.message && Array.isArray(data.message.Fb) && data.message.Fb.length > 0) {
        const user = data.message.Fb[0];
        const authUser = data.message.Auth.user;

        if (user.email_id === email) {
          if (user.password === password) {
            if (user.email_id_verified === "1") {
              if (authUser.email === email) {
                navigate('/dashboard');
              } else {
                console.log("Authentication error: Auth user email doesn't match");
              }
            } else if (user.email_id_verified === "0") {
              setshouldRedirect(true); // Redirect for email verification
            }
          } else {
            window.alert("Incorrect password");
          }
        } else {
          window.alert("Email does not match");
        }
      } else {
        window.alert("No user found");
        navigate('/signup');
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  // const handleVerify = (token) => {
  //   setTurnstileToken(token)
  // }
  if (shouldRedirect) {
    return <Verify />
  }
  sessionStorage.setItem('email', email)
  return (
    <React.Fragment>
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r " />
          </div>
          <Card className="borderless text-center">
            <Card.Body>
              <div className="mb-4">
                <i className="feather icon-unlock auth-icon" />
              </div>
              <h3 className="mb-4">Login</h3>
              <form onSubmit={handleSubmit}>
                <div className="input-group mb-4">
                  <input type="email" className="form-control" onChange={(e) => (setemail(e.target.value))} placeholder="Email address" required />
                </div>
                <div className="input-group mb-4">
                  <input type="password" className="form-control" onChange={(e) => (setpassword(e.target.value))} placeholder="Password" required />
                </div>
                {/* <div className="input-group mb-4">
                <TurnstileWidget siteKey="0x4AAAAAAAjvk8ALU_gVGuSg" onVerify={handleVerify} />
                </div> */}
                <button type='submit' className="btn btn-primary mb-4">login</button>
              </form>

              <p className="mb-0 text-muted">
                Don’t have an account?{' '}
                <NavLink to="/signup" className="f-w-400">
                  Create account
                </NavLink>
              </p>
            </Card.Body>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Signin1;
