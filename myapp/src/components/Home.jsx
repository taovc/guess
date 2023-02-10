import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useNavigate } from "react-router-dom";
import {} from "./Auth";

const wsUrl = "ws://localhost:8080/ws";

function Home() {
  const navigate = useNavigate();
  const { sendJsonMessage, readyState } = useWebSocket(wsUrl, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
    share: true,
    filter: () => false,
    retryOnError: true,
    shouldReconnect: () => true,
  });

  useEffect(() => {
    if (window.WebSocket === undefined) {
      console.log("Your browser does not support WebSockets.");
      navigate("login");
      return;
    }

    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({ type: "connection", data: "Hello from client" });
    }
  }, [readyState]);

  return (
    <section>
      <Container fluid className="home-section" id="home"></Container>
    </section>
  );
}

export default Home;
