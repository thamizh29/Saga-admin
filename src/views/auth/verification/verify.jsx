import React from 'react';
import { Card, Button, Spinner, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import AlertMessage from 'views/Alert';
import Cookies from 'js-cookie';

export default function Verify() {
    const [verify, setverify] = useState(1);
    const email = sessionStorage.getItem('email')
    //const [navigate,setnavigate] = useState(false);
    const IP = import.meta.env.VITE_BACKEND_IP_ADDRESS;
    const navigate = useNavigate();
    const [isSendLoading, setIsSendLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertBody, setAlertBody] = useState('');
    const [alertHead, setAlertHead] = useState('Alert')

    const handleForm = async (e) => {
        e.preventDefault();
        setIsSendLoading(true)
        const url = `${IP}/api/method/sagasuite.customer_api.fetch_otp?email_id=${email}`
        //Api call to get the data from backend
        try {
            const result = await axios.get(url);
            if (Number(result.data.message.OTP) === verify) {
                //Verify the code 
                const result = await axios.post(`${IP}/api/method/sagasuite.customer_api.update_email_ID?email_id=${email}`)
                setAlertHead("Success")
                setAlertBody("Congratulations! Your email address has been verified successfully.");
                setShowAlert(true);
                setTimeout(() => {
                    navigate('/signin');
                }, 2000);
            }
            else {
                setAlertBody("The verification code you entered is invalid. Please try again.");
                setShowAlert(true);
            }
        }
        catch (error) { console.log(error) }
        finally {
            setIsSendLoading(false)
        }
    }
    const Resend = async (e) => {
        setIsLoading(true)
        //update the value email verification is true
        try {
            const result = await axios.post(`${IP}/api/method/sagasuite.customer_api.update?email_id=${email}`);
            setAlertHead("Success")
            setAlertBody("A new verification code has been successfully sent to your email.");
            setShowAlert(true);
        }
        catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <React.Fragment>
            {showAlert && <AlertMessage color={alertHead} body={alertBody} show={showAlert} onClose={() => setShowAlert(false)} />}
            <div className="auth-wrapper">
                <div className="auth-content">
                    <div className="auth-bg">
                        <span className="r" />
                        <span className="r s" />
                        <span className="r s" />
                        <span className="r" />
                    </div>
                    <Card style={{ width: '28rem' }} className="borderless text-center">
                        <Card.Body style={{
                            width: '24rem',
                            marginLeft: '2rem'
                        }}>
                            <div className="mb-4">
                                <i className="feather icon-user-check auth-icon" />
                            </div>
                            <h3 className="mb-2">Email Verification</h3>
                            <div className="mb-4 align-items-center">
                                <Image className="align-items-center" src="src/assets/images/auth-logo.svg" rounded />
                            </div>
                            <form onSubmit={handleForm}>
                                <div className="input-group mb-3">
                                    <input type="phonenumber" className="form-control" onChange={(e) => (setverify(Number(e.target.value)))} placeholder="Verification code" required />
                                </div>
                                <div className='d-grid'>
                                    {isLoading ? (
                                        <div className="text-center">
                                            <Spinner animation="border" role="status" aria-label="Loading..." />
                                        </div>
                                    ) : (
                                        <Button style={{ width: '21rem' }} onClick={Resend} className="btn btn-primary mb-3">Resend</Button>
                                    )}
                                    {isSendLoading ? (
                                        <div className="text-center">
                                            <Spinner animation="border" role="status" aria-label="Loading..." />
                                        </div>
                                    ) : (
                                        <Button type='submit' className="btn btn-success mb-3">Submit</Button>
                                    )}
                                </div>
                            </form>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </React.Fragment>
    )
}