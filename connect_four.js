function ConnectFour() {
  this.rows = [1,2,3,4,5,6];
  this.columns = [1,2,3,4,5,6,7];
  this.turn = 1;

  this.setupBoard = function($selector) {
    for (i in this.rows) {
      $selector.append("<div class='row' id='row-" + i + "'></div>");
      for (c in this.columns) {
        $("#row-"+i).append("<div class='cell'></div>");
      }
    }
  }

  this.canPlay = function($cell) {
    return !($cell.hasClass(this.currentPlayer()) || $cell.hasClass(this.nextPlayer()));
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
