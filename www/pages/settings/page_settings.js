$(document).ready(function(){

/* ##### Check if night mode skin is enabled */
getTheme();


/* Select buttons */

$(".selectButton").on("click", function() {
	console.log(this.value);
	window.history.back();
    });



/* ##### Screen size buttons */

createSelect("fieldset_screensize"); 

/*
var selectedScreensize  = $("#visualSelect_screensizeValue").val();


if (selectedScreensize == 100) {console.log("+++100")}
else if (selectedScreensize == 80) {console.log("+++80")}
else if (selectedScreensize == 50) {console.log("+++50")}
else if (selectedScreensize == 20) {console.log("+++20")}
else {console.log("+++none")}


console.log(selectedScreensize);
*/


});