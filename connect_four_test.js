QUnit.test("it has 6 rows of 7 cells", function( assert ) {
  var game = new ConnectFour()
  game.init("#cf-host");
  assert.equal(game.rows().length, 6);
});

QUnit.test("it has 7 columns of 6 cells", function( assert ) {
  var game = new ConnectFour()
  game.init("#cf-host");
  var $cells = $(".cell");
  var col1 = [$cells[0], $cells[7], $cells[14], $cells[21], $cells[28], $cells[35]];
  assert.deepEqual(col1, game.columns()[0]);
});

QUnit.test("it finds diagonals", function( assert ) {
  var game = new ConnectFour()
  game.init("#cf-host");

  var $cells = $(".cell");
  var dCount = 2*game.rowCount + 2*game.columnCount - 2; //perimeter - corner repeats
  assert.equal(game.diagonals().length, dCount);

  var sample = [$cells[0], $cells[8], $cells[16], $cells[24], $cells[32], $cells[40]];
  var sample2 = [$cells[5], $cells[11], $cells[17], $cells[23], $cells[29], $cells[35]].reverse();

  assert.ok(arrayContainsArray(game.diagonals(), sample));
  assert.ok(arrayContainsArray(game.diagonals(), sample2));
});

QUnit.test("it has a current player and turn", function( assert ) {
  var game = new ConnectFour()
  assert.equal(1, game.turn);
  assert.equal("red", game.currentPlayer());
});

QUnit.test("it knows the next player", function( assert ) {
  var game = new ConnectFour()
  assert.equal(1, game.turn);
  assert.equal("red", game.currentPlayer());
  assert.equal("black", game.nextPlayer());
});

QUnit.test("it knows if a cell is played", function( assert ) {
  var game = new ConnectFour()
  game.init("#cf-host");
  var $c = $(".cell:last");
  assert.ok(!game.played($c));
  game.playCell($c)
  assert.ok(game.played($c));
});

QUnit.test("it finds parent col for a cell", function( assert ) {
  var game = new ConnectFour()
  game.init("#cf-host");
  var cell = $(".cell")[0];
  var col1 = game.columns()[0];
  var parent = game.parentColumn(cell);
  assert.deepEqual(col1, parent);
});

QUnit.test("it finds best playable cell for a clicked cell", function( assert ) {
  var game = new ConnectFour()
  game.init("#cf-host");
  var $bottomRight = $($(".cell")[game.rowCount * game.columnCount - 1]);

  assert.deepEqual($bottomRight, game.playableCellFor($bottomRight));
  game.playCell($bottomRight);
  assert.ok(game.played($bottomRight));

  //next playable cell is up 1 row
  var $next = $($(".cell")[(game.rowCount - 1) * game.columnCount - 1]);
  assert.deepEqual($next, game.playableCellFor($bottomRight));
});

QUnit.test("it returns null playableCellFor if all cells in column are played", function( assert ) {
  var game = new ConnectFour()
  game.init("#cf-host");

  //bottom right
  var $current = $($(".cell")[game.rowCount * game.columnCount - 1]);

  for (var i = 0; i < game.rowCount; i++) {
    game.playCell(game.playableCellFor($current));
  }

  assert.equal(game.playableCellFor($current), null);
});


QUnit.test("it returns null winner before game is won", function( assert ) {
  var game = new ConnectFour()
  game.init("#cf-host");

  assert.equal(game.winningPlayer, null);
  assert.ok(!game.victory());
});

QUnit.test("it finds the winning player", function( assert ) {
  var game = new ConnectFour()
  game.init("#cf-host");

  var $target1 = $(".row:last .cell:first"); //bottom left
  var $target2 = $(".row:last .cell:last"); //bottom right

  assert.equal($("#victory").length, 0);
  for (var i = 0; i < 7; i++) {
    if (i % 2 == 0) {
      $target1.click(); //first player should win on 7th move
    } else {
      $target2.click();
    }
  }

  assert.ok(game.victory());
  assert.equal(game.winningPlayer, game.currentPlayer());
});

var arrayContainsArray = function(container, target) {
  for (var i in container) {
    var equal = true;
    var element = container[i];
    for (var j = 0; j < element.length; j++) {
      if (target[j] !== element[j]) {
        equal = false
      }
    }
    if (equal) {
      return true;
    }
  }
  return false;
}
