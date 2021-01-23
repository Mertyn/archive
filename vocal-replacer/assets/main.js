var selector = document.getElementById("selector");
var button = document.getElementById("replace");
var input = document.getElementById("input");
var clear = document.getElementById("clear");

var revert = false;
var beforeText = "";

button.onclick = function() {
	if (input.value == "") return;

	if (!revert) {
		var text = beforeText = input.value;
		var replacement = selector.value;
		input.value = replaceVocal(text, replacement);

		button.innerText = "Revert";
		revert = input.readOnly = true;
	} else {
		input.value = beforeText;
		button.innerText = "Replace";
		revert = input.readOnly = false;
	}
}

clear.onclick = function() {
	input.value = "";

	if (revert) {
		input.value = "";
		button.innerText = "Replace";
		revert = input.readOnly = false;
	}
}

function replaceVocal(text, replacement) {
	var newText = text.replace(/[aeiouäöü]/g, replacement.toLowerCase());
	newText = newText.replace(/[AEIOUÄÖÜ]/g, replacement.toUpperCase());

	return newText;
}