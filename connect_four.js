function ConnectFour() {
  this.rows = [1,2,3,4,5,6];
  this.columns = [1,2,3,4,5,6,7];
  this.turn = 1;
  this.init = function(rootSelector) {
    for (i in this.rows) {
      console.log("row ", i);
      $(rootSelector).append("<div class='row' id='row-" + i + "'></div>");
      for (c in this.columns) {
        console.log("column", c);
        $("#row-"+i).append("<div class='cell'></div>");
      }
    }
  }

  this.currentPlayer = function() {
    if (this.turn % 2 == 0) {
      return "black";
    } else {
      return "red";
    }
  }
}
