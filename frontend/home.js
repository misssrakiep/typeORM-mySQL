$(document).ready(function() {
    
    var placeTemp = $('.placeTemp').html();
    var placeText = Handlebars.compile(placeTemp);
    
    $.ajax({
        headers: { "Accept": "application/json"},
        type: "GET",
        url: "http://localhost:3000/api/places",
        dataType: "json",
        success: function(results){
            console.log(results);
            results.forEach(function (){
                $(".elsewhere").html(placeText({
                    results: results
                }));
            });
        }
    });

    // trigger modal
    $('.modal').modal();

    //get the users current location
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



    $("#placeAdd").click(function() {
        var type = "myPlace";
        var website = $("#website").val();
        var placeName = $("#placeName").val();

        var data = {
            placeName: placeName,
            type: type,
            website: website,
            latlng: currentLocation
        };

        $.ajax({
            type: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json"},
            url: "http://localhost:3000/api/myPlace",
            data: JSON.stringify(data),
            success: function(results){
            console.log(results);
        } 
    })    

    })
});