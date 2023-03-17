/**
 * Hilfsklasse um alle Kacheln in einem Spiel zu verwalten.
 */
export default class TileRegistry {
  static layers = {
      background: [],
      item: [],
      world: [],
      player: [],
    }

  /**
   * Zeichne alle Kacheln die in dem Spiel sind auf das Canvas.
   * @param {CanvasRenderingContext2D} ctx Das Canvas, worauf alle Kacheln gezeichnet werden.
   */
  static drawAllTiles(ctx) {
    Object.entries(TileRegistry.layers).forEach(([_, layer]) => {
      layer.forEach(tile => {
        tile.draw(ctx)
      })
    })
  }

  /**
   * Rufe die Update-Funktion auf allen Kacheln auf um die
   * Positionen der Kacheln berechnen zu lassen.
   */
  static updateAllTiles() {
    Object.entries(TileRegistry.layers).forEach(([_, layer]) => {
      layer.forEach(tile => {
        tile.update()
      })
    })
  }

  static clear() {
    TileRegistry.layers = {
      background: [],
      item: [],
      player: [],
      world: [],
    }
  }


}