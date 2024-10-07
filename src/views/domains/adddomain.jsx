import React from 'react';
import { Row, Col, Card, Form, Button, Spinner } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import AlertMessage from 'views/Alert';
import { useNavigate } from 'react-router-dom';
//import CryptoJS from 'crypto-js';


export default function AddDomain(){
  const [domain, setdomain] = useState('');
    //const SecretKey = import.meta.env.VITE_SECRET_KEY;
    // const bytes = CryptoJS.AES.decrypt(encrypt, SecretKey);
    // const decrypt = bytes.toString(CryptoJS.enc.Utf8);
    const email =  sessionStorage.getItem('email')
    const IP = import.meta.env.VITE_BACKEND_IP_ADDRESS;
    const template = Cookies.get('template');
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertBody, setAlertBody] = useState('');
    const [alertHead, setAlertHead] = useState('Alert')
    const [data,setdata]=useState('')
    const navigate = useNavigate()

    const Domain = async () => {
      const url = `http://${IP}/api/method/sagasuite.dom_name_api.plan_details?plan=${template}`
      try {
        const result = await axios.get(url);
        setdata(result.data.message)
      }
      catch(error){
        console.log(error)
      }
    }

    useEffect(() => {
      Domain();
    }, []);

    const handledomain = async (e) => {
      e.preventDefault();
      setIsLoading(true)
        const url = `${IP}/api/method/sagasuite.dom_name_api.insert_value?domain_name=${domain}&email_id=${email}&templates=${template}`;
        try {
            const result = await axios.post(url);
            if (result.data.message.Message === "This domain name was already exists") {
                setAlertBody("This domain already exists. Please choose a different one.");
                setShowAlert(true);
            }
            else if(result.data.message.Message === "Domain name invalid") {
              setAlertBody("Please enter a valid domain name to proceed.");
              setShowAlert(true);
            }
            else if(result.data.message.Message === "Domain added successfully") {
              setAlertHead("Success")
              setAlertBody("Your domain has been added successfully.");
              setShowAlert(true);
              setTimeout(() => {
                navigate('/dashboard')
            }, 2000);
              
            }
            else{
              setAlertBody("something went wrong :(");
              setShowAlert(true);
            }
        }
        catch (error) {
            console.log(error)
        }
        finally{
          setIsLoading(false)
        }

    }
  return (
    <React.Fragment>
      {showAlert && <AlertMessage color={alertHead} head={alertHead} body={alertBody} show={showAlert} onClose={() => setShowAlert(false)} />}
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Domains</Card.Title>
            </Card.Header>
            <Card.Body className='domain-card'>
            <div className='form-back'>
              <Row>
                  <Form onSubmit={handledomain}>
                    <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                      <Form.Label column sm="2">Domain</Form.Label>
                      <Col>
                      <Form.Control type="text" onChange = {(e) => setdomain(e.target.value)}/>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-4" >
                        <Form.Label column sm="2">Max. possible aliases</Form.Label>
                        <Col>
                      <Form.Control type="text" readOnly defaultValue={data.aliases}/>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-4" >
                        <Form.Label column sm="2">Max. possible mailboxes</Form.Label>
                        <Col>
                      <Form.Control type="text" readOnly defaultValue={data.mailboxes} />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-4" >
                        <Form.Label column sm="2">Default mailbox quota</Form.Label>
                        <Col>
                      <Form.Control type="text" readOnly defaultValue={data.defquota} />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-4" >
                        <Form.Label column sm="2">Max. quota per mailbox (MiB)</Form.Label>
                        <Col>
                      <Form.Control type="text"  readOnly defaultValue={data.maxquota	}/>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-4" >
                        <Form.Label column sm="2">Total domain quota (MiB)</Form.Label>
                        <Col>
                      <Form.Control type="text" readOnly defaultValue={data.quota	} />
                      </Col>
                    </Form.Group>
                    {/* <Form.Group style={{marginLeft:"17rem"}}  className="mb-4">
                    <Form.Check  type="checkbox" id="checkbox1" label="Check this custom checkbox" disabled />
                    <Form.Check type="checkbox" id="checkbox1" label="Check this custom checkbox" disabled />
                  </Form.Group> */}
                    {/* <Form.Group as={Row} className="mb-4">
                        <Form.Label column sm="2">Rate limit</Form.Label>
                        <Col>
                      <Form.Control type="text" readOnly defaultValue={data.aliases} />
                      </Col>
                    </Form.Group> */}
                    {isLoading ? (
                    <div className="text-center">
                      <Spinner animation="border" role="status" aria-label="Loading..." />
                    </div>
                  ) : (
                    <Button type='submit'  variant="primary">Add domain</Button>
                  )}
                  </Form>
              </Row>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

