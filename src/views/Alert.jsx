import React, { useState } from 'react';
import { ToastContainer } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

function AlertMessage({ body ,show ,onClose }) {
 

  return (
    <div >
    <Row>
      <Col xs={6}>
      <ToastContainer position="middle-center">
        <Toast onClose={onClose} show={show} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>{body}</Toast.Body>
        </Toast>
        </ToastContainer>
      </Col>
    </Row>
    </div>
  );
}

export default AlertMessage;