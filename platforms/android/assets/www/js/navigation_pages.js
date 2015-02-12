/* ##### Home (index.html) events ##### */

$(document).ready(function(){


/* page navigation buttons */
$("#showColors").click(function() {
    window.location = "../../index.html"
    });

$("#showBrushes").click(function() {
    window.location = "../brushes/page_brushes.html"
    });

$("#showAnimatedBrushes").click(function() {
    window.location = "../animatedBrushes/page_animatedBrushes.html"
    });

$("#showStencils").click(function() {
    window.location = "../stencils/page_stencils.html"
    });

$("#instructions").click(function() {
    window.location = "../instructions/page_instructions.html"
    });

$("#about").click(function() {
    window.location = "../about/page_about.html"
    });

$("#nightMode").click(function() {
    toggleTheme();
    });

});
                