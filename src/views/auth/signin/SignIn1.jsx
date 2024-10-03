import React, { useState } from 'react';
import { Card , Spinner,Form, InputGroup, Button, Image } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TurnstileWidget from '../verification/cloudfare';
import Verify from '../verification/verify';

const Signin1 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [turnstileToken, setTurnstileToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const IP = import.meta.env.VITE_BACKEND_IP_ADDRESS;
  const Key = import.meta.env.VITE_SITE_KEY;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    // if (!turnstileToken) {
    //   setErrorMessage("Please complete the CAPTCHA verification.");
    //   return;
    // }

    const url = `https://${IP}/api/method/sagasuite.customer_api.fetch_value?email_id=${email}&cf_turnstile_response=${turnstileToken}`;

    try {
      const response = await axios.get(url);
      const message = response.data.message;

      if (message?.Fb) {
        const fbUser = message.Fb;
    
        // Email check
        if (fbUser.email_id === email) {
          
          // Password check (without bcrypt)
          if (fbUser.pw === password) {
            
            // Email verification flag check
            if (fbUser.e_vf === "1") {
              
              // Auth user email check
              if (message?.Auth) {
                const authUser = message.Auth;
                
                if (authUser.user.email === email) {
                  // Save user company and navigate to dashboard
                  sessionStorage.setItem("company", authUser.user.groups[0].name);
                  navigate('/dashboard');
                } else {
                  window.alert("Authentication email mismatch.");
                }
              } else {
                window.alert("Authentication data not found.");
                console.log("No auth object in message.");
              }
    
            } else {
              // Email not verified, navigate to verification page
              navigate('/verify');
            }
            
          } else {
            // Incorrect password
            window.alert("Incorrect password.");
          }
    
        } else {
          // No user with that email
          window.alert("No user found with that email.");
        }
    
      } else if(message.Status === "Succes"){
          navigate('/dashboard')
      }
      else if(message.Message === "User not found"){
        window.alert("You don't have any account please signup")
        navigate('/signup')
       }
      
      else {
        // No Fb object, navigate to verification
        window.alert("Email verification not done yet");
        navigate('/verify');
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred while processing the request.");
    }finally{
      setIsLoading(false)
    }
  };
  sessionStorage.setItem("email", email);
  // const handleVerify = (token) => {
  //   setTurnstileToken(token);
  // };
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
          <Card className="borderless text-center">
            <Card.Body>
              <div className="mb-4">
                <i className="feather icon-unlock auth-icon" />
              </div>
              <h3 className="mb-2">Login with</h3>
              <div className="mb-4 align-items-center">
                  <Image className="align-items-center" src="src/assets/images/auth-logo.svg" rounded /> 
              </div>
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
              <Form className='auth-form' onSubmit={handleSubmit}>
                <div className="input-group mb-4">
                  <Form.Control
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    required
                  />
                </div>
                <div className="input-group mb-4">
                  <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"} 
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  /> <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                  <i className={showPassword ? 'feather icon-eye-off' : 'feather icon-eye'} />
                </Button>
                </InputGroup>
                </div>
                {/* <div className="input-group mb-4">
                  <TurnstileWidget siteKey={Key} onVerify={handleVerify} />
                </div> */}
                {isLoading ? (<div className="text-center">
                      <Spinner animation="border" role="status" aria-label="Loading..." />
                    </div>
                  ) : (
                <button type="submit" className="btn btn-primary mb-4" >
                  Login
                </button>
                )}
              </Form>
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
