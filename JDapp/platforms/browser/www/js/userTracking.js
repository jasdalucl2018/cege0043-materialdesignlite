

var userMarker;
function trackLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.watchPosition(showPosition);
@@ -8,5 +9,8 @@ function trackLocation() {
}

function showPosition(position) {
	if (userMarker){
		mymap.removeLayer(userMarker);
	}
	userMarker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(mymap).bindPopup("<b>You were here</b>");
} 