function Node(value) {
  this.value = value;
  this.parent = null;
  this.children = [];
}

Node.prototype.addChild = function(newNode) {
  newNode.parent = this;
  this.children.push(newNode);
};

export default Node;
