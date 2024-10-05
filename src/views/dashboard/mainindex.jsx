import React from 'react';
import { Row, Col, Card} from 'react-bootstrap';

export default function DashDefault() {
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