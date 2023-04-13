import Game from "./game.js"

const config = {
  "keys": {
    "KeyW": function() { Game.player.move("up")},
    "KeyA":function() { Game.player.move("left")},
    "KeyS": function() { Game.player.move("down")},
    "KeyD": function() { Game.player.move("right")},
    

    
    
    

   
  }
}


export default config;