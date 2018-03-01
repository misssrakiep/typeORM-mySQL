$(document).ready(function(){
    
    $.ajax({
        headers: { "Accept": "application/json"},
            type: "GET",
            url: "",
            dataType: "json",
            success: function(res, err){
                if(err){
                    console.log("Failed To Make Call"); 
                    alert("Failed To Make Call")               
                } else if (res){
                    console.log("Ajax Call Successful");
                    alert("Ajax Call Successful")
                }
            }    
        });

});