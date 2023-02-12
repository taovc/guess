import useWebSocket from "react-use-websocket";
import { useState } from "react";

const wsUrl = "ws://localhost:8080/ws";

function isRoomEvent(message) {
  let evt = JSON.parse(message.data);
  return evt.type === "roomevent";
}

function isUserEvent(message) {
  let evt = JSON.parse(message.data);
  return evt.type === "userevent";
}

function isErrorMessage(message) {
  let evt = JSON.parse(message.data);
  return evt?.data?.type === "error";
}

const useRoomWebSocket = (user, info) => {
  const [rooms, setRooms] = useState({});

  const { sendJsonMessage, readyState } = useWebSocket(wsUrl, {
    onOpen: () => {
      console.log("WebSocket connection established.");
      sendJsonMessage(info);
    },
    onMessage: (message) => {
      console.log("WebSocket message received: ", message);
      if (isUserEvent(message)) {
        let evt = JSON.parse(message.data);
        setRooms(evt?.data?.rooms || {});
      }
      if (isRoomEvent(message)) {
        let evt = JSON.parse(message.data);
        setRooms(evt?.data?.rooms || {});
      }
      if (isErrorMessage(message)) {
        let evt = JSON.parse(message.data);
        window.location.href = "/home";
      }
    },
    onClose: () => {
      console.log("WebSocket connection closed.");
      sendJsonMessage({ type: "userevent", action: "leave", user });
    },
    share: true,
    filter: () => false,
    retryOnError: true,
    shouldReconnect: () => true,
  });

  return { sendJsonMessage, readyState, rooms };
};

export default useRoomWebSocket;
