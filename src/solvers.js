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

// helper functions

var hasRowConflictAt = function(grid, rowIndex) {
  var row = grid[rowIndex];
  var foundOne = false;
  for (var i = 0; i < row.length; i++) {
    if (!!row[i]) {
      if (foundOne) {
        return true;
      }
      foundOne = true;
    }
  }
  return false;
};

// test if any rows on this board contain conflicts
var hasAnyRowConflicts = function(grid) {
  for (var i = 0; i < grid.length; i++) {
    if (hasRowConflictAt(grid, i)) {
      return true;
    }
  }
  return false;
};

var hasColConflictAt = function(grid, colIndex) {
  var rows = grid;
  var foundOne = false;
  for (var i = 0; i < rows.length; i++) {
    var column = rows[i][colIndex];
    if (!!column) {
      if (foundOne) {
        return true;
      }
      foundOne = true;
    }
  }
  return false;
};

    // test if any columns on this board contain conflicts
var hasAnyColConflicts = function(grid) {
  var rows = grid;
  for (var i = 0; i < rows.length; i++) {
    if (this.hasColConflictAt(grid, i)) {
      return true;
    }
  }

  return false;
};

// Tree Class and methods
var Tree = function (grid) {
  this.grid = grid;
  this.children = [];
};


Tree.prototype.newGridRow = function(oldGrid, currentColumn, currentRow) {
  var oldGrid = oldGrid || [];
};


Tree.prototype.addChild = function(newGridRow) {

  var child = new Tree(newGridRow);

  this.children.push(child);
  return child;
};

Tree.prototype.findLeaves = function(node){
  node = node || this;
  if (node.children.length === 0) {
    return 1;
  } else {
    var leafsHere = 0;
    for ( var i = 0; i < node.children.length; i++ ) {
      leafsHere += node.findLeaves(node.children[i]);
    }
    return leafsHere;
  }
};

Tree.prototype.findLeaf = function() {
  // debugger;
  if (this.children.length === 0) {
    return this.grid;
  } else {
    for ( var i = 0; i < this.children.length; i++ ) {
      return this.children[i].findLeaf();
    }
  }
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


window.populateTree = function(n) {
  var emptyGrid = newGrid(n);

  var recurse = function (row, node) {
    if (row < n) {
      for (var col = 0; col < n; col++) {
        var newGrid = copyArray(node.grid);
        newGrid[row][col] = 1;

        if (!hasAnyColConflicts(newGrid) && !hasAnyRowConflicts(newGrid)) {
          var newChild = node.addChild(newGrid);
          recurse(row + 1, newChild);
        }
      }
    }
  };

  var copyArray = function(array) {
    var result = [];
    for (var i = 0; i < array.length; i++) {
      result.push(array[i].slice(0));
    }
    return result;
  };

  var rootTree = new Tree(emptyGrid);

  
  recurse(0, rootTree);

  return rootTree;
};


window.findNRooksSolution = function(n) {
  var rootTree = window.populateTree(n);

  var solution = rootTree.findLeaf();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var rootTree = window.populateTree(n);

  var solutionCount = rootTree.findLeaves();
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
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
