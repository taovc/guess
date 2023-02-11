const http = require("http");
const { WebSocket, WebSocketServer } = require("ws");
const app = require("./app");

const port = process.env.PORT || "8081";
app.set("port", port);

const server = http.createServer(app);
const wsServer = new WebSocketServer({ server });
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

server.listen(port);

// I'm maintaining all active connections in this object
const clients = {};
// I'm maintaining all active users in this object
let users = {};

let rooms = {};

// Event types
const typesDef = {
  USER_EVENT: "userevent",
  ROOM_EVENT: "roomevent",
};

function broadcastMessage(json) {
  // We are sending the current data to all connected clients
  const data = JSON.stringify(json);
  for (let userId in clients) {
    console.log("Sending to client: " + userId);
    let client = clients[userId];
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  }
}

function handleMessage(message, connection) {
  const data = JSON.parse(message.toString());
  const json = { type: data.type };

  console.log("Received message from client: ", data);
  if (data.type === typesDef.USER_EVENT) {
    users[data.user] = data;
    clients[data.user] = connection;
    json.data = { rooms };
  } else if (data.type === typesDef.ROOM_EVENT) {
    if (data.action === "create") {
      rooms[data.room.name] = { ...data.room };
    }
    if (data.action === "join") {
      console.log("Joining room: ", rooms);
    }
    json.data = { rooms };
  }
  broadcastMessage(json);
}

function handleDisconnect() {
  console.log("Client disconnected");
}

// A new client connection request received
wsServer.on("connection", function (connection) {
  // Generate a unique code for every user
  console.log("Recieved a new connection");

  connection.on("message", (message) => handleMessage(message, connection));
  // User disconnected
  connection.on("close", () => handleDisconnect());
});
