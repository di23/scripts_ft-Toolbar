/*
	newNull
	Author: Yahor Hayeuski
	Script for ft-Toolbar

	Create new null layer in active comp. The source item always stays the same,
	so there is no mess in project panel with many items: "Null 1", "Null 2", etc.
*/

(function () {

var scriptName = 'newNull';

var itemName = 'null';
var id;

// Check for selected comp
var curComp = app.project.activeItem;
if ((curComp == null) || !(curComp instanceof CompItem)) {
	//TODO add try-catch or use alert
	throw scriptName + ' - error 20:\nThere is no active comp.';
}

// Find id of source null, if there is one
//TODO add here code

app.beginUndoGroup('ft-Toolbar - ' + scriptName);

// Creating
var newNull;
if (id) {
	// if there is source null in project
	newNull = this.objRef.layers.add( app.project.item(id) );
	newNull.property("ADBE Transform Group").property("ADBE Opacity").setValue(0);
	newNull.property("ADBE Transform Group").property("ADBE Anchor Point").setValue([0,0]);
} else {
	// if there is no null, create new one
	newNull = this.objRef.layers.addNull();
	newNull.source.name = itemName;
}

app.endUndoGroup();

})(); // End