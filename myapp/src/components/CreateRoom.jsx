import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserWsType } from "./Home";
import Form from "./Form";

export default function CreateRoom() {
  const { setIsCreateRoom, sendJsonMessage } = useContext(UserWsType);
  const navigate = useNavigate();

  const handleSubmit = (e, values) => {
    e.preventDefault();
    sendJsonMessage({
      type: "roomevent",
      action: "create",
      room: {
        name: values.roomName,
        player: 1,
        max: values.maxPlayer,
      },
    });
    navigate("/room/" + values.roomName);
    setIsCreateRoom(false);
  };

  const fields = [
    { label: "Room Name", type: "name", placeholder: "name", required: true, name: "roomName" },
    {
      label: "Max Player",
      type: "Max Player",
      placeholder: "Enter Max Player",
      required: true,
      name: "maxPlayer",
      pattern: "[0-9]*",
    },
  ];

  return (
    <div className="Create-room-form">
      <Form onSubmit={handleSubmit} fields={fields} title={"Create Room"} />
    </div>
  );
}
