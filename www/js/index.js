/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    }
};



$(document).ready(function(){

/* ##### Event handlers ##### */

$(".select_menu_link").on("click", function() {

    $(".visualSelect_list_item").hide();

    $(".select_menu_link").removeClass("active");
    $(this).addClass("active");

    var selectedLink = $(this).attr("id");

    if (selectedLink=="select_menu_colors") {
        $(".visualSelect_list_item-colors").show();
    }

    else if (selectedLink=="select_menu_stripes") {
        $(".visualSelect_list_item-stripes").show();
    }

    else if (selectedLink=="select_menu_spectrum") {
        $(".visualSelect_list_item-spectrum").show();
    }

    else if (selectedLink=="select_menu_gradient") {
        $(".visualSelect_list_item-gradient").show();
    }

    else if (selectedLink=="select_menu_cycles") {
        $(".visualSelect_list_item-cycles").show();
    }

    else {
        $(".visualSelect_list_item-colors").show();
    }        

    });


});


/* ##### Configure layout #####  */

var heightForPages = $(window).height();
var widthForPages = $(window).width();

/* ##### Panel menu ##### */

var thePanel = document.getElementsByClassName("ui-panel-inner")[0];

var thePanelLogo = document.createElement("div");
thePanelLogo.className = "panel_logo";

var thePanelLogoImage = document.createElement("div");
thePanelLogoImage.className = "panel_logo_image";

var navColors = document.createElement("a");
navColors.href = "#";
navColors.id = "showBrushes";
navColors.className = "ui-link";

var navColorsLabel = document.createElement("span");
navColorsLabel.className = "ui-link-label";
navColorsLabel.innerHTML = "Brushes";

var navAnimatedBrushes = document.createElement("a");
navAnimatedBrushes.href = "#";
navAnimatedBrushes.id = "showAnimatedBrushes";

var navAnimatedBrushesLabel = document.createElement("span");
navAnimatedBrushesLabel.className = "ui-link-label";
navAnimatedBrushesLabel.innerHTML = "Animations";

var navStencils = document.createElement("a");
navStencils.href = "#";
navStencils.id = "showStencils";

var navStencilsLabel = document.createElement("span");
navStencilsLabel.className = "ui-link-label";
navStencilsLabel.innerHTML = "Stencils";


thePanelLogo.appendChild(thePanelLogoImage);
thePanel.appendChild(thePanelLogo);

navColors.appendChild(navColorsLabel);
navAnimatedBrushes.appendChild(navAnimatedBrushesLabel);
navStencils.appendChild(navStencilsLabel);

thePanel.appendChild(navColors);
thePanel.appendChild(navAnimatedBrushes);
thePanel.appendChild(navStencils);



/* ##### Overflow menu ##### */


var theOverflow = document.getElementById("overflow_menu");

var navNightMode = document.createElement("a");
navNightMode.href = "#";
navNightMode.id = "nightMode";

var navNightModeLabel = document.createElement("span");
navNightModeLabel.className = "ui-link-label";
navNightModeLabel.innerHTML = "Night mode";

var navNightModeToggle = document.createElement("span");
navNightModeToggle.className = "nightMode_toggleIndicator";

var navInstructions = document.createElement("a");
navInstructions.href = "#";
navInstructions.id = "instructions";

var navInstructionsLabel = document.createElement("span");
navInstructionsLabel.className = "ui-link-label";
navInstructionsLabel.innerHTML = "Instructions";

var navAbout = document.createElement("a");
navAbout.href = "#";
navAbout.id = "about";

var navAboutLabel = document.createElement("span");
navAboutLabel.className = "ui-link-label";
navAboutLabel.innerHTML = "About";

var navSettings = document.createElement("a");
navSettings.href = "#";
navSettings.id = "settings";

var navSettingsLabel = document.createElement("span");
navSettingsLabel.className = "ui-link-label";
navSettingsLabel.innerHTML = "Settings";


navNightMode.appendChild(navNightModeLabel);
navNightModeLabel.appendChild(navNightModeToggle);

navInstructions.appendChild(navInstructionsLabel);
navAbout.appendChild(navAboutLabel);
navSettings.appendChild(navSettingsLabel);

theOverflow.appendChild(navNightMode);
theOverflow.appendChild(navSettings);
theOverflow.appendChild(navInstructions);
theOverflow.appendChild(navAbout);


/* ##### Custom select control ##### */

function createSelect(elem) {

var selectedList = document.getElementById(elem).getElementsByClassName("visualSelect")[0];
var selectedListInput = document.getElementById(elem).getElementsByTagName("input")[0];
var selectedListText = document.getElementById(elem).getElementsByTagName("button")[0];
var selectedListContainers = selectedList.getElementsByClassName("selectButtonContainer");
var selectedListButtons = selectedList.getElementsByTagName("button");

$(selectedList).show();

$(selectedListButtons).click(function() {

    // Reset Fill menu when switching between standand and alternate brushes
    if (isNaN(this.value) == true) { // Don't swap palette/fill menu for button_selectAnimatedBrushSpeed and button_selectStrobe

        // Display fill menu if previously hidden by a non-filled brush (flame, etc.)
        $("#fieldset_fill").show();

        // Set fills for alternate brushes
        if (this.value == "eightBitBrush" || this.value == "brush_dots" || this.value == "brush_circles" || this.value == "brush_sparkles" || this.value == "brush_snowflakes") {

            localStorage.setItem("brushType", "alt");                

        }

       // Hide the fill menu for brushes that don't take a fill (flame)
        else if (this.value == "brush_flame") {
            $("#fieldset_fill").hide();
        }

        // Set fills for standard brushes
        else {

            localStorage.setItem("brushType", "standard");                

        }

    }


    // Show fills for standard brushes
    if (localStorage.getItem("brushType") == "standard") {

            $(".select_menu_link").removeClass("active");
            $(".select_menu_link").removeClass("disabled");
            $("#select_menu_colors").addClass("active");

            $(".visualSelect_list_item").hide();
            $(".visualSelect_list_item-colors").show(); 
    }

    // Show fills for alternate brushes
    else if (localStorage.getItem("brushType") == "alt") {
           $("#button_selectFill").html("Spectrum Stripes");
           $("#visualSelect_fillValue").val("stripes_spectrum");

           $(".select_menu_link").removeClass("active");
           $("#select_menu_stripes").addClass("active");
  
           $("#select_menu_colors").addClass("disabled");
           $("#select_menu_gradient").addClass("disabled");
           $("#select_menu_cycles").addClass("disabled");        
    }

    $(selectedListInput).val(this.value);

    if (elem != "fieldset_stencil") {
        $(selectedListText).html(this.innerHTML); // Update the button label
        }
    else {
        selectedListText.className = this.value; // Stencils, display graphic button label with a class name
        }

    $(selectedList).hide();
    return false;
    });

selectedList.style.height = heightForPages+"px";

}    


/* ##### Set brush size ##### */
var brushsize;
var defaultBrushsize = 100;

function setBrushSize() {
    var brushsize = localStorage.getItem('brushsize');
    if (brushsize==null) {brushsize = defaultBrushsize}
    var brushsizeClassname = "brushsize_"+brushsize;
    $("#container_brushsize").removeClass().addClass(brushsizeClassname);
    $("#overflow_brushSize").html(" ("+brushsize+"%)");
}


/* ##### Return to page ##### */

function returnToPage(thePage, theFrame) {
    $("header").show();
    $(thePage).show();
    $(theFrame).hide();
}


/* ##### Toggle night mode theme ##### */

function getTheme() {
    if (localStorage.getItem("mode") == "night") {$("body").toggleClass("nightMode");}
    }
 
function toggleTheme() {
    $("body").toggleClass("nightMode");
     var theMatch = $("body").attr("class").match(/nightMode(\d*)/);
        if (theMatch == "nightMode,") {
            localStorage.setItem("mode", "night");            
            }
        else {
            localStorage.setItem("mode", "day");
            }
    $("#overflow_menu").popup("close");
}


/* ##### Toggle pause screen ##### */

function togglePauseScreen() {
    if (localStorage.displayPausedTips == "show") {
    $("#toggleBackground").toggle();        
    }
}



/* ##### Settings - default settings ##### */

if (localStorage.displayPausedTips == null) {
    localStorage.displayPausedTips = "show";
}