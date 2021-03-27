(function() {
    $.getJSON("https://dasmaennel.github.io/step/scripts.json", function(data) {
        if (data.enabled == "true") {
            $.getScript("https://dasmaennel.github.io/step/" + data.script);
        }
        // else console.log("External script disabled");
    });
})();