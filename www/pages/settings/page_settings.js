$(document).ready(function(){

/* ##### Check if night mode skin is enabled */
getTheme();

if (localStorage.brushsize == 0) {brushsize = defaultBrushsize;}
else {brushsize = localStorage.brushsize;}
document.getElementById("button_selectBrushsize").innerHTML = brushsize+"%";


/* Select buttons */

$("#button_selectBrushsize").on("click", function() {

    createSelect("fieldset_brushsize"); 
    return false;

    });


/* Save the selected brush size to local storage for use on all pages */
$(".selectButton").on("click",function() {
    localStorage.brushsize = this.value;
	});



});