var map;
var infowindow;
var currentLoc = [];
var nearbyLoc = [];


$("#back_home").click(function(){
  document.getElementById("home-page").style.display = "block";
  document.querySelector(".places-page").style.display = "none";
  currentLoc = [];
});


var nearbyTemp = $('.nearbyTemp').html();
var nearbyText = Handlebars.compile(nearbyTemp);

// var currentTemp = $(".currentTemp").html();
// var currentText = Handlebars.compile(currentTemp);
var placeDetails = {};

var placeLocation = {};
$(".myPlaces").click(function (event) {
  console.log("click");

  var id = event.target.value;
  $.ajax({
    headers: { "Accept": "application/json" },
    type: "GET",
    url: API_URL + "/api/places/" + id,
    dataType: "json",
    success: function (results) {
      console.log("one", results);
      placeDetails.lat = results.lat;
      placeDetails.lng = results.lng;
      placeDetails.placeName = results.placeName;
      placeDetails.address = results.address;
      placeDetails.place_id = results.place_id;
      console.log(placeDetails.lat, placeDetails.lng);
      document.getElementById("home-page").style.display = "none";
      document.querySelector(".places-page").style.display = "block";
      currentLoc.push({
        name: placeDetails.placeName,
        address: placeDetails.address
      });
      initMap();


      function initMap() {
        var home = new google.maps.LatLng(placeDetails.lat, placeDetails.lng);

        map = new google.maps.Map(document.getElementById('map'), {
          center: home,
          zoom: 15
        });
        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: home,
          radius: 400,
          type: ['restaurant']
        }, callback);



        console.log(currentLoc);

        // $(".currentLoc").html(currentText({
        //   currentLoc: currentLoc
        // }))
        console.log(currentLoc);

      }

    }
  });
})


function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
      nearbyLoc.push(results[i]);
    }
  }

  var getRating = $(function (rate) {
    nearbyLoc.forEach((item, index) => {
      $("#rateYo" + index).rateYo({
        rating: item.rating,
        readOnly: true,
        starWidth: "24px"
      });
      // var rate = document.createElement('div').setAttribute('id', 'rateYo' + index);
      // rateThis.push(rate)
    })
  });


  // nearbyLoc.forEach(opening_hours => {
  //   console.log(opening_hours.opening_hours);
  // });



  console.log(nearbyLoc);

  $('#collection').html(nearbyText({
    nearbyLoc: nearbyLoc,
    ratings: getRating
  }))

}

function createMarker(place) {
  // var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: new google.maps.LatLng(-33.919815, 18.421095),
    animation: google.maps.Animation.DROP
  });

  var contentString = '<div class="placeContent">' +
                      '<strong><p align="center">' + currentLoc[0].name + '<br>' + currentLoc[0].address +
                      '</p></strong>' + '</div>';

    

  google.maps.event.addListener(marker, 'click', function () {
    infowindow.setContent(contentString);
    infowindow.open(map, this);
  });

}

$(document).ready(function () {

  // $.ajax({
  //   headers: { "Accept": "application/json" },
  //   type: "GET",
  //   url: "http://localhost:9090/api/myPlace",
  //   dataType: "json",
  //   success: function (results) {
  //     console.log("------------");

  //     console.log(results);
  //     console.log("---------------");

  //     results.forEach(function (item, index) {
  //         results: results
  //     })
  //   }
  // });



  // $.ajax({
  //   headers: { "Accept": "application/json" },
  //   type: "GET",
  //   url: "http://localhost:9090/api/places",
  //   dataType: "json",
  //   success: function (results) {
  //     console.log("-----------------");

  //     console.log(results);
  //     console.log("-----------------");

  //     results.forEach(function (item, index) {
  //       $('.collection').html(nearbyText({
  //         results: results
  //       }));
  //     })
  //   }
  // });

  Handlebars.registerHelper('placeRating', function (index) {
    return "rateYo" + index;
  });

});