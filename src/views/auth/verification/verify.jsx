import React from 'react';
import { Card, Button } from 'react-bootstrap';
//import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Signin1 from '../signin/SignIn1';

export default function Verify() {
    const [verify, setverify] = useState(1);
    const email = sessionStorage.getItem('email')
    const [navigate,setnavigate] = useState(false);
    const IP = import.meta.env.VITE_BACKEND_IP_ADDRESS;
    //const navigate = useNavigate();

    const handleForm = async (e) => {
        e.preventDefault();
        const url = `http://${IP}/api/method/sagasuite.customer_api.fetch_otp?email_id=${email}`
        //Api call to get the data from backend
        try {
            const result = await axios.get(url);
            if (Number(result.data.message.OTP) === verify) {
                //Verify the code 
                const result = await axios.post(`http://${IP}/api/method/sagasuite.customer_api.update_email_ID?email_id=${email}`)
                setnavigate(true);
            }
            else {
                window.alert("Invalid code")
            }
        }
        catch (error) { console.log(error) }
    }
    const Resend = async (e) => {
        
        //update the value email verification is true
        try {
            const result = await axios.post(`http://${IP}/api/method/sagasuite.customer_api.update?email_id=${email}`);
        }
        catch (error) {
            console.log(error)
        }
    }
    if(navigate){
        return <Signin1 />
    }
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
                    <Card style={{ width: '28rem' }} className="borderless text-center">
                        <Card.Body style={{
                            width: '24rem',
                            marginLeft: '2rem'
                        }}>
                            <div className="mb-4">
                                <i className="feather icon-user-check auth-icon" />
                            </div>
                            <h3 className="mb-4">Verification</h3>
                            <form onSubmit={handleForm}>
                                <div className="input-group mb-3">
                                    <input type="number" className="form-control" onChange={(e) => (setverify(Number(e.target.value)))} placeholder="Verification code" required />
                                </div>
                                <div className='d-grid'>
                                    <Button style={{ width: '21rem' }} onClick={Resend} className="btn btn-primary mb-3">Resend</Button>
                                    <Button type='submit' className="btn btn-success mb-3">Submit</Button>
                                </div>
                            </form>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </React.Fragment>
    )
}