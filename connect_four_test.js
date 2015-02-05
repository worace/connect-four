QUnit.test("it finds connect four root", function( assert ) {
  var root = $("#cf-host");
  assert.ok( root.length > 0, "Passed!" );
});

QUnit.test("it has 6 rows", function( assert ) {
  var game = new ConnectFour()
  assert.equal(game.rows.length, 6);
});

QUnit.test("it has 7 columns", function( assert ) {
  var game = new ConnectFour()
  assert.equal(game.columns.length, 7);
});

QUnit.test("it inits the board with 6 rows", function( assert ) {
  var game = new ConnectFour()
  game.init("#cf-host")
  assert.equal($("#cf-host .row").length, 6);
});

QUnit.test("rows have 7 cells", function( assert ) {
  var game = new ConnectFour()
  game.init("#cf-host")
  assert.equal($(".row .cell").length, 42);
  $(".row").each(function(i) {
    assert.equal($("#row-"+i).children(".cell").length, 7);
  });
});

QUnit.test("it has a current player and turn", function( assert ) {
  var game = new ConnectFour()
  assert.equal(1, game.turn);
  assert.equal("red", game.currentPlayer());
});
