import React from 'react';

/**
 * Helper to render out a message for a COLOR_SETUP message
 * @param {{message: Object}} props The props for this component, containing a `message` object for the component.
 */
const SetupMessage = ({ message }) => (
  <div className="message">
    <span>{message.type}</span>
    <span>{message.currentColor}</span>
    <span>{message.possibleColors.join(', ')}</span>
  </div>
);

/**
 * Helper to render out a message for a COLOR_CHANGE message
 * @param {{message: Object}} props The props for this component, containing a `message` object for the component.
 */
const ColorChangeMessage = ({ message }) => (
  <div className="message">
    <span>{message.type}</span>
    <span>{message.id}</span>
    <span>{message.timestamp}</span>
    <span>{message.color}</span>
  </div>
);

/**
 * The MessageList functional component, handles displaying all the messages
 * we've received from the socket server.
 * @param {{messages: Array}} props The props for the component
 */
const MessageList = ({ messages }) => {
  /**
   * Helper function to handle which message component should be rendered, based
   * on the message's `type` property.
   * @param {Object} message The message object
   */
  const renderMessage = message => {
    switch (message.type) {
      case 'COLOR_SETUP':
        return <SetupMessage message={message} />;
      case 'CHANGE_COLOR':
        return <ColorChangeMessage message={message} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h2>Message Log</h2>
      <div>{messages.map(renderMessage)}</div>
    </div>
  );
};

export default MessageList;
