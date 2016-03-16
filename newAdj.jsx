/*
	newAdj
	Author: Yahor Hayeuski
	Script for ft-Toolbar

	Create new adjustment layer in active comp with the same size. The source item always stays the same,
	so there is no mess	in project panel.
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

var scriptName = 'newAdj';

// Check for selected comp
var curComp = app.project.activeItem;
if ((curComp == null) || !(curComp instanceof CompItem)) {
	alert('There is no active comp.');
	return;
}

var size = [curComp.width, curComp.height];
var sourceName = 'adj_' + size[0] + 'x' + size[1];
var sourceLabel = 5;
var adjColor = [1,1,1];

// Find id of source adj, if there is one
var id;
var item;
for (var i = 1, l = app.project.numItems; i <= l; i++) {
	item = app.project.item(i);
	if ((item.name == sourceName) &&
		(item.label == sourceLabel) &&
		(item instanceof FootageItem) &&
		(item.mainSource instanceof SolidSource) &&
		equalArrs( item.mainSource.color, adjColor ) &&
		equalArrs( [item.width,item.height], size )) {

		id = i;
		break;
	}
}

app.beginUndoGroup('ft-Toolbar - ' + scriptName);

// Creating
var newAdj;
if (id) {
	// if there is source adj in project
	newAdj = curComp.layers.add( app.project.item(id) );
	newAdj.adjustmentLayer = true;
} else {
	// if there is no adj, create new one
	newAdj = curComp.layers.addSolid(adjColor, sourceName, size[0], size[1], 1);
	newAdj.adjustmentLayer = true;
	newAdj.source.label = sourceLabel;
	newAdj.label = sourceLabel;
}

app.endUndoGroup();

})(); // End