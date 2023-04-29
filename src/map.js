import Game from "./game.js"
import {
  Background,
  FallingStone,
  Mushroom,
  Player,
  Stone,
  Tree,
  Wall,
  Cave,
  Flower,
  Turm,
  FlatPlayer, JumpStone
} from "./game_objects.js"

/**
 * Diese Klasse liest eine Kartendatei und erstellt die Spiel-Objekte
 * an den Stellen die in der Karte angegeben sind.
 */
export default class Map {
  constructor(mapFile) {
    this._readMapFile(mapFile)

    
    if (mapFile==="maps/map-02.txt") {
      alert("Du hast es geschafft!")
      clearInterval(Game.countdown)
      document.querySelector("#challenge").textContent = "&hearts; Challenge 2: Laufe durch den Labyrinth und sammle 10 Blumen &hearts;"
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
    if ( tileType === "s" ) { new Stone(x, y) }
    if ( tileType === "S" ) { new FallingStone(x, y) }
    if ( tileType === "j" ) { new JumpStone(x, y) }
    if ( tileType === "t" ) { new Tree(x, y) }
    if ( tileType === "p" ) { new Mushroom(x, y) }
    if ( tileType === "w" ) { new Wall(x, y) }
    if ( tileType === "h" ) { new Cave(x, y, 2) }
    if ( tileType === "f" ) { new Flower(x, y, ) }
    if ( tileType === "P" ) { Game.player = new Player(x, y)}
    if ( tileType === "F" ) { Game.player = new FlatPlayer(x, y)}
    if ( tileType === "T")  {new Turm (x, y)}
    
    
    
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

