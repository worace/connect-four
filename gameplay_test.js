QUnit.test("it finds connect four root", function( assert ) {
  var root = $("#cf-host");
  assert.ok( root.length > 0, "Passed!" );
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

QUnit.test("fills a cell for current player when clicked", function( assert ) {
  var game = new ConnectFour()
  game.init("#cf-host");

  $cell = $(".row:last .cell:first");
  assert.ok(!$cell.hasClass("red"));
  assert.ok(!$cell.hasClass("black"));
  var color = game.currentPlayer();
  $cell.click();
  assert.ok($cell.hasClass(color));
  assert.equal(2, game.turn);
  assert.equal("black", game.currentPlayer());
});


QUnit.test("can't play a cell twice", function( assert ) {
  var game = new ConnectFour()
  game.init("#cf-host");
  var color = game.currentPlayer();
  var other = game.nextPlayer();

  $cell = $(".row:last .cell:first");
  $cell.click();
  assert.ok($cell.hasClass(color));
  $cell.click();
  assert.ok($cell.hasClass(color));
  assert.ok(!$cell.hasClass(other));
});


QUnit.skip("clicking an upper cell fills in the bottom cell for that column", function( assert ) {
  var game = new ConnectFour()
  game.init("#cf-host");
  var color = game.currentPlayer();

  $topCell = $(".row:first .cell:first");
  $bottomCell = $(".row:last .cell:first");

  $topCell.click();
  assert.ok(!$topCell.hasClass(color));
  assert.ok($bottomCell.hasClass(color));
});

