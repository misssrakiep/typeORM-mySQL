var places = {
  name: "Urban Chic Boutique Hotel",
  rating: "3.6",
  address: "172 Long Street, Corner of Long street & Pepper street, Cape Town",
  image: "http://urbanchic.co.za/wp-content/uploads/Urban-Chic-Hotel-Slide-04.jpg",
  website: "http://urbanchic.co.za/"
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

$(document).ready(function () {
  $('#placeDetails').html(placeDetailsText({
    name: "Urban Chic Boutique Hotel",
    rating: "3.6",
    address: "172 Long Street, Corner of Long street & Pepper street, Cape Town",
    image: "http://urbanchic.co.za/wp-content/uploads/Urban-Chic-Hotel-Slide-04.jpg",
    website: "http://urbanchic.co.za/"
  }))

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
    dismissible: true, 
    opacity: .5,
    inDuration: 300, 
    outDuration: 200,
    startingTop: '4%', 
    endingTop: '10%',
  }
  );
  $(function () {
    let rating;
    $("#rateYo").rateYo()
        .on("rateyo.change", function (e, data) {

            rating = data.rating;
            $(this).next().text(rating);
            console.log(rating);
        });
});

$('.submitReview').click(function () {
  let user_name = $(".user_name").val();
  let rating = $(".rating").val();
  let review = $(".review").val();
  let pictures = $(".pictures").val();
  
  var reviewPost = {
      user_name: user_name,
      rating: rating,
      review: review,
      pictures: pictures
  };
  
  $.ajax({
      headers: { "Content-Type": "application/json", "Accept": "application/json"},
      type: "POST",
      url: "http://localhost:3000/api/reviews",
      data: JSON.stringify(reviewPost),
      success: function(results){
          console.log("This is the data being sent", results);

      } 
      });
  })
})