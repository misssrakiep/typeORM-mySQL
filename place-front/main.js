$(document).ready(function(){
function createMap() {
    var mapProp= {
        center:new google.maps.LatLng(-34.000836,18.459778),
        zoom:11,
    };
    var map=new google.maps.Map(document.getElementById("map"),mapProp);
    }
    createMap();
});
