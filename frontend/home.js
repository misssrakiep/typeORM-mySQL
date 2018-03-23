const API_URL = "http://localhost:9090";

$(document).ready(function () {
    $('.modal').modal();

    $(document).ready(function(){
        $('.tooltipped').tooltip();
      });
      
    function initMap() {
        var mapProp = {
            center: new google.maps.LatLng(51.508742, -0.120850),
            zoom: 5,
        };
        var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    }

    var currentLocationTemp = $(".currentLocationTemp").html();
    var currentLocationText = Handlebars.compile(currentLocationTemp);


    var myPlacesTemp = $(".myPlacesTemp").html();
    var placesText = Handlebars.compile(myPlacesTemp);

    var currentLocation = {};
    var myPlace = {};
    $("#findLoc").click(function () {
        document.querySelector(".indeterminate").style.display = "block";
        getLocation();
        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (pos) {
                    if (pos) {
                        console.log(currentLocation);
                        currentLocation.lat = pos.coords.latitude;
                        currentLocation.lng = pos.coords.longitude;
                        document.querySelector(".indeterminate").style.display = "none";
                        console.log(pos.coords);
                        geocoder = new google.maps.Geocoder();
                        var latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                            if (status == google.maps.GeocoderStatus.OK) {

                                var result = results[0];

                                    myPlace.address = result.formatted_address;
                                    myPlace.type = result.types;
                                    myPlace.lat = currentLocation.lat;
                                    myPlace.lng = currentLocation.lng;
                                    myPlace.place_id = result.place_id;

                                console.log(myPlace);

                                // $.ajax({
                                //     headers: { "Content-Type": "application/json" },
                                //     type: "POST",
                                //     url: API_URL + "/api/myPlace",
                                //     dataType: "json",
                                //     data: JSON.stringify(myPlace),
                                //     success: function (results) {
                                //         console.log("call made: ", results);
                                //     }
                                // })

                                $(".myLocation").html(currentLocationText({
                                    address: myPlace.address,
                                    type: myPlace.type,
                                    place_id: myPlace.place_id
                                }));
                            }

                        })
                    }

                })
            }
        }
    });


    $("#placeAdd").click(function () {
        var placeName = $("#placeName").val();
        myPlace.placeName = placeName; 
        console.log(myPlace);
         
        if (placeName.length>0){
          $.ajax({
              headers: { "Content-Type" : "application/json" },
              type: "POST",
              url: API_URL + "/api/myPlace",
              dataType: "json",
              data: JSON.stringify(myPlace),
              success: function (results) {
                  console.log("call made: ", results);
                  location.reload();
              }
          })
        }

    });


    var otherPlaces = [];

    $.ajax({
        headers: { "Accept": "application/json" },
        type: "GET",
        url: API_URL + "/api/places",
        dataType: "json",
        success: function (results) {
            console.log(results);
            otherPlaces.push(results);
            $(".myPlaces").html(placesText({
                results: results
            }))
        }
    });
    console.log(otherPlaces);



    /////////////////////////////////



})
