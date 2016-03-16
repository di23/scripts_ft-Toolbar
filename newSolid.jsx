/*
	newSolid
	Author: Yahor Hayeuski
	Script for ft-Toolbar

	Create new black solid in active comp with the same size. The source item always stays the same,
	so there is no mess	in project panel with many items like: "Black Solid 1", "Black Solid  2", etc.
*/

(function () {

// Check if two 2D arrays are equal
function equalArrs( arr1, arr2 ) {
	if (arr1.length != arr2.length) {
		return false;
	}
	for (var i = 0, l = arr1.length; i < l; i++) {
		if (arr1[i] != arr2[i]) {
			// Don't work with complex types (like objects and arrays)
			return false;
		}
	}
	return true;
}

var scriptName = 'newSolid';

// Check for selected comp
var curComp = app.project.activeItem;
if ((curComp == null) || !(curComp instanceof CompItem)) {
	alert('There is no active comp.');
	return;
}

var size = [curComp.width, curComp.height];
var sourceName = 'solid_' + size[0] + 'x' + size[1];
var solidColor = [0,0,0]; // Black

// Find id of source null, if there is one
var id;
var item;
for (var i = 1, l = app.project.numItems; i <= l; i++) {
	item = app.project.item(i);
	if ((item.name == sourceName) &&
		(item instanceof FootageItem) &&
		(item.mainSource instanceof SolidSource) &&
		equalArrs( item.mainSource.color, solidColor ) &&
		equalArrs( [item.width,item.height], size )) {

		id = i;
		break;
	}
}

app.beginUndoGroup('ft-Toolbar - ' + scriptName);

// Creating
var newSolid;
if (id) {
	// if there is source solid in project
	newSolid = curComp.layers.add( app.project.item(id) );
} else {
	// if there is no solid, create new one
	newSolid = curComp.layers.addSolid(solidColor, sourceName, size[0], size[1], 1);
}

app.endUndoGroup();

})(); // End