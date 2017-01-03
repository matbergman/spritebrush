$(document).ready(function(){


/* ##### Check if night mode skin is enabled */
getTheme();


/* ##### Populate instructions content ##### */

if ($(".instructions").length) {

var instructionsContent = "Tap the screen to toggle the brush. Tap &amp; hold to close and exit."

var instructionsContainer = document.getElementsByClassName("instructions_content")[0];
instructionsContainer.innerHTML = instructionsContent;

}

/* ##### Set brush size ####  */
setBrushSize();


/* ##### Reset button states when page loads (returning from Settings, Instructions, or About) ##### */


if (localStorage.maskValue == null) {$("#visualSelect_maskValue").val("mask_circle")}
else {$("#visualSelect_maskValue").val(localStorage.getItem("maskValue"))}

if (localStorage.maskName == null) {$("#button_selectMask").html("Circle")}
else {$("#button_selectMask").html(localStorage.getItem("maskName"))}


if (localStorage.fillValue == null) {$("#visualSelect_fillValue").val("color_white")}
else {$("#visualSelect_fillValue").val(localStorage.getItem("fillValue"))}

if (localStorage.fillName == null) {$("#button_selectFill").html("White")}
else {$("#button_selectFill").html(localStorage.getItem("fillName"))}


if (localStorage.strobeValue == null) {$("#visualSelect_strobeValue").val(0)}
else {$("#visualSelect_strobeValue").val(localStorage.getItem("strobeValue"))}

if (localStorage.strobeName == null) {$("#button_selectstrobe").html("No Strobe")}
else {$("#button_selectStrobe").html(localStorage.getItem("strobeName"))}


console.log($("#button_selectMask").html());


/* ##### Event handlers ##### */

$("#button_showFill").on("click", function() {
    showFill();
    $("#toggleBackground").hide();    
    return false;
    });


/* Select buttons */

$("#button_selectFill").on("click", function() {
    createSelect("fieldset_fill"); 
    return false;
    });
    
$("#button_selectMask").on("click", function() {
    createSelect("fieldset_mask"); 
    return false;
    });


$("#button_selectStrobe").on("click", function() {
    createSelect("fieldset_strobe"); 
    return false;
    });

/* Touch events */

$("#colorFrame").on("tap",function(){
    $("#theColor").toggle();
    $("#toggleBackground").toggle();
    });


$("#colorFrame").on("taphold",function(){
    returnToPage("#page_brushes","#colorFrame");
    });

});


function showMask() {
    selectedMask = $("#visualSelect_maskValue").val();
    theMask = document.getElementById("colorMask");
    theMask.className = "";

    maskBrushSize = document.getElementById("container_brushsize").className.slice(10);

    var maskWidth;

    if (selectedMask == "none" || selectedMask == "mask_fullscreen") {
        theMask.style.backgroundImage = "none";        
        maskWidth = "100%";
    } 

    else {
        theMask.style.backgroundImage = "url(../../img/"+selectedMask+".png)";
        $(theMask).addClass(selectedMask);

        if (selectedMask  == "mask_points") {
            maskWidth = "100%";
        }

        else if (selectedMask == "mask_circle" || selectedMask == "mask_square" || selectedMask == "mask_sunburst") {
            maskWidth = ($(window).height()*(maskBrushSize/100))+"px";
        }

        else if (selectedMask == "mask_point") {
            maskWidth = 20*(maskBrushSize/100)+"px";
        }
        else {
            maskWidth = "100%";
        }

    }

    $("#theColor").css("width", maskWidth);

}



function showFill() {

    $("header").hide();
    $("#page_brushes").hide();
    $("#theColor").removeClass();

    selectedColor  = $("#visualSelect_fillValue").val();
    selectedStrobe = $("#visualSelect_strobeValue").val();

    showMask();

    document.getElementById("colorStrobe").style.webkitAnimationDuration=selectedStrobe+"s";

    $("#colorFrame").show();
    $("#theColor").addClass(selectedColor);
    $("#theColor").show();

}