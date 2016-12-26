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
// brushsize variable set in index.js, modified in page_settings.html
var brushsize = localStorage.getItem('brushsize');
if (brushsize==null) {brushsize = defaultBrushsize}
var brushsizeClassname = "brushsize_"+brushsize;
$("#container_brushsize").removeClass().addClass(brushsizeClassname);


/* ##### Event handlers ##### */

$("#button_showColor").on("click", function() {
    showColor();
    $("#toggleBackground").hide();    
    return false;
    });


/* Select buttons */

$("#button_selectColor").on("click", function() {
    createSelect("fieldset_color"); 
    return false;
    });
    
$("#button_selectMask").on("click", function() {
    createSelect("fieldset_colorMask"); 
    return false;
    });


$("#button_selectStrobe").on("click", function() {
    createSelect("fieldset_colorStrobe"); 
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

    maskBrushSize = document.getElementById("container_brushsize").className.slice(10);

    var maskWidth;

    if (selectedMask == "none" || selectedMask == "mask_fullscreen") {
        theMask.style.backgroundImage = "none";        
        maskWidth = "maskBrushSize+"%"";
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



function showColor() {

    $("header").hide();
    $("#page_brushes").hide();
    $("#theColor").removeClass();

    selectedColor  = $("#visualSelect_colorValue").val();
    selectedStrobe = $("#visualSelect_strobeValue").val();

    showMask();

    document.getElementById("colorStrobe").style.webkitAnimationDuration=selectedStrobe;

    $("#colorFrame").show();
    $("#theColor").addClass(selectedColor);
    $("#theColor").show();

}