(function($){
  $(function(){
    
    $(document).ready(function(){
      // Initialize Materialized components
      M.AutoInit();
      $('.progress').hide();

      // Things
      $(".sidenav a:not(i)").addClass("waves-effect waves-blue");

      // Highlight respective link on sidenav
      var selectedLink;

      if (location.hash == "") {
        $("home-btn").addClass("blue white-text");
      }
      else {

        $(".sidenav a").each(function() {
          if (this.href.search(location.href) != -1) {
            $(this).addClass("blue white-text");
            selectedLink = this;
          }
        });

      }

      // Open sidenav dropdown
      var collapsible = M.Collapsible.getInstance($('.collapsible'));

      $(".sidenav a.collapsible-header").next().each(function(index) {
        if ($(this).find(selectedLink).length != 0) {
          collapsible.open(index);
        }
      });

  	});

    // Sidebar links onclick
    $(".sidenav>li>a").on("click", function(e) {
      $(".sidenav a").removeClass("blue white-text");
      $(e.target).addClass("blue white-text");
      // Close on mobile
      if (window.innerWidth <= 992) $(".sidenav").sidenav("close");
    });

    $("#home-btn").on("click", function(e) {
      $(".collapsible").collapsible("close");
    });

    $(".collapsible-body>ul>li>a").on("click", function(e) {
      $(".sidenav a").removeClass("blue white-text");
      $(e.target).addClass("blue white-text");
      // Close on mobile
      if (window.innerWidth <= 992) $(".sidenav").sidenav("close");
    });

    // Back to top button
    $("#back-to-top").on("click", function(e) {
      e.preventDefault();
      $("html,body").animate({
        scrollTop: 0
      }, 300);
    });

    // Print button
    $("#print").on("click", function(e) {
      e.preventDefault();
      // Open printing window, it does the rest itself
      window.open("print.html");
    });

    // Dev mode
    var input = "";
    $(document).keypress(function(e) {
      input += e.key.toLowerCase();
      if (input.search("käsekuchen") != -1) {
        console.log("DEVELOPER MODE ENGAGED. YOU HAVE THE FULL POWER!");
        input = "";
        $(".dev").removeClass("hidden");
      }
    });

    // Initialize content manager
    cm.init();

  }); // end of document ready
})(jQuery); // end of jQuery name space


function darkness() {
  $(document.body).addClass("grey darken-4 white-text");
  $(".sidenav").addClass("blue-grey darken-4 white-text");
  $(".sidenav>li>a").addClass("blue-grey darken-4 white-text");
  $(".divider").addClass("blue-grey darken-3");
  $(".collapsible-header").addClass("white-text");
  $(".collapsible-body").addClass("blue-grey darken-4");
  $(".collapsible-body>ul>li>a").addClass("white-text");

  $(".modal, .modal-footer").addClass("blue-grey darken-4");
  $(".modal-close").addClass("white-text");
  $(".material-icons").addClass("white-text");
}