var queue = [];
$(document).ready(function () {

});


var getNextStudent = function () {
	if (queue.length > 0) {
		return queue.pop();  
	}
};