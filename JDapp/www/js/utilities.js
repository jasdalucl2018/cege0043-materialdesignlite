// created 19-2-27 @ 14;20 creating new function getPort
// code provided by UCL. 

var httpPortNumber;
var httpsPortNumber;

function getPort(){
	var xhr = new XMLHttpRequest();

	// istener code added 
	
	xhr.addEventListener("load", function() {
		var parser = new DOMParser();
		var doc = parser.parseFromString(xhr.responseText, "application/xml");

		// code to get httpPortNumber from port.xml file
		
		httpPortNumber = doc.getElementsByTagName("node-port-http").item(0).textContent;
		httpsPortNumber = doc.getElementsByTagName("node-port-https").item(0).textContent;
		
		alert("Port: " + httpPortNumber); 
	});
	
	// depending on whether we are in a browser or on a phone the location of the config file is different 
	// If we are on a phone then http and https won't be present
	
	var configLocation = "res/port.xml";
	xhr.open("get", configLocation, true);
	xhr.send();
}