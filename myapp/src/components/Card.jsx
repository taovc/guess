import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function RoomCard(props) {
  return (
    <Card className="home-card-view">
      <Card.Body>
        <Card.Title style={{ color: "black" }}>
          <strong
            style={{
              fontSize: "xx-large",
            }}
          >
            {props.title}
          </strong>
        </Card.Title>
        <br></br>
        <Card.Text className="home-card-text">
          current player:
          {props.player}
        </Card.Text>
        <Card.Text className="home-card-text">
          max player:
          {props.max}
        </Card.Text>
        <Button variant="primary" href={props.Link} target="_blank">
          Join
        </Button>
      </Card.Body>
    </Card>
  );
}
export default RoomCard;
