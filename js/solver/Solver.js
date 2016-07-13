import Node from '../utils/node';

function Solver(game) {
  this.game = game;
  this.start = new Node({ game: game, move: null });
}

Solver.prototype.run = function () {
  this.buildMoveTree(this.start);
};

Solver.prototype.buildMoveTree = function (node) {
  let currentGame = node.value.game;
  if (currentGame.over()) return;
  let tiles = currentGame.tiles();
  // let count = 1;
  this.game.render();
  // while (count <= 9) {
    for (let i = 0; i < tiles.length; i++) {
      let tile = tiles[i];
      if (!tile.value) {
        let possibleValues = tile.possibleValues();
        if (possibleValues.length === 1) {
          tile.value = possibleValues[0];
          debugger
          node.next = new Node({ game: currentGame.dup(), move: tile });
          setTimeout(() => {
            this.game.get([tile.x, tile.y]).value = tile.value;
            console.log("=======");
            this.game.render();
            this.buildMoveTree(node.next);
          }, 1000);
          return;
        }
      }
    }
    // count++;
  // }
};

export default Solver;
