import React, { useState, useEffect } from 'react';
import { Row, Col, Card} from 'react-bootstrap';
import axios from 'axios';

export default function DashDefault() {
    const [domain,setdomain] = useState([]);
    const email =sessionStorage.getItem('email')
    const IP = import.meta.env.VITE_BACKEND_IP_ADDRESS;
    const handleDomain = async () => {
        const url = `${IP}/api/method/sagasuite.dom_name_api.fetch_value?email_id=${email}`;
        try {
            const result = await axios.get(url);
            const domainNames = result.data.message.map(item => item.domain_name);
            //setDomain(result.data.message[0]?.domain_name || '');
            setdomain(domainNames)
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        handleDomain();
    }, []);

    sessionStorage.setItem('domain', JSON.stringify(domain));
    return (

        <React.Fragment>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Dashboard</Card.Title>
                        </Card.Header>
                        <Card.Body style={{height: '100vh',overflow: 'hidden'}}>
                            {/* <iframe
                                src="http://192.168.1.17:8000/insights/public/dashboard/9ca660795e71f633c3e1418db6740e5d770b5666ac2ea2cb5ee9f7d2"
                                height="500"
                                width="800"
                                title="Iframe Example"
                                style={{ width: '100%', height: '100%', border: 'none',overflow: 'hidden' }}
                                allowFullScreen
                            /> */}
                            <h1>Activity here</h1>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>

    )
}