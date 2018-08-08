// Import our dependencies
const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;
const uuid = require('uuid/v4');

// Setup some constants for our app, with defaults.
const PORT = process.env.PORT || 8080;

// Setup some internal state for the server
const possibleColors = [
  'red',
  'blue',
  'green',
  'orange',
  'lightpink',
  'aquamarine'
];
let currentColor = possibleColors[0];

// Setup our socket server, using PORT for the port to connect on.
const wss = new WebSocketServer({ port: PORT });

// Broadcast helper, allows us to send a message to all connected clients.
wss.broadcast = msg => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  });
};

// Connection event handler
wss.on('connection', ws => {
  console.log('Client connected');

  // Initial message object to send to the connecting client.
  const initialMessage = {
    type: 'COLOR_SETUP',
    currentColor,
    possibleColors
  };

  // Send the initial message to the client which just connected.
  // This allows the react app to start with the right data.
  ws.send(JSON.stringify(initialMessage));

  // Message event handler, fires whenever a message from a client is received.
  ws.on('message', message => {
    console.log(`WS message ${message}`);
    // Message payloads are all JSON, so parse into JS data structures.
    const json = JSON.parse(message);

    // Messages all have a type, handle each case
    switch (json.type) {
      // If the type is CHANGE_COLOR
      case 'CHANGE_COLOR':
        // Update our local variable to match
        currentColor = json.color;

        // Create a message to send back out
        const outMsg = {
          // Spread operator here copies all the key-value pairs from the json
          // object into this object
          ...json,
          // Add an id
          id: uuid(),
          // Add a timestamp.
          timestamp: new Date()
        };
        // Broadcast the change back to all clients.
        wss.broadcast(JSON.stringify(outMsg));
        break;
      default:
        break;
    }
  });
});

console.log(`Socket Server is now listening at ws://localhost:${PORT}/`);
