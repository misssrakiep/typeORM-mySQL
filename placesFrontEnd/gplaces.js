$(document).ready(function () {
    $.ajax({
        headers: { "Accept": "application/json"},
        type: "GET",
        url: "https://maps.googleapis.com/maps/api/place/textsearch/json?query=places+of+interest+in+cape+town&key=AIzaSyDNBloeVzWiyChfX8se8hcIcpnmtDPkGY4",
        dataType: "json",
        success: function (err, result) {
            if (err) {
                console.log("Call did not happen");
            }
            else {
                console.log('THIS IS THE DATA FROM THE API', result)
            }
        }
    });
});