/* ##### Home (index.html) events ##### */

$(document).ready(function(){


/* page navigation buttons */
$("#showColors").click(function() {
    window.location = "index.html"
    });

$("#showBrushes").click(function() {
    window.location = "pages/brushes/page_brushes.html"
    });

$("#showAnimatedBrushes").click(function() {
    window.location = "pages/animatedBrushes/page_animatedBrushes.html"
    });

$("#showStencils").click(function() {
    window.location = "pages/stencils/page_stencils.html"
    });

$("#instructions").click(function() {
    window.location = "pages/instructions/page_instructions.html"
    });

$("#about").click(function() {
    window.location = "pages/about/page_about.html"
    });

$("#nightMode").click(function() {
    toggleTheme();
    });


$("#popupInstructionsHide").click(function() {

    var instructionsPopupCheckbox = $("#popupInstructionsCheckbox").is(":checked");

    $("#popup_instructions").hide();


console.log("instructionsPopupCheckbox value: "+instructionsPopupCheckbox);

    if (instructionsPopupCheckbox === true) {
        localStorage.setItem("displayInstructionPopup","true");
        console.log("Set localstorage as true");
        }
    else {
        localStorage.setItem("displayInstructionPopup","false");
        console.log("Set localstorage as false");
        }        


console.log("Local storage is set as: "+localStorage.getItem("displayInstructionPopup"));

    return false;
    });


});
                
