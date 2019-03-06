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

// define a global variable to hold the layer so we can use it later on
var earthquakelayer;
		
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

// create red test marker
var testMarkerRed = L.AwesomeMarkers.icon({
	icon: 'play',
	markerColor: 'red'
});


// adding code for proximity alert

function closestFormPoint() {
    var minDistance = 100000000000;
    var closestFormPoint = 0;
    // for this example, use the latitude/longitude of warren street
    // in your assignment replace this with the user's location
    var userlat = 51.524048;
    var userlng = -0.139924;
    formLayer.eachLayer(function (layer) {
        var distance = calculateDistance(userlat,
            userlng, layer.getLatLng().lat, layer.getLatLng().lng, 'K');
        if (distance < minDistance) {
            minDistance = distance;
            closestFormPoint = layer.feature.properties.id;
        }
    });
    // for this to be a proximity alert, the minDistance must be
    // closer than a given distance - you can check that here
    // using an if statement
    // show the popup for the closest point
    formLayer.eachLayer(function (layer) {
        if (layer.feature.properties.id == closestFormPoint) {
            layer.openPopup();
        }
    });
}


