var map;
var infowindow;
var currentLoc = [];
var nearbyLoc = [];

var nearbyTemp = $('.nearbyTemp').html();
var nearbyText = Handlebars.compile(nearbyTemp);

var currentTemp = $('.currentTemp').html();
var currentText = Handlebars.compile(currentTemp);

var arr=[
  {key1:'value1', open:{
    now: false
  }},
  {key2:'value2'}
];
console.log(arr[0].open.now);

      function initMap() {
        var home = new google.maps.LatLng(-33.919815,18.421095);

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
          currentLoc: currentLoc
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

        var getRating = $(function (rate) {
          nearbyLoc.forEach(rating => {
            $("#rateYo").rateYo({
              rating: nearbyLoc.rating,
              readOnly: true,
              starWidth: "24px"
            });
            var rate = document.createElement('div').setAttribute('id', 'rateYo');
          })
        });
          
        console.log(nearbyLoc); 
        console.log(nearbyLoc[3].opening_hours.open_now);
        
        $('.collection').html(nearbyText({
          nearbyLoc: nearbyLoc,
          ratings: getRating
        }))
                
      }

      function createMarker(place) {
        // var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: new google.maps.LatLng(-33.919815,18.421095)
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent("I/O Digital");
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
