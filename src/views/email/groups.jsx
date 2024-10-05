import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table, Button } from 'react-bootstrap';

export default function Group(){

return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Row>
                <Col>
                  <Card.Title as="h5">Groups</Card.Title>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
             <h1>Group</h1>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};