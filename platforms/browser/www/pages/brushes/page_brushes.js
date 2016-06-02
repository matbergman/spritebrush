$(document).ready(function(){

/* ##### Check if night mode skin is enabled */
getTheme();


/* ##### Populate instructions content ##### */

if ($(".instructions").length) {

var instructionsContent = "Tap the screen to toggle the pattern. Tap &amp; hold to close and exit."

var instructionsContainer = document.getElementsByClassName("instructions_content")[0];
instructionsContainer.innerHTML = instructionsContent;

}

/* ##### Set brush size ####  */
// brushsize variable set in index.js, modified in page_settings.html
var brushsize = localStorage.getItem('brushsize');
if (brushsize==0) {brushsize = defaultBrushsize}
var brushsizeClassname = "brushsize_"+brushsize;
$("#container_brushsize").removeClass().addClass(brushsizeClassname);




/* ##### Configure layout ##### */

var pages = document.getElementsByClassName("page");
var heightForPages = $(window).height();
for (i=0; i<pages.length;i++) {
    pages[i].style.height = heightForPages+"px";
    }



/* ##### Event handlers ##### */

$("#button_showBrush").click(function() {
    showBrush();
    $("#toggleBackground").hide();
    return false;
    });


/* Select buttons */

$("#button_selectBrush").click(function() {
    createSelect("fieldset_brush"); 
    return false;
    });


/* Touch events */

$("#brushFrame").on("tap",function(){
    $("#theBrush").toggle();
    $("#toggleBackground").toggle();    
    });


$("#brushFrame").on("taphold",function(){
    returnToPage("#page_brushes","#brushFrame");
    });



});
                


function showBrush() {
$("header").hide();
$("#page_brushes").hide();

selectedBrush  = $("#visualSelect_brushValue").val();
    
document.getElementById("theBrush").className = selectedBrush;

$("#brushFrame").show();
$("#theBrush").show();

}

