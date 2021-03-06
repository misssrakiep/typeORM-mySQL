var map;
var placeMap;
var infowindow;
var currentLoc = [];
var nearbyLoc = [];
var placeDetailElement = [];


$("#back_home").click(function () {
  document.getElementById("home-page").style.display = "block";
  document.querySelector(".places-page").style.display = "none";
  document.getElementById("placePage").style.display = "none";
});


//shameera
//finding current location to go to nearby places
var currentLocation = {};
var myPlace = {};
$("#findLoc").click(function () {
  currentLoc = {};
  document.querySelector("#preloader").style.display = "block";
  getLocation();
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (pos) {
        if (pos) {
          document.querySelector(".success").style.display = "block";
          console.log(currentLocation);
          currentLocation.lat = pos.coords.latitude;
          currentLocation.lng = pos.coords.longitude;
          document.querySelector("#preloader").style.display = "none";
          console.log(pos.coords);
          geocoder = new google.maps.Geocoder();
          var latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
          geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {

              var result = results[0];

              myPlace.address = result.formatted_address;
              myPlace.type = result.types;
              myPlace.lat = currentLocation.lat;
              myPlace.lng = currentLocation.lng;
              myPlace.place_id = result.place_id;

              console.log(myPlace);
              document.getElementById("nearestPlaces").style.display = "block";
            }

          })
        }

      })
    }
  }
});



var nearbyTemp = $('.nearbyTemp').html();
var nearbyText = Handlebars.compile(nearbyTemp);


var placeDetails = {};

var placeForReview

function getPlace(id) {

  if (id) {
    $.ajax({
      headers: {
        "Accept": "application/json"
      },
      type: "GET",
      url: API_URL + "/api/places",
      dataType: "json",
      success: function (results) {
        let ins = false

        for (let i = 0; i < results.length; i++) {
          const element = results[i];
          if (id === element.place_id) {
            ins = false;
            // console.log("hkjghadjkbkhb",element.place_id);
          } else {
            ins = true;
            // console.log("there is nothing");
          }
        }
        if (ins) {
          const result = nearbyLoc.filter(item => item.place_id === id);
          const placeItem = result[0]
          const lat = placeItem.geometry.location.lat();
          const lng = placeItem.geometry.location.lng()
          console.log(lat, lng);

          var resultData = {
            placeName: placeItem.name,
            address: placeItem.vicinity,
            type: result.types,
            lat: lat,
            lng: lng,
            place_id: placeItem.place_id
          }
          console.log("This is the result:", result);
          $.ajax({
            headers: {
              "Content-Type": "application/json"
            },
            type: "POST",
            url: API_URL + "/api/myPlace",
            dataType: "json",
            data: JSON.stringify(resultData),
            success: function (results) {
              console.log("call made: ", results);
              // location.reload();
              placeForReview = results;
              console.log(placeForReview)

              if (placeForReview) {
                console.log("THIS LOGIC IS HAPPENING");

                document.getElementById("home-page").style.display = "none";
                document.querySelector(".places-page").style.display = "none";
                document.getElementById("placePage").style.display = "block";
              }

            }
          })

        } else {
          //nearbyLoc is an array. filter and get correct element
          const reviewResult = nearbyLoc.filter(item => item.place_id === id);
          const placeRevItem = reviewResult[0]
          placeForReview = placeRevItem
          console.log("THIS IS PLACE FOR REVIEW", placeForReview);

          if (placeForReview) {
            console.log("THIS LOGIC IS HAPPENING");

            document.getElementById("home-page").style.display = "none";
            document.querySelector(".places-page").style.display = "none";
            document.getElementById("placePage").style.display = "block";
            initialize()
            makeMarker(placeForReview)

          }
        }
      }
    });
  }
}

function initialize() {
  var lat = 0
  var lng = 0
  if (placeForReview && placeForReview.geometry && placeForReview.geometry.location) {
    lat = placeForReview.geometry.location.lat()
    lng = placeForReview.geometry.location.lng()
  }

  center = new google.maps.LatLng(lat, lng);
  map = new google.maps.Map(document.getElementById('placeMap'), {
    center: center,
    zoom: 15
  });

  // infoWindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);


}



function makeMarker(place) {
  // var placeLoc = place.geometry.location;
  var lat = 0
  var lng = 0
  if (placeForReview && placeForReview.geometry && placeForReview.geometry.location) {
    lat = placeForReview.geometry.location.lat()
    lng = placeForReview.geometry.location.lng()
  }
  var marker = new google.maps.Marker({
    map: map,
    position: new google.maps.LatLng(lat, lng),
    animation: google.maps.Animation.DROP
  });
}

//shameera
//takes current location to pinpoint on map
//going to nearby places
//button on initial screen
$("#nearestPlaces").click(function () {
  document.getElementById("home-page").style.display = "none";
  document.querySelector(".places-page").style.display = "block";
  initMap();


  function initMap() {
    var home = new google.maps.LatLng(myPlace.lat, myPlace.lng);

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

    var input = document.getElementById('searchPlace');
    var searchBox = new google.maps.places.SearchBox(input);

    searchBox.addListener('places_changed', function () {
      var places = searchBox.getPlaces();
      if (places.length == 0) {
        return;
      }
      markers.forEach(function (marker) {
      });
    });

  }
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
    '<strong><p align="center">' + myPlace.address +
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