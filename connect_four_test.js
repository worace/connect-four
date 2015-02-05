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
  var $c = $(".cell")[0];
  var col1 = game.columns()[0];
  var parent = game.parentColumn($c);
  assert.deepEqual(col1, parent);
});

QUnit.test("it finds best playable cell for a clicked cell", function( assert ) {
  var game = new ConnectFour()
  game.init("#cf-host");
  var $bottomRight = $($(".cell")[game.rowCount * game.columnCount - 1]);

  assert.equal($bottomRight, game.playableCellFor($bottomRight));
  game.playCell($bottomRight);

  //next playable cell is up 1 row
  var $next = $(".cell")[(game.rowCount - 1) * game.columnCount - 1];
  assert.equal($next, game.playableCellFor($bottomRight));
});
