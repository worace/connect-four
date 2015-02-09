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
    this.renderNewGameButton(this.$root);
    this.setupBoard(this.$root);
    this.addCellListeners(this.$root);
    this.addNewGameListener(this.$root);
  }

  this.addCellListeners = function($selector) {
    var game = this;
    $selector.find(".cell").click(function(e) {
      game.playCell($(this));
    });
  }

  this.addNewGameListener = function($selector) {
    var game = this;
    $("#new-game").click(function(e) {
      e.preventDefault();
      $selector.children().remove();
      (new ConnectFour()).init($selector);
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


  this.diagonals = function() {
    var buffer = [];
    for (var i = 0; i < this.rowCount; i ++) {
      buffer.push(undefined);
    }

    var forwardBuffer = this.rows()
    var backwardBuffer = this.rows()
    for (var i = 0; i < this.rowCount; i ++) {
      var offset = this.rowCount - 1 - i;
      forwardBuffer[i] = buffer.slice(0, offset).concat(forwardBuffer[i]);
      backwardBuffer[i] = buffer.slice(0, i).concat(backwardBuffer[i]);
    }

    var diagonals = []

    for (var i = 0; i < forwardBuffer[0].length; i ++) {
      var d = [];
      for (var row in forwardBuffer) {
        if (!(forwardBuffer[row][i] == undefined)) {
          d.push(forwardBuffer[row][i]);
        }
      }
      diagonals.push(d)
    }

    var backlength = backwardBuffer.reverse()[0].length;
    for (var i = 0; i < backlength; i ++) {
      var d = [];
      for (var row in backwardBuffer) {
        if (!(backwardBuffer[row][i] == undefined)) {
          d.push(backwardBuffer[row][i]);
        }
      }
      diagonals.push(d)
    }

    return diagonals;
  }

  this.setupBoard = function($selector) {
    for (var r = 0; r < this.rowCount; r++) {
      $selector.append("<div class='row' id='row-" + r + "'></div>");
      for (var c = 0; c < this.columnCount; c++) {
        $("#row-"+r).append("<div class='cell'></div>");
      }
    }
  }

  this.renderNewGameButton = function($selector) {
    $selector.append("<a href='javascript:void(0)' id='new-game'>New Game</a>");
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
    if (!this.winningPlayer) {
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
    } else {
      (new ErrorMessage(this.$root, "Sorry, " + this.winningPlayer + " already won this game. Click 'New Game' to play again.")).display();
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

  this.winLengthDiagonals = function() {
    var diagsToCheck = [];
    for (var i in this.diagonals()) {
      if (this.diagonals()[i].length >= this.winningStreak) {
        diagsToCheck.push(this.diagonals()[i]);
      }
    }
    return diagsToCheck;
  }

  this.diagonalWin = function() {
    var diagsToCheck = this.winLengthDiagonals();
    for (var d in diagsToCheck) {
      var diag = diagsToCheck[d];
      for (var i = 0; i < diag.length - this.winningStreak + 1; i ++) {
        var game = this;
        var possibleWin = diag.slice(i, i+this.winningStreak);
        var validWin = allHaveProp(possibleWin, function(cell) {
          return $(cell).hasClass(game.currentPlayer());
        });
        if (validWin) {
          return true;
        }
      }
    }
  }

  this.victory = function() {
    return (this.verticalWin() || this.horizontalWin() || this.diagonalWin());
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

