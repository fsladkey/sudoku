import Node from '../utils/node';

function Solver(game) {
  this.game = game;
  this.solved = false;
  this.start = new Node({ game: game, move: null });
}

Solver.prototype.run = function () {
  this.buildMoveTree(this.start);
};

Solver.prototype.tracePath = function() {
  var allMoves = [];
  let node = this.finalNode;
  while (node) {
    allMoves.unshift([node.value.move.x, node.value.move.y]);
    node = node.parent;
  }
  console.log(allMoves);
  return allMoves;
};

Solver.prototype.buildMoveTree = function (node) {
  let currentGame = node.value.game;
  if (currentGame.isOver() || this.finalNode) {
    console.log("solved");
    this.finalNode = node;
    this.tracePath();
    return;
  }
  let tiles = currentGame.tiles();
  let count = 1;
  while (count <= 9) {
    for (let i = 0; i < tiles.length; i++) {
      let tile = tiles[i];
      if (!tile.value) {
        let possibleValues = tile.possibleValues();
        if (possibleValues.length === count) {
          for (var x = 0; x < possibleValues.length; x++) {
            tile.value = possibleValues[x];
            let newNode = new Node({ game: currentGame.dup(), move: tile });
            node.addChild(newNode);
            setTimeout(this.buildMoveTree.bind(this, newNode), 0);
          }
          return;
        }
      }
    }
    count++;
  }
};

export default Solver;
