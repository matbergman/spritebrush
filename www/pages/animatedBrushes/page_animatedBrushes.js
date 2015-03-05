    $(document).ready(function(){

/* ##### Check if night mode skin is enabled */
getTheme();


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
    $(".animatedBrush").hide();

    if (eightBitInterval != "undefined") {clearTimeout(eightBitInterval);}
    $(".pixel").css('background-color', 'transparent');

    /* Reset wrapper display state for next brush */
    $("#animatedBrushWrapper").hide();

    /* Return to Animated Brushes page */
    returnToPage("#page_animatedBrushes","#animatedBrushFrame");

    });


});



/* ##### Animated Brushes ##### */


/* Animated brush - "8-bit" */                

var eightBitInterval;

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
function shuffle8BitArray(array) {
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

shuffle8BitArray(eightBitBrush_colorArray);

for (i=0;i<chips.length;i++) {
    chips[i].style.backgroundColor=eightBitBrush_colorArray[i];

    if (eightBitBrush_colorArray.length<chips.length) {
        eightBitBrush_colorArray.push(eightBitBrush_colorArray[i]);
        }
    }

}




/* ##### Display animated brush ##### */

function showAnimatedBrush() {

    /* Set page background color to black in case of swiping */
    $(".ui-page-theme-a").css("backgroundColor","#000");

    $("header").hide();
    $("#page_animatedBrushes").hide();
    $(".animatedBrush").hide();
    $("#animatedBrushFrame").show();

    var colorDuration = eval($("#visualSelect_animatedBrushSpeedValue").val());

    /* 8-bit brushes */
    if ($("#visualSelect_animatedBrushValue").val() === "eightBitBrush_colorArray_flame" || $("#visualSelect_animatedBrushValue").val() === "eightBitBrush_colorArray_steel" || $("#visualSelect_animatedBrushValue").val() === "eightBitBrush_colorArray_camo" || $("#visualSelect_animatedBrushValue").val() === "eightBitBrush_colorArray_checkers" ) {

        $("#eightBitBrush").show();
        eightBitBrush_colorArray = eval($("#visualSelect_animatedBrushValue").val());

        var eightBitSpeed;
        if (colorDuration === 0) eightBitSpeed = 1000;
        else if (colorDuration === 1) eightBitSpeed = 100;
        else if (colorDuration === 2) eightBitSpeed = 10;
        else eightBitSpeed = 100;

        eightBitInterval = setInterval(function() { update8BitBrush(eightBitBrush_colorArray); },eightBitSpeed);
        }


    /* spinner */
    if ($("#visualSelect_animatedBrushValue").val() === "brush_spinner") {

        spinnerContainer = document.getElementById("brush_spinner");
        spinnerShape = document.getElementById("brush_spinnerShape");

        var spinnerSpeed;
        if (colorDuration === 0) spinnerSpeed = "6s";
        else if (colorDuration === 1) spinnerSpeed = "3s";
        else if (colorDuration === 2) spinnerSpeed = "1s";
        else spinnerSpeed = "3s";


        spinnerContainer.style.height = heightForPages+"px";
        spinnerShape.style.width = heightForPages+"px";
        spinnerShape.style.marginTop = (heightForPages/2)+"px";

        $("#animatedBrushWrapper").show();
        $("#brush_spinner").show();
        spinnerShape.style.webkitAnimationDuration=spinnerSpeed; 

        }


    /* Flame */
    if ($("#visualSelect_animatedBrushValue").val() === "brush_flame") {

        flameContainer = document.getElementById("brush_flame");

        var flameImageWidth = 800;
        var flameImageHeight = 12660;

        var flameIncrement = flameImageHeight/30;

        var flameSpeed;
        if (colorDuration === 0) flameSpeed = "15s";
        else if (colorDuration === 1) flameSpeed = "5s";
        else if (colorDuration === 2) flameSpeed = "1s";
        else flameSpeed = "3s";

        $("#brush_flame").show();

        flameContainer.style.webkitAnimationDuration=flameSpeed; 

        }

    /* color cycling brush */

    if ($("#visualSelect_animatedBrushValue").val() === "colorCycle_primary") {

        var colorFlowSpeed;
        if (colorDuration === 0) colorFlowSpeed = "6s";
        else if (colorDuration === 1) colorFlowSpeed = "3s";
        else if (colorDuration === 2) colorFlowSpeed = "1s";
        else colorFlowSpeed = "3s";

        $("#animatedColor").show();
        document.getElementById("animatedColor").style.webkitAnimationDuration=colorFlowSpeed;        
    }



    /* ##### Character-based animated brushes ##### */

    var charBrushContainer;
    var charSpeed;
    var topPos;
    var leftPos;

    /* Character-based animated brushes - dots */

    if ($("#visualSelect_animatedBrushValue").val() === "brush_dots") {

        charBrushContainer = document.getElementById("brush_dots");
        var numberOfDots = 110;

        if (colorDuration === 0) charSpeed = "60s";
        else if (colorDuration === 1) charSpeed = "40s";
        else if (colorDuration === 2) charSpeed = "10s";
        else charSpeed = "20s";

        charBrushContainer.style.webkitAnimationDuration=charSpeed; 

        charBrushContainer.innerHTML = "";

        for (i=0;i<numberOfDots;i++) {

            var newDot = document.createElement("span");

            dotSize = Math.floor(Math.random() * 10);

            newDot.style.fontSize = dotSize+"em";

            leftPos = Math.floor(Math.random() * 800);
            topPos = Math.floor(Math.random() * 10000);

            charBrushContainer.appendChild(newDot);

            newDot.style.left = leftPos+"px";
            newDot.style.top = topPos+"px";

        }   

        $("#brush_dots").show();

    }


    /* Character-based animated brushes - circles */

    if ($("#visualSelect_animatedBrushValue").val() === "brush_circles") {
        charBrushContainer = document.getElementById("brush_circles");
        //var numberOfCircles = (Math.floor(Math.random() * 100))+50;
        var numberOfCircles = 110;

        if (colorDuration === 0) charSpeed = "60s";
        else if (colorDuration === 1) charSpeed = "40s";
        else if (colorDuration === 2) charSpeed = "10s";
        else charSpeed = "20s";

        charBrushContainer.style.webkitAnimationDuration=charSpeed; 

        charBrushContainer.innerHTML = "";

        for (i=0;i<numberOfCircles;i++) {

            var newCircle = document.createElement("span");

            circleColor = Math.floor(Math.random() * 5);
            circleStyle = Math.floor(Math.random() * 12);
            newCircle.className = "circle"+circleStyle+" circleColor"+circleColor;

            circleSize = Math.floor(Math.random() * 10);
            newCircle.style.fontSize = circleSize+"em";

            leftPos = Math.floor(Math.random() * 800);
            topPos = Math.floor(Math.random() * 10000);

            charBrushContainer.appendChild(newCircle);

            newCircle.style.left = leftPos+"px";
            newCircle.style.top = topPos+"px";

        }   

        $("#brush_circles").show();

    }


    /* Character-based animated brushes - stars */

    if ($("#visualSelect_animatedBrushValue").val() === "brush_stars") {
        charBrushContainer = document.getElementById("brush_stars");

        var numberOfstars = 110;

        if (colorDuration === 0) charSpeed = "60s";
        else if (colorDuration === 1) charSpeed = "40s";
        else if (colorDuration === 2) charSpeed = "10s";
        else charSpeed = "20s";

        charBrushContainer.style.webkitAnimationDuration=charSpeed; 

        charBrushContainer.innerHTML = "";

        for (i=0;i<numberOfstars;i++) {

            var newstar = document.createElement("span");

            starColor = Math.floor(Math.random() * 7);
            starStyle = Math.floor(Math.random() * 12);
            newstar.className = "star"+starStyle+" starColor"+starColor;

            starSize = Math.floor(Math.random() * 10);
            newstar.style.fontSize = starSize+"em";

            leftPos = Math.floor(Math.random() * 800);
            topPos = Math.floor(Math.random() * 10000);

            charBrushContainer.appendChild(newstar);

            newstar.style.left = leftPos+"px";
            newstar.style.top = topPos+"px";

        }   

        $("#brush_stars").show();
    }


    /* Character-based animated brushes - snowflakes */

    if ($("#visualSelect_animatedBrushValue").val() === "brush_snowflakes") {
        charBrushContainer = document.getElementById("brush_snowflakes");

        var numberOfSnowflakes = 110;

        if (colorDuration === 0) charSpeed = "60s";
        else if (colorDuration === 1) charSpeed = "40s";
        else if (colorDuration === 2) charSpeed = "10s";
        else charSpeed = "20s";

        charBrushContainer.style.webkitAnimationDuration=charSpeed; 

        charBrushContainer.innerHTML = "";

        for (i=0;i<numberOfSnowflakes;i++) {

            var newSnowflake = document.createElement("span");

            snowflakeColor = Math.floor(Math.random() * 5);
            snowflakeStyle = Math.floor(Math.random() * 12);
            newSnowflake.className = "snowflake"+snowflakeStyle+" snowflakeColor"+snowflakeColor;

            snowflakeSize = Math.floor(Math.random() * 10);
            newSnowflake.style.fontSize = snowflakeSize+"em";

            leftPos = Math.floor(Math.random() * 800);
            topPos = Math.floor(Math.random() * 10000);

            charBrushContainer.appendChild(newSnowflake);

            newSnowflake.style.left = leftPos+"px";
            newSnowflake.style.top = topPos+"px";

        }

        $("#brush_snowflakes").show();

    }


    /* Character-based animated brushes - notes */

    if ($("#visualSelect_animatedBrushValue").val() === "brush_notes") {
        charBrushContainer = document.getElementById("brush_notes");

        var numberOfnotes =110;

        if (colorDuration === 0) charSpeed = "60s";
        else if (colorDuration === 1) charSpeed = "40s";
        else if (colorDuration === 2) charSpeed = "10s";
        else charSpeed = "20s";

        charBrushContainer.style.webkitAnimationDuration=charSpeed; 

        charBrushContainer.innerHTML = "";

        for (i=0;i<numberOfnotes;i++) {

            var newnote = document.createElement("span");

            noteColor = Math.floor(Math.random() * 5);
            noteStyle = Math.floor(Math.random() * 26);
            newnote.className = "note"+noteStyle+" noteColor"+noteColor;

            noteSize = Math.floor(Math.random() * 10);
            newnote.style.fontSize = noteSize+"em";

            leftPos = Math.floor(Math.random() * 800);
            topPos = Math.floor(Math.random() * 10000);

            charBrushContainer.appendChild(newnote);

            newnote.style.left = leftPos+"px";
            newnote.style.top = topPos+"px";

        }   

        $("#brush_notes").show();

    }

    /* Character-based animated brushes - flowers */

    if ($("#visualSelect_animatedBrushValue").val() === "brush_flowers") {
        charBrushContainer = document.getElementById("brush_flowers");

        var numberOfFlowers = 110;

        if (colorDuration === 0) charSpeed = "60s";
        else if (colorDuration === 1) charSpeed = "40s";
        else if (colorDuration === 2) charSpeed = "10s";
        else charSpeed = "20s";

        charBrushContainer.style.webkitAnimationDuration=charSpeed; 

        charBrushContainer.innerHTML = "";

        for (i=0;i<numberOfFlowers;i++) {

            var newFlower = document.createElement("span");

            flowerColor = Math.floor(Math.random() * 10);
            flowerStyle = Math.floor(Math.random() * 12);
            newFlower.className = "flower"+flowerStyle+" flowerColor"+flowerColor;

            flowerSize = Math.floor(Math.random() * 10);
            newFlower.style.fontSize = flowerSize+"em";

            leftPos = Math.floor(Math.random() * 800);
            topPos = Math.floor(Math.random() * 10000);

            charBrushContainer.appendChild(newFlower);

            newFlower.style.left = leftPos+"px";
            newFlower.style.top = topPos+"px";

        }   

        $("#brush_flowers").show();    


    }

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
        if (colorDuration === 0) vineSpeed = "15s";
        else if (colorDuration === 1) vineSpeed = "5s";
        else if (colorDuration === 2) vineSpeed = "1s";
        else vineSpeed = "5s";


        vineContainer.style.webkitAnimationDuration=vineSpeed; 

        $("#animatedBrushWrapper").show();        
        $("#brush_vines").show();    

        }   

    }

