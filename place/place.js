var places = {
  name : "Urban Chic Boutique Hotel",
  rating : "3.6",
  address : "172 Long Street, Corner of Long street & Pepper street, Cape Town",
  image : "http://urbanchic.co.za/wp-content/uploads/Urban-Chic-Hotel-Slide-04.jpg",
  website : "http://urbanchic.co.za/"
};
var reviews = {

};
 var map;
  function initialize() {
   var center = new google.maps.LatLng(37.422, -122.084058);
   map = new google.maps.Map(document.getElementById('map'), {
     center: center,
     zoom: 13
   });
  }

  google.maps.event.addDomListener(window, 'load', initialize);

var placeDetailsTemp = $('.placeDetailsTemp').html();
var placeDetailsText = Handlebars.compile(placeDetailsTemp);

$(document).ready(function() {
  $('#placeDetails').html(placeDetailsText({
    name : "Urban Chic Boutique Hotel",
    rating : "3.6",
    address : "172 Long Street, Corner of Long street & Pepper street, Cape Town",
    image : "http://urbanchic.co.za/wp-content/uploads/Urban-Chic-Hotel-Slide-04.jpg",
    website : "http://urbanchic.co.za/"
  }))

  var reviewsTemp = $('.reviewsTemp').html();
  var reviewsText = Handlebars.compile(reviewsTemp);

  $.ajax({
    headers: { "Accept": "application/json"},
    type: "GET",
    url: "http://localhost:3000/api/getReviews",
    dataType: "json",
    success: function(results){
        console.log(results);
        results.forEach(function (item, index){
            $('.reviewDetails').html(reviewsText({
               results: results
            }));
        })
    }
});

})