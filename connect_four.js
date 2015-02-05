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

  this.canPlay = function($cell) {
    return !this.played($cell);
  }

  this.played = function($cell) {
    return ($cell.hasClass(this.currentPlayer()) || $cell.hasClass(this.nextPlayer()));
  }

  this.playCell = function($cell) {
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
