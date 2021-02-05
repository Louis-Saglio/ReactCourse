import React from "react";
import {Square} from "./Square";
import PropTypes from "prop-types";

export function Board({board, onPlay, currentPlayer}) {
  function renderRow(row) {
    const renderedRow = []
    for (const {id, value} of row) {
      renderedRow.push(<Square key={id} id={id} value={value} onPlay={onPlay}/>)
    }
    return renderedRow
  }

  function renderBoard(board) {
    const renderedBoard = []
    for (const [index, row] of board.entries()) {
      renderedBoard.push(<div className="board-row" key={index}>{renderRow(row)}</div>)
    }
    return renderedBoard
  }

  return (
    <div>
      <div className="status">Next player {currentPlayer}</div>
      {renderBoard(board)}
    </div>
  );
}

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({id: PropTypes.string, value: PropTypes.oneOf([" ", "O", "X"])}))),
  onPlay: PropTypes.func,
  currentPlayer: PropTypes.oneOf(["X", "O"])
}