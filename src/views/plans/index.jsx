import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

const Plans = () => {
  return (
    <div className="container mt-5 text-center">
      <Row>
        {/* Plan 1 */}
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Basic Plan</Card.Title>
              <Card.Text>
                This is a basic plan it includes essential features for personal use.
              </Card.Text>
              <h4>$9.99/month</h4>
              <Button variant="primary">Select Plan</Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Plan 2 */}
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Standard Plan</Card.Title>
              <Card.Text>
                Ideal for individuals looking for more features and flexibility.
              </Card.Text>
              <h4>$19.99/month</h4>
              <Button variant="primary">Select Plan</Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Plan 3 */}
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Premium Plan</Card.Title>
              <Card.Text>
                Best for businesses that need advanced tools and support.
              </Card.Text>
              <h4>$29.99/month</h4>
              <Button variant="primary">Select Plan</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Plans
