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
    $("#stencil").hide();        
    returnToPage("#page_stencils","#stencilFrame");
    });


/* set character height so graphic fills entire screen */


/*
document.getElementById("char").style.height = heightForPages+"px";
document.getElementById("char").style.width = widthForPages+"px";
*/


});
                


function showStencil() {
    
    var selectedStencil = $("#button_selectStencil").attr("class");
    var selectedStencilSpeed = $("#visualSelect_stencilSpeedValue").val();
    var theStencil = document.getElementById("char");
   



    var wideStencilArray = new Array("stencil_0056","stencil_0058","stencil_0059","stencil_0060","stencil_0062","stencil_0065","stencil_0066","stencil_0067","stencil_0077","stencil_0083","stencil_0084","stencil_0091","stencil_0092","stencil_0094","stencil_0098","stencil_0100","stencil_0101","stencil_0104","stencil_0107","stencil_0110","stencil_0112");
    for (i=0;i<wideStencilArray.length;i++) {
        if (selectedStencil == wideStencilArray[i]) {

            $("#char").css('fontSize','20vw');
            }
        //else {$("#char").css('fontSize','24px');}
        }

            console.log($("#char").css('fontSize'));


/*
    console.log("w: "+$("#char").width()+"  h: "+$("#char").height() );

    if ($("#char").width() > widthForPages) {}
*/



    document.getElementById("char").style['-webkit-animation-duration'] = selectedStencilSpeed;
    theStencil.className = selectedStencil;




    $("header").hide();
    $("#page_stencils").hide();
    $("#stencilFrame").show();
    $("#char").show();


}



