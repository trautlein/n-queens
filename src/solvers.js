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
  var len = row.length;
  for (var i = 0; i < len; i++) {
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
  var len = grid.length;
  for (var i = 0; i < len; i++) {
    if (hasRowConflictAt(grid, i)) {
      return true;
    }
  }
  return false;
};

var hasColConflictAt = function(grid, colIndex) {
  var rows = grid;
  var len = rows.length;
  var foundOne = false;
  for (var i = 0; i < len; i++) {
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
  var len = rows.length;
  for (var i = 0; i < len; i++) {
    if (this.hasColConflictAt(grid, i)) {
      return true;
    }
  }

  return false;
};

// SOLUTION START

var hasMajorDiagonalConflictAt = function(grid, majorDiagonalColumnIndexAtFirstRow) {

  var size = grid.length;
  var count = 0;
  var rowIdx = 0;
  var colIdx = majorDiagonalColumnIndexAtFirstRow;

  for ( ; rowIdx < size && colIdx < size; rowIdx++, colIdx++ ) {
    if ( colIdx >= 0 ) {
      var row = grid[rowIdx];
      count += row[colIdx];
    }
  }

  return count > 1;
};

// test if any major diagonals on this board contain conflicts
var hasAnyMajorDiagonalConflicts = function(grid) {

  var size = grid.length;

  for ( var i = 1 - size; i < size; i++ ) {
    if ( hasMajorDiagonalConflictAt(grid, i) ) {
      return true;
    }
  }

  return false;
};

var hasMinorDiagonalConflictAt = function(grid, minorDiagonalColumnIndexAtFirstRow) {

  var size = grid.length;
  var count = 0;
  var rowIdx = 0;
  var colIdx = minorDiagonalColumnIndexAtFirstRow;

  for ( ; rowIdx < size && colIdx >= 0; rowIdx++, colIdx-- ) {
    if ( colIdx < size ) {
      var row = grid[rowIdx];
      count += row[colIdx];
    }
  }

  return count > 1;
};

// test if any minor diagonals on this board contain conflicts
var hasAnyMinorDiagonalConflicts = function(grid) {

  var size = grid.length;

  for ( var i = (size * 2) - 1; i >= 0; i-- ) {
    if ( this.hasMinorDiagonalConflictAt(grid, i) ) {
      return true;
    }
  }

  return false;
};


// SOLUTION END


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

Tree.prototype.findLeaves = function(node) {
  node = node || this;
  if (node.children.length === 0) {
    return 1;
  } else {
    var leafsHere = 0;
    var len = node.children.length;
    for ( var i = 0; i < len; i++ ) {
      leafsHere += node.findLeaves(node.children[i]);
    }
    return leafsHere;
  }
};

Tree.prototype.findLeaf = function() {
  if (this.children.length === 0) {
    return this.grid;
  } else {
    var len = node.children.length;
    for ( var i = 0; i < len; i++ ) {
      return this.children[i].findLeaf();
    }
  }
};

Tree.prototype.findLeavesQueen = function(node, currentLevel, desiredLevel) {
  var counter = 0;
  var grids = [];

  var drill = function(node, currentLevel, desiredLevel) {
    if (currentLevel === desiredLevel) {
      counter++;
      grids.push(node.grid);
    } else {
      var len = node.children.length;
      for ( var i = 0; i < len; i++ ) {
        drill(node.children[i], currentLevel + 1, desiredLevel);
      }
    }
  };

  drill(node, currentLevel, desiredLevel);
  return grids.length;
};


Tree.prototype.findLeafQueen = function(node, currentLevel, desiredLevel) {
  var result = node.grid;

  var drill = function(node, currentLevel, desiredLevel) {
    if (currentLevel === desiredLevel) {
      result = node.grid;
    } else {
      var len = node.children.length;
      for ( var i = 0; i < len; i++ ) {
        drill(node.children[i], currentLevel + 1, desiredLevel);
      }
    }
  };

  drill(node, currentLevel, desiredLevel);
  return result;

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


window.populateTreeRooks = function(n) {
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

window.populateTreeQueens = function(n) {
  var emptyGrid = newGrid(n);

  var recurse = function (row, node) {
    if (row < n) {
      for (var col = 0; col < n; col++) {
        var newGrid = copyArray(node.grid);
        newGrid[row][col] = 1;

        if (!hasAnyColConflicts(newGrid) && 
            !hasAnyRowConflicts(newGrid) &&
            !hasAnyMajorDiagonalConflicts(newGrid) &&
            !hasAnyMinorDiagonalConflicts(newGrid) ) {
          var newChild = node.addChild(newGrid);
          recurse(row + 1, newChild);
        }
      }
    }
  };

  var copyArray = function(array) {
    var result = [];
    var len = array.length;
    for (var i = 0; i < len; i++) {
      result.push(array[i].slice(0));
    }
    return result;
  };

  var rootTree = new Tree(emptyGrid);

  
  recurse(0, rootTree);

  return rootTree;
};


window.findNRooksSolution = function(n) {
  var rootTree = window.populateTreeRooks(n);

  var solution = rootTree.findLeaf();
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var rootTree = window.populateTreeRooks(n);

  var solutionCount = rootTree.findLeaves();
  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var rootTree = window.populateTreeQueens(n);

  var solution = rootTree.findLeafQueen(rootTree, 0, n);
  // console.log('Single solution for ' + n + ' queens:', solution);
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var rootTree = window.populateTreeQueens(n);

  var solutionCount = rootTree.findLeavesQueen(rootTree, 0, n);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
