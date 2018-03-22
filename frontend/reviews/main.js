$(document).ready(function(){
    $.ajax({
        headers: { "Accept": "application/json"},
        type: "GET",
        url: "",
        success: function() { alert("Success"); },
        error: function() { alert('Failed!'); }
    })
});