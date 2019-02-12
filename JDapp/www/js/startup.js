function startup() {
	document.addEventListener('DOMContentLoaded',
	function() {
		trackAndPoly ();
	}, false);
}

function trackAndCircle() {
	trackLocation();
	addPointLinePoly();
} 