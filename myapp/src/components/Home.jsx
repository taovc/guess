import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useNavigate } from "react-router-dom";
import RoomCard from "./Card";

const wsUrl = "ws://localhost:8080/ws";

export const UserWsType = React.createContext();

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
  const user = JSON.parse(localStorage.getItem("user"));
  let rooms = {
    room1: {
      name: "room1",
      player: 1,
      max: 2,
    },
    room2: {
      name: "room2",
      player: 2,
      max: 2,
    },
  };

  useEffect(() => {
    if (window.WebSocket === undefined) {
      console.log("Your browser does not support WebSockets.");
      navigate("login");
      return;
    }

    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({ type: "userevent", user: user });
    }
  }, [readyState]);

  return (
    <section>
      <UserWsType.Provider value={sendJsonMessage}>
        <Container fluid className="home-section">
          <Container>
            <h1 className="home-heading">欢迎来到你画我猜！</h1>
            <Row>
              {Object.keys(rooms).map(
                (room) => (
                  console.log(room),
                  (
                    <Col md={4} key={room}>
                      <RoomCard
                        title={room}
                        player={rooms[room].player}
                        max={rooms[room].max}
                      />
                    </Col>
                  )
                )
              )}
            </Row>
          </Container>
        </Container>
      </UserWsType.Provider>
    </section>
  );
}

export default Home;
