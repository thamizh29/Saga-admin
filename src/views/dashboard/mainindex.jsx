import React from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';

export default function DashDefault() {
    return (

        <React.Fragment>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Dashboard</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <h1>Dashboard</h1>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>

    )
}