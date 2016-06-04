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

        console.log('Received Event: ' + id);
    }
};


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
navColors.id = "showShapes";
navColors.className = "ui-link";
navColors.innerHTML = "Shapes";

var navBrushes = document.createElement("a");
navBrushes.href = "#";
navBrushes.id = "showBrushes";
navBrushes.innerHTML = "Patterns";

var navAnimatedBrushes = document.createElement("a");
navAnimatedBrushes.href = "#";
navAnimatedBrushes.id = "showAnimatedBrushes";
navAnimatedBrushes.innerHTML = "Animations";

var navStencils = document.createElement("a");
navStencils.href = "#";
navStencils.id = "showStencils";
navStencils.innerHTML = "Stencils";

var navFlashlight = document.createElement("a");
navFlashlight.href = "#";
navFlashlight.id = "showFlashlight";
navFlashlight.innerHTML = "Flashlight";

thePanelLogo.appendChild(thePanelLogoImage);
thePanel.appendChild(thePanelLogo);

thePanel.appendChild(navColors);
thePanel.appendChild(navBrushes);
thePanel.appendChild(navAnimatedBrushes);
thePanel.appendChild(navStencils);
//thePanel.appendChild(navFlashlight);



/* ##### Overflow menu ##### */


var theOverflow = document.getElementById("overflow_menu");

var navNightMode = document.createElement("a");
navNightMode.href = "#";
navNightMode.id = "nightMode";
navNightMode.innerHTML = "Night mode";

var navNightModeToggle = document.createElement("span");
navNightModeToggle.className = "nightMode_toggleIndicator";

var navInstructions = document.createElement("a");
navInstructions.href = "#";
navInstructions.id = "instructions";
navInstructions.innerHTML = "Instructions";

var navAbout = document.createElement("a");
navAbout.href = "#";
navAbout.id = "about";
navAbout.innerHTML = "About";

var navSettings = document.createElement("a");
navSettings.href = "#";
navSettings.id = "settings";
navSettings.innerHTML = "Brush size";

navNightMode.appendChild(navNightModeToggle);
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

/* ##### Set brush size ##### */
var brushsize;
var defaultBrushsize = 100;

