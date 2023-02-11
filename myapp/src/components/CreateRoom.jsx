import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserWsType } from "./Home";

export default function CreateRoom() {
  const [name, setName] = useState("");
  const [maxplayer, setMaxPlayer] = useState("");
  const { setIsCreateRoom, sendJsonMessage } = useContext(UserWsType);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    sendJsonMessage({
      type: "roomevent",
      action: "create",
      room: {
        name: name,
        player: 0,
        max: maxplayer,
      },
    });
    navigate("/room/" + name);
    setIsCreateRoom(false);
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
