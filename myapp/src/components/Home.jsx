import React, { useState, useEffect} from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Home () {
    return (
    <section>
      <Container fluid className="home-section" id="home">
      </Container>
    </section>
    )
}

export default Home;