/*
Array.prototype.eachCell = function(callback) {
	this.forEach(function(row, row_index) {
		row.forEach(function(cell, cell_index) {
			callback(cell);
		}); 
	});
}
*/
function dist(x1, y1, x2, y2) {
	console.log(x1, y1, x2, y2)
	return Math.round(Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)));
};
function dist_between(cell1, cell2) {
	return dist(cell1.getX(), cell1.getY(), cell2.getX(), cell2.getY())
};
