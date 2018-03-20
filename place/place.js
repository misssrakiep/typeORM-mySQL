var places = {
  name: "Urban Chic Boutique Hotel",
  rating: "3.6",
  address: "172 Long Street, Corner of Long street & Pepper street, Cape Town",
  image: "http://urbanchic.co.za/wp-content/uploads/Urban-Chic-Hotel-Slide-04.jpg",
  website: "http://urbanchic.co.za/"
};
var map;
var infoWindow;
var allPlaces = [];
var currentlocation = [];
var center = new google.maps.LatLng(0, 0);
//initialise a new google map using users current location as center pin
function initialize() {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position.coords.toString())
      center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: 11
      });
      var request = {
        location: center,
        radius: 8047,
        types: ['cafe']
      };
      infoWindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, callback);
    }, function (failure) {
      if (failure.message.indexOf("Only secure origins are allowed") == 0) {
        // Secure Origin issue.
        console.log(failure);
      }
    })
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
    infoWindow.setContent(place.name);
    infoWindow.open(map, this);
  });
  google.maps.event.addListener(marker, 'click', function () {
    $('#placeDetails').html(placeDetailsText({
      name: place.name,
      rating: place.rating,
      address: place.vicinity,
      open_hours: place.opening_hours,
      website: place.website,
      types: place.types[0]
    }))
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
function myFunction() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}


google.maps.event.addDomListener(window, 'load', initialize);
google.maps.event.addDomListener(window, 'load', placeMap);

var placeDetailsTemp = $('.placeDetailsTemp').html();
var placeDetailsText = Handlebars.compile(placeDetailsTemp);

$(document).ready(function () {
  
  var reviewsTemp = $('.reviewsTemp').html();
  var reviewsText = Handlebars.compile(reviewsTemp);

  $.ajax({
    headers: { "Accept": "application/json" },
    type: "GET",
    url: "http://localhost:3000/api/getReviews",
    dataType: "json",
    success: function (results) {
      console.log(results);
      results.forEach(function (item, index) {
        $('.reviewDetails').html(reviewsText({
          results: results
        }));
      })
    }
  });
  $('.modal').modal({
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '4%', // Starting top style attribute
    endingTop: '10%', // Ending top style attribute
  }
  );
  $(function () {
    let rating;
    $(".rateYo").rateYo()
      .on("rateyo.change", function (e, data) {

        rating = data.rating;
        $(this).next().text(rating);
        console.log(rating);
      });
  });

  $('#submitReview').click(function () {

    let user_name = $(".user_name").val();
    let rating = $(".rating").val();
    let review = $(".review").val();
    let pictures = $(".pictures")[0].files[0];

    if (pictures) {
      var reader = new FileReader();
      reader.readAsDataURL(pictures);
      reader.onload = function (e) {
        // browser completed reading file - display it
        alert(e.target.result);
        var reviewPost = {
          user_name: user_name,
          rating: rating,
          review: review,
          pictures: e.target.result
        };

        $.ajax({
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          type: "POST",
          url: "http://localhost:3000/api/reviews",
          data: JSON.stringify(reviewPost),
          success: function (results) {
            console.log(results);

          }
        });
      };
    }


    console.log('this is the picture value', pictures)

  })
})