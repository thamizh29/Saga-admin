import React from 'react';
import { Row, Col, Card, Table, Button, ButtonGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
export default function ViewDomain() {
    const [data, setdata] = useState([]);
    const email = sessionStorage.getItem('email')
    const handledomain = async (e) => {
        const url = `http://192.168.1.18:8000/api/method/sagasuite.dom_name_api.fetch_value?user_name=${email}`
        try {
            const result = await axios.get(url);
            setdata(result.data.message)
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
                                {/* {
                                    data.map((item, index) => {
                                        return (
                                            item.domain_name && (
                                                <> */}
                                <tbody>
                                    <tr>
                                        <td>domain name</td>
                                        <td>time and date</td>
                                        <td onClick={() => handleDelete(item.domain_name)}>
                                            <ButtonGroup size='sm'>
                                                <NavLink to={"/domains/editdomain"}>
                                                <Button className='text-capitalize' variant="primary"><i className='feather icon-edit'></i>Edit</Button>
                                                </NavLink>
                                                <Button className='text-capitalize' variant="danger" onClick={handleDelete}><i className='feather icon-trash'></i>Delete</Button>
                                            </ButtonGroup></td>
                                    </tr>
                                </tbody>
                                {/* </>
                                            )
                                        )
                                    })
                                } */}
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    )
}