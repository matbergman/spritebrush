$(document).ready(function(){

/* ##### Check if night mode skin is enabled */
getTheme();


/* ##### Set brush size ####  */
// brushsize variable set in index.js, modified in page_settings.html


var brushsize = localStorage.getItem('brushsize');
if (brushsize==0) {brushsize = defaultBrushsize}
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
    returnToPage("#page_shapes","#colorFrame");
    });


});
                


function showMask() {
    selectedMask = $("#visualSelect_maskValue").val();
    theMask = document.getElementById("colorMask");
    
    if (selectedMask == "none") theMask.style.backgroundImage = "none";
    else theMask.style.backgroundImage = "url(../../img/"+selectedMask+".png)";
}



function showColor() {

    $("header").hide();
    $("#page_shapes").hide();

    selectedColor  = $("#visualSelect_colorValue").val();
    selectedStrobe = $("#visualSelect_strobeValue").val();
    
    showMask();

    document.getElementById("colorStrobe").style.webkitAnimationDuration=selectedStrobe;
    document.getElementById("theColor").style.backgroundColor = selectedColor;

    $("#colorFrame").show();
    $("#theColor").show();



}