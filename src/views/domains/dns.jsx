import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table, Button } from 'react-bootstrap';


const DNSRecords = () => {
  const [data, setData] = useState([]); // Initialize as an empty array
  const domain = sessionStorage.getItem('domain')

  useEffect(() => {
    const fetchDomainName = async () => {
      try {
        const url = `https://192.168.1.18:8000/api/method/sagasuite.dom_name_api.fetch_dnr?domain_name=${domain}`;
        const result = await axios.get(url);
        setData(result.data.message); // Set the data received from the API
      } catch (error) {
        console.log(error);
      }
    };
    fetchDomainName();
  }, []);

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Row>
                <Col>
                  <Card.Title as="h5">DNS Records</Card.Title>
                </Col>
                {/* <Col>
                  <Button variant="danger">X</Button>
                </Col> */}
              </Row>
              <span className="d-block m-t-5">
                Use props <code>striped</code> with <code>Table</code> component
              </span>
            </Card.Header>
            <Card.Body>
              <div> {/* Added responsive wrapper */}
                <Table striped responsive>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Correct Data</th>
                      <th>Current State</th>
                    </tr>
                  </thead>
                  <tbody >
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td>{item.Name}</td>
                        <td>{item.Type}</td>
                        <td>{item['Correct Data']}</td>
                        <td>{item['Current State']}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default DNSRecords;
