
$(document).ready(function () {
    $('.modal').modal();

    $('.tooltipped').tooltip();

    $("#homeBtn").click(function() {
        document.getElementById("home-page").style.display = "block";
        document.querySelector(".places-page").style.display = "none";
        document.getElementById("placePage").style.display = "none";
    })
    function initMap() {
        var mapProp = {
            center: new google.maps.LatLng(51.508742, -0.120850),
            zoom: 5,
        };
        var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    }
})
