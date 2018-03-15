$(document).ready(function(){
  
    var map;
    function createMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -33.918861, lng: 18.423300},
        zoom: 11.5
      });
    }
    createMap();
});
