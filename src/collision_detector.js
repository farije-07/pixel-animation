import { CollisionHandler } from "./event_handler.js";


export function addCollisionEntry(index, thisObject) {
  if (CollisionDetector.xRay[index] && CollisionDetector.xRay[index].length > 0) {
    CollisionDetector.xRay[index].push(thisObject)
  } else {
    CollisionDetector.xRay[index] = [thisObject]
  }
}

/**
 * Diese Klasse beinhaltet Funktionen die verwendet werden um
 * Kollisionen zwischen Kacheln zu erkennen.
 * Kollisionen können nur stattfinden wenn die Kacheln auf
 * dem gleichen Layer sind. So können Kollisionen zwischen 
 * Kacheln auf unterschiedlichen Layern erlaubt werden, der
 * Spieler kann beispielsweise durch einige Objekte hindurch 
 * laufen, und von anderen blockiert werden.
 */
export default class CollisionDetector {
    static layers = {
        world: [],
        forest: [],
        pickups: [],
        cave: [],

    }

    static xRay = {}
    static clearXRay() {
        CollisionDetector.xRay = {}
    }

    static clear() {
      CollisionDetector.layers = {
        world: [],
        forest: [],
        pickups: [],
        cave: [],
      }
    }

    /**
     * Prüfe ob eine Kollision auf einem bestimmten Layer vorliegt.
     * @param {string} layerName Der Layer, dessen Kollisionen geprüft werden sollen.
     * Wir "all" als layerName verwendet, werden Kollisionen auf allen 
     * Layern geprüft.
     */
    static checkCollision(){
        const possibleCollisions = Object.values(CollisionDetector.xRay).filter((value) => {
            return value.length > 1
        })
        Object.values(possibleCollisions).forEach((value) => {
            value.forEach(tile => {
                value.forEach(other => {
                    if (tile === other) {
                        return false
                    } else {
                        const h1 = new Hitbox(tile);
                        const h2 = new Hitbox(other);
                        const collision = CollisionDetector.hitboxOverlapping(h1, h2);
                        if (collision && tile.handlers.get(CollisionHandler)) {
                            tile.handlers.get(CollisionHandler)._handleEvents(tile, {other: other})
                        }
                    }
                })
            })
        })
    }
    /**
     * Prüft ob die Hitboxes von 2 Objekten eine Überschneidung haben.
     * @returns {boolean} Wenn die Hitboxes eine Überschneidung haben, wird `true` zurückgegeben. Ansonsten `false`.
     */
    static hitboxOverlapping(h1, h2) {
        if ( h1.getRight() > h2.getLeft() && h1.getLeft() < h2.getRight()) {
            if ( h1.getBottom() > h2.getTop() && h1.getTop() < h2.getBottom() ) {
                return true
        }
        }
                return false
    }
    
}

/**
 * Berechnet die Überschneidung von 2 Kacheln in Pixeln.
 * @param {GameObject} tile Das erste GameObject, welches Teil der Kollision ist.
 * @param {GameObject} other Das zweite GameObject, welches Teil der Kollision ist.
 * @returns {Object} Die Überschneidung in Pixeln für x-Richtung und y-Richtung.
 */
export function calculatePenetration(tile, other) {
    const h1 = new Hitbox(tile);
    const h2 = new Hitbox(other);
    // only on the x-Axis
    let c1 = h1.getCenter()
    let c2 = h2.getCenter()

    let x = h1.getRight() - h2.getLeft()
    if (c1.x > c2.x) {
        x = h1.getLeft() - h2.getRight()
    }

    let y = h1.getBottom() - h2.getTop()
    if (c1.y > c2.y) {
        y = h1.getTop() - h2.getBottom()
    }

    return {x: x, y: y}

}

/**
 * Hilfsklasse um die Abgrenzung von Kacheln zu berechnen.
 */
class Hitbox {
    constructor(tile) {
        this.x = tile.x
        this.y = tile.y
        this.tileWidth = tile.tileWidth
        this.tileHeight = tile.tileHeight
    }

    getLeft() {
        return this.x
    }
    getTop() {
        return this.y
    }
    getRight() {
        return this.x + this.tileWidth
    }
    getBottom() {
        return this.y + this.tileHeight
    }
    getCenter() {
        return {
            x: this.x + this.tileWidth / 2,
            y: this.y + this.tileHeight / 2,
        }
    }
}
