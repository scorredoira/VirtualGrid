
(function () {
  "use strict";

    window.S = {};

    S.each = function (collection, functionName) {
        for (var i = 0, l = collection.length; i < l; i++) {
            functionName(collection[i]);
        }
    };

    S.get = function (element) {
        if (typeof (element) == 'string') {
            element = document.getElementById(element);
        }
        return element;
    };

    S.disableTextSelect = function(element) {
        element.onselectstart = function (e) {
          if(e.preventDefault) {
            e.preventDefault();
          }
          else {
            event.returnValue = false;
          }
          return false;      
        };

        if (typeof element.style.MozUserSelect!="undefined") {
            element.style.MozUserSelect="none";
        }
    };   

    S.clearChildNodes = function (element) {
        if (typeof (element) == 'string') {
            element = document.getElementById(element);
        }
        while (element.hasChildNodes()) {
            if(S.detach) {
                // Avoid: Uncaught NotFoundError: Failed to execute 'removeChild' on 'Node'
                // http://stackoverflow.com/a/22934552/4264
                S.detach(element.firstChild, "blur");
            }

            element.removeChild(element.firstChild);
        }
    };    

    S.parentNode = function (element) {
        return element.parentElement || element.parentNode;
    };    

    S.removeNode = function (element) {
    	if(element != null) {    	
	        var parent = S.parentNode(element);
	        if(parent != null){
                if(S.detach) {
                    // Avoid: Uncaught NotFoundError: Failed to execute 'removeChild' on 'Node'
                    // http://stackoverflow.com/a/22934552/4264
                    S.detach(element, "blur");
                }
	        	S.parentNode(element).removeChild(element);
	        }
        }
    };

    S.getSize = function (item) {
        item = S.get(item);
        return { width: item.offsetWidth, height: item.offsetHeight };
    };

    S.create = function (type, id, className, parent, text) {
        var element = document.createElement(type);

        if(id) {
            element.id = id;
        }

        if(className) {
            element.className = className;
        }

        if(parent) {
            parent.appendChild(element);
        }

        if(text !== null) {
            S.setText(element, text)
        }
        
        return element;
    };

    S.getCaretPosition = function(element) {        
        if (document.selection) { // old IE
            element.focus();
            var sel = document.selection.createRange();
            sel.moveStart ('character', -element.value.length);
            return sel.text.length;
        }
        else if (typeof element.selectionStart==='number') {
            return element.selectionStart;
        }

        return 0;
    };

    S.getMouseCoords = function (event, element){
        var totalOffsetX = 0;
        var totalOffsetY = 0;
        var currentElement = element;

        do{
            totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
            totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
            currentElement = currentElement.offsetParent;
        }
        while(currentElement)

        var x = event.pageX - totalOffsetX - document.body.scrollLeft;
        var y = event.pageY - totalOffsetY - document.body.scrollTop;

        return {x:x, y:y}
    };  

    S.setText = function (element, text) {
        if (text == null) {
            text = "";
        }

        element = S.get(element);

        if (element.innerText) {
            element.innerText = text;
        }
        else {
            element.textContent = text;
        }
    };

    S.attach = function (element, evType, func, useCapture) {
        if (element.addEventListener) {
            element.addEventListener(evType, func, useCapture);
        }
        else if (element.attachEvent) {
            element.attachEvent('on' + evType, func);
        }
        else {
            element['on' + evType] = func;
        }
    };

    S.stopBubble = function (event) {
        if (!event) {
            event = window.event;
        }

        if (event.preventDefault) {
            event.preventDefault();
        }
        else {
            event.returnValue = false;
        }
    };


})();
   






































