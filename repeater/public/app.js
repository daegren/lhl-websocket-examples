// Wait for the DOM to be loaded
// The same as jQuery's $(document).ready(() => {}) callback.
document.addEventListener("DOMContentLoaded", () => {
  // Create our client socket.
  const ws = new WebSocket("ws://localhost:8080/");

  // Client helper to take an object and stringify it for sending over the websocket.
  ws.sendJson = msg => ws.send(JSON.stringify(msg));

  // OnOpen event handler.
  // Fires when the connection to the socket server has succeeded.
  ws.onopen = () => {
    console.log("Client connected");
  };

  // OnMessage event handler.
  // Fires when the socket server sends us a message.
  ws.onmessage = message => {
    console.log("Got message from server:", message);
    // Message data is just a plain String, we need to parse it into JSON.
    const json = JSON.parse(message.data);

    // Create a <div> element
    const div = document.createElement("div");
    // Give it the 'message' class
    div.className = "message";
    // Set the innerText of the element to our message content.
    div.innerText = json.message;

    // Append the element to the DOM.
    document.getElementById("message-list").appendChild(div);
  };

  // Form 'submit' Event handler.
  document.getElementById("message-form").addEventListener("submit", e => {
    // Stop the form from actuall submitting
    e.preventDefault();

    // Find the input that has the text to send.
    const input = document.getElementById("message-input");
    const message = input.value;
    // Send a message to the socket server
    ws.sendJson({ message });

    // Clear the input and focus it.
    input.value = "";
    input.focus();
  });
});
