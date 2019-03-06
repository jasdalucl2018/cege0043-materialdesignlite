// adding variable that holds a XMLHttpRequest() for the earthquake data
var client;
// and a variable that will hold the layer itself for the earthquake data
var earthquakes;
var earthquakelayer;
//function to create point, circle and line
function addPointLinePoly(){
	//adding a point
	L.marker([51.5, -0.09]).addTo(mymap);
	// add a circle
	L.circle([51.508, -0.11], 500, {
		color: 'red',
		fillColor: '#f03',
		fillOpacity: 0.5
		}).addTo(mymap).bindPopup("I am a circle.");
		//adding a line aka 'polyline'
		var latlngs = [
		[51.5, -0.09],
		[51.51, -0.047]
		];
		var polyline = L.polyline(latlngs, {color: 'red'}).addTo(mymap);
}
// create function to get Earthquakes data using an XMLHttpRequest
function getEarthquakes() {
	client = new XMLHttpRequest();
	client.open('GET','https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson');
client.onreadystatechange = earthquakeResponse;
client.send();
}
// code to wait for the response from the data server, and process the response once it is received
function earthquakeResponse() {
	if (client.readyState == 4) {
		var earthquakedata = client.responseText;
		loadEarthquakelayer(earthquakedata);
	}
}
// define a global variable to hold the layer so that we can use it later on
var earthquakelayer;
// convert the received data - which is text - to JSON format and add it to the map

// correcting code sourced from https://github.com/junju-ng/cege0043-jsReference/blob/2759d76098bbb9fbc89602ee727d1d7a4f182b01/leafletFunctions.js
// convert the received data (which is text) into JSON format and add it to the map

function loadEarthquakelayer(earthquakedata){
	// convert text to JSON
	var earthquakejson = JSON.parse(earthquakedata);
	earthquakes = earthquakejson;
			
	// load geoJSON earthquake layer using custom markers
	earthquakelayer = L.geoJSON(earthquakejson,
	{
		// use point to layer to create the points
		pointToLayer: function(feature, latlng){
			// look at properties of GeoJSON file to see EQ magnitude and use different marker depending on magnitude
			if (feature.properties.mag > 1.75){
				return L.marker(latlng, {icon: testMarkerRed}).bindPopup("<b>"+
				feature.properties.place+"</b>");
			}
					
			else { 
			return L.marker(latlng, {icon: testMarkerPink}).bindPopup("<b>"+
				feature.properties.place+"</b>");
			}
		},					
	}).addTo(mymap);
			
	// change the map zoom so that all the data is shown
	mymap.fitBounds(earthquakelayer.getBounds());
}

var formClient; // define global variable to process AJAX request to get formdata
var allForms;
var formDataLayer; // global variable to hold form data for later use

// AJAX request function to load formdata
function callFormData(){
	alert(httpPortNumber);
	alert("This will get all the form data.");
	formClient = new XMLHttpRequest();
	var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber + "/getFormData/" + httpPortNumber; //get url with non-hardcoded port number
	formClient.open("GET", url, true); // send to server
	formClient.onreadystatechange = processFormData;
	try {
		formClient.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	}
	catch (e) {
		// this only works in internet explorer
	}
	formClient.send();
}

// AJAX response function
function processFormData(){
	if (formClient.readyState === 4) { // 4 = response from server completely loaded
		if (formClient.status > 199 && formClient.status < 300) 
			var formData = formClient.responseText;
	}
}

// convert the received data (which is text) into JSON format and add it to the map
function loadFormDataLayer(formData){
	// convert text to JSON
	var formdatajson = JSON.parse(formData);
	allForms = formdatajson;

	// load geoJSON earthquake layer using custom markers
	formDataLayer = L.geoJSON(formdatajson,
	{
		// use point to layer to create the red points
		pointToLayer: function(feature, latlng){
			return L.marker(latlng, {icon: testMarkerRed}).bindPopup("<b>"+
			feature.properties.place+"</b>");
			}					
	}).addTo(mymap);

	// change the map zoom so that all the data is shown
	mymap.fitBounds(formDataLayer.getBounds());
}

