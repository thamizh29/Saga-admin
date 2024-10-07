import React, { useState } from 'react';
import { Card, Spinner, Form, InputGroup, Button, Image } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TurnstileWidget from '../verification/cloudfare';
import Verify from '../verification/verify';
import Cookies from 'js-cookie';
import AlertMessage from 'views/Alert';

const Signin1 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [turnstileToken, setTurnstileToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const IP = import.meta.env.VITE_BACKEND_IP_ADDRESS;
  const Key = import.meta.env.VITE_SITE_KEY;
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertBody, setAlertBody] = useState('');
  const [alertHead, setAlertHead] = useState('Alert');
  //const color = "primary";
  const navigate = useNavigate();

  //Alert message for inncorrect password

  const handleSubmit = async (e) => {
    e.preventDefault();
   


    const url = `${IP}/api/method/sagasuite.customer_api.fetch_value?email_id=${email}&password=${password}&cf_turnstile_response=${turnstileToken}`;
    if (turnstileToken) {
      setIsLoading(true)
      try {
        const response = await axios.get(url);
        const message = response.data.message;

        if (message.Status === "Success" && message.frappe_response.Fb) {
          const fbUser = message.frappe_response.Fb;
            // Email check
            if (fbUser.email_id === email) {
              // Password check
              if (fbUser.pw === password) {
                // Email verification check
                if (fbUser.e_vf === "1") {

                  if (message.frappe_response.Auth) {
                  
                    const authUser = message.frappe_response.Auth;

                    if (authUser.user.email === email) {
                      // Save user company and navigate to dashboard
                      sessionStorage.setItem("company", authUser.user.groups[0]?.name || "Unknown Company");
                      sessionStorage.setItem("avatar", authUser.user.avatar);
                      Cookies.set('template', fbUser.sub_pl, { expires: 1 });
                      navigate('/dashboard');
                    } else {
                      setAlertBody("Authentication error");
                      setShowAlert(true);
                    }
                  } else {
                      setAlertBody("Authentication faild");
                      setShowAlert(true);
                  }
                } else {
                  setAlertBody("Your email needs verification to access this feature");
                  setShowAlert(true);
                  setTimeout(() => {
                    navigate('/verify');
                  }, 2000);
                }
              } else {
                setAlertBody("Incorrect password. Please try again");
                setShowAlert(true);        
              }
            } else {
               setAlertBody("No user found");
               setShowAlert(true);
               setTimeout(() => {
                navigate('/signup');
              }, 2000);
            }
        }else if (message?.Message === "User not found") {
                setAlertBody("You don’t have an account. Please sign up to continue!");
                setShowAlert(true);
                setTimeout(() => {
                  navigate('/signup');
                }, 2000);
               
        } else if (message?.Status === "Failed") {

            if (message?.Message === "Invalid Password") {
                setAlertBody("Incorrect password. Please try again");
                setShowAlert(true);
          }
          else if (message?.Message === "Email ID doesn't verified") {
                setAlertBody("Your email needs verification to access this feature");
                setShowAlert(true);
                setTimeout(() => {
                  navigate('/verify');
                }, 2000);
                
          }
        }
        else if (message?.Message === "CAPTCHA validation failed") {
          setAlertBody("Captcha faild");
          setShowAlert(true);
        }
        else {
            setAlertBody("Something went wrong :(");
            setShowAlert(true);
        }
      } catch (error) {
        console.error("Error processing request:", error);
      }
      finally {
        setIsLoading(false)
      }
    } else {
      setAlertBody("To continue using our services, please enable Cloudflare");
      setShowAlert(true);
    }
  };
  sessionStorage.setItem("email", email);
  const handleVerify = (token) => {
    setTurnstileToken(token);

  };
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <React.Fragment>
       {showAlert && <AlertMessage  head={alertHead} body={alertBody} show={showAlert} onClose={() => setShowAlert(false)} />}
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
             
              {errorMessage && <AlertMessage body={alertBody} show={showAlert} onClose={() => setShowAlert(false)} />}
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
                <div className="input-group mb-4">
                  <div style={{ transform: 'scale(1.1)', transformOrigin: 'top left' }}>
                    <TurnstileWidget siteKey={Key} onVerify={handleVerify} />
                  </div>
                </div>
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
