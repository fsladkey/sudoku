function SudokuGame() {
  this.grid = this.createGrid();
}

SudokuGame.prototype.createGrid = function () {
  const rows = [];
  let count = 0;
  for (var i = 0; i < 9; i++) {
    let row = rows[i] = [];
    for (var j = 0; j < 9; j++) {
      row.push(count);
      count++;
    }
  }
  return rows;
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

SudokuGame.prototype.square = function (start) {
  const tiles = [];
  for (var i = start; i < 3; i++) {
    for (var j = start; j < 3; j++) {
      tiles.push(this.grid[i][j]);
    }
  }
  return tiles;
};

export default SudokuGame;
