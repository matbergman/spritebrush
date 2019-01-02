$(document).ready(function(){

/* ##### Check if night mode skin is enabled */
getTheme();


/* ##### Populate instructions content ##### */

if ($(".instructions").length) {

var instructionsContent = "Tap the screen to toggle the stencil. Tap &amp; hold to close and exit."

var instructionsContainer = document.getElementsByClassName("instructions_content")[0];
instructionsContainer.innerHTML = instructionsContent;

}

/* ##### Set brush size ####  */
setBrushSize();


/* ##### Event handlers ##### */
$("#button_showStencil").on("click", function() {
    showStencil();
    $("#toggleBackground").hide();    
    return false;
    });



/* Select buttons */

$("#button_selectStencil").on("click", function() {
    createSelect("fieldset_stencil"); 
    return false;
    });

$("#button_selectStencilSpeed").on("click", function() {
    createSelect("fieldset_stencilSpeed"); 
    return false;
    });

/* Touch events */

$("#stencilFrame").on("tap",function(){
    $("#stencil").toggle();
    togglePauseScreen();   
    });


$("#stencilFrame").on("taphold",function(){
    $("#toggleBackground").hide();
    $("#stencil").hide();        
    returnToPage("#page_stencils","#stencilFrame");
    });

});
                


function showStencil() {
    
    var selectedStencil = $("#button_selectStencil").attr("class");
    var selectedStencilSpeed = $("#visualSelect_stencilSpeedValue").val();
    var theStencil = document.getElementById("stencil");

    document.getElementById("stencil").style['-webkit-animation-duration'] = selectedStencilSpeed;
    theStencil.className = selectedStencil;

    $("header").hide();
    $("#page_stencils").hide();
    $("#stencilFrame").show();
    $("#stencil").show();


}



