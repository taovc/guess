import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWebSocket } from "react-use-websocket";

const wsUrl = "ws://localhost:8080/ws";

export default function CreateRoom(props) {
  const [name, setName] = useState("");
  const [maxplayer, setMaxPlayer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.sendJsonMessage({
      type: "roomevent",
      action: "create",
      room: {
        name: name,
        player: 0,
        max: maxplayer,
      },
    });
    navigate("/room/" + name);
    props.setIsCreateRoom(false);
  };

  return (
    <div className="Auth-form-container">
      <form className="Create-room-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Create Room</h3>
          <div className="form-group mt-3">
            <label>Room Name</label>
            <input
              type="name"
              className="form-control mt-1"
              placeholder="name"
              required={true}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Max Player</label>
            <input
              type="Max Player"
              className="form-control mt-1"
              placeholder="Enter Max Player"
              pattern="[0-9]*"
              required={true}
              onChange={(e) => setMaxPlayer(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
