import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";

const Logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/";
};

function NavBar() {
  return (
    <Navbar fixed="top" expand="md" className={"sticky"}>
      <Container>
        <Nav className="ms-auto" defaultActiveKey="#home">
          <Nav.Item>
            <Nav.Link as={Link} to="/">
              <AiOutlineHome style={{ marginBottom: "2px" }} /> Room
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link onClick={Logout}>
              <AiOutlineUser style={{ marginBottom: "2px" }} /> Log Out
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
