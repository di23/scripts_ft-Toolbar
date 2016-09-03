/*
	newNullParent_a
	Author: Yahor Hayeuski
	Script for ft-Toolbar

	Create new null layer in active comp with brown label, and anchor position in the middle of null,
	and name it "parent". The source item always stays the same, so there is no mess in project panel
	with many items: "Null 1", "Null 2", etc.
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

var scriptName = 'newNullParent_a';

var name = 'parent';
var label = 12; // Brown label
var size = [100,100];
var sourceName = 'null';

// Check for selected comp
var curComp = app.project.activeItem;
if ((curComp == null) || !(curComp instanceof CompItem)) {
	alert('There is no active comp.');
	return;
}

// Find id of source null, if there is one
var id;
var item;
for (var i = 1, l = app.project.numItems; i <= l; i++) {
	item = app.project.item(i);
	if ((item.name == sourceName) &&
		(item.label == label) &&
		(item instanceof FootageItem) &&
		(item.mainSource instanceof SolidSource) &&
		equalArrs( item.mainSource.color, [1,1,1] ) &&
		equalArrs( [item.width,item.height], [100,100] )) {

		id = i;
		break;
	}
}

app.beginUndoGroup('ft-Toolbar - ' + scriptName);

// Creating
var newNull;
if (id) {
	// if there is source null in project
	newNull = curComp.layers.add( app.project.item(id) );
	newNull.property("ADBE Transform Group").property("ADBE Opacity").setValue(0);
} else {
	// if there is no null, create new one
	newNull = curComp.layers.addNull();
	newNull.source.name = sourceName;
	newNull.source.label = label;
	newNull.label = label;
	newNull.property("ADBE Transform Group").property("ADBE Anchor Point").setValue([size[0]/2,size[1]/2]);
}
newNull.name = name;

app.endUndoGroup();

})(); // End