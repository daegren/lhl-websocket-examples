// Import dependencies
const express = require("express");
const WebSocket = require("ws");
const WebSocketServer = WebSocket.Server;
const http = require("http");

// Set some constants for our app to use, with defaults.
const PORT = process.env.PORT || 8080;

// Setup the express app
const app = express();

// Static middleware to serve index.html and app.js
app.use(express.static("public"));

// Create an HTTP server from our express app.
// This needed to get the WebSocket server to work with our express app.
const server = http.createServer(app);

// Create our WebSocketServer
const wss = new WebSocketServer({ server });

// Helper to send a message to all conected clients.
wss.broadcast = msg => {
  wss.clients.forEach(client => {
    // Only send the message to clients which are still connected.
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  });
};

// Connection event handler
// Fires when a client connects to our websocket server.
// ws is a socket object which represents a connection to the client which just conntected
wss.on("connection", ws => {
  console.log("Client connected");

  // Message event handler.
  // Fires whenever the client (ws) sends us a message
  ws.on("message", message => {
    console.log(`WS message ${message}`);
    // Repeat the message to all clients.
    wss.broadcast(message);
  });
});

// Start the HTTP server (not the express server), on the given port.
server.listen(PORT, () => {
  console.log(`App now listening at http://localhost:${PORT}/`);
});
