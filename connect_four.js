//TODO -- maybe should render as columns
//rather than rows since game is largely col
//oriented

function ConnectFour() {
  this.rowCount = 6;
  this.columnCount = 7;
  this.winningStreak = 4;
  this.winningPlayer = null;
  this.turn = 1;

  this.init = function(rootSelector) {
    this.$root = $(rootSelector);
    this.setupBoard(this.$root);
    this.addCellListeners(this.$root);
  }

  this.addCellListeners = function($selector) {
    var game = this;
    $selector.find(".cell").click(function(e) {
      game.playCell($(this));
    });
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


  this.rows = function() {
    var rows = [];
    var $cells = $(".cell");
    for (var r = 0; r < this.rowCount; r++) {
      var row = [];
      for (var i = 0; i < this.columnCount; i++) {
        row.push($cells[i + r*this.columnCount])
      }
      rows.push(row);
    }
    return rows;
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

  this.parentColumn = function(cell) {
    var parent;
    for (var i = 0; i < this.columnCount; i++) {
      var col = this.columns()[i];
      for (var c = 0; c < this.rowCount; c++) {
        if (col[c] == cell) {
          parent = col;
          break
        }
      }
    }
    return parent;
  }

  this.playableCellFor = function($cell) {
    var col = this.parentColumn($cell[0]).reverse();
    var playable = null;
    for (var i in col) {
      if (!this.played($(col[i]))) {
        playable = $(col[i]);
        break
      }
    }

    return playable;
  }

  this.canPlay = function($cell) {
    return !this.played($cell);
  }

  this.played = function($cell) {
    return ($cell.hasClass(this.currentPlayer()) || $cell.hasClass(this.nextPlayer()));
  }

  this.playCell = function($cell) {
    var $play = this.playableCellFor($cell);
    if ($play) {
      $play.addClass(this.currentPlayer());
      if (this.victory()) {
        this.winningPlayer = this.currentPlayer();
        console.log("game over, winner is: ", this.currentPlayer());
        (new VictoryMessage(this.$root, "Congratulations: " + this.currentPlayer() + "! You won!")).display();
      } else {
        this.turn ++;
      }
    } else {
      (new ErrorMessage(this.$root, "Sorry, that column is full")).display();
    }
  }

  this.verticalWin = function() {
    for (var c = 0; c < this.columnCount; c ++) {
      for (var r = 0; r < this.rowCount - (this.rowCount - this.winningStreak) - 1; r ++) {
        var game = this;
        var possibleWin = this.columns()[c].slice(r, r+this.winningStreak);
        var validWin = allHaveProp(possibleWin, function(cell) {
          return $(cell).hasClass(game.currentPlayer());
        });
        if (validWin) {
          return true;
        }
      }
    }
    return false;
  }

  this.horizontalWin = function() {
    for (var r = 0; r < this.rowCount ; r ++) {
      for (var c = 0; c < this.columnCount - (this.columnCount - this.winningStreak) - 1; c ++) {
        var game = this;
        var possibleWin = this.rows()[r].slice(c, c+this.winningStreak);
        var validWin = allHaveProp(possibleWin, function(cell) {
          return $(cell).hasClass(game.currentPlayer());
        });
        if (validWin) {
          return true;
        }
      }
    }
    return false;
  }

  this.victory = function() {
    return (this.verticalWin() || this.horizontalWin());
  }
}

function allHaveProp(collection, predicate) {
  var result = true;
  for (var i in collection) {
    if (!predicate(collection[i])) {
      result = false;
    }
  }
  return result;
}

function Message($root, message, label) {
  this.message = message;
  this.label = label;
  this.display = function() {
    $root.append("<p id='"+this.label+"' style='display:none;'>"+this.message+"</p>");
    $("#"+this.label).fadeIn();
    var message = this;
    window.setTimeout(function() {
      $("#"+message.label).fadeOut(400, function() {
        $(message).remove();
      });
    }, 800)
  }
}

function ErrorMessage($root, message) {
  return new Message($root, message, "error")
}

function VictoryMessage($root, message) {
  return new Message($root, message, "victory")
}

