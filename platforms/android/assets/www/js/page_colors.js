$(document).ready(function(){




/* ##### Event handlers ##### */

$("#button_showColor").on("click", function() {
    showColor();
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
    returnToPage("#page_colors","#colorFrame");
    });


});
                


function showMask() {
    selectedMask = $("#visualSelect_maskValue").val();
    theMask = document.getElementById("colorMask");
    
    if (selectedMask == "none") theMask.style.backgroundImage = "none";
    else theMask.style.backgroundImage = "url(img/"+selectedMask+".png)";
}



function showColor() {

    $("header").hide();
    $("#page_colors").hide();

    selectedColor  = $("#visualSelect_colorValue").val();
    selectedStrobe = $("#visualSelect_strobeValue").val();
    
    document.getElementById("colorStrobe").style.webkitAnimationDuration=selectedStrobe;
    document.getElementById("theColor").style.backgroundColor = selectedColor;

    $("#colorFrame").show();
    $("#theColor").show();

    showMask(); 

}