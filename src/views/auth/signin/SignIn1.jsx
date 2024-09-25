import React from 'react';
import { Card } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import TurnstileWidget from '../verification/cloudfare';
import axios from 'axios';
import Verify from '../verification/verify';
import CryptoJS from 'crypto-js';

const Signin1 = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [turnstileToken, setTurnstileToken] = useState(null);
  const [shouldRedirect, setshouldRedirect] = useState(false);
  const IP = import.meta.env.VITE_BACKEND_IP_ADDRESS;
  const [employee] = useState(email);
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://${IP}/api/method/sagasuite.customer_api.fetch_value?email_id=${email}&cf_turnstile_response=${turnstileToken}`
    //const url = http://192.168.1.18:8000/api/method/sagasuite.customer_api.fetch_value?email_id=${email}&password=${password};
    //Get the data from backend
    // if (turnstileToken) {
      try {
        const response = await axios.get(url);
        const message = response.data.message;

        if (message?.Auth?.user?.name === "Admin" || message?.Auth?.user?.name === "Super Admin") {
          if (message?.Fb && message?.Auth) {
            const fbUser = message.Fb;
            const authUser = message.Auth;

            if (fbUser.email_id === email) {
              if (fbUser.pw === password) {
                if (fbUser.e_vf == 1) {
                  if (authUser.user.email === email) {
                    sessionStorage.setItem("company", authUser.user.groups[0].name);
                    navigate('/dashboard');
                  } else {
                    console.log("auth:error: Auth email mismatch");
                  }
                } else {
                  setshouldRedirect(true);  // Handle email verification error
                }
              } else {
                window.alert("Incorrect password");
              }
            } else {
              window.alert("No user found");
              navigate('/signup');
            }
          } else {
            window.alert("Missing user information");
            navigate('/signup');
          }
          console.log("customer")
        } else {
          try {
            const userResponse = await axios.get(`http://${IP}/api/method/sagasuite.email_acc_api.fetch_value?email_id=${email}&password=${password}&cf_turnstile_response=${turnstileToken}`);
            const userMessage = userResponse.data.message;

            if (userMessage?.Fb && userMessage?.Auth) {
              const fbUser = userMessage.Fb;
              const authUser = userMessage.Auth;

              if (fbUser.email_id === email) {
                if (fbUser.pw === password) {
                  if (authUser.user.email === email) {
                    navigate('/user-ui');
                  } else {
                    console.log("auth:error: Auth email mismatch");
                  }
                } else {
                  console.log("Invalid password");
                }
              } else {
                console.log("user:error: No matching user found");
              }
            } else {
              window.alert("No user");
              navigate('/signup')
            }
          } catch (userError) {
            console.log(userError);
            console.log("Error fetching user information");
          }
        }
      } catch (error) {
        console.log(error);
      }
    // } else {
    //   window.alert("verify the cloudfare")
    // }
  }
  const handleVerify = (token) => {
    setTurnstileToken(token)
  }
  if (shouldRedirect) {
    return <Verify />
  }
  const SecretKey = import.meta.env.VITE_SECRET_KEY;
  const Bdata = email;
  const encrypt = CryptoJS.AES.encrypt(Bdata, SecretKey).toString();
  sessionStorage.setItem('data', encrypt);

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
                  <TurnstileWidget siteKey="0x4AAAAAAAi_zSCc2ZfoWGds" onVerify={handleVerify} />
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