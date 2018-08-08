import React, { Component } from 'react';
import ColorPicker from './Components/ColorPicker.jsx';
import MessageList from './Components/MessageList.jsx';

// Our main App component
// Holds all of our application state
// Along with the socket connection
class App extends Component {
  constructor(props) {
    super(props);

    // Default initial state of the app.
    this.state = {
      currentColor: 'black',
      possibleColors: [],
      messages: []
    };
  }

  componentDidMount() {
    // Connect to our WebSocket server.
    // Storing the socket into a property on the App component to be used in
    // other functions
    this.socket = new WebSocket('ws://localhost:8080/');

    // Small helper to make sending JSON objects easier.
    this.socket.sendJson = obj => this.socket.send(JSON.stringify(obj));

    // OnOpen event handler, tells us the socket is open.
    this.socket.onopen = () => {
      console.log('Connected to socket');
    };

    // OnMessage event handler, using a function on the class to handle this so
    // our code stays consise
    this.socket.onmessage = this._handleSocketMessage;
  }

  render() {
    return (
      <div>
        <h1 style={{ color: this.state.currentColor }}>Hello React :)</h1>
        <ColorPicker
          colors={this.state.possibleColors}
          currentColor={this.state.currentColor}
          onColorSelected={this._onColorSelected}
        />

        <MessageList messages={this.state.messages} />
      </div>
    );
  }

  /**
   * Socket Message Event Handler
   * @param {MessageEvent} message The MessageEvent object, this contains the data we've received from the server.
   */
  _handleSocketMessage = message => {
    // Message data is serialized as JSON, parse it.
    const json = JSON.parse(message.data);
    console.log('Got message', json);

    // Store the received message in our message list.
    this.setState(prevState => ({
      ...prevState,
      messages: prevState.messages.concat(json)
    }));

    // Messages have different types
    // We'll use that to decide what to do with the message.
    switch (json.type) {
      // This is the initial message from the SocketServer, tells us how to
      // setup the initial state of the app
      case 'COLOR_SETUP':
        const { currentColor, possibleColors } = json;
        this.setState({ currentColor, possibleColors });
        break;
      // This is the CHANGE_COLOR message from the SocketServer, it tells us
      // someone (us or another user) has updated the color of the header.
      case 'CHANGE_COLOR':
        this.setState({ currentColor: json.color });
        break;
      default:
        break;
    }
  };

  // Handler for when the color is changed.
  // We update our local state, then send out the CHANGE_COLOR message to our
  // SocketServer
  _onColorSelected = color => {
    this.setState({ currentColor: color });
    this.socket.sendJson({ type: 'CHANGE_COLOR', color });
  };
}
export default App;
