function Tile({ pos, value, game, id }) {
  this.id = id;
  this.x = pos[0];
  this.y = pos[1];
  this.value = value;
  this.editable = false;
  this.game = game;
}

Tile.prototype.dup = function (game) {
  return new Tile({
    id: this.id,
    pos: [this.x, this.y],
    value: this.value,
    editable: this.editable,
    game: game,
  });
};

Tile.prototype.position = function () {
  return [this.x, this.y];
};

Tile.prototype.possibleValues = function () {
  return this.game.possibleValues(this.x, this.y);
};

export default Tile;
