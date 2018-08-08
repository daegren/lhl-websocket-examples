# Repeater Example

This is a simple websocket server mixed in with an Express app.

## Dependencies

- [Express](https://www.npmjs.com/package/express)
- [WS](https://www.npmjs.com/package/ws)

## Important Files

### [`index.js`](./index.js)

This file contains all the code for our Web server, it also sets up the SocketServer to listen for socket connections.

### [`public/app.js`](./public/app.js)

This is the browser JavaScript code which connects to the SocketServer, and sends messages when the form is submitted.

### [`public/index.html`]('./public/index.html)

The HTML that our app runs inside of.

## Resources

- [WS Express+Websockets example](https://github.com/websockets/ws/tree/master/examples/express-session-parse)
