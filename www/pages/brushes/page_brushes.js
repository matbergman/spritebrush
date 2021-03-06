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

$("#visualSelect_maskValue").val("mask_circle")
$("#visualSelect_fillValue").val("color_white")
$("#visualSelect_strobeValue").val(0)


/* ##### Preload mask images ##### */

mask1 = new Image();
mask2 = new Image();
mask3 = new Image();
mask4 = new Image();
mask5 = new Image();
mask6 = new Image();
mask7 = new Image();
mask8 = new Image();

mask1.src = "/img/mask_bar.svg";
mask2.src = "/img/mask_circle.svg";
mask3.src = "/img/mask_line.svg";
mask4.src = "/img/mask_line-small.svg";
mask5.src = "/img/mask_point.svg";
mask6.src = "/img/mask_points.svg";
mask7.src = "/img/mask_square.svg";
mask8.src = "/img/mask_sunburst.svg";



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
    togglePauseScreen();
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
        theMask.style.backgroundImage = "url(../../img/"+selectedMask+".svg)";
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
    $("#theColor").hide();

    selectedColor  = $("#visualSelect_fillValue").val();
    selectedStrobe = $("#visualSelect_strobeValue").val();

    showMask();

    document.getElementById("colorStrobe").style.webkitAnimationDuration=selectedStrobe+"s";

    $("#colorFrame").show();
    $("#theColor").addClass(selectedColor);

    // setTimeout to prevent a loading glitch
    setTimeout(function() {$("#theColor").show()}, 100);

    

}