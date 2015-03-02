$(document).ready(function(){

/* ##### Check if night mode skin is enabled */
getTheme();


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

