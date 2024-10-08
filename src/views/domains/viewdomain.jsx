import React from 'react';
import { Row, Col, Card, Table, Button, Modal, Spinner, Dropdown, DropdownButton } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AlertMessage from 'views/Alert';
//import CryptoJS from 'crypto-js';

export default function ViewDomain() {
    const [data, setData] = useState([]);
    const [domain, setDomain] = useState([]);
    const [show, setShow] = useState(false);
    const [dnsRecords, setDnsRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // New state for loading spinner
    const [isDLoading, setIsDLoading] = useState(false);
    const [isVLoading, setIVDLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertBody, setAlertBody] = useState('');
    const [alertHead, setAlertHead] = useState('Alert');
    const [loadingRow, setLoadingRow] = useState(null);

    //const SecretKey = import.meta.env.VITE_SECRET_KEY;
    const email = sessionStorage.getItem('email');
    // const bytes = CryptoJS.AES.decrypt(encrypt, SecretKey);
    // const decrypt = bytes.toString(CryptoJS.enc.Utf8);
    // const email = decrypt;
    const IP = import.meta.env.VITE_BACKEND_IP_ADDRESS;

    // Fetch domain data for user
    const handleDomain = async () => {
        setIVDLoading(true)
        const url = `${IP}/api/method/sagasuite.dom_name_api.fetch_value?email_id=${email}`;
        try {
            const result = await axios.get(url);
            setData(result.data.message);
        } catch (error) {
            console.log(error);
        } finally {
            setIVDLoading(false)
        }
    };

    // Fetch DNS records for selected domain
    const handleFetchDNS = async (domainName) => {
        setIsLoading(true); // Show spinner while fetching
        const url = `${IP}/api/method/sagasuite.dom_name_api.fetch_dnr?domain_name=${domainName}`;
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
        setLoadingRow(domainName);
        const url = `${IP}/api/method/sagasuite.dom_name_api.remove_domname?domain_name=${domainName}`;
        try {
            await axios.delete(url);
            setAlertHead("Success")
            setAlertBody("The domain was deleted successfully.");
            setShowAlert(true);
            handleDomain();
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingRow(null);

        }
    };

    const handleClose = () => setShow(false);
    const handleShow = (domainName) => {
        setDomain(domainName);
        handleFetchDNS(domainName); // Fetch DNS records when modal opens
        setShow(true);
    };

    //sessionStorage.setItem('domain',JSON.stringify(domain));

    return (
        <React.Fragment>
            {showAlert && <AlertMessage head={alertHead} body={alertBody} show={showAlert} onClose={() => setShowAlert(false)} />}
            <div className='form-back'>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Domains</Card.Title>
                            </Card.Header>
                            {isVLoading ? (
                                <div className="text-center">
                                    <Spinner animation="border" role="status" aria-label="Loading..." />
                                </div>
                            ) : (
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
                                                        {loadingRow === item.domain_name ? (
                                                            <div className="text-center">
                                                                <Spinner animation="border" role="status" aria-label="Loading..." />
                                                            </div>
                                                        ) : (
                                                            <td>

                                                                <Button className="text-capitalize" variant="danger" onClick={() => handleDelete(item.domain_name)}>
                                                                    <i className="feather icon-trash"></i> Delete
                                                                </Button>

                                                                <Button className="text-capitalize" variant="secondary" onClick={() => handleShow(item.domain_name)}>
                                                                    <i className="feather icon-settings"></i> DNS
                                                                </Button>
                                                            </td>
                                                        )}
                                                    </tr>
                                                )
                                            ))}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            )}
                        </Card>
                    </Col>
                </Row>

                {/* DNS Records Modal */}
                <Modal show={show} onHide={handleClose} dialogClassName="modal-fullscreen">
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
                                <tbody className="dns-table-content">
                                    {dnsRecords.map((record, index) => (
                                        <tr key={index}>
                                            <td>
                                                <div style={{ wordBreak: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal' }}>
                                                    {record.Name}
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ wordBreak: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal' }}>
                                                    {record.Type}
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ wordBreak: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal' }}>
                                                    {record['Correct Data']}
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ wordBreak: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal' }}>
                                                    {!record['Current State'] ? (
                                                        <i className="feather icon-check"></i>
                                                    ) : (
                                                        record['Current State']
                                                    )}
                                                </div>
                                            </td>
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
            </div>
        </React.Fragment>
    );
}