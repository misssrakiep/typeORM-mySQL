$(document).ready(function() {
    
    var placeTemp = $('.placeTemp').html();
    var placeText = Handlebars.compile(placeTemp);
    var myPlaces = [];
    var home = [];

 
    $("#homeAdd").click(function() {
        document.querySelector('#loader').style.display = "block";
        getLocation();
        showPosition();
        
        var website = $("#website").val();
        var placeName = $("#placeName").val();
        
        var data = {
            placeName: placeName,
            type: "home",
            website: website,
            latlng: currentLocation
        };
        
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
                currentLocation.push(position.coords.latitude, position.coords.longitude);
                console.log(currentLocation);        
                document.querySelector('#loader').style.display = "none";
                $.ajax({
                    type: "POST",
                    headers: { "Content-Type": "application/json", "Accept": "application/json"},
                    url: "http://localhost:3000/api/myPlace",
                    data: JSON.stringify(data),
                    success: function(results){
                    console.log(results);
                    location.reload();
                } 
            })    
            }
        }
    })

    var homeTemp = $('.homeTemp').html();
    var homeText = Handlebars.compile(homeTemp);

    //find my home in the database 
    $.ajax({
        headers: { "Accept": "application/json"},
        type: "GET",
        url: "http://localhost:3000/api/places",
        dataType: "json",
        success: function(results){
            if (home.length === 0){
                document.getElementById('homeAdd').style.display = "block";
                document.getElementById('homeless').style.display = "block";
                
            }
            for(var i=0; i<results.length; i++){
                if (results[i].type === "home"){
                    document.getElementById('homeAdd').style.display = "none";  
                    document.getElementById('homeless').style.display = "none";                      
                home.push(results[i]);  
                console.log(home)              
                $("#homeDetails").html(homeText({
                    results: home
                }));  
            }
            }
        }
    });


    //find all my places in the database
    $.ajax({
        headers: { "Accept": "application/json"},
        type: "GET",
        url: "http://localhost:3000/api/places",
        dataType: "json",
        success: function(results){
            for(var i=0; i<results.length; i++){
                if (results[i].type === "myPlace"){
                myPlaces.push(results[i]);                
                $(".elsewhere").html(placeText({
                    results: myPlaces
                }));  
                }
            }
        }
    });

    
    
    
    
    
    // trigger modal
    $('.modal').modal();
    $("#placeAdd").click(function() {
        document.querySelector('.indeterminate').style.display = "block";
        getLocation();
        showPosition();
        
        var website = $("#website").val();
        var placeName = $("#placeName").val();
        
        var data = {
            placeName: placeName,
            type: "myPlace",
            website: website,
            latlng: currentLocation
        };
        
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
                home.push(position);
                console.log(position.coords.latitude, position.coords.longitude);        
                document.querySelector('#loader').style.display = "none";
                $.ajax({
                    type: "POST",
                    headers: { "Content-Type": "application/json", "Accept": "application/json"},
                    url: "http://localhost:3000/api/myPlace",
                    data: JSON.stringify(data),
                    success: function(results){
                    console.log(results);
                    location.reload();
                } 
            })    
            }
        }


    })
});