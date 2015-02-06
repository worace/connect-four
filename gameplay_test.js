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

QUnit.test("clicking an upper cell fills in the bottom cell for that column", function( assert ) {
  var game = new ConnectFour()
  game.init("#cf-host");
  var color = game.currentPlayer();

  $topCell = $(".row:first .cell:first");
  $bottomCell = $(".row:last .cell:first");

  $topCell.click();
  assert.ok(!$topCell.hasClass(color));
  assert.ok($bottomCell.hasClass(color));
});

QUnit.test("shows an error message once all cells for a column are played", function( assert ) {
  var game = new ConnectFour()
  game.init("#cf-host");
  var color = game.currentPlayer();

  $start = $(".row:last .cell:first");

  for (i = 0; i < game.rowCount; i++) {
    $start.click();
  }

  assert.equal($("#error").length, 0);
  $start.click();
  assert.equal($("#error").length, 1);
});

QUnit.test("shows a victory message if a player wins", function( assert ) {
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
  assert.equal($("#victory").length, 1);
});

QUnit.test("handles a horizontal win", function( assert ) {
  var game = new ConnectFour()
  game.init("#cf-host");

  // play each col twice so black stacks
  // on top of red and red eventually wins
  for (var i = 0; i < 7; i++) {
    var cell = $(".cell")[Math.floor(i/2)];
    game.playCell($($(".cell")[Math.floor(i/2)]));
  }
  assert.equal(game.winningPlayer, game.currentPlayer());
  assert.equal($("#victory").length, 1);
});

QUnit.test("handles a diagonal win", function( assert ) {
  var game = new ConnectFour()
  game.init("#cf-host");

  // playing straight across will eventually
  // result in diag win for player 2
  for (var i = 0; i < 22; i++) {
    game.playCell($($(".cell")[i]));
  }
  assert.equal(game.winningPlayer, game.currentPlayer());
  assert.equal($("#victory").length, 1);
});

QUnit.skip("moves can no longer be made once the game is won", function(assert) {
});
