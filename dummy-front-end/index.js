$(document).ready(function() {
    getLocation();
    showPosition();
//ajax call to bring all places as console.log

var placeTemp = $('.placeTemp').html();
var placeText = Handlebars.compile(placeTemp);

$.ajax({
    headers: { "Accept": "application/json"},
    type: "GET",
    url: "http://localhost:3000/api/places",
    dataType: "json",
    success: function(results){
        console.log(results);
        results.forEach(function (item, index){
            $('.placeCard').html(placeText({
                results: results
            }));
        });
    }
});
//ajax call to get all reviews as a console.log

    var reviewTemp = $('.reviewTemp').html();
    var reviewText = Handlebars.compile(reviewTemp);

$.ajax({
    headers: { "Accept": "application/json"},
    type: "GET",
    url: "http://localhost:3000/api/getReviews",
    dataType: "json",
    success: function(results){
        console.log(results);
        results.forEach(function (item, index){
            $('.reviewCard').html(reviewText({
               results: results
            }));
        })
    }
});
//ajax call to get all places via id as a console.log

let id = 14;

$.ajax({
    headers: { "Accept": "application/json"},
    type: "GET",
    url: "http://localhost:3000/api/places/" + id,
    dataType: "json",
    success: function(results){
        console.log(results);
    }
});

//////////////////////////////////////////////////
//ajax call to send reviews to db


$('#submitReview').click(function () {
    let user_name = $("#user_name").val();
    let rating = $("#rating").val();
    let review = $("#review").val();
    let pictures = $("#pictures").val();
    
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
            console.log(results);
           
        } 
        });
    })

//ajax call to send my geolocation to db





function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}
var currentLocation = [];

function showPosition(position) {
    if (position) {
        currentLocation.push(position.coords);
        console.log(position.coords.latitude, position.coords.longitude);
        
    }
}

// console.log(currentLocation);


$('#savePlace').click(function () {
    
    var placeName = $('#placeName').val();
    var type = $("#type").val();   
    var website = $("#website").val();

        var data = {
            placeName: placeName,
            type: type,
            website: website,
            latlng: "123"
        }
        
        console.log(data);
    // if(currentLocation.length > 0) {
        $.ajax({
            type: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json"},
            url: "http://localhost:3000/api/myPlace",
            data: JSON.stringify(data),
            success: function(results){
            console.log(results);
        } 
    })
    // } 
})



});