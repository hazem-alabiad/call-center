import React from "react";
import Loader from "react-loader-spinner";
import { Col, Container, Row } from "reactstrap";

const PlaneLoader = () => {
  return (
    <Container>
      <Row className="text-center mt-5">
        <Col>
          <Loader type="Plane" color="black" height={100} width={100}>
            Loading
          </Loader>
        </Col>
      </Row>
    </Container>
  );
};

export default PlaneLoader;
