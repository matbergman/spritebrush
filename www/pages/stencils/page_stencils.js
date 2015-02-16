$(document).ready(function(){



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
    $("#toggleBackground").toggle();    
    });


$("#stencilFrame").on("taphold",function(){
    $("#toggleBackground").hide();
    $("#stencil").show();        
    returnToPage("#page_stencils","#stencilFrame");
    });


/* set character height so graphic fills entire screen */


document.getElementById("char").style.height = heightForPages+"px";
document.getElementById("char").style.width = widthForPages+"px";

});
                


function showStencil() {
    
    var selectedStencil = $("#button_selectStencil").attr("class");
    var selectedStencilSpeed = $("#visualSelect_stencilSpeedValue").val();
    var theStencil = document.getElementById("char");
    
    document.getElementById("char").style['-webkit-animation-duration'] = selectedStencilSpeed;
    theStencil.className = selectedStencil;


//console.log("width: "+$("#char").width());



    $("header").hide();
    $("#page_stencils").hide();
    $("#stencilFrame").show();
    $("#char").show();

}



