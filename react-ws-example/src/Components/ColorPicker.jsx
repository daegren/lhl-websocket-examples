/**
 * This module conatins all the code for displaying the colors available to
 * chose from
 */

import React from 'react';

/**
 * This is an internal functional Component used by the `ColorPicker`
 * @param {{color: String, currentColor: String, onColorSelected: Function}} props The props for this component
 */
const ColorButton = ({ color, currentColor, onColorSelected }) => (
  <button
    disabled={color === currentColor}
    onClick={() => {
      onColorSelected(color);
    }}
  >
    {color}
  </button>
);

/**
 * This is the ColorPicker component, it receives a list of colors and sends the
 * `onColorSelected` message when a color is selected from the list.
 * @param {{colors: Array<String>, currentColor: String, onColorSelected: Function}} props The props for this component
 */
const ColorPicker = ({ colors, currentColor, onColorSelected }) => (
  <div>
    {colors.map(color => (
      <ColorButton
        key={color}
        color={color}
        currentColor={currentColor}
        onColorSelected={onColorSelected}
      />
    ))}
  </div>
);
export default ColorPicker;
