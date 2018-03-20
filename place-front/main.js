var map;
var infowindow;
var currentLoc = [];
var nearbyLoc = [];

var nearbyTemp = $('.nearbyTemp').html();
var nearbyText = Handlebars.compile(nearbyTemp);

var currentTemp = $('.currentTemp').html();
var currentText = Handlebars.compile(currentTemp);

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
        currentLoc.push({
          name: 'I/O Digital',
          address: '31 Loop Street, City Centre, Cape Town, 8001'
        });
        console.log(currentLoc);

        $('.currentLoc').html(currentText({
          currentLoc: currentLoc[0]
        }))
        
        console.log("---------------------------");
      }

      
      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
            nearbyLoc.push(results[i]);
          }
        }

        var getRating = $(function () {
          nearbyLoc.forEach(rating => {
            $("#rateYo").rateYo({
              rating: nearbyLoc.rating,
              readOnly: true
            });
          })
        });
          
        console.log(nearbyLoc); 
        $('.collection').html(nearbyText({
          nearbyLoc: nearbyLoc,
          ratings: getRating
        }))
                
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
$(document).ready(function(){

    // $.ajax({
    //   headers: { "Accept": "application/json" },
    //   type: "GET",
    //   url: "http://localhost:3000/api/myPlace",
    //   dataType: "json",
    //   success: function (results) {
    //     console.log(results);
    //     results.forEach(function (item, index) {
    //         results: results
    //     })
    //   }
    // });



    // $.ajax({
    //   headers: { "Accept": "application/json" },
    //   type: "GET",
    //   url: "http://localhost:3000/api/places",
    //   dataType: "json",
    //   success: function (results) {
    //     console.log(results);
    //     results.forEach(function (item, index) {
    //       $('.collection').html(nearbyText({
    //         results: results
    //       }));
    //     })
    //   }
    // });

});
