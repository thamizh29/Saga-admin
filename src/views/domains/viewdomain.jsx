import React from 'react';
import { Row, Col, Card, Table, Button, Modal, Spinner } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';

export default function ViewDomain() {
    const [data, setData] = useState([]);
    const [domain, setDomain] = useState('');
    const [show, setShow] = useState(false);
    const [dnsRecords, setDnsRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // New state for loading spinner
    const SecretKey = import.meta.env.VITE_SECRET_KEY;
    const encrypt = sessionStorage.getItem('data');
    const bytes = CryptoJS.AES.decrypt(encrypt, SecretKey);
    const decrypt = bytes.toString(CryptoJS.enc.Utf8);
    const email = decrypt;
    const IP = import.meta.env.VITE_BACKEND_IP_ADDRESS;

    // Fetch domain data for user
    const handleDomain = async () => {
        const url = `http://${IP}/api/method/sagasuite.dom_name_api.fetch_value?user_name=${email}`;
        try {
            const result = await axios.get(url);
            setData(result.data.message);
            setDomain(result.data.message[0]?.domain_name || '');
        } catch (error) {
            console.log(error);
        }
    };

    // Fetch DNS records for selected domain
    const handleFetchDNS = async (domainName) => {
        setIsLoading(true); // Show spinner while fetching
        const url = `http://${IP}/api/method/sagasuite.dom_name_api.fetch_dnr?domain_name=${domainName}`;
        try {
            const result = await axios.get(url);
            setDnsRecords(result.data.message);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false); // Hide spinner after fetching is complete
        }
    };

    useEffect(() => {
        handleDomain();
    }, []);

    const handleDelete = async (domainName) => {
        const url = `http://${IP}/api/method/sagasuite.dom_name_api.remove_domname?user_name=${email}&domain_name=${domainName}`;
        try {
            await axios.delete(url);
            console.log("delete success");
            handleDomain();
        } catch (error) {
            console.log(error);
            window.alert("server not connected");
        }
    };

    const handleClose = () => setShow(false);
    const handleShow = (domainName) => {
        setDomain(domainName);
        handleFetchDNS(domainName); // Fetch DNS records when modal opens
        setShow(true);
    };

    sessionStorage.setItem('domain', domain);

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
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => (
                                        item.domain_name && (
                                            <tr key={index}>
                                                <td>{item.domain_name}</td>
                                                <td>{item.creation}</td>
                                                <td>
                                                    <Button className="text-capitalize" variant="danger" onClick={() => handleDelete(item.domain_name)}>
                                                        <i className="feather icon-trash"></i> Delete
                                                    </Button>
                                                    <Button className="text-capitalize" variant="secondary" onClick={() => handleShow(item.domain_name)}>
                                                        <i className="feather icon-settings"></i> DNS
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* DNS Records Modal */}
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>DNS Records for {domain}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isLoading ? (
                        <div className="text-center">
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        </div>
                    ) : (
                        <Table striped responsive>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Correct Data</th>
                                    <th>Current State</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dnsRecords.map((record, index) => (
                                    <tr key={index}>
                                        <td>{record.Name}</td>
                                        <td>{record.Type}</td>
                                        <td>{record['Correct Data']}</td>
                                        <td>{record['Current State']}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
}
