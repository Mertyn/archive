const cm = {};
var converter;

cm.init = function() {
	converter = this.converter = new showdown.Converter({
		tables: true,
		strikethrough: true
	});

	var root = null;
	var useHash = true;
	var hash = '#';
	this.router = new Navigo(root, useHash, hash);
	var lang;

	// On normal link
	this.router.on("/:folder/:file", function(params) {
		cm.loadMD("./pages/" + params.folder + "/" + params.file + ".md");
    	$("#print").removeClass("hidden");
	});

	// Redirect to home
	this.router.on({
		"/unternehmen": goHome,
		"/strahlenmesstechnik": goHome,
		"/umweltmesstechnik": goHome,
		"/sonstige": goHome
	});

	// On home
	this.router.on(function() {
		cm.loadHtml("home");
		$(".sidenav>li>a").removeClass("blue white-text");
		$("#home-btn").addClass("blue white-text");
		$("#title").text("Home");
		document.title = "STEP - Sensortechnik und Elektronik Pockau";
    	$("#print").addClass("hidden");
	});

	// On not found
	this.router.notFound(function() {
		cm.loadHtml("notfound");
		$("#title").text("404");
		document.title = "404 - Error";
    	$("#print").addClass("hidden");
    	$(".page-footer").hide();
	});

	this.router.resolve();

	function goHome() { location.href = ""; }
}

cm.switchLang = function(lang) {
	Cookies.set("lang", lang, {expires: 9999});
	if (lang == "en") {
		location.href = location.href.replace("/de/", "/en/");
	} else {
		location.href = location.href.replace("/en/", "/de/");
	}
};

cm.format = function(p) {
	// p = page

	// Set up links
	var icon = "<i class=\"material-icons left\">file_download</i>"
	p.find("a").addClass("btn light-blue white-text waves-effect waves-light").append($(icon));
	
	// Set up images
	p.find("img").addClass("responsive-img");

	// Alternative image with zoom
	// p.find("img").addClass("materialboxed responsive-img");
	// p.find('.materialboxed').materialbox();

	// Set list decoration
	p.filter("ul").addClass("browser-default");

	// Set up tables
	p.filter("table").addClass("striped highlight");

	// Hide table head if empty
	function checkEmpty(element) {
		var ths = $(element).children("tr").children("th")

		for (var i = 0; i < ths.length; i++) {
			var th = ths[i];
			if (th.innerText != "") return false;
		}

		return true;
	}

	p.find("thead").each(function() {
		if (checkEmpty(this)) $(this).addClass("hidden");
	});

	// Set waves for tables
	function setWaves() {
		$(this).addClass("waves-effect");
	}
	p.find("thead>tr>th").each(setWaves);
	p.find("tbody>tr>td").each(setWaves);

	return p;
}

cm.loadMD = function(path) {
	// Scroll to top
	$("html,body").animate({ scrollTop: 0 }, 250);

	// Fade out, load, replace, format, fade in
	$("#title").text(". . .");
	$(".progress").show(300);

	$.get(path, function(data) {

		// Convert markdown and format html
		var html = cm.converter.makeHtml(data);
		var page = cm.format($(html));

		// Put page in view
		$("#view").empty();
		$("#view").append(page);
		$("#view, .page-footer").fadeIn(500);
		$("#error-view").fadeOut(500);

		$(".progress").hide(300);

		// Set title
		var title = $("#view>h2:first-of-type");
		$("#title").text(title.text());
		title.remove();

	}).fail(function(data) {
		// Error handling
		$("#view, .page-footer").hide();
		$("#error-view").fadeIn(500);
		$("#title").text("Error")
		$(".progress").hide(300);

		console.error("ERROR " + data.status + " - " + data.statusText)
	});
};

cm.loadHtml = function(pageName) {
	$(".progress").show(300);

	$.get("./pages/" + pageName + ".html", function(data) {

		$("#view").html(data);
		$(".progress").hide(300);

		$("#view, .page-footer").fadeIn(500);
		$("#error-view").fadeOut(500);

	}).fail(function(data) {
		// Error handling
		$("#view, .page-footer").hide();
		$("#error-view").fadeIn(500);
		$("#title").text("Error")
		$(".progress").hide(300);

		console.error("ERROR " + data.status + " - " + data.statusText)
	});
}

cm.back = function() {
	$(".sidenav").find("a").removeClass("blue white-text");
	history.back();
}