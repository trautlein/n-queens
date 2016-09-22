/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

var Tree = function (grid) {
  this.grid = grid;
  this.children = [];
};


Tree.prototype.newGridRow = function(oldGrid, currentColumn, currentRow) {
  var oldGrid = oldGrid || [];
};


Tree.prototype.addChild = function(newGridRow) {

  var child = new Tree(this.newGridRow());

  // 

  this.children.push(child);
  return child;
};


var newGrid = function(n) {
  var grid = [];
  for (var i = 0; i < n; i++) {
    var row = [];
    for (var j = 0; j < n; j++) {
      row.push(0);
    }
    grid.push(row);
  }
  return grid;
};


window.findNRooksSolution = function(n) {
  // var solution = undefined; //fixme

  // create the basic board that is empty
  var emptyGrid = newGrid(n);

  // loop over each row of the grid (n times) 

  var recurse = function (counter, row, node) {
    if (counter < n) {
      var newChild = node.addChild(emptyGrid);
      for (var i = 0; i < n; i++) { 
        // var revisedGrid = 
        recurse(counter + 1, row, newChild);
      }
    }
  };

  var rootTree = new Tree(emptyGrid);

  for (var i = 0; i < n; i++) {
    recurse(0, i, rootTree);
  }
    // create a new tree and add it as a child of it's base tree

      // add a base grid to the tree

        // populate the grid with a rook in each column

        // call recursive function on each child that we created

        //


  // console.log(rootTree);
  var solution = rootTree.grid;

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
