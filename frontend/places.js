var map;
var infoWindow;
var allPlaces = [];
function initialize() {
    var center = new google.maps.LatLng(-33.9152208, 18.3758741);
    map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: 13
    });


    var request = {
        location: center,
        radius: 8047,
        types: ['cafe']
    };
    infoWindow = new google.maps.InfoWindow();

    var service = new google.maps.places.PlacesService(map);

    service.nearbySearch(request, callback);

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






// var getOnePLace = function () {
//     var searchPlace = document.getElementById('search').value;
//     console.log("THIS IS THE INPUT VALUE", searchPlace)
//     var onePlace = [];
//     if (searchPlace.trim().length > 0) {
//         allPlaces.forEach(
//             function (item) {
//                 if (item.name.toLowerCase() === searchPlace.toLowerCase().trim()) {
//                     onePlace.push(item);
//                     console.log("this is the item to be pushed to array", item)

//                 }
//             });
//     }
//     return onePlace;
//     console.log("THIS IS THE ONE PLACE TO BE RETURNED WHE SEARCHED", onePLace)

    
// };

function placeMap() {
    var center = new google.maps.LatLng(-33.9152208, 18.3758741);
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