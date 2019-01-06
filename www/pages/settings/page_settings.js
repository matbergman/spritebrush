$(document).ready(function(){

	/* ##### Check if night mode skin is enabled */
	getTheme();


	/* Brush size button */

	if (localStorage.brushsize == null) {brushsize = defaultBrushsize;}
	else {brushsize = localStorage.brushsize;}
	document.getElementById("button_selectBrushsize").innerHTML = brushsize+"%";


	$("#button_selectBrushsize").on("click", function() {
	    createSelect("fieldset_brushsize"); 
	    return false;
	});

	/* Save the selected brush size to local storage for use on all pages */
	$(".selectButton").on("click",function() {
	    localStorage.brushsize = this.value;
	});

	/* Radio buttons */
	$("#pausedTips_"+localStorage.displayPausedTips).prop("checked", true);


	$(".radioButton").on("change",function() {
		this.checked = true;
		localStorage.displayPausedTips = this.value;
	});


});
