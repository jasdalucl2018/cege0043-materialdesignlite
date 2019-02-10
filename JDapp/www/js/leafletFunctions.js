

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