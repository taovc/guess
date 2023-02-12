const http = require("http");
const { WebSocket, WebSocketServer } = require("ws");
const app = require("./app");
const { clients, users, rooms } = require("./gameData");
const uuidv4 = require("uuid").v4;

// Event types
const typesDef = {
  USER_EVENT: "userevent",
  ROOM_EVENT: "roomevent",
};

const port = process.env.PORT || "8081";

// express app
app.set("port", port);
const server = http.createServer(app);
const wsServer = new WebSocketServer({ server });
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

server.listen(port);

function broadcastMessage(json) {
  // We are sending the current data to all connected clients
  const data = JSON.stringify(json);
  for (let userId in clients) {
    console.log("Sending to client: " + users[userId]);
    let client = clients[userId];
    if (client.readyState === WebSocket.OPEN) {
      console.log(data)
      client.send(data);
    }
  }
}

function handleMessage(message, userId) {
  const data = JSON.parse(message.toString());
  const json = { type: data.type };

  switch (data.type) {
    case typesDef.USER_EVENT:
      if (data.action === "connect") {
        users[userId] = data.user;
        json.data = { rooms };
      } else if (data.action === "disconnect") {
        delete users[data.user];
        delete clients[data.user];
      }
      break;
    case typesDef.ROOM_EVENT:
      if (data.action === "create") {
        rooms[data.room.name] = { ...data.room };
        json.data = { rooms };
      }
      if (data.action === "join") {
        console.log("Joining room: ", rooms);
        // player ++
        if (data?.room && rooms[data?.room]) rooms[data.room].player++;
        if (rooms[data?.room]?.player.toString() === rooms[data?.room]?.max) {
          delete rooms[data.room];
          console.log("Game started: ", rooms);
        }
        json.data = { rooms};
      }
      if (data.action === "leave") {
        console.log("Leaving room: ", rooms);
      }
      if (data.action === "begin") {
        console.log("Begin room: ", rooms);
      }
      if (data.action === "end") {
        console.log("End room: ", rooms);
      }
      break;
    default:
      break;
  }
  broadcastMessage(json);
}

function handleDisconnect(userId) {
  console.log("Received message from client: close ", users[userId]);
  delete users[userId];
  delete clients[userId];
  const user = users[userId];
  broadcastMessage({ type: typesDef.USER_EVENT, action: "disconnect", user });
}

// A new client connection request received
wsServer.on("connection", function (connection) {
  const userId = uuidv4();
  // Generate a unique code for every user
  console.log("Recieved a new connection");
  clients[userId] = connection;

  connection.on("message", (message) => handleMessage(message, userId));
  // User disconnected
  connection.on("close", () => handleDisconnect(userId));
});
