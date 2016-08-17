import React, { Component } from 'react';
import Tile from './Tile';
import SudokuGame from '../game/SudokuGame';
import Outline from '../game/Outline';
import Solver from '../solver/Solver';

export default class Sudoku extends Component {

  constructor(props) {
    super(props);
    this.game = new SudokuGame({ populate: true });
    window.game = this.game;
    this.handleChange = this.handleChange.bind(this);
    this.select = this.select.bind(this);
    this.state = {
      selectedId: null,
      tiles: this.game.tiles()
    };
  }

  componentDidMount() {
    this.game.register(this.handleChange);
    new Solver(this.game).run();
  }

  handleChange() {
    this.setState({
      tiles: this.game.tiles()
    });
  }

  select(id) {
    this.setState({ selectedId: id });
  }

  tiles() {
    return this.state.tiles.map((tile) => {
      return (
        <Tile
          key={tile.id}
          tile={tile}
          select={this.select}
          selectedId={this.state.selectedId}
          />
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
