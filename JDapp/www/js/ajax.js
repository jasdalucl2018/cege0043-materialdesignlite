// code for global variable to process ajax request

var xhrNode; 


function callDivNodeJSChange(){
	xhrNode = new XMLHttpRequest();

	// get url linked to non-hard coded port numbers.

	var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber; 
	xhrNode.open("GET", url, true); 

	// send message to server
	
	xhrNode.onreadystatechange = processDivNodeJSChange;
	try {
		xhrNode.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	}
	catch (e) {

		// note this only works in internet explorer
	}
	xhrNode.send();
}

// code for AJAX to response function

function processDivNodeJSChange(){
	if (xhrNode.readyState < 4) //while waiting for response from server
		document.getElementById('ajaxtext').innerHTML = "Loading...";
	else if (xhrNode.readyState === 4) { // 4 = response from server completely loaded
		if (xhrNode.status > 200 && xhrNode.status < 300) 
			// http status between 200 to 299 are all successful
			document.getElementById('ajaxtext').innerHTML = xhrNode.responseText;
	}
} 