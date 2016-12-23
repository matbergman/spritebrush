/* ##### Navigation events ##### */

$(document).ready(function(){


/* page navigation buttons */
$("#showShapes").click(function() {
    window.location = "../shapes/page_shapes.html"
    });

$("#showAnimatedBrushes").click(function() {
    window.location = "../animatedBrushes/page_animatedBrushes.html"
    });

$("#showStencils").click(function() {
    window.location = "../stencils/page_stencils.html"
    });

$("#showFlashlight").click(function() {
    alert("Not activated");
    });



$("#instructions").click(function() {
    window.location = "../instructions/page_instructions.html"
    });

$("#about").click(function() {
    window.location = "../about/page_about.html"
    });

$("#settings").click(function() {
    window.location = "../settings/page_settings.html"
    });

$("#nightMode").click(function() {
    toggleTheme();
    });

});
                
