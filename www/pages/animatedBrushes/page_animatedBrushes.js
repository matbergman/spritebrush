    $(document).ready(function(){

/* ##### Check if night mode skin is enabled */
getTheme();


/* ##### Populate instructions content ##### */

if ($(".instructions").length) {

var instructionsContent = "Tap the screen to toggle the animated brush. Tap &amp; hold to close and exit."

var instructionsContainer = document.getElementsByClassName("instructions_content")[0];
instructionsContainer.innerHTML = instructionsContent;

}


/* ##### Set brush size ####  */
// brushsize variable set in index.js, modified in page_settings.html
var brushsize = localStorage.getItem('brushsize');
if (brushsize==0) {brushsize = defaultBrushsize}
var brushsizeClassname = "brushsize_"+brushsize;
$("#container_brushsize").removeClass().addClass(brushsizeClassname);



/* ##### Event handlers ##### */

$("#button_showAnimatedBrush").on("click", function() {
    showAnimatedBrush();
    $("#toggleBackground").hide();    
    return false;
    });


/* Select buttons */

$("#button_selectAnimatedBrush").on("click", function() {
    createSelect("fieldset_animatedBrush"); 
    return false;
    });


$("#button_selectAnimatedBrushSpeed").on("click", function() {
    createSelect("fieldset_animatedBrushSpeed"); 
    return false;
    });


/* Touch events */

$("#animatedBrushFrame").on("tap",function(){
    $("#animatedBrushWrapper").toggle();
    $("#toggleBackground").toggle();    
    });



/* Tap & hold - return to Animated Brushes screen */
$("#animatedBrushFrame").on("taphold",function(){

    /* Restore page background color from black */
    $(".ui-page-theme-a").css("backgroundColor","#cfd8dc");

    /* Reset each animated brush. Mixed brush types on this page require individual solutions. */
    clearInterval(theInterval);
    $(".animatedBrush").hide();
    $(".pixel").css('background-color', 'transparent');

    /* Reset wrapper display state for next brush */
    $("#animatedBrushWrapper").hide();

    /* Return to Animated Brushes page */
    returnToPage("#page_animatedBrushes","#animatedBrushFrame");

    });


});


/* ##### Animated Brushes ##### */


/* Animated brush - "8-bit" */                

var eightBitBrush_colorArray_flame = new Array(
"#fe8300",
"#feaf00",
"#fc6500",    
"#c32704",    
"#8a0304",    
"#d93b00",    
"#ef4b00",    
"#ffe300",    
"#d45000",    
"#e26400",    
"#9b4200",    
"#d37f00",    
"#fffb96",    
"#976d00",    
"#c99c00",    
"#fffb96"
);


var eightBitBrush_colorArray_steel = new Array(
"#f9f9f9",
"#d3d2d0",
"#a7a4a1",    
"#514d46",    
"#ebeae8",    
"#b4b3b2",    
"#c9c8c4",    
"#918e8a",    
"#dad9dd",    
"#bebcba",    
"#c4c7ce",    
"#77726c",    
"#e2e2e5",    
"#e3e2de",    
"#ebebef",    
"#514d46"
);

var eightBitBrush_colorArray_camo = new Array(
"#c7bb81",
"#353a40",
"#51774e",
"#66563c",
"#c7bb81",
"#353a40",
"#51774e",
"#66563c",
"#c7bb81",
"#353a40",
"#51774e",
"#66563c"
);

var eightBitBrush_colorArray_checkers = new Array(
"#d72020",
"#d72020",
"#d72020",
"#d72020",
"#d72020",
"#d72020",
"#000000",
"#000000",
"#000000",
"#000000",
"#000000",
"#000000"
);



/* randomize arrays */
function ShuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}


function update8BitBrush(eightBitBrush_colorArray) {

var brush = document.getElementById("eightBitBrush");
var chips = brush.getElementsByClassName("pixel");

ShuffleArray(eightBitBrush_colorArray);

for (i=0;i<chips.length;i++) {
    chips[i].style.backgroundColor=eightBitBrush_colorArray[i];

    if (eightBitBrush_colorArray.length<chips.length) {
        eightBitBrush_colorArray.push(eightBitBrush_colorArray[i]);
        }
    }

}



/* Animated brush - character based */        

function updateCharBrush(theBrush) {

var brush = document.getElementById(theBrush);

var numberOfObj = 20; // A static maximum number of items to show each frame (including blanks), determined by trial & error

brush.innerHTML = "";

for (i=0;i<numberOfObj;i++) {

    var newObj = document.createElement("span"); // Characters are applied to <span> elements through the CSS content attribute

    
    // The dot animated brush is a bit different than the rest -- a single character and color. 
    if (theBrush == "brush_dots") {
        objStyle = Math.floor(Math.random() * 10);
        if (objStyle == 1) {newObj.className = "showDot";}
        else {newObj.className = "";}
        objSize = Math.floor(Math.random() * 10);
        newObj.style.fontSize = objSize+"em";
        }

    if (theBrush == "brush_circles") {
        charBrushLayout(newObj, "circle");
        }    

    if (theBrush == "brush_stars") {
        charBrushLayout(newObj, "star");
        }    

    if (theBrush == "brush_snowflakes") {
        charBrushLayout(newObj, "snowflake");
        }   

    brush.appendChild(newObj);
    
    }

}

 
// Animated character brush - randomizes each frame 
function charBrushLayout(newObj, objType) {

objStyle = Math.floor(Math.random() * 12);
newObj.className = objType+objStyle;
objColor = Math.floor(Math.random() * 50);
if (objColor <= 4) {newObj.className += " "+objType+"Color"+objColor;}

else {newObj.className += " obj_hide";}

objSize = Math.floor(Math.random() * 10);

newObj.style.fontSize = objSize+"em";

}



/* ##### Display animated brush ##### */

var theInterval; // All js animated brushes use this interval so that it can be cleared on exit

function showAnimatedBrush() {

    /* Set page background color to black in case of swiping */
    $(".ui-page-theme-a").css("backgroundColor","#000");

    $("header").hide();
    $("#page_animatedBrushes").hide();
    $(".animatedBrush").hide();
    $("#animatedBrushFrame").show();
    $("#animatedBrushWrapper").show();

    var animationSpeed = eval($("#visualSelect_animatedBrushSpeedValue").val());

    /* 8-bit brushes */
    if ($("#visualSelect_animatedBrushValue").val() === "eightBitBrush_colorArray_flame" || $("#visualSelect_animatedBrushValue").val() === "eightBitBrush_colorArray_steel" || $("#visualSelect_animatedBrushValue").val() === "eightBitBrush_colorArray_camo" || $("#visualSelect_animatedBrushValue").val() === "eightBitBrush_colorArray_checkers" ) {

        $("#eightBitBrush").show();
        eightBitBrush_colorArray = eval($("#visualSelect_animatedBrushValue").val());

        var eightBitSpeed;
        if (animationSpeed === 0) eightBitSpeed = 1000;
        else if (animationSpeed === 1) eightBitSpeed = 100;
        else if (animationSpeed === 2) eightBitSpeed = 10;
        else eightBitSpeed = 100;

        theInterval = setInterval(function() { update8BitBrush(eightBitBrush_colorArray); },eightBitSpeed);
        }


    /* Color cycling animated brush */

    if ($("#visualSelect_animatedBrushValue").val() === "colorCycle_primary") {

        var colorFlowSpeed;
        if (animationSpeed === 0) colorFlowSpeed = "6s";
        else if (animationSpeed === 1) colorFlowSpeed = "3s";
        else if (animationSpeed === 2) colorFlowSpeed = "1s";
        else colorFlowSpeed = "3s";

        $("#animatedColor").show();
        document.getElementById("animatedColor").style.webkitAnimationDuration=colorFlowSpeed;        
    }


    /* Spinner animated brush */
    if ($("#visualSelect_animatedBrushValue").val() === "brush_spinner") {

        spinnerContainer = document.getElementById("brush_spinner");
        spinnerShape = document.getElementById("brush_spinnerShape");

        var spinnerSpeed;
        if (animationSpeed === 0) spinnerSpeed = "6s";
        else if (animationSpeed === 1) spinnerSpeed = "3s";
        else if (animationSpeed === 2) spinnerSpeed = "1s";
        else spinnerSpeed = "3s";


        spinnerContainer.style.height = heightForPages+"px";
        spinnerShape.style.width = heightForPages+"px";
        spinnerShape.style.marginTop = (heightForPages/2)+"px";

        $("#brush_spinner").show();
        spinnerShape.style.webkitAnimationDuration=spinnerSpeed; 

        }


    /* Flame animated brush */
    if ($("#visualSelect_animatedBrushValue").val() === "brush_flame") {

        flameContainer = document.getElementById("brush_flame");

        var flameImageWidth = 800;
        var flameImageHeight = 12660;

        var flameIncrement = flameImageHeight/30;

        var flameSpeed;
        if (animationSpeed === 0) flameSpeed = "30s";
        else if (animationSpeed === 1) flameSpeed = "15s";
        else if (animationSpeed === 2) flameSpeed = "5s";
        else flameSpeed = "15s";

        $("#brush_flame").show();

        flameContainer.style.webkitAnimationDuration=flameSpeed; 

        }


    /* Vine animated brush */
    if ($("#visualSelect_animatedBrushValue").val() === "brush_vines") {

        vineContainer = document.getElementById("brush_vines");

        if (widthForPages <= 640) {
                $("#brush_vines").addClass("brush_vines-640");
            }

        if (widthForPages > 640) {
                $("#brush_vines").addClass("brush_vines-960");
            }

        if (widthForPages > 960) {
            $("#brush_vines").addClass("brush_vines-1280");
            }     

        var vineSpeed;
        if (animationSpeed === 0) vineSpeed = "15s";
        else if (animationSpeed === 1) vineSpeed = "5s";
        else if (animationSpeed === 2) vineSpeed = "1s";
        else vineSpeed = "5s";


        vineContainer.style.webkitAnimationDuration=vineSpeed; 

        $("#brush_vines").show();    

        }   


    /* Character-based animated brushes */

    var charBrushContainer;
    var charSpeed;

    if (animationSpeed === 0) charSpeed = 500;
    else if (animationSpeed === 1) charSpeed = 100;
    else if (animationSpeed === 2) charSpeed = 50;
    else charSpeed = 100;

    /* Character-based animated brushes - dots */
    if ($("#visualSelect_animatedBrushValue").val() === "brush_dots") {
    $("#brush_dots").show();
    theInterval = setInterval(function() { updateCharBrush("brush_dots"); },charSpeed);    
    }

    /* Character-based animated brushes - circles */
    if ($("#visualSelect_animatedBrushValue").val() === "brush_circles") {
    $("#brush_circles").show();
    theInterval = window.setInterval(function() { updateCharBrush("brush_circles"); },charSpeed);   
    }

    /* Character-based animated brushes - stars */
    if ($("#visualSelect_animatedBrushValue").val() === "brush_stars") {
    $("#brush_stars").show();
    theInterval = window.setInterval(function() { updateCharBrush("brush_stars"); },charSpeed); 
    }

    /* Character-based animated brushes - snowflakes */
    if ($("#visualSelect_animatedBrushValue").val() === "brush_snowflakes") {
    $("#brush_snowflakes").show();
    theInterval = window.setInterval(function() { updateCharBrush("brush_snowflakes"); },charSpeed); 
    }

}