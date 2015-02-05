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
  assert.equal(col1, game.columns()[0]);
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

