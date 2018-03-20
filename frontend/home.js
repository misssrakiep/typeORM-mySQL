$(document).ready(function() {
  var currentLocation;  
$("#findLoc").click(function() {
    // getLocation();
    // showPosition();
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }
    var currentLocation;
    
    function showPosition(position) {
        if(position){
            currentLocation=position.coords.latitude +","+ position.coords.longitude;
            console.log(currentLocation);
        }
    }
    
});


var myPlaces = [];

$.ajax({
    headers: { "Accept": "application/json"},
    type: "GET",
    url: "http://167.99.40.78:9090/api/places",
    dataType: "json",
    success: function(results){
        console.log(results);
        myPlaces.push(results);
        $(".myPlaces").html(placesText({
            results: results
        }))
    }
});
console.log(myPlaces);

var myPlacesTemp = $(".myPlacesTemp").html();
var placesText = Handlebars.compile(myPlacesTemp);



/////////////////////////////////
})
