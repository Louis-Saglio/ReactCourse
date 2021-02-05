import React, {useMemo, useState} from "react";
import "./TicTacToe.css";
import {Board} from "./Board";

function buildBoard() {
  const board = []
  for (const rowIndex of Array(3).keys()) {
    board.push([])
    for (const colIndex of Array(3).keys()) {
      board[rowIndex].push({id: `${rowIndex}${colIndex}`, value: " "})
    }
  }
  return board
}

function TicTacToe() {
  const [board, setBoard] = useState(buildBoard())
  const [currentPlayer, setCurrentPlayer] = useState("X")

  const winner = useMemo(() => calculateWinner(board), [board])

  function play(id) {
    if (winner !== null) return
    const newBoard = []
    for (const row of board) {
      const newRow = []
      newBoard.push(newRow)
      for (const square of row) {
        let newSquare = {...square}
        if (square.id === id && square.value === " ") {
          newSquare.value = currentPlayer
          setCurrentPlayer(prev => { return {"X": "O", "O": "X"}[prev] })
        }
        newRow.push(newSquare)
      }
    }
    // Cannot set new board in a callback because otherwise setCurrentPlayer would not work
    setBoard(newBoard)
  }

  function reset() {
    setBoard(buildBoard())
    setCurrentPlayer("X")
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board board={board} onPlay={play} currentPlayer={currentPlayer} />
      </div>
      <div className="game-info">
        <div>{winner === null ? "No winner yet" : `${winner} has won`}</div>
        <ol>{/* TODO */}</ol>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default TicTacToe;

function calculateWinner(board) {
  const squares = []
  for (const row of board) {
    for (const square of row) {
      squares.push(square.value)
    }
  }
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] !== " " && squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}