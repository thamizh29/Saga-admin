import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
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
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!turnstileToken) {
      setErrorMessage("Please complete the CAPTCHA verification.");
      return;
    }

    const url = `https://${IP}/api/method/sagasuite.customer_api.fetch_value?email_id=${email}&cf_turnstile_response=${turnstileToken}`;

    try {
      const response = await axios.get(url);
      const message = response.data.message;

      if (message?.Fb && message?.Auth) {
        const fbUser = message.Fb;
        const authUser = message.Auth;

        // Email check
        if (fbUser.email_id === email) {
          // Password check (without bcrypt)
          if (fbUser.pw === password) {
            // Email verification flag check
            if (fbUser.e_vf === "1") {
              // Auth user email check
              if (authUser.user.email === email) {
                // Save user company and navigate to dashboard
                sessionStorage.setItem("company", authUser.user.groups[0].name);
                sessionStorage.setItem("email", email);
                navigate('/dashboard');
              } else {
                setErrorMessage("Authentication email mismatch.");
              }
            } else {
              navigate('/verify');
            }
          } else {
            setErrorMessage("Incorrect password.");
          }
        } else {
          setErrorMessage("No user found.");
        }
      } else {
        setErrorMessage("Missing user information.");
        navigate('/signup');
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred while fetching data.");
    }
  };

  const handleVerify = (token) => {
    setTurnstileToken(token);
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
              <h3 className="mb-4">Login</h3>
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
              <form onSubmit={handleSubmit}>
                <div className="input-group mb-4">
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    required
                  />
                </div>
                <div className="input-group mb-4">
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="input-group mb-4">
                  <TurnstileWidget siteKey="0x4AAAAAAAi_zSCc2ZfoWGds" onVerify={handleVerify} />
                </div>
                <button type="submit" className="btn btn-primary mb-4" disabled={!turnstileToken}>
                  Login
                </button>
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
