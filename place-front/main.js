// $(document).ready(function(){

var map;
var infowindow;
var currentLoc = [];
var nearbyLoc = {};

var nearbyTemp = $('.nearbyTemp').html();
var nearbyText = Handlebars.compile(nearbyTemp);

      function initMap() {
        var home = new google.maps.LatLng(-33.919775800,18.421124400);

        map = new google.maps.Map(document.getElementById('map'), {
          center: home,
          zoom: 15
        });

        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: home,
          radius: 200,
          type: ['restaurant']
        }, callback);
        currentLoc.push(home);
        console.log(currentLoc);
        
        console.log("---------------------------");
      }


      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
            nearbyLoc = results[i];
          }
        }
        console.log(nearbyLoc);
        
      }

      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
        
      }

// });
