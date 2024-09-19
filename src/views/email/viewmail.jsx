import React from 'react';
import { Row, Col, Card, Table, ButtonGroup, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
export default function ViewEmail() {
    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Email</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>User Name</th>
                                        <th>Email Id</th>
                                        <th>options</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>username</td>
                                        <td>emailid</td>
                                        <td>
                                            <ButtonGroup size='sm'>
                                                <NavLink to={"/email/editemail"}>
                                                    <Button className='text-capitalize' variant="primary"><i className='feather icon-edit'></i>Edit</Button>
                                                </NavLink>
                                                <Button className='text-capitalize' variant="danger"><i className='feather icon-trash'></i>Delete</Button>
                                                <NavLink to={"/email/dnsrecords"}>
                                                <Button className='text-capitalize' variant="secondary"><i className='feather icon-settings'></i>DNS</Button>
                                                </NavLink>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    )
}