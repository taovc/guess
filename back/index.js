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

wsServer.on("connection", function (connection) {
  console.log("Recieved a new connection");
  connection.on("message", (message) => console.log(message));
  connection.on("close", () => console.log("User disconnected"));
});
