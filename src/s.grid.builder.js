
(function () {
  "use strict";

    S.grid.prototype.build = function() { 
      var grid = this;
      var columnWidth = 100;
      grid.columnHeight = 25;
      grid.numbersColumnWidth = 50;
      grid.columnsWidth = 0;
      var totalColumns = grid.columns.length;
      grid.globalPanelSize = null;

      grid.rows = [];

      var globalPanel = document.createElement("div"); 
      var headerPanel = document.createElement("div"); 
      var gridWrapper = document.createElement("div");
      var gridPanel = document.createElement("div");

      grid.headerPanel = headerPanel;
      grid.panel = gridPanel;
      grid.wrapper = gridWrapper;
      grid.globalPanel = globalPanel;   

      initColumns();      
      buildGrid();  
      S.disableTextSelect(globalPanel);

      function buildGrid() {
        globalPanel.className = "globalPanel";
        globalPanel.tabIndex = -1;

        S.clearChildNodes(grid.container);
        grid.container.appendChild(globalPanel);

        buildHeaderPanel();
        buildCellsPanel();
      }

      function buildHeaderPanel() {
        headerPanel.tabIndex = -1;
        headerPanel.className = "headerRow";
        headerPanel.style.height = grid.columnHeight + "px";

        var innerPanel = document.createElement("div");
        innerPanel.className = "headerRowInner";
        innerPanel.style.height = grid.columnHeight + "px";
        headerPanel.appendChild(innerPanel);

        for (var i = 0, l = totalColumns; i < l; i++) {
          var cell = createCell(grid, grid.columns[i].text, 0, i, innerPanel, 0);
          cell.element.className += " header";
        }

        globalPanel.appendChild(headerPanel);
      }

      function buildCellsPanel() {
        gridWrapper.className = "gridWrapper";
        setGridWrapperBounds();
        gridWrapper.onscroll = grid.onScrollPanel;

        gridPanel.className = "grid";
        gridPanel.tabIndex = -1;
        gridWrapper.appendChild(gridPanel);
        S.disableTextSelect(gridWrapper);
        globalPanel.appendChild(gridWrapper);
      }

      // si la columna es de 
      function initColumns() {
        var left = 0;

        for (var i = 0; i < grid.columns.length; i++) {
          var column = grid.columns[i];

          if (typeof column == 'string') {
            column = { 
              text: column
            };
            grid.columns[i] = column;
          }   

          if(!column.width) {
              column.width = columnWidth;
          }  

          column.left = left;
          left += column.width; 
          grid.columnsWidth += column.width;   
        };
      }

      function setGridWrapperBounds() {
        gridWrapper.style.left = "0px";
        gridWrapper.style.top = grid.columnHeight + "px";

        grid.globalPanelSize = S.getSize(globalPanel);
        gridWrapper.style.width = grid.globalPanelSize.width + "px";
        gridWrapper.style.height = (grid.globalPanelSize.height - grid.columnHeight) + "px";
      }
   };

   S.grid.prototype.buildRows = function(rowIndex) {
      var grid = this;
      
      setGridSize();

      var values = grid.values;
      var columns = grid.columns;

      // los rows que genera realmente. 
      var page = grid.renderPageSize;

      var start = page.start;
      var end = page.end;

      //console.log("repaint", start, "*", rowIndex, "*", end);

      var rows = grid.rows;

      // crear los nuevos rows
      for (var i = start; i < end; i++) {
        if(!grid.isRowRendered(i)) {
          buildRow(i);
        }
      }

      // borrar los anteriores
      for (var i = start - 1; i >= 0; i--) {
        var row = rows[i];
        if(row != null) {
          destroyRow(row);
          rows[i] = null;
        }
      }

      // borrar los posteriores
      for (var i = rows.length - 1; i >= end; i--) {
        var row = rows[i];
        if(row != null) {
          destroyRow(row);
          rows[i] = null;
        }
      }

      function destroyRow(row) {
        grid.panel.removeChild(row.numCell.element);
        row.numCell.element = null;

        var cells = row.cells;
        for (var i = cells.length - 1; i >= 0; i--) {
          var element = cells[i].element;
          grid.panel.removeChild(element);
        };
        
      }

      function buildRow(rowIndex) {  
        var rowNumCell = createRowNumberCell(rowIndex, grid.panel);

        var cells = [];
        var rowValues = values[rowIndex];
        for (var i = 0, l = columns.length; i < l; i++) {
          var cell = createCell(grid, rowValues[i], rowIndex, i, grid.panel, 0);
          grid.initCellKeyboardEvents(cell);
          cells.push(cell);
        }

        grid.rows[rowIndex] = { 
          numCell: rowNumCell, 
          cells: cells 
        };
      }


      function setGridSize() {        
        grid.panel.style.width = ((grid.columnsWidth + grid.numbersColumnWidth) + 1) + "px";
        grid.panel.style.height = ((grid.totalRows * grid.columnHeight) + 1) + "px";
      }

      function createRowNumberCell(rowIndex, panel) {
          var element = S.create("div", null, "cell rowNumber", panel, rowIndex + 1);
          element.style.width = grid.numbersColumnWidth + "px";
          element.style.height = grid.columnHeight + "px";
          element.style.left = "0px";
          element.style.top = (rowIndex * grid.columnHeight) + "px";
          return { 
            element: element,
            rowIndex: rowIndex
          };
        }
    };

    function createCell(grid, value, rowIndex, columnIndex, panel, xOffset) {
      var column = grid.columns[columnIndex];

      var style = "cell";      
      if(grid.setOddRowStyle && rowIndex % 2 == 0) {
        style += " odd";
      }

      var element = S.create("div", null, style, panel, value);
      element.style.width = (column.width + 1) + "px";// +1 to hide borders
      element.style.height = (grid.columnHeight + 1) + "px"; // +1 to hide borders

      var left = column.left + grid.numbersColumnWidth;
      element.style.left = (left + xOffset) + "px";
      element.style.top = (rowIndex * grid.columnHeight) + "px";

      // allow to receive keyboard events.
      element.tabIndex = 0;

      return {
        value: value, 
        rowIndex: rowIndex,
        columnIndex: columnIndex,
        element: element,
        grid: grid
      };
    }

})();
   






































