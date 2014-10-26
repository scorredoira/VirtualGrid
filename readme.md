Javascript Virtual Grid
===========================

    * Handles millions of rows fast and efficiently.
    * No dependencies.
    * Single 9 kB file.

[Demo](http://scorredoira.github.io/virtualgrid)

Usage:

```javascript
	var columns = [ 
		{ text: 'A', width: 150 }, 
		{ text: 'B', width: 250 }, 
		{ text: 'C', width: 250 }
	];

	var values = [
		[ 1, 3, 5 ],
		[ 8, 6, 9 ],
		[ 8, 6, 9 ]
	];

	var grid = new S.grid("grid1");
	grid.columns = columns;
	grid.values = values;
	grid.update();	
```
