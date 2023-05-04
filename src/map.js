import Game from "./game.js"
<<<<<<< HEAD
import { Background, FallingStone, Mushroom, Player, Stone, Tree, Wall, Cave, Flower, Drache, Prinzessin, Turm, Wolke, MushroomGiftig  } from "./game_objects.js"
=======
import { Background, FallingStone, Mushroom, Player, Stone, Tree, Wall, Cave, Flower, Drache, Blackstone } from "./game_objects.js"
>>>>>>> veränderung1

/**
 * Diese Klasse liest eine Kartendatei und erstellt die Spiel-Objekte
 * an den Stellen die in der Karte angegeben sind.
 */

export default class Map {
  constructor(mapFile) {
    document.querySelector("#game-audio1").play()
    this._readMapFile(mapFile)
    if (mapFile==="maps/map-02.txt") {
      
      document.querySelector("#challenge").textContent = "Challenge 2: Laufe durch den Labyrinth und sammle 10 Blume Chae "
     "Challenge 3"                                                     
    }

    
  
  }

  /**
   * Erstelle neue Spiel-Objekte an den jeweiligen Stellen.
   * @param {number} x Die x-Koordinate, an der die Spiel-Objekte erstellt werden.
   * @param {number} y Die y-Koordinate, an der die Spiel-Objekte erstellt werden.
   * @param {string} tileType Der Buchstabe an der Stelle in der Karte.
   */
  addTilesToMap(x, y, tileType) {
    new Background(x, y)
    if ( tileType === "j" ) { new JumpStone(x, y) }
    if ( tileType === "s" ) { new Stone(x, y) }
    if ( tileType === "S" ) { new FallingStone(x, y) }
    if ( tileType === "t" ) { new Tree(x, y) }
    if ( tileType === "p" ) { new Mushroom(x, y) }
    if ( tileType === "w" ) { new Wall(x, y) }
    if ( tileType === "h" ) { new Cave(x, y, 2) }
    if ( tileType === "f" ) { new Flower(x, y, ) }
    if ( tileType === "P" ) { Game.player = new Player(x, y)}
    if (tileType === "D")   { new Drache(x,y)}
    if (tileType === "r")   { new Prinzessin(x,y)}
    if ( tileType === "w" ) { new Wall(x, y) }
    if ( tileType === "g" ) { new Turm(x, y) }
    if ( tileType === "W" ) { new Wolke(x, y) }
    if ( tileType === "G" ) { new MushroomGiftig(x, y) }

   
   
  }

  /**
   * Liest die Karte aus der Datei und ruft die Erstellung der Spiel-Objekte auf.
   */
  _readMapFile(filename) {
    fetch(filename)
      .then((res) => res.text())
      .then((data) => {
        let rows = data.split("\n")
        for (let y = 0; y < rows.length; y++) {
          let row = rows[y].split("")
          for (let x = 0; x < row.length; x++) {
            this.addTilesToMap(x, y, row[x])
          }
        }
      })
  }
}

