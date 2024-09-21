import React from 'react';
import { Row, Col, Card, Table, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
export default function ViewDomain() {
    const [data, setdata] = useState([]);
    const [domain,setdomain] = useState('')
    const email = sessionStorage.getItem('email')
    const handledomain = async (e) => {
        const url = `http://192.168.1.18:8000/api/method/sagasuite.dom_name_api.fetch_value?user_name=${email}`
        try {
            const result = await axios.get(url);
            setdata(result.data.message)
            setdomain(result.data.message[0].domain_name)
        }
        catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        handledomain();
    }, []);
    const handleDelete = async (click) => {

        const url = `http://192.168.1.18:8000/api/method/sagasuite.dom_name_api.remove_domname?user_name=${email}&domain_name=${click}`
        try {
            const result = await axios.delete(url);
            console.log("delete success")
            handledomain();

        }
        catch (error) {
            console.log(error)
            window.alert("server not connected")
        }
    }
    sessionStorage.setItem('domain',domain)
    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Domains</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>Domain Name</th>
                                        <th>Date and Time</th>
                                        <th>  </th>
                                    </tr>
                                </thead>
                                {
                                    data.map((item, index) => {
                                        return (
                                            item.domain_name && (
                                                <>
                                                    <tbody>
                                                        <tr key={index}>
                                                            <td>{item.domain_name}</td>
                                                            <td>{item.creation}</td>
                                                            <td onClick={() => handleDelete(item.domain_name)}>
                                                                <Button className='text-capitalize' variant="danger"><i className='feather icon-trash'></i>Delete</Button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </>
                                            )
                                        )
                                    })
                                }
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    )
}