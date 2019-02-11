// 19_2_11 9:25 adding getEarthquake function 
var client;
// and a variable that will hold the layer itself
var earthquakelayer;
// function to add point, line and polygone to map
function addPointLinePoly(){
// adding code for line 
L.marker([51.5, -0.09]).addTo(mymap):
// add circle
L.circle ([51.508, -0.11], 500, {
	color: 'red'
	fillColor: '#f03',
	fillOpacity: 0.5
	}).addTo(mymap).bindPopup("I am a circle.");
	// adding polygone
	va latlngs = [
	[51.5, -0.09],
	[51.51, -0.047]
	];
	var polyline = L.polyline(latlngs, {color: 'red'}).addTo(mymap);
}
// // 19_2_11 9:25 adding getEarthquake function 
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
function loadEarthquakelayer(earthquakedata) {
	var earthquakejson = JSON.parse(earthquakedata);
	earthquakelayer = L.geoJson(earthquakejson).addTo(mymap);
	mymap.fitBounds(earthquakelayer.getBounds());
}
