import Map from "./map.js"
import CollisionDetector from "./collision_detector.js"
import Camera from "./camera.js"
import TileRegistry from "./tile_registry.js"
import EventHandler from "./event_handler.js"


/**
 * Diese Klasse enthält die globalen Variablen für das Spiel,
 * sowie das GameLoop, welches das Spiel zeichnen soll.
 */
export default class Game {

  static map = null;
  static player = null;
  
  static running = false;
  static currentFrame = 0;
  static canvas = document.querySelector("#canvas")
  static tileWidth = 32
  static tileHeight = 32
  static instance = null


  constructor() {
    Game.instance = this
    Game.canvas.width = 10 * Game.tileWidth
    Game.canvas.height = 15 * Game.tileHeight
    this.ctx = Game.canvas.getContext("2d")
    this.ctx.imageSmoothingEnabled = false

    new EventHandler()

    Game.loadMap("maps/map-01.txt")

    this.camera = new Camera(this)

    /*document.querySelector("#game-start").addEventListener("click", () => { Game.start() })
    document.querySelector("#game-pause").addEventListener("click", () => { Game.pause() })*/

    Game.running = false
    window.requestAnimationFrame(this.gameLoop.bind(this))
  }

  /**
   * Startet das Spiel.
   * 
   * Das Spiel wird gestartet indem die Animationsschleife
   * des Spiels aufgerufen wird.
   */
  static start() {
    Game.running = true
    Game.countdown = setInterval(Game.countdown, 1000)
  }

  /**
   * Pausiert das Spiel.
   * 
   * Die Animationsschleife des Spiels wird unterbrochen,
   * dadurch wird das Spiel pausiert.
   * 
   * Um das Spiel weiterlaufen zu lassen, muss die Methode 
   * `start()` aufgerufen werden.
   */
  static pause() {
    document.querySelector("body").classList.add("paused")
    Game.running = false
  }

  static loadMap(mapfile) {
      TileRegistry.clear()
      CollisionDetector.clear()
      Game.player = null
      Game.map = new Map(mapfile)


  }
  static updateMushroom(value) {
    const elem = document.querySelector("#mushroom-counter")
    let count = parseInt(elem.textContent)
    elem.textContent= count + value

  }
  static resetMushroom() {
    const elem = document.querySelector("#mushroom-counter")
    elem.textContent= 0

  }
  static countdown (){
    const elem = document.querySelector("#count-down")
    let count = parseInt(elem.textContent)
    if (count <= 0) {
      elem.textContent = 20
      alert("Das Spiel ist vorbei!")
      Game.resetMushroom()
      Game.loadMap("maps/map-01.txt")
    } else {
      elem.textContent= count -1
    }

  }

  /**
   * Berechnet jeweils das nächste Frame für das Spiel.
   * Die Positionen der Spiel-Objekte werden neu berechnet,
   * die Kamera wird korrekt ausgerichtet und die 
   * Spiel-Objekte werden neu gezeichnet.
   */
  gameLoop() {

    Game.currentFrame++
    
    CollisionDetector.clearXRay()
    this.camera.clearScreen()
    this.camera.nextFrame()

    EventHandler.handleAllEvents()

    TileRegistry.updateAllTiles()
    CollisionDetector.checkCollision()

    this.camera.centerObject(Game.player)

    TileRegistry.drawAllTiles(this.ctx)

    if (Game.running === true) {
      window.requestAnimationFrame(this.gameLoop.bind(this))
    }
  }
}