
(function () {
  "use strict";


  S.grid.prototype.setFocus = function(rowIndex, columnIndex) {
    var grid = this;
    initFocusBoder();

    if(rowIndex >= grid.rows.length) {
      rowIndex = grid.rows.length - 1;
    }

    if(columnIndex >= grid.columns.length) {
      columnIndex = grid.columns.length - 1;
    }

    var cell = grid.getCell(rowIndex, columnIndex);

    if(cell != null) {
      setBorderBounds(cell);

      // darle el foco para que reciba eventos de teclado
      cell.element.focus();
    }

    function setBorderBounds(cell) {
      var element = cell.element;
      var focus = grid.focusBorder;
      focus.style.top = element.style.top;
      focus.style.left = element.style.left;
      focus.style.width = element.style.width;
      focus.style.height = element.style.height;
    }

    function initFocusBoder () {
      if(grid.focusBorder == null) {
        grid.focusBorder = document.createElement("div");
        grid.focusBorder.className = "focus";
        grid.panel.appendChild(grid.focusBorder);
      }
      else if (grid.focusBorder.parentNode == null) {
        grid.panel.appendChild(grid.focusBorder);
      }
  }
  };



})();
   






































