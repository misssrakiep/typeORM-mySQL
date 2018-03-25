var map;
var infoWindow;
var allPlaces = [];
var center = new google.maps.LatLng(0, 0);
//initialise a new google map using users current location as center pin
function initialize() {
  center = new google.maps.LatLng(-33.91901, 18.42132);
  map = new google.maps.Map(document.getElementById('map'), {
    center: center,
    zoom: 5
  });
  // var request = {
  //   location: center,
  //   radius: 8047,
  //   types: ['cafe']
  // };
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
    infoWindow.setContent(place.name);
    infoWindow.open(map, this);
  });
  google.maps.event.addListener(marker, 'click', function () {
    $('#placeDetails').html(placeDetailsText({
      image: place.photos[0].getUrl({ 'maxWidth': 200, 'maxHeight': 200 }),
      name: place.name,
      rating: place.rating,
      address: place.vicinity,
      open_hours: place.opening_hours.open_now ? "OPEN NOW" : "CLOSED",
      types: place.types[0]
    }))
    allPlaces.push(place);
  });
}
function placeMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: center,
    zoom: 10
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
    url: "http://167.99.40.78:9090/api/getReviews",
    dataType: "json",
    success: function (results) {
      console.log("This is the expected results", results);
      results.forEach(function (item, index) {
        $('.reviewDetails').html(reviewsText({
          results: results
        }));
      })
    }
  });
  let rating;
  $("#rateYo").rateYo()
    .on("rateyo.change", function (e, data) {

      rating = data.rating;
      $(this).next().text(rating);
      console.log(rating);
    });
  $('.modal').modal({
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '4%', // Starting top style attribute
    endingTop: '10%', // Ending top style attribute
  });
  $('#submitReview').click(function () {

    let user_name = $("#user_name").val();
    rating = rating;
    let review = $("#review").val();
    var reviewPost = {
      user_name: user_name,
      rating: rating,
      review: review,
    };
    console.log(reviewPost);
    // $.ajax({
    //   headers: { "Content-Type": "application/json", "Accept": "application/json" },
    //   type: "POST",
    //   url: "http://167.99.40.78:9090/api/places/"+ id + "/postReviews",
    //   data: JSON.stringify(reviewPost),
    //   success: function (results) {
    //     console.log("this is the posted data", results);
    //   }
    // });
  })
})