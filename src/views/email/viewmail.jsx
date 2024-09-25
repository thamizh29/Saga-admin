import React from 'react';
import { Row, Col, Card, Table, ButtonGroup, Button, Spinner} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
export default function ViewEmail() {
    const [data, setdata] = useState([]);
    const domain = sessionStorage.getItem('domain')
    const [isLoading, setIsLoading] = useState(false);
    const IP = import.meta.env.VITE_BACKEND_IP_ADDRESS;
    const handleEmail = async (e) => {
        //const url =`192.168.1.18:8000/api/method/sagasuite.dom_name_api.fetch_value?user_name=${email}`;
        const url = `http://${IP}/api/method/sagasuite.email_acc_api.fetch_domain?domain_name=${domain}`
        try {
            const result = await axios.get(url);
            setdata(result.data.message)
        }
        catch (error) {
            console.log(error)
        }
        finally{
            setIsLoading(false);
        }

    }
    useEffect(() => {
        handleEmail();
    }, [])
    const handleDelete = async (email_id,domain_name) => {

        const url = `http://${IP}/api/method/sagasuite.email_acc_api.remove_email_acc?email_id=${email_id}&domain_name=${domain_name}`
        try {
            const result = await axios.delete(url);
            console.log("delete success")
            handleEmail();

        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <React.Fragment>
            <Row>
                <Col>
                {isLoading ? (
                        <div className="text-center">
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        </div>
                    ) : (
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
                                {
                                    data.map((item, index) => {
                                        return (
                                            item.domain_name && (
                                                <tbody key={index}>
                                                    <tr>
                                                        <td>{item.domain_name}</td>
                                                        <td>{item.email_id}</td>
                                                        <td>
                                                            <ButtonGroup size='sm'>
                                                                <NavLink to={"/email/editemail"}>
                                                                    <Button className='text-capitalize' variant="primary"><i className='feather icon-edit'></i>Edit</Button>
                                                                </NavLink>
                                                                <Button className='text-capitalize' variant="danger" onClick={() => handleDelete(item.email_id,item.domain_name)}><i className='feather icon-trash'></i>Delete</Button>
                                                            </ButtonGroup>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            )
                                        );
                                    })
                                }
                            </Table >
                        </Card.Body>
                    </Card>
                    )}
                </Col>
            </Row>
        </React.Fragment>
    )
}