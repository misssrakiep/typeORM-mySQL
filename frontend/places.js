var map;
var infoWindow;
var allPlaces = [];
var currentlocation = [];

var center = new google.maps.LatLng(0, 0);




//initialise a new google map using users current location as center pin
function initialize() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position.coords.toString())
            if (position) {
                document.getElementById('loadingScreen').style.display = 'none';
                document.querySelector('.placeDetails').style.display = "block";
            }
            center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map = new google.maps.Map(document.getElementById('map'), {
                center: center,
                zoom: 11
            });    
        
        
//make a request for surrounding places of interest to show
            var request = {
                location: center,
                radius: 8047,
                types: ['cafe']
            };    
            infoWindow = new google.maps.InfoWindow();
        
            var service = new google.maps.places.PlacesService(map);
        
            service.nearbySearch(request, callback);
            // currentlocation.push({
            //     lat: position.coords.latitude, 
            //     lng: position.coords.longitude
            // });
        }, function(failure) {
            if(failure.message.indexOf("Only secure origins are allowed") == 0) {
              // Secure Origin issue.
              console.log(failure);
              
            }
          })
    } else {
        alert("No Geolocation")
    }

}    

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {


        for (var i = 0; i < results.length; i++) {

            createMarker(results[i]);
        }    
        console.log("all places", allPlaces)
    }    
}    


function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });    
    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.setContent('<a href="///Users/nelsonmgengwana/projects/placeFrontend/place.html">' + place.name + '</a>');
        infoWindow.open(map, this);
    });    
    allPlaces.push(place);
}    

function placeMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: 13
    });


    var request = {
        location: center,
        radius: 8047,
        types: ['cafe']
    };
    
    var service = new google.maps.places.PlacesService(map);

    service.nearbySearch(request, callback);

}

$(document).ready(function () {
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
});

google.maps.event.addDomListener(window, 'load', initialize);
google.maps.event.addDomListener(window, 'load', placeMap);