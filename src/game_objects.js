import {AnimationHandler, CollisionHandler, GravityHandler, HandlerManager} from "./event_handler.js"
import { findAndRemoveFromList } from "./utils.js"
import TileRegistry from "./tile_registry.js"
import CollisionDetector from "./collision_detector.js"

/**
 * Dies ist die Basisklasse für alle Spiel-Objekte.
 * 
 * Wenn ein spezialisiertes Spiel-Objekt erzeugt wird, dann soll es 
 * immer diese Klasse erweitern. Wenn die Funktionen von der Basisklasse
 * überschrieben werden, sollten diese immer zuerst mit `super.function()` 
 * aufgerufen werden, so das die eigentliche Funktionalität der Spiel-Objekte
 * erhalten bleibt.
 */
export class GameObject {
  constructor(x, y, options = {sheet, layer: "background", collisionTags: []}) {
    this.sheet = options.sheet
    this.tileSize = 32
    this.x = x * this.tileSize
    this.y = y * this.tileSize
    this.col = 0
    this.row = 0
    this.layer = options.layer
    this.handlers = new HandlerManager([])
    TileRegistry.layers[this.layer].push(this)
    this.collisionTags = options.collisionTags
    this.collisionTags.forEach(tag => {
      CollisionDetector.layers[tag].push(this)
    })
  }

  /**
   * Zeichnet das Spiel-Objekt auf das Canvas. Das Spiel-Objekt
   * kennt dabei seine Position und welches Bild gezeichnet werden soll.
   * @param {CanvasRenderingContext2D} ctx Das Canvas, worauf das Spiel-Objekt gezeichnet werden soll.
   */
  draw(ctx) {
    ctx.drawImage(
      this.sheet,
      this.col * this.tileSize, this.row * this.tileSize, this.tileSize, this.tileSize,
      this.x, this.y, this.tileSize, this.tileSize
    )
  }

  /**
   * Zerstört das Spiel-Objekt und entfernt es aus dem Spiel.
   */
  destroy() {
    findAndRemoveFromList(TileRegistry.layers[this.layer], this)
    this.collisionTags.forEach(tag => {
      findAndRemoveFromList(CollisionDetector.layers[tag], this)
    })
  }

  /**
   * Berechne die Position und andere Eigenschaften des 
   * Spiel-Objekts neu. Wie das gemacht wird, wird in den 
   * verschieden Handlers angegeben. Ein Spiel-Objekt kann
   * z.B. einen Gravitations-Handler haben, dieser fügt dann
   * Gravitation für dieses Spiel-Objekt hinzu und berechnet die 
   * y-Position des Spiel-Objekts neu.
   */
  update(){
    this.handlers && this.handlers.runAll(this)
  }


}

export class Background extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#boden")
    super(x, y, {
      sheet: boden,
      layer: "background",
      collisionTags: []
    })

    this.row = 0
    this.col = 0
  }
}

export class Tree extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["forest"]
    })
    this.row = 0
    this.col = 5

  }
}


export class Stone extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 0
    this.col = 1
  }
}
export class Blackstone extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["pickups"]
    })
    this.row = 0
    this.col = 4
  }
}

export class Wall extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 1
    this.col = 3
  }
}

export class Cave extends GameObject {
  constructor(x, y, level) {
    const ground = document.querySelector("#ground")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["cave"]
    })
    this.row = 1
    this.col = 2
    this.level = level
  }
}


export class FallingStone extends Stone {
  constructor(x, y) {
    super(x, y)
    this.handlers = new HandlerManager([
      new GravityHandler({
        maxGravity: 3,
        gravityForce: 1
      }),
      new CollisionHandler()
    ])
  }
  
}




export class Mushroom extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["pickups"]
    })
    this.row = 0
    this.col = 2
  }
}



export class MushroomGiftig extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["pickups"]
    })
    this.row = 1
    this.col = 5
  }
}

export class Flower extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["pickups"]
    })
    this.row = 0
    this.col = 3
  }
}
export class Wolke extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.col = 4
    this.row = 1
  }
}


export class Turm extends GameObject{
  constructor(x,y){
    const turm = document.querySelector("#turmgross")
    super(x,y,{
      sheet: turm,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row  = 0
    this.col = 0
    this.tileSize = 160
  }
}


class AnimatedGameObject extends GameObject {
  constructor(x, y, options) {
    super(x, y, options)
    this.frameCounter = 0
    this.dx = 0
    this.dy = 0
  }

  update() {
    super.update()
    this.x = this.x + this.dx
    this.y = this.y + this.dy
    this.dx = 0
    this.dy = 0
  }
}


export class Player extends AnimatedGameObject {
  constructor(x, y) {
    const img = document.querySelector("#character")
    super(x, y, {
      sheet: img,
      layer: "player",
      collisionTags: ["world", "pickups", "cave", "forest"]
    })
    this.row = 0
    this.col = 0
    this.speed = 3
    this.handlers = new HandlerManager([
      new CollisionHandler(),
      new AnimationHandler({ framesPerAnimation: 15, numberOfFrames: 1})
    ])
  }
  
  update() {
    super.update()
  }

  move(direction) {
    if (direction === "up") {
      this.dy = this.dy + (-1) * this.speed
      this.row = 0
    } else if (direction === "down") {
      this.dy = this.dy + (1) * this.speed
      this.row = 0
    } else if (direction === "left") {
      this.dx = this.dx + (-1) * this.speed
      this.row = 0
    } else if (direction === "right") {
      this.dx = this.dx + (1) * this.speed
      this.row = 0
    }
  }
}
export class Drache extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#drache")
    super(x, y, {
      sheet: drache,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 0
    this.col = 0
    this.tileSize = 62
    this.speed = 5 // Geschwindigkeit des Drachen in der x-Achse
  }

  update() {
    // Aktualisiere die x-Position des Drachen
    this.x += this.speed;

    // Überprüfe, ob der Drachen das Spielfeld verlässt, und ändere seine Richtung gegebenenfalls
    if (this.x < 0) {
      this.x = 0;
      this.speed = -this.speed;
    } else if (this.x > canvas.width) {
      this.x = canvas.width;
      this.speed = -this.speed;
    }

    super.update();
  }


}
export class Prinzessin extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#prinzessin")
    super(x, y, {
      sheet: prinzessin,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 0
    this.col = 0
   
  }
}

export class FlowerBunt extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["pickups"]
    })
    this.row = 0
    this.col = 6
  }
}