import useWebSocket from "react-use-websocket";
import { useState } from "react";

const wsUrl = "ws://localhost:8080/ws";

function isRoomEvent(message) {
  let evt = JSON.parse(message.data);
  return evt.type === "roomevent" || evt.type === "userevent";
}

const useRoomWebSocket = (user) => {
  const [rooms, setRooms] = useState({});

  const { sendJsonMessage, readyState } = useWebSocket(wsUrl, {
    onOpen: () => {
      console.log("WebSocket connection established.");
      sendJsonMessage({ type: "userevent", user: user });
    },
    onMessage: (message) => {
      console.log("WebSocket message received:", message);
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

  return { sendJsonMessage, readyState, rooms };
};

export default useRoomWebSocket;
