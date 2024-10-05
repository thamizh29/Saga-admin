import React from 'react';
import { Card, Row, Col, Form, Button, Modal, InputGroup, DropdownButton, Dropdown, Spinner, Image } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import AlertMessage from 'views/Alert';
import TurnstileWidget from '../verification/cloudfare';
//import CryptoJS from 'crypto-js';

const SignUp1 = () => {
  const [email, setemail] = useState('');
  const [mobile, setmobile] = useState('');
  const [password, setpassword] = useState('');
  const [company, setcompany] = useState('');
  const [turnstileToken, setTurnstileToken] = useState(null);
  const [template, setTemplate] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertBody, setAlertBody] = useState('');

  const settemplate = (plan) => {
    setTemplate(plan);
    handleModalClose();
  }
  const navigate = useNavigate()
  const IP = import.meta.env.VITE_BACKEND_IP_ADDRESS;
  const Key = import.meta.env.VITE_SITE_KEY;

  const handleSignup = async (e) => {
    e.preventDefault();
    
    const url = `https://${IP}/api/method/sagasuite.customer_api.insert_value?company_name=${company}&email_id=${email}&password=${password}&country_code=${selectedCountry}&phone_number=${mobile}&cf_turnstile_response=${turnstileToken}&subscription_plan=${template}`;

    if (turnstileToken) {
      setIsLoading(true)
    try {
      const result = await axios.post(url);
      // const data = result.data.message[0];
      if (result.data.message[0] === "Exists") {
           setAlertBody("You already have an account. Please go to the login page.");
           setShowAlert(true);
           setTimeout(() => {
            navigate('/signin');
        }, 3000);
      } 
      else if(result.data.message.Status === "Failed") {
        // window.alert("To proceed, please verify your email address.")
        navigate('/verify')
      }
      else {
        setAlertBody("something went wrong :(");
        setShowAlert(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    } else {
      setAlertBody("To continue using our services, please enable Cloudflare");
      setShowAlert(true);
    }
  }

  const handleVerify = (token) => {
    setTurnstileToken(token);
  }


  // const SecretKey = import.meta.env.VITE_SECRET_KEY;
  // const Bdata = email;
  // const encrypt = CryptoJS.AES.encrypt(Bdata, SecretKey).toString();
  sessionStorage.setItem('email', email);
 
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const countries = [
    { name: 'Afghanistan', code: '+93', flag: '🇦🇫' },
    { name: 'Albania', code: '+355', flag: '🇦🇱' },
    { name: 'Algeria', code: '+213', flag: '🇩🇿' },
    { name: 'Andorra', code: '+376', flag: '🇦🇩' },
    { name: 'Angola', code: '+244', flag: '🇦🇴' },
    { name: 'Antigua and Barbuda', code: '+1-268', flag: '🇦🇬' },
    { name: 'Argentina', code: '+54', flag: '🇦🇷' },
    { name: 'Armenia', code: '+374', flag: '🇦🇲' },
    { name: 'Australia', code: '+61', flag: '🇦🇺' },
    { name: 'Austria', code: '+43', flag: '🇦🇹' },
    { name: 'Azerbaijan', code: '+994', flag: '🇦🇿' },
    { name: 'Bahamas', code: '+1-242', flag: '🇧🇸' },
    { name: 'Bahrain', code: '+973', flag: '🇧🇭' },
    { name: 'Bangladesh', code: '+880', flag: '🇧🇩' },
    { name: 'Barbados', code: '+1-246', flag: '🇧🇧' },
    { name: 'Belarus', code: '+375', flag: '🇧🇾' },
    { name: 'Belgium', code: '+32', flag: '🇧🇪' },
    { name: 'Belize', code: '+501', flag: '🇧🇿' },
    { name: 'Benin', code: '+229', flag: '🇧🇯' },
    { name: 'Bhutan', code: '+975', flag: '🇧🇹' },
    { name: 'Bolivia', code: '+591', flag: '🇧🇴' },
    { name: 'Bosnia and Herzegovina', code: '+387', flag: '🇧🇦' },
    { name: 'Botswana', code: '+267', flag: '🇧🇼' },
    { name: 'Brazil', code: '+55', flag: '🇧🇷' },
    { name: 'Brunei', code: '+673', flag: '🇧🇳' },
    { name: 'Bulgaria', code: '+359', flag: '🇧🇬' },
    { name: 'Burkina Faso', code: '+226', flag: '🇧🇫' },
    { name: 'Burundi', code: '+257', flag: '🇧🇮' },
    { name: 'Cabo Verde', code: '+238', flag: '🇨🇻' },
    { name: 'Cambodia', code: '+855', flag: '🇰🇭' },
    { name: 'Cameroon', code: '+237', flag: '🇨🇲' },
    { name: 'Canada', code: '+1', flag: '🇨🇦' },
    { name: 'Central African Republic', code: '+236', flag: '🇨🇫' },
    { name: 'Chad', code: '+235', flag: '🇹🇩' },
    { name: 'Chile', code: '+56', flag: '🇨🇱' },
    { name: 'China', code: '+86', flag: '🇨🇳' },
    { name: 'Colombia', code: '+57', flag: '🇨🇴' },
    { name: 'Comoros', code: '+269', flag: '🇰🇲' },
    { name: 'Congo, Democratic Republic of the', code: '+243', flag: '🇨🇩' },
    { name: 'Congo, Republic of the', code: '+242', flag: '🇨🇬' },
    { name: 'Costa Rica', code: '+506', flag: '🇨🇷' },
    { name: 'Croatia', code: '+385', flag: '🇭🇷' },
    { name: 'Cuba', code: '+53', flag: '🇨🇺' },
    { name: 'Cyprus', code: '+357', flag: '🇨🇾' },
    { name: 'Czech Republic', code: '+420', flag: '🇨🇿' },
    { name: 'Denmark', code: '+45', flag: '🇩🇰' },
    { name: 'Djibouti', code: '+253', flag: '🇩🇯' },
    { name: 'Dominica', code: '+1-767', flag: '🇩🇲' },
    { name: 'Dominican Republic', code: '+1-809', flag: '🇩🇴' },
    { name: 'Ecuador', code: '+593', flag: '🇪🇨' },
    { name: 'Egypt', code: '+20', flag: '🇪🇬' },
    { name: 'El Salvador', code: '+503', flag: '🇸🇻' },
    { name: 'Equatorial Guinea', code: '+240', flag: '🇬🇶' },
    { name: 'Eritrea', code: '+291', flag: '🇪🇷' },
    { name: 'Estonia', code: '+372', flag: '🇪🇪' },
    { name: 'Eswatini', code: '+268', flag: '🇸🇿' },
    { name: 'Ethiopia', code: '+251', flag: '🇪🇹' },
    { name: 'Fiji', code: '+679', flag: '🇫🇯' },
    { name: 'Finland', code: '+358', flag: '🇫🇮' },
    { name: 'France', code: '+33', flag: '🇫🇷' },
    { name: 'Gabon', code: '+241', flag: '🇬🇦' },
    { name: 'Gambia', code: '+220', flag: '🇬🇲' },
    { name: 'Georgia', code: '+995', flag: '🇬🇪' },
    { name: 'Germany', code: '+49', flag: '🇩🇪' },
    { name: 'Ghana', code: '+233', flag: '🇬🇭' },
    { name: 'Greece', code: '+30', flag: '🇬🇷' },
    { name: 'Grenada', code: '+1-473', flag: '🇬🇩' },
    { name: 'Guatemala', code: '+502', flag: '🇬🇹' },
    { name: 'Guinea', code: '+224', flag: '🇬🇳' },
    { name: 'Guinea-Bissau', code: '+245', flag: '🇬🇼' },
    { name: 'Guyana', code: '+592', flag: '🇬🇾' },
    { name: 'Haiti', code: '+509', flag: '🇭🇹' },
    { name: 'Honduras', code: '+504', flag: '🇭🇳' },
    { name: 'Hungary', code: '+36', flag: '🇭🇺' },
    { name: 'Iceland', code: '+354', flag: '🇮🇸' },
    { name: 'India', code: '+91', flag: '🇮🇳' },
    { name: 'Indonesia', code: '+62', flag: '🇮🇩' },
    { name: 'Iran', code: '+98', flag: '🇮🇷' },
    { name: 'Iraq', code: '+964', flag: '🇮🇶' },
    { name: 'Ireland', code: '+353', flag: '🇮🇪' },
    { name: 'Israel', code: '+972', flag: '🇮🇱' },
    { name: 'Italy', code: '+39', flag: '🇮🇹' },
    { name: 'Jamaica', code: '+1-876', flag: '🇯🇲' },
    { name: 'Japan', code: '+81', flag: '🇯🇵' },
    { name: 'Jordan', code: '+962', flag: '🇯🇴' },
    { name: 'Kazakhstan', code: '+7', flag: '🇰🇿' },
    { name: 'Kenya', code: '+254', flag: '🇰🇪' },
    { name: 'Kiribati', code: '+686', flag: '🇰🇮' },
    { name: 'Korea, North', code: '+850', flag: '🇰' },
  ]
  const [searchTerm, setSearchTerm] = useState('');
  const prioritizedCountries = [
    { name: 'India', code: '+91', flag: '🇮🇳' },
    ...countries.filter((country) => country.name !== 'India'),
  ];

  const filteredCountries = prioritizedCountries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.code.includes(searchTerm)
  );


  
  //console.log(selectedCountry)
  return (
    <React.Fragment>
       {showAlert && <AlertMessage body={alertBody} show={showAlert} onClose={() => setShowAlert(false)} />}
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
                  <h3 className="mb-2">Create with</h3>
                  <div className="mb-4 align-items-center">
                  <Image className="align-items-center" src="src/assets/images/auth-logo.svg" rounded /> 
                  </div>
                  <Form className='auth-form' onSubmit={handleSignup}>
                  <div className="input-group mb-4">
                      <Form.Control type="email" className="form-control" onChange={(e) => setemail(e.target.value)} placeholder="Email address" required />
                    </div>
                    <div className="input-group mb-4">
                      <InputGroup>
                        <Form.Control type={showPassword ? "text" : "password"} className="form-control" onChange={(e) => setpassword(e.target.value)} placeholder="Password" required />
                        <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                          <i className={showPassword ? 'feather icon-eye-off' : 'feather icon-eye'} />
                        </Button>
                      </InputGroup>
                    </div>
                    <div className="input-group mb-4">
                      <Form.Control type="name" className="form-control" onChange={(e) => setcompany(e.target.value)} placeholder="Company name" required />
                    </div>
                    <div className="input-group mb-4">
                      <InputGroup>
                        <DropdownButton
                          variant="outline-secondary"
                          title={`${selectedCountry}` || 'Ph'}
                          id="input-group-dropdown-2"
                          align="end"

                        >
                          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            <Form.Control
                              type="text"
                              placeholder="Search..."
                              onChange={(e) => setSearchTerm(e.target.value)}
                              style={{ marginBottom: '5px' }}
                            />
                            {
                              filteredCountries.map((country, index) => (
                                <Dropdown.Item key={index} onClick={() => setSelectedCountry(country.code)}>
                                  {country.flag} {country.name} {country.code}
                                </Dropdown.Item>
                              ))
                            }
                          </div>
                        </DropdownButton>
                        <Form.Control type="phonenumber" disabled={!selectedCountry} className="form-control"  maxLength={10} onChange={(e) => setmobile(e.target.value)} placeholder="Mobile number" required />
                      </InputGroup>
                    </div>

                    {/* <div className="input-group mb-4">
                      <InputGroup>
                        <Form.Control type={showPassword ? "text" : "password"} className="form-control" onChange={(e) => setcpassword(e.target.value)} placeholder="Confirm Password" required />
                        <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                          <i className={showPassword ? 'feather icon-eye-off' : 'feather icon-eye'} />
                        </Button>
                      </InputGroup>
                    </div> */}
                    <div className="mb-4 ">
                      <InputGroup className="mb-3">

                        <Form.Control
                          aria-label="Selected plan"
                          aria-describedby="basic-addon1"
                          readOnly
                          value={template || "select plan"}
                        />
                        <Button variant="outline-secondary" onClick={handleModalOpen}>
                          Plans
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
                                    <Card.Title style={{ fontSize: '1.2rem', fontWeight: 'bold', borderBottom: '2px solid #333', paddingBottom: '10px', width: '100%' }}>Basic</Card.Title>
                                    <Card.Text style={{ fontSize: '1rem' }}>
                                      Features
                                    </Card.Text>
                                    <ul style={{ listStyle: "none", padding: 0, fontSize: '0.9rem' }}>
                                      <li>Total Mail ID</li>
                                      <li>10</li>
                                      <li>MailBox Size per user</li>
                                      <li>3GB</li>
                                      <li>Total Aliase Mail ID</li>
                                      <li>30</li>
                                      <li>Total Drive Size</li>
                                      <li>150GB</li>
                                    </ul>
                                    <Button variant="primary" onClick={() => settemplate("Basic")}>Get</Button>
                                  </Card.Body>
                                </center>
                              </Card>
                            </Col>

                            <Col md={4}>
                              <Card>
                                <center>
                                  <Card.Body>
                                    <Card.Title style={{ fontSize: '1.2rem', fontWeight: 'bold', borderBottom: '2px solid #333', paddingBottom: '10px', width: '100%' }}>Standard</Card.Title>
                                    <Card.Text style={{ fontSize: '1rem' }}>
                                      Features
                                    </Card.Text>
                                    <ul style={{ listStyle: "none", padding: 0, fontSize: '0.9rem' }}>
                                      <li>Total Mail ID</li>
                                      <li>30</li>
                                      <li>MailBox Size per user</li>
                                      <li>3GB</li>
                                      <li>Total Aliase Mail ID</li>
                                      <li>60</li>
                                      <li>Total Drive Size</li>
                                      <li>500GB</li>
                                    </ul>
                                    <Button variant="primary" onClick={() => settemplate("Standard")}>Get</Button>
                                  </Card.Body>
                                </center>
                              </Card>
                            </Col>

                            <Col md={4}>
                              <Card>
                                <center>
                                  <Card.Body>
                                    <Card.Title style={{ fontSize: '1.2rem', fontWeight: 'bold', borderBottom: '2px solid #333', paddingBottom: '10px', width: '100%' }}>Premium</Card.Title>
                                    <Card.Text style={{ fontSize: '1rem' }}>
                                      Features
                                    </Card.Text>
                                    <ul style={{ listStyle: "none", padding: 0, fontSize: '0.9rem' }}>
                                      <li>Total Mail ID</li>
                                      <li>50</li>
                                      <li>MailBox Size per user</li>
                                      <li>3GB</li>
                                      <li>Total Aliase Mail ID</li>
                                      <li>90</li>
                                      <li>Total Drive Size</li>
                                      <li>2TB</li>
                                    </ul>
                                    <Button variant="primary" onClick={() => settemplate("Premium")}>Get</Button>
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
                      <div style={{ transform: 'scale(1.1)', transformOrigin: 'top left' }}>
                      <TurnstileWidget siteKey={Key} onVerify={handleVerify} />
                      </div>
                    </div>
                    {isLoading ? (
                    <div className="text-center">
                      <Spinner animation="border" role="status" aria-label="Loading..." />
                    </div>
                  ) : (
                    <button type="submit" className="btn btn-primary mb-4" disabled={!(template && mobile)}>Sign up</button>
                  )}
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
