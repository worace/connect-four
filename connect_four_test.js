QUnit.test("it has 6 rows of 7 cells", function( assert ) {
  var game = new ConnectFour()
  assert.equal(game.rows.length, 6);
});

QUnit.test("it has 7 columns of 6 cells", function( assert ) {
  var game = new ConnectFour()
  assert.equal(game.columns.length, 7);
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

