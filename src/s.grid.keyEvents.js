
(function () {
  "use strict";

  var ENTER = 13;
  var KEY_UP = 38;
  var KEY_DOWN = 40;
  var KEY_LEFT = 37;
  var KEY_RIGHT = 39;
  var CTRL = 17;
  var ALT = 18;
  var SHIFT = 16;
  var SUPR = 46;
  var TAB = 9;


  S.grid.prototype.initKeyboardEvents = function() {
    var grid = this;
    var rows = grid.rows;

    S.each(rows, function(row) {
      if(row) {
        S.each(row, function(cell) {
          grid.initCellKeyboardEvents(cell);
        });
      }
    });
  };

  S.grid.prototype.initCellKeyboardEvents = function(cell) {
      var grid = this;
      var element = cell.element;

      element.onkeydown = function(e) {
        onKeydown(e, cell);
      };
  }

  function onKeydown(e, cell) {
    switch(e.keyCode){
      case KEY_UP:
        if(cell.rowIndex > 0) {
          grid.setFocus(cell.rowIndex - 1, cell.columnIndex);
        }
        S.stopBubble(e);
        break;

      case KEY_DOWN:
      case ENTER:
        if(cell.rowIndex < grid.rows.length) {
          grid.setFocus(cell.rowIndex + 1, cell.columnIndex);
        }
        S.stopBubble(e);
        break;

      case KEY_LEFT:
        if(cell.columnIndex > 0) {
          grid.setFocus(cell.rowIndex, cell.columnIndex - 1);
        }
        S.stopBubble(e);
        break;

      case KEY_RIGHT:
      case TAB:
        if(cell.columnIndex < grid.columns.length) {
          grid.setFocus(cell.rowIndex, cell.columnIndex + 1);
        }
        S.stopBubble(e);
        break;

      case CTRL:
      case ALT:
      case SHIFT:        
        break;

      case SUPR:
        grid.setValue(cell, null);
        S.stopBubble(e);
        break;

      default:
        /*var specialKeyPressed = e.ctrlKey || e.shiftKey || e.shiftKey;
        if(specialKeyPressed) {
          processShortcuts(e, grid);
        }
        else {
          grid.startEdit(e, cell);
        }*/
        grid.startEdit(e, cell);
        break;
    }
  }

 

})();
   



