function ConnectFour() {
  this.rowCount = 6;
  this.columnCount = 7;
  this.turn = 1;

  this.rows = function() {
    return $(".row");
  }

  this.columns = function() {
    var cols = [];
    var $cells = $(".cell");
    for (var c = 0; c < this.columnCount; c++) {
      var col = [];
      for (var i = 0; i < this.rowCount; i++) {
        col.push($cells[i*this.columnCount + c])
      }
      cols.push(col);
    }
    return cols;
  }

  this.setupBoard = function($selector) {
    for (var r = 0; r < this.rowCount; r++) {
      $selector.append("<div class='row' id='row-" + r + "'></div>");
      for (var c = 0; c < this.columnCount; c++) {
        $("#row-"+r).append("<div class='cell'></div>");
      }
    }
  }

  this.parentColumn = function($cell) {
    console.log("find parent of", $cell);
    var parent;
    for (var i = 0; i < this.columnCount; i++) {
      var col = this.columns()[i];
      console.log("checking col", col);
      for (var cell = 0; cell < this.rowCount; cell++) {
        console.log("checking cell", col[cell]);
        if (col[cell] == $cell) {
          console.log("found it");
          parent = col;
          break
        }
      }
    }
    return parent;
  }

  this.playableCellFor = function($cell) {
    return $cell;
  }

  this.canPlay = function($cell) {
    return !this.played($cell);
  }

  this.played = function($cell) {
    return ($cell.hasClass(this.currentPlayer()) || $cell.hasClass(this.nextPlayer()));
  }

  this.playCell = function($cell) {
    //find lowest playable cell for that col;
    //if it exists, play it
    if (this.canPlay($cell)) {
      $cell.addClass(this.currentPlayer());
      this.turn ++;
    }
  }

  this.addCellListeners = function($selector) {
    var game = this;
    $selector.find(".cell").click(function(e) {
      game.playCell($(this));
    });
  }

  this.init = function(rootSelector) {
    $root = $(rootSelector);
    this.setupBoard($root);
    this.addCellListeners($root);
  }

  this.currentPlayer = function() {
    if (this.turn % 2 == 0) {
      return "black";
    } else {
      return "red";
    }
  }

  this.nextPlayer = function() {
    return (this.currentPlayer() == "red" ? "black" : "red");
  }
}
