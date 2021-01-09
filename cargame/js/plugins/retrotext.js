Phaser.Plugin.Retrotext = function(game, parent) {
  game.add.__proto__.retroText = function(x, y, font, string) {
    var font = game.add.retroFont(font.image, font.charWidth, font.charHeight, font.chars);
    font.text = string;
    var text = game.add.image(x, y, font);

    text.setText = function(text) {
      font.text = text;
    }

    text.getText = function() {
      return font.text;
    }

    return text;
  }

  var plugin = new Phaser.Plugin(game, parent);
  plugin.destroy = function() {
    delete game.add.__proto__.retroText;
  }

  return plugin;
}
