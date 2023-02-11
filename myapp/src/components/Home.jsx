import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import useWebSocket from "react-use-websocket";
import { useNavigate } from "react-router-dom";

import RoomCard from "./Card";
import CreateRoom from "./CreateRoom";

const wsUrl = "ws://localhost:8080/ws";
export const UserWsType = React.createContext();

function isRoomEvent(message) {
  let evt = JSON.parse(message.data);
  return evt.type === "roomevent" || evt.type === "userevent";
}

function Home() {
  const navigate = useNavigate();
  const [isCreateRoom, setIsCreateRoom] = useState(false);
  const [rooms, setRooms] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));

  const { sendJsonMessage, readyState } = useWebSocket(wsUrl, {
    onOpen: () => {
      console.log("WebSocket connection established.");
      sendJsonMessage({ type: "userevent", user: user });
    },
    onMessage: (message) => {
      if (isRoomEvent(message)) {
        let evt = JSON.parse(message.data);
        setRooms(evt?.data.rooms || {});
      }
    },
    onClose: () => {
      console.log("WebSocket connection closed.");
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
  }, [readyState, user, sendJsonMessage, navigate]);

  const handleCreateRoom = () => {
    setIsCreateRoom(true);
  };

  const contextValue = {
    sendJsonMessage,
    setIsCreateRoom,
  };

  return (
    <section>
      <UserWsType.Provider value={contextValue}>
        <Container fluid className="home-section">
          {isCreateRoom && <CreateRoom></CreateRoom>}
          <Container hidden={isCreateRoom}>
            <h1 className="home-heading">欢迎来到你画我猜！</h1>
            <Row>
              {Object.keys(rooms).map((room) => (
                <Col md={4} key={room}>
                  <RoomCard title={room} player={rooms[room].player} max={rooms[room].max} />
                </Col>
              ))}
            </Row>
          </Container>
          <Button variant="primary" size="lg" onClick={handleCreateRoom} hidden={isCreateRoom}>
            创建房间
          </Button>
        </Container>
      </UserWsType.Provider>
    </section>
  );
}

export default Home;
