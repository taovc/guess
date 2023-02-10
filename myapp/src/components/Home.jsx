import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useNavigate } from "react-router-dom";
import RoomCard from "./Card";

import CreateRoom from "./CreateRoom";

const wsUrl = "ws://localhost:8080/ws";

export const UserWsType = React.createContext();

function isRoomEvent(message) {
  let evt = JSON.parse(message.data);
  return evt.type === "roomevent";
}

function Home() {
  const navigate = useNavigate();
  const [isCreateRoom, setIsCreateRoom] = useState(false);
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
  const { lastJsonMessage } = useWebSocket(wsUrl, {
    share: true,
  });
  console.log(lastJsonMessage);
  const rooms = lastJsonMessage?.data.rooms || {};

  useEffect(() => {}, [rooms, sendJsonMessage, readyState]);
  /*
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
  };*/

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

  const handleCreateRoom = () => {
    setIsCreateRoom(true);
  };

  return (
    <section>
      <UserWsType.Provider value={sendJsonMessage}>
        <Container fluid className="home-section">
          {isCreateRoom && (
            <CreateRoom
              setIsCreateRoom={setIsCreateRoom}
              sendJsonMessage={sendJsonMessage}
            ></CreateRoom>
          )}
          <Container hidden={isCreateRoom}>
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
          <Button
            variant="primary"
            size="lg"
            onClick={handleCreateRoom}
            hidden={isCreateRoom}
          >
            创建房间
          </Button>
        </Container>
      </UserWsType.Provider>
    </section>
  );
}

export default Home;
