var place_name = document.getElementById("place_name");
var review = document.getElementById("review");
var rating = document.getElementById("rating");
var type = document.getElementById("type");
var website = document.getElementById("website");

var submit = document.getElementById("submit");

submit.addEventListener("click", function(err, results) {
        $.ajax({
            headers: {"Accept" : "Application/json"},
            url: "http://localhost:4000/api/postEntry",
            type: "POST",
            dataType: "json",
            data: {
                placeName: place_name.value,
                review: review.value,
                rating: rating.value,
                type: type.value,
                website: website.value
            },
            success: function(err, results){
                if (err) {
                    console.log(err);  
                }
                if (results) {
                    console.log("Sent to db");
                }
            }
        });
})


var nearestPlaces = $('#nearestPlaces').html();
var placesTemp = Handlebars.compile(nearestPlaces);

$.ajax({
    headers: {"Accept" : "Application/json"},
    url: "http://localhost:4000/api/allEntries",
    type: "GET",
    dataType: "json",
    success: function(err, results){
        if (err) {
            console.log(err);  
        }
        if (results) {

                $('.placeCard').html(nearestPlaces({place_name: results.place_name,
                review: results.review,
                rating: results.rating,
                type: results.type,
                website: results.website}))
            },
        }
    }
});

// var sendReview = document.getElementById("sendReview");

// sendReview.addEventListener("click", function(err, results) {
//         $.ajax({
//             headers: {"Accept" : "Application/json"},
//             url: "http://localhost:4000/api/postReviews",
//             type: "POST",
//             dataType: "json",
//             data: {
//                 user_name: user_name.value,
//                 rating: myRating.value,
//                 review: myReview.value,
//                 pictures: pictures.value
//             },
//             success: function(err, results){
//                 if (err) {
//                     console.log(err);  
//                 }
//                 if (results) {
//                     console.log("Sent to db");
//                 }
//             }
//         });
// })
