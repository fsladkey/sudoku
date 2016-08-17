import { range, sample, unique, minusArray } from '../utils/util';
import Tile from './Tile';

const _callbacks = [];

function SudokuGame({ populate }) {
  this.values = range(1, 10);
  this.grid = this.createGrid();
  if (populate) {
    this.setupEndGame();
    this.hideRandom();
  }
}

SudokuGame.prototype.register = function (cb) {
  _callbacks.push(cb);
};

SudokuGame.prototype.emitChange = function () {
  _callbacks.forEach(cb => cb());
};

SudokuGame.prototype.isOver = function () {
  return this.tileValues().every(value => value);
};

SudokuGame.prototype.isValid = function () {
  const tiles = this.tiles();
  for (var i = 0; i < tiles.length; i++) {
    let tile = tiles[i];
    const square = this.getSquare(tile.x, tile.y);
    const row = this.horizantalTiles()[tile.x];
    const col = this.verticalTiles()[tile.y];
    if (square.length !== unique(square).length ||
        row.length !== unique(row).length ||
        col.length !== unique(col).length) {
      return false;
    }
  }
  return true;
};

SudokuGame.prototype.dup = function () {
  const duplicate = new SudokuGame({ populate: false });
  for (var i = 0; i < this.grid.length; i++) {
    for (var j = 0; j < this.grid.length; j++) {
      duplicate.grid[i][j] = this.grid[i][j].dup(duplicate);
    }
  }
  return duplicate;
};

SudokuGame.prototype.get = function (pos) {
  const x = pos[0];
  const y = pos[1];
  return this.grid[x][y];
};

SudokuGame.prototype.set = function (pos, val) {
  const x = pos[0];
  const y = pos[1];
  this.grid[x][y].value = val;
  this.emitChange();
  return this.grid[x][y];
};

SudokuGame.prototype.setupEndGame = function () {
  while (this.tiles().indexOf(null) !== -1) {
    this.grid = this.createGrid();
    this.fillGrid();
  }
};

SudokuGame.prototype.hideRandom = function (chance) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (Math.round(Math.random())) {
        let tile = this.grid[i][j];
        tile.value = null;
        tile.editable = true;
      }
    }
  }
};

SudokuGame.prototype.createGrid = function () {
  const rows = [];
  for (var i = 0; i < 9; i++) {
    let row = rows[i] = [];
    for (var j = 0; j < 9; j++) {
      row.push(null);
    }
  }
  return rows;
};

SudokuGame.prototype.fillGrid = function () {
  let count = 0;
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      let value = sample(this.possibleValues(i, j)) || null;
      this.grid[i][j] = new Tile({
        id: count,
        pos: [i, j],
        game: this,
        value: value
      });
      count++;
    }
  }
};


SudokuGame.prototype.tiles = function () {
  const tiles = [];
  for (var i = 0; i < this.grid.length; i++) {
    let row = this.grid[i];
    for (var j = 0; j < 9; j++) {
      tiles.push(row[j]);
    }
  }
  return tiles;
};

SudokuGame.prototype.tileValues = function () {
  return this.tiles().map(tile => tile.value);
};

SudokuGame.prototype.horizantalTiles = function () {
  return this.grid.slice();
};

SudokuGame.prototype.verticalTiles = function () {
  const tiles = [];
  for (var i = 0; i < this.grid.length; i++) {
    let row = tiles[i] = [];
    for (var j = 0; j < 9; j++) {
      row.push(this.grid[j][i]);
    }
  }
  return tiles;
};

SudokuGame.prototype.square = function (startX, startY) {
  const tiles = [];
  for (let i = startX; i < startX + 3; i++) {
    for (let j = startY; j < startY + 3; j++) {
      tiles.push(this.grid[i][j]);
    }
  }
  return tiles;
};

SudokuGame.prototype.allSquares = function () {
  const squares = [];
  for (let i = 0; i < 9; i += 3) {
    for (let j = 0; j < 9; j += 3) {
      squares.push(this.square(i, j));
    }
  }
  return squares;
};

SudokuGame.prototype.getSquare = function (x, y) {
  x = ((Math.floor((x / 3)) + 1) * 3) - 3;
  y = ((Math.floor((y / 3)) + 1) * 3) - 3;
  return this.square(x, y);
};

SudokuGame.prototype.allValues = function (x, y) {
  const square = this.getSquare(x, y);
  const row = this.horizantalTiles()[x];
  const col = this.verticalTiles()[y];
  return square.concat(row).concat(col);
};

SudokuGame.prototype.numEmptyTiles = function () {
  return this.tileValues().filter(value => !value).length;
};

SudokuGame.prototype.possibleValues = function (x, y) {
  return minusArray(this.values, this.allValues(x, y).map(tile => tile && tile.value));
};

SudokuGame.prototype.render = function (x, y) {
  this.grid.forEach(row => console.log(row.map(tile => tile && tile.value)));
};


export default SudokuGame;
