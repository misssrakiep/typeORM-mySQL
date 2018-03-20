var count = 0;
var image = [];
function () {
    if (window.File && window.FileList && window.FileReader) {
        $("#files").on("change", function (e) {

            var files = e.target.files,
                filesLength = files.length;
            console.log("THIS IS THE FILE LENGTH", filesLength);
            count++;
            for (var i = 0; i < filesLength; i++) {
                var f = files[i]
                var fileReader = new FileReader();
                fileReader.onload = (function (e) {
                    var file = e.target;
                    $("<span class=\"pip\">" +
                        "<img class=\"imageThumb\" src=\"" + e.target.result + "\" title=\"" + file.name + "\"/>" +
                        "<br/><span class=\"removeImg\">Remove image</span>" +
                        "</span>").insertAfter("#files");
                    $(".submitBtn").click(function () {
                        image.push(e.target)
                    });
                    $(".removeImg").click(function () {
                        $(this).parent(".pip").remove();
                    });
                    console.log(image)
                });
                fileReader.readAsDataURL(f);
            }
        });
    } else {
        alert("Your browser doesn't support to File API")
    }
});