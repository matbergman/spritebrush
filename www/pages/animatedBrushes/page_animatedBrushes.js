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
    if (brushsize==null) {brushsize = defaultBrushsize}
    var brushsizeClassname = "brushsize_"+brushsize;
    $("#container_brushsize").removeClass().addClass(brushsizeClassname);


    /* ##### Event handlers ##### */

    $("#button_showAnimatedBrush").on("click", function() {
        showAnimatedBrush();
        $("#toggleBackground").hide();    
        return false;
        });


    /* Select buttons */
    $("#button_selectFill").on("click", function() {

        var brushType = $("#visualSelect_animatedBrushValue").val();
        console.log("brushType: "+brushType);

         // Display Palette menu instead of Fill menu for brushes that don't lend themselves to textures like stripes, gradients. etc.
        if (brushType == "eightBitBrush" || brushType == "brush_spinner" || brushType == "brush_dots" || brushType == "brush_circles" || brushType == "brush_sparkles" || brushType == "brush_snowflakes") {
            $(".visualSelect_list_item-colors").hide();
            $(".select_menu-standard").hide();        
            $(".select_menu-alt").show();
        }

        else {
            $(".visualSelect_list_item-colors").show();            
            $(".select_menu-standard").show();        
            $(".select_menu-alt").hide();
        }

        createSelect("fieldset_fill"); 
        return false;
        });

    $("#button_selectPalette").on("click", function() {
        createSelect("fieldset_palette"); 
        return false;
        });


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

var eightBitBrush_colorArray_primary = new Array(
"red",
"yellow",
"blue"
);

var eightBitBrush_colorArray_citrus = new Array(
"#84d628",
"#d0f54f",
"#fcff33",
"#ffa71b",
"#ff5e45"
);

var eightBitBrush_colorArray_retro = new Array(
"#404040",
"#024959",
"#037e8c",
"#f2efdc",
"#f24c27"
);

var eightBitBrush_colorArray_winter = new Array(
"#273f5a",
"#c6dbf3",
"#4b81a5",
"#74a0bf",
"#98c4da"
);

var eightBitBrush_colorArray_spring = new Array(
"#45e851",
"#5cb9ff",
"#ffd722",
"#e80855",
"#8626ee"
);

var eightBitBrush_colorArray_summer = new Array(
"#ff860d",
"#e8430c",
"#ff0000",
"#ff12dd",
"#a10dff"
);

var eightBitBrush_colorArray_autumn = new Array(
"#766537",
"#eeb415",
"#bf5b04",
"#c26f2d",
"#592202"
);

var eightBitBrush_colorArray_usa = new Array(
"red",
"white",
"blue"
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


function updateStreaker(selectedFill) {

var brush = document.getElementById("streaker");
var chips = brush.getElementsByClassName("ball");
var displayVal;

for (i=0;i<chips.length;i++) {

    displayVal = Math.random();

        if (displayVal > .8) {
            chips[i].className = "ball on " + selectedFill
        }
        else {
            chips[i].className = "ball off " + selectedFill
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

/*
    if (theBrush == "brush_dots") {
        objStyle = Math.floor(Math.random() * 10);
        if (objStyle == 1) {newObj.className = "showDot";}
        else {newObj.className = "";}
        objSize = Math.floor(Math.random() * 10);
        newObj.style.fontSize = objSize+"em";
        }
*/
    if (theBrush == "brush_dots") { 
        charBrushLayout(newObj, "dots");
    }

    if (theBrush == "brush_circles") {
        charBrushLayout(newObj, "circle");
        }    

    if (theBrush == "brush_sparkles") {
        charBrushLayout(newObj, "sparkle");
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
if (objColor <= 4) {newObj.className += " charColor"+objColor+" "+objType+"Color"+objColor;}

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

    var brushHeight = $("#container_brushsize").height();
    var ballHeight = $(".ball").height();
    var translateVal = brushHeight - ballHeight + "px";

    /* 8-bit brushes */
    if ($("#visualSelect_animatedBrushValue").val() === "eightBitBrush") {

        $("#eightBitBrush").show();

        selectedPalette  = $("#visualSelect_fillValue").val();

        if (selectedPalette == "palette_primary") {
            eightBitBrush_colorArray = eightBitBrush_colorArray_primary;
        }

        else if (selectedPalette == "palette_citrus") {
            eightBitBrush_colorArray = eightBitBrush_colorArray_citrus;
        }

        else if (selectedPalette == "palette_retro") {
            eightBitBrush_colorArray = eightBitBrush_colorArray_retro;
        }

        else if (selectedPalette == "palette_winter") {
            eightBitBrush_colorArray = eightBitBrush_colorArray_winter;
        }

        else if (selectedPalette == "palette_spring") {
            eightBitBrush_colorArray = eightBitBrush_colorArray_spring;
        }

        else if (selectedPalette == "palette_summer") {
            eightBitBrush_colorArray = eightBitBrush_colorArray_summer;
        }

        else if (selectedPalette == "palette_autumn") {
            eightBitBrush_colorArray = eightBitBrush_colorArray_autumn;
        }

        else if (selectedPalette == "palette_usa") {
            eightBitBrush_colorArray = eightBitBrush_colorArray_usa;
        }

        else if (selectedPalette == "palette_steel") {
            eightBitBrush_colorArray = eightBitBrush_colorArray_steel;
        }

        else {
            eightBitBrush_colorArray == eightBitBrush_colorArray_primary;            
        }


        console.log("eightBitBrush_colorArray: "+eightBitBrush_colorArray);
        console.log("selectedPalette: "+selectedPalette);



        var eightBitSpeed;
        if (animationSpeed === 0) eightBitSpeed = 1000;
        else if (animationSpeed === 1) eightBitSpeed = 100;
        else if (animationSpeed === 2) eightBitSpeed = 10;
        else eightBitSpeed = 100;

        theInterval = setInterval(function() { update8BitBrush(eightBitBrush_colorArray); },eightBitSpeed);
        }


    /* Spinner animated brush */
    if ($("#visualSelect_animatedBrushValue").val() === "brush_spinner") {

        spinnerContainer = document.getElementById("brush_spinner");
        spinnerShape = document.getElementById("brush_spinnerShape");
        var spinnerBrush = $("#visualSelect_fillValue").val();

        var spinnerSpeed;
        if (animationSpeed === 0) spinnerSpeed = "6s";
        else if (animationSpeed === 1) spinnerSpeed = "3s";
        else if (animationSpeed === 2) spinnerSpeed = "1s";
        else spinnerSpeed = "3s";


        var spinnerHeight =  $("#container_brushsize").height();
        var spinnerWidth = $("#container_brushsize").width();

        spinnerContainer.style.height = spinnerHeight+"px";
        spinnerShape.style.width = spinnerHeight+"px";
        spinnerShape.style.top = (spinnerHeight/2) - 3 +"px";
        spinnerShape.style.left = (spinnerWidth/2) - (spinnerHeight/2) +"px";

        spinnerShape.className = spinnerBrush;

        console.log("spinnerBrush:" +spinnerBrush);

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


    /* Bounce animated brush */

    if ($("#visualSelect_animatedBrushValue").val() === "brush_bounce") {

        // Change CSS keyframe value based on screen size        
        var stylesheet = document.styleSheets[2]; // page_animatedBrushes.css
        var rules = stylesheet.rules;
        var i = rules.length;
        var keyframes;
        var keyframe;

        while (i--) {

        keyframes = rules.item(i);

            if (keyframes.type === keyframes.WEBKIT_KEYFRAMES_RULE && keyframes.name === "bounceAnimation") {

                rules = keyframes.cssRules;
                i = rules.length;

                while (i--) {
                    keyframe = rules.item(i);

                    if (keyframe.type === keyframe.WEBKIT_KEYFRAME_RULE && keyframe.keyText === "100%") {
                        keyframe.style.webkitTransform = "translateY("+translateVal+")";
                        break;
                    }
                }
                break;
            }
        }

        var bounceSpeed;
        if (animationSpeed === 0) bounceSpeed = "3s";
        else if (animationSpeed === 1) bounceSpeed = "1s";
        else if (animationSpeed === 2) bounceSpeed = ".5s";
        else bounceSpeed = "5s";

        bounceContainer = document.getElementsByClassName("bounce")[0];
        bounceContainer.style.webkitAnimationDuration=bounceSpeed; 


        selectedFill  = $("#visualSelect_fillValue").val();
        bounceContainer.className = "ball bounce";
        $(bounceContainer).addClass(selectedFill);

        $("#brush_bounce").show();    

    }   



    /* Orbit animated brush */

    if ($("#visualSelect_animatedBrushValue").val() === "brush_orbit") {

        orbitContainer = document.getElementsByClassName("orbit")[0];

        orbitContainer.style.webkitTransformOrigin = (brushHeight/2)+"px 0";

        var orbitLeft = ($("#container_brushsize").width()/2) - (brushHeight/2) - (ballHeight/2);
        orbitContainer.style.left =  orbitLeft + "px";

        var orbitSpeed;
        if (animationSpeed === 0) orbitSpeed = "3s";
        else if (animationSpeed === 1) orbitSpeed = "1s";
        else if (animationSpeed === 2) orbitSpeed = ".5s";
        else orbitSpeed = "5s";

        orbitContainer.style.webkitAnimationDuration=orbitSpeed; 

        selectedFill  = $("#visualSelect_fillValue").val();
        orbitContainer.className = "ball orbit";
        $(orbitContainer).addClass(selectedFill);

        $("#brush_orbit").show();    

    }   



    /* Pulse animated brush */

    if ($("#visualSelect_animatedBrushValue").val() === "brush_pulse") {

        pulseContainer = document.getElementsByClassName("pulse")[0];
        var pulseSpeed;
        if (animationSpeed === 0) pulseSpeed = "3s";
        else if (animationSpeed === 1) pulseSpeed = "1s";
        else if (animationSpeed === 2) pulseSpeed = ".5s";
        else pulseSpeed = "5s";

        pulseContainer.style.webkitAnimationDuration=pulseSpeed; 

        selectedFill  = $("#visualSelect_fillValue").val();
        pulseContainer.className = "ball pulse";
        $(pulseContainer).addClass(selectedFill);

        $("#brush_pulse").show();    

    }


    /* Fade animated brush */

    if ($("#visualSelect_animatedBrushValue").val() === "brush_fader") {

        faderContainer = document.getElementsByClassName("fader")[0];

        var faderSpeed;
        if (animationSpeed === 0) faderSpeed = "3s";
        else if (animationSpeed === 1) faderSpeed = "1s";
        else if (animationSpeed === 2) faderSpeed = ".5s";
        else faderSpeed = "5s";

        faderContainer.style.webkitAnimationDuration=faderSpeed; 

        selectedFill  = $("#visualSelect_fillValue").val();
        faderContainer.className = "ball fader";
        $(faderContainer).addClass(selectedFill);

        $("#brush_fader").show();    

    }



    /* Streaker animated brush */

    if ($("#visualSelect_animatedBrushValue").val() === "brush_streaker") {

        selectedFill  = $("#visualSelect_fillValue").val();
        theInterval = setInterval(function() { updateStreaker(selectedFill); },1000); 

        $("#brush_streaker").show();    

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
        var dotFill = $("#visualSelect_fillValue").val();

        document.getElementById("brush_dots").className = "animatedBrush brush_char"; // reset brush style
        $("#brush_dots").addClass(dotFill); // set brush style

        $("#brush_dots").show();
        theInterval = setInterval(function() { updateCharBrush("brush_dots"); },charSpeed);    
    }

    /* Character-based animated brushes - circles */
    if ($("#visualSelect_animatedBrushValue").val() === "brush_circles") {
        var circleFill = $("#visualSelect_fillValue").val();

        document.getElementById("brush_circles").className = "animatedBrush brush_char"; // reset brush style
        $("#brush_circles").addClass(circleFill); // set brush style

        $("#brush_circles").show();
        theInterval = window.setInterval(function() { updateCharBrush("brush_circles"); },charSpeed);   
        }

    /* Character-based animated brushes - sparkles */
    if ($("#visualSelect_animatedBrushValue").val() === "brush_sparkles") {
        var sparkleFill = $("#visualSelect_fillValue").val();

        document.getElementById("brush_sparkles").className = "animatedBrush brush_char"; // reset brush style
        $("#brush_sparkles").addClass(sparkleFill); // set brush style

        $("#brush_sparkles").show();
        theInterval = window.setInterval(function() { updateCharBrush("brush_sparkles"); },charSpeed); 
    }

    /* Character-based animated brushes - snowflakes */
    if ($("#visualSelect_animatedBrushValue").val() === "brush_snowflakes") {
        var snowflakeFill = $("#visualSelect_fillValue").val();

        document.getElementById("brush_snowflakes").className = "animatedBrush brush_char"; // reset brush style
        $("#brush_snowflakes").addClass(snowflakeFill); // set brush style

        $("#brush_snowflakes").show();
        theInterval = window.setInterval(function() { updateCharBrush("brush_snowflakes"); },charSpeed); 
    }

}