var map;
var infoWindow;
var allPlaces = [];
var request;
var service;
var markers = [];
function initialize() {
    var center = new google.maps.LatLng(-33.9152208, 18.3758741);
    map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: 13
    });


    request = {
        location: center,
        radius: 8047,
        types: ['cafe']
    };
    infoWindow = new google.maps.InfoWindow();

    service = new google.maps.places.PlacesService(map);

    service.nearbySearch(request, callback);

    google.maps.event.addListener(map, 'rightclick', function(event){
        map.setCenter(event.latLng)
        clearResults(markers)

        var request = {
            location: event.latLng,
            radius: 8047,
            types: ['cafe']
        };
        service.nearbySearch(request, callback);
    })

}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {


        for (var i = 0; i < results.length; i++) {

            markers.push(createMarker(results[i]));
        }
    }
}


function createMarker(place) {
    var placeLoc = place.geometry.location;
    marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });
    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.setContent('<a data-target="modal1" class="btn modal-trigger">' + place.name + '</a>');
        infoWindow.open(map, this);
    });
    return marker;
    allPlaces.push(place);
}
function clearResults(markers){
    for (var m in markers) {
        markers[m].setMap(null)
    }
    markers = [];
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

$(document).ready(function () {
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
});

google.maps.event.addDomListener(window, 'load', initialize);
