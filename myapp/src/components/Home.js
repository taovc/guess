import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const home = () => {
    return (
    <section>
      <Container fluid className="home-section" id="home">
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                Hello{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>

              <h1 className="heading-name">
                I'M
                <strong className="main-name"> Tao weijie</strong>
              </h1>

            </Col>
          </Row>
        </Container>
      </Container>
    </section>
    )
}

export default home;