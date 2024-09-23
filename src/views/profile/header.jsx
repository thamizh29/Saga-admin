import { Card, Container, Row, Col, CardHeader, CardBody } from "react-bootstrap";
import React from "react";
export default function ProfileCover() {
    return (
        <React.Fragment>
            <Container>
                <Col>
                    <Row>
                        <Card>
                            <CardHeader>
                                <Card.Title>Profile</Card.Title>
                            </CardHeader>
                            <CardBody>
                                <span>Name</span>

                            </CardBody>
                        </Card>
                    </Row>
                </Col>
            </Container>
        </React.Fragment>
    )
}