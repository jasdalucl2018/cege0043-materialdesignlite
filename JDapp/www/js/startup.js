

function trackAndCircle(){
	trackLocation();
	addPointLinePoly();
	getEarthquakes();

}








//add function to process html qwhen page is loaded

function loadW3HTML(){
	w3.includeHTML();
}

// add Point/Line/Circle data and track location automatically - useful for setting up different startup functions!
function startup(){
	document.addEventListener('DOMContentLoaded',function(){
		trackAndCircle();
		getPort();
		loadW3HTML()

		//19-5-4 adding track location 
		trackLocation()


		// 19-5-4 add to function get form data
		getFormdata()


	},false);
}



