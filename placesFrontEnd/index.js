$(document).ready(function () {
    console.log("document ready!");

var placesOfInterestInCapeTown = [];

    $.ajax({
        headers: { "Accept": "application/json"},
        type: "GET",
        url: "https://maps.googleapis.com/maps/api/place/textsearch/json?query=places+of+interest+in+cape+town&key=AIzaSyDNBloeVzWiyChfX8se8hcIcpnmtDPkGY4",
        dataType: "json",
        success: function (err, result) {
            if (err) {
                console.log("Failed To Make Call");
            }
            if (result) {
                console.log(result);
                placesOfInterestInCapeTown.push({
                   placeName: result.results.name,
                   address_components: result.results.formatted_address,
                   lat: result.results.geometry.location.lat,
                   lng: result.results.geometry.location.lng,
                   review: "none",
                   rating: 0,
                   type: "place_of_interest",
                   website: "none"
                }) 
            }
        }
    });

    // $.ajax({
    //     headers: { "Accept": "application/json"},
    //     type: "POST",
    //     url: "http://localhost:4000/api//api/allEntries",
    //     dataType: "json",
    //     success: function (err, result) {
    //         if (err) {
    //             console.log(err);
    //         }
    //         if (result) {
                
    //         }
    //     }
    // })    
});