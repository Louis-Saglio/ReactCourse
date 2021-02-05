import React from "react";
import PropTypes from "prop-types";

export function Square({id, value, onPlay}) {
  return <button className="square" onClick={() => onPlay(id)}>{value}</button>;
}

Square.propTypes = {
  id: PropTypes.string,
  value: PropTypes.oneOf([" ", "X", "O"]),
  onPlay: PropTypes.func
}