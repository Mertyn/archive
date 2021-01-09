function init() {
  document.onclick = title.init;

  if (!"serviceWorker" in navigator) {
    document.getElementById("offline").remove();
  }
}

var title = {
  init: function() {
    document.onclick = undefined;
    document.documentElement.classList.remove("pointer");

    game.display.hide("tap-to-start", 300);
    document.getElementById("logo").style.fontSize = "10vh";
    document.getElementById("logo").style.marginTop = "15vh";
    setTimeout(function() {
      game.display.show("menu", 300);
    }, 300);
  }
};

var game = {
  x: 0,
  velocity: 1,
  score: -1,
  high: 0,
  speed: 500,
  draw: null,
  serviceWorker: null,

  // Set interval for updating the game
  init: function() {
    // Hide Title screen and show game screen
    document.getElementById("title").style.opacity = 0;
    setTimeout(function() {
      document.getElementById("title").style.display = "none";
      document.getElementById("game").style.display = "block";
    }, 200);

    setTimeout(function() {
      document.getElementById("game").style.opacity = 1;
      // game.init();
    }, 300);

    // Set up input
    document.onclick = game.tap;
    document.documentElement.classList.add("pointer");

    addEventListener("keydown", function(e) {
      if (e.keyCode == 32) game.tap();
    });

    // Load highscore from cookie
    if (game.cookie.get("high") == "") game.cookie.setHigh();
    game.high = parseInt( game.cookie.getHigh() );
    game.display.text("high", game.cookie.getHigh());


    // Set rendering interval
    game.draw = setInterval(game.update, game.speed);
    if (game.high > 0) document.getElementById("tap-on-green").style.opacity = 0;
  },

  // Update function
  update: function() {
    if (game.high > 0) document.getElementById("tap-on-green").style.opacity = 0;

    game.display.shrink(game.x);

    if (game.x == -2 || game.x == 2) {
      game.velocity = -game.velocity;
    }
    game.x += game.velocity;

    game.display.grow(game.x);
  },

  // Function for setting a new speed/delay
  setSpeed: function(speed) {
    clearInterval(game.draw);
    var rounds = document.querySelectorAll(".round");
    for (var i = 0; i < rounds.length; i++) {
      rounds[i].style.transition = "all " + speed / 2 + "ms ease-in-out";
    }
    game.draw = setInterval(game.update, speed);
    game.speed = speed;
  },

  // Functions for interaction with display
  display: {
    // Set text in element
    text: function(elemId, text) {
      document.getElementById(elemId).innerText = text;
    },

    // Grow and shrink
    grow: function(elemId) {
      // document.getElementById(elemId).style.transform = "scale(1.3)";
      document.getElementById(elemId).classList.add("grown");
    },

    shrink: function(elemId) {
      // document.getElementById(elemId).style.transform = "none";
      document.getElementById(elemId).classList.remove("grown");
    },

    // Hide and show
    hide: function(elemId, delay, easing) {
      var elem = document.getElementById(elemId);
      easing = easing || "linear";

      elem.style.transition = "opacity " + delay.toString() + "ms " +  easing;
      elem.style.opacity = "0";
      setTimeout(function() {
        elem.style.display = "none";
      }, delay);
    },

    show: function(elemId, delay, easing) {
      var elem = document.getElementById(elemId);
      easing = easing || "linear";

      elem.style.transition = "opacity " + delay.toString() + "ms " +  easing;
      elem.style.opacity = "0";
      elem.style.display = "block";
      setTimeout(function() {
        elem.style.opacity = "1";
      }, 10);

    }
  },

  tap: function() {
    if (game.x == 0) {
      game.win();
      document.getElementById("tap-on-green").style.opacity = 0
    }
    else game.lose();
  },

  // Funtions for setting and getting cookies
  cookie: {
    set: function(cname,cvalue,exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },

    get: function(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
          }
      }
      return "";
    },

    setHigh: function() {
      game.high = game.score;
      game.display.text("high", game.high);
      this.set("high", game.high, 1000);
    },

    getHigh: function() {
      return this.get("high");
    }
  },

  // Function for winning
  win: function() {
    game.display.shrink(game.x);

    game.score++;

    if (game.score > game.high) {
      game.cookie.setHigh();
      document.getElementById("new-high-one").style.display = "inline-block";
      document.getElementById("new-high-two").style.display = "inline-block";
    }

    game.display.text("score", game.score);

    game.x = getRandomInt(-1, 2);
    game.setSpeed(game.speed - 20);
  },

  // Function for losing
  lose: function() {
    game.display.shrink(game.x)

    game.score = 0;

    document.getElementById("new-high-one").style.display = "none";
    document.getElementById("new-high-two").style.display = "none";

    game.display.text("score", game.score);
    document.getElementById("score").style.color = "#d32f2f";
    setTimeout(function() {
      document.getElementById("score").style.color = "white";
    }, 200);

    game.x = getRandomInt(-1, 2);
    game.setSpeed(500);
  },

  offline: function(elem) {
    navigator.serviceWorker.register("./sw.min.js").then(function(registration) {
      game.serviceWorker = registration;
      alert("This game is now available offline.");
    });

  },

  reset: function() {
    if (confirm("Are you sure you want to reset your highscore?")) {
      if (confirm("Are you reeeeaaaaaaly sure though?")) {
        game.cookie.set("high", 0);
        alert("Ok. Your highscore has been reset.")
      }
    }
  }
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
