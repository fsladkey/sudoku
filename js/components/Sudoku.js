import React, { Component } from 'react';
import SudokuGame from '../game/SudokuGame';
import Outline from '../game/Outline';

export default class Sudoku extends Component {

  constructor(props) {
    super(props);
    this.game = new SudokuGame();
    window.game = this.game;
  }

  tiles() {
    return this.game.tiles().map((tile, idx) => {
      return (
        <li key={idx} className="tile">
          { tile }
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <h1>Sudoku</h1>
        <ul className="sudoku">
          <Outline />
          { this.tiles() }
        </ul>
      </div>
    );
  }
}
