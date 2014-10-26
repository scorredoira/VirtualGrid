
(function () {
  "use strict";

  S.grid.prototype.initMouseEvents = function() {
  	  var grid = this;
      S.attach(grid.panel, "mousedown", function(e) {
          var cell = grid.getCellAtEvent(e);
          if(cell != null) {
            grid.setFocus(cell.rowIndex, cell.columnIndex);
          }
      });
  };

})();
   



