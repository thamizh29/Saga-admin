import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table, ButtonGroup, Button, Spinner, DropdownButton, Dropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import AlertMessage from 'views/Alert';

export default function ViewEmail() {
    const [data, setData] = useState([]);
    const domain = JSON.parse(sessionStorage.getItem('domain'));
    const fdata = domain
    const [isLoading, setIsLoading] = useState(false);
    const IP = import.meta.env.VITE_BACKEND_IP_ADDRESS;
    const [showAlert, setShowAlert] = useState(false);
    const [alertBody, setAlertBody] = useState('');
    const [alertHead, setAlertHead] = useState('Alert');
    const [drop, setDrop] = useState('');

    const handleEmail = async () => {
        setIsLoading(true);
        const url = `${IP}/api/method/sagasuite.email_acc_api.fetch_domain?domain_name=${domain}`;
        try {
            const result = await axios.get(url);
            setData(result.data.message);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        handleEmail();
    }, []);

    const handleDelete = async (email_id, domain_name, pk_id) => {
        const url = `${IP}/api/method/sagasuite.email_acc_api.remove_email_acc?email_id=${email_id}&domain_name=${domain_name}&pk_id=${pk_id}`;
        try {
            await axios.delete(url);
            setAlertHead("Success");
            setAlertBody("User has been deleted successfully!");
            setShowAlert(true);
            handleEmail();
        } catch (error) {
            console.log(error);
        }
    };

    const handleSelect = async (eventKey) => {
        setDrop(eventKey);
        const url = `${IP}/api/method/sagasuite.email_acc_api.fetch_domain?domain_name=${eventKey}`;
        try {
            const result = await axios.get(url);
            setData(result.data.message);
        }catch(error){
            console.log(error)
        }
    };

    return (
        <React.Fragment>
            {showAlert && <AlertMessage head={alertHead} body={alertBody} show={showAlert} onClose={() => setShowAlert(false)} />}
            <div className='form-back'>
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
                                    <Row>
                                        <Col>
                                        <Card.Title as="h5">Email</Card.Title>
                                        </Col>
                                        <Col md="3" >
                                        <DropdownButton
                                            variant="secondary"
                                            title={drop || 'Filter'}
                                            id="input-group-dropdown-2"
                                            align="end"
                                            onSelect={handleSelect}
                                        >
                                            {Array.isArray(fdata) && fdata.map((item, index) => (
                                                <Dropdown.Item eventKey={item} key={index}>
                                                    {item}
                                                </Dropdown.Item>
                                            ))}
                                        </DropdownButton>
                                        </Col>
                                    </Row>
                                </Card.Header>
                                <Card.Body>
                                    <Table responsive hover>
                                        <thead>
                                            <tr>
                                                <th>User Name</th>
                                                <th>Email Id</th>
                                                <th>Options</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((item, index) => (
                                                item.domain_name && (
                                                    <tr key={index}>
                                                        <td>{item.domain_name}</td>
                                                        <td>{item.email_id}</td>
                                                        <td>
                                                            <ButtonGroup size='sm'>
                                                                <NavLink to={"/email/editemail"}>
                                                                    <Button className='text-capitalize' variant="primary">
                                                                        <i className='feather icon-edit'></i>Edit
                                                                    </Button>
                                                                </NavLink>
                                                                <Button className='text-capitalize' variant="danger" onClick={() => handleDelete(item.email_id, item.domain_name, item.pk_id)}>
                                                                    <i className='feather icon-trash'></i>Delete
                                                                </Button>
                                                            </ButtonGroup>
                                                        </td>
                                                    </tr>
                                                )
                                            ))}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        )}
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    );
}
