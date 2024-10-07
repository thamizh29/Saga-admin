import React, { useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import Cookies from 'js-cookie';
import Activate from './Active';

const Plans = () => {

  const template = Cookies.get('template');
  // const [data,setdata] = useState('');
  // const value = data;

  
  return (
    <div className="container mt-5 text-center">
      <Row xs={1} sm={2} md={3} className="g-4 mt-5">
            <Col>
                <Card className="card-lift--hover shadow border-0" style={{ height: "30rem" }}>
                    <Card.Body className="text-center d-flex flex-column justify-content-center align-items-center">
                        <Card.Title style={{ fontSize: '1.5rem', fontWeight: 'bold', borderBottom: '2px solid #333', paddingBottom: '10px', width: '100%' }}>
                        {template === "Basic" ? <Activate/> : "Basic"}
                          </Card.Title>
                        <Card.Text style={{ fontSize: '1.1rem' }}>
                        Feature
                        </Card.Text>
                        <ul style={{ listStyle: "none", padding: 0, fontSize: '1rem' }}>
                            <li>Total Mail ID</li>
                            <li>10</li>
                            <li>MailBox Size per user</li>
                            <li>3GB</li>
                            <li>Total Aliase Mail ID</li>
                            <li>30</li>
                            <li>Total Drive Size</li>
                            <li>150GB</li>
                        </ul>
                        {
                          (template === "Basic" ? null : <Button variant="primary" href="" target="_blank" >Get </Button> )
                        }
                        
                    </Card.Body>
                </Card>
            </Col>

            <Col>
                <Card className="card-lift--hover shadow border-0" style={{ height: "30rem" }}>
                    <Card.Body className="text-center d-flex flex-column justify-content-center align-items-center">
                        <Card.Title style={{ fontSize: '1.5rem', fontWeight: 'bold', borderBottom: '2px solid #333', paddingBottom: '10px', width: '100%' }}>{template === "Standard" ? <Activate/> : "Standard"}</Card.Title>
                        <Card.Text style={{ fontSize: '1.1rem' }}>
                        Feature
                        </Card.Text>
                        <ul style={{ listStyle: "none", padding: 0, fontSize: '1rem' }}>
                            <li>Total Mail ID</li>
                            <li>30</li>
                            <li>MailBox Size per user</li>
                            <li>3GB</li>
                            <li>Total Aliase Mail ID</li>
                            <li>60</li>
                            <li>Total Drive Size</li>
                            <li>500GB</li>
                        </ul>
                        {
                          (template === "Standard" ? null : <Button variant="primary" href="" target="_blank" >Get </Button> )
                        }
                    </Card.Body>
                </Card>
            </Col>

            <Col>
                <Card className="card-lift--hover shadow border-0" style={{ height: "30rem" }}>
                    <Card.Body className="text-center d-flex flex-column justify-content-center align-items-center">
                        <Card.Title style={{ fontSize: '1.5rem', fontWeight: 'bold', borderBottom: '2px solid #333', paddingBottom: '10px', width: '100%' }}> {template === "Premium" ? <Activate/> : "Premium"}</Card.Title>
                        <Card.Text style={{ fontSize: '1.1rem' }}>
                         Feature
                        </Card.Text>
                        <ul style={{ listStyle: "none", padding: 0, fontSize: '1rem' }}>
                            <li>Total Mail ID</li>
                            <li>50</li>
                            <li>MailBox Size per user</li>
                            <li>3GB</li>
                            <li>Total Aliase Mail ID</li>
                            <li>90</li>
                            <li>Total Drive Size</li>
                            <li>2TB</li>
                        </ul>
                        {
                          (template === "Premium" ? null : <Button variant="primary" href="" target="_blank" >Get </Button> )
                        }
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </div>
  );
};

export default Plans
 
