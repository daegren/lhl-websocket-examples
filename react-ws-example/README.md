# React WebSocket Example

A simple example of using WebSockets with react.

This app is built ontop of the [`react-simple-boilerplate`](https://github.com/lighthouse-labs/react-simple-boilerplate) code.

## Running the example.

### Server

1.  Open a terminal
2.  Navigate to the `server` directory.
3.  `npm install`
4.  `npm start`

### React App

1.  Open another terminal
2.  Navigate to the root folder of the app.
3.  `npm install`
4.  `npm start`

## Important Files

### [`server`](./server)

This folder contains all the code for the WebSocket server.

#### [`server/index.js`]('./server/index.js)

This file contains all the code for our WebSocket server.

### [`server.js`](./server.js)

This file contains all of the code to run the Webpack Dev Server, used to serve up the React application.

### [`src/App.jsx`](./src/App.jsx)

This file is our top level Component for the React application. It manages the app state and the connection to our WebSocket server in `componentDidMount`.

### [`src/Components`]('./src/Components)

This folder contains all of the Components used by our app, they are all just functional Components and have no internal state.

### Dependencies

- React
- Webpack
- [babel-loader](https://github.com/babel/babel-loader)
- [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
- [ws](https://www.npmjs.org/packages/ws)
