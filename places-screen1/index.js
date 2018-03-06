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
