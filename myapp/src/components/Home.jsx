import React, { useState, useEffect} from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Home () {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((user) => setUser(user));
  }, []);

    return (
    <section>
      <Container fluid className="home-section" id="home">
      </Container>
    </section>
    )
}

export default Home;