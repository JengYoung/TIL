import { Game } from "./Game.js";

(function() {
  
  window.onload = function() {
    if (!document.getElementById('gameSvg')) return;
    Game.mediator().startGame();
  };
}());