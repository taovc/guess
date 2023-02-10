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
const users = {};

let rooms = [];

// Event types
const typesDef = {
  USER_EVENT: "userevent",
  ROOM_EVENT: "roomevent",
};

function broadcastMessage(json) {
  // We are sending the current data to all connected clients
  const data = JSON.stringify(json);
  for (let userId in clients) {
    let client = clients[userId];
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  }
}

function handleMessage(message) {
  const dataFromClient = JSON.parse(message.toString());
  const json = { type: dataFromClient.type };
  console.log(json);
  if (dataFromClient.type === typesDef.USER_EVENT) {
    users[userId] = dataFromClient;
    userActivity.push(`${dataFromClient.username} joined to edit the document`);
    json.data = { users, userActivity };
  } else if (dataFromClient.type === typesDef.CONTENT_CHANGE) {
    editorContent = dataFromClient.content;
    json.data = { editorContent, userActivity };
  }
  broadcastMessage(json);
}

function handleDisconnect() {}

// A new client connection request received
wsServer.on("connection", function (connection) {
  // Generate a unique code for every user
  console.log("Recieved a new connection");

  connection.on("message", (message) => handleMessage(message));
  // User disconnected
  connection.on("close", () => handleDisconnect());
});
