$(document).ready(function(){


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


    /* Reset each animated brush. Mixed brush types on this page require individual solutions. */
    $(".animatedBrush").hide();

    if (eightBitInterval != "undefined") {clearTimeout(eightBitInterval);}

    $(".pixel").css('background-color', 'transparent');



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
    $("header").hide();
    $("#page_animatedBrushes").hide();
    $(".animatedBrush").hide();
    $("#animatedBrushFrame").show();



    var colorDuration = eval($("#visualSelect_animatedBrushSpeedValue").val());


    /* 8-bit brushes */
    if ($("#visualSelect_animatedBrushValue").val() === "eightBitBrush_colorArray_flame" || $("#visualSelect_animatedBrushValue").val() === "eightBitBrush_colorArray_steel" ) {

        // $("#animatedBrushWrapper").show(); // In case the last tap & hold was activated while wrapper was hidden

        $("#eightBitBrush").show();
        eightBitBrush_colorArray = eval($("#visualSelect_animatedBrushValue").val());

        var eightBitSpeed;
        if (colorDuration === 0) eightBitSpeed = 1000;
        else if (colorDuration === 1) eightBitSpeed = 100;
        else if (colorDuration === 2) eightBitSpeed = 10;
        else eightBitSpeed = 100;

        eightBitInterval = setInterval(function() { update8BitBrush(eightBitBrush_colorArray); },eightBitSpeed);
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
        var numberOfDots = Math.floor(Math.random() * 500);

        if (colorDuration === 0) charSpeed = "40s";
        else if (colorDuration === 1) charSpeed = "20s";
        else if (colorDuration === 2) charSpeed = "5s";
        else charSpeed = "20s";

        charBrushContainer.style.webkitAnimationDuration=charSpeed; 

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
        var numberOfCircles = Math.floor(Math.random() * 500);

        if (colorDuration === 0) charSpeed = "40s";
        else if (colorDuration === 1) charSpeed = "20s";
        else if (colorDuration === 2) charSpeed = "5s";
        else charSpeed = "20s";

        charBrushContainer.style.webkitAnimationDuration=charSpeed; 

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

    if ($("#visualSelect_animatedBrushValue").val() === "brush_stars") {
        charBrushContainer = document.getElementById("brush_stars");

        var numberOfstars = Math.floor(Math.random() * 500);

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

    if ($("#visualSelect_animatedBrushValue").val() === "brush_snowflakes") {
        charBrushContainer = document.getElementById("brush_snowflakes");

        var numberOfSnowflakes = Math.floor(Math.random() * 500);

        var topPos;
        var leftPos;


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


    if ($("#visualSelect_animatedBrushValue").val() === "brush_notes") {
        charBrushContainer = document.getElementById("brush_notes");

        var numberOfnotes = Math.floor(Math.random() * 500);

        var topPos;
        var leftPos;


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

    if ($("#visualSelect_animatedBrushValue").val() === "brush_flowers") {
        charBrushContainer = document.getElementById("brush_flowers");

        var numberOfFlowers = Math.floor(Math.random() * 500);

        var topPos;
        var leftPos;


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

        $("#brush_vines").show();    

        }   

    }

