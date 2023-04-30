# Simple Game in Javascript

Dieses Projekt ist ein einfaches Spiel in Javascript. Es zeigt eine Top-Down Ansicht 
von einem Spieler, der sich auf einer Karte bewegen kann.

Das Spiel kann [hier](https://cedricgeissmann.github.io/pixel-animation) direkt getestet werden.

# Changes

## v1.12

- Objekte können nun unterschiedliche Höhe und Breite haben. Diese können mit `tileHeight` und `tileWidth` angegeben werden. Kann im `Player` nachgeschaut werden.

## v1.11

- Es kann nun ein Cooldown bei Aktionen die in `config.js` definiert werden, hinzugefügt werden.

## v1.10

- Das Spiel kann nun pausiert werden, und wieder gestartet.

## v1.9

- Handler für SpielObjekte sind intuitiver und können einfach zu Objekten hinzugefügt werden.
- Objekte können *geworfen* werden, dafür gibt es einen `ProjectileHandler`.
- CollisionTags werden nicht mehr auf dem SpielObjekt, sondern beim CollisionHandler definiert.

## v1.8

Schnelleres erkennen von Kollisionen. Es können nun viele Spielobjekte platziert werden, ohne dass das Spiel sehr langsam wird.

## v1.7

Es gibt einen Hintergrund, den man auf dem Spielfeld setzen kann. Der Hintergrund verschiebt sich mit dem Spieler.

## v1.6

Es ist nun möglich mit mehreren Spielern zu spielen.

- Das Eingabesystem wurde überarbeitet. Eingaben werden nun in `config.js` angegeben.

## v1.5

Der Code wurde eine wenig umstrukturiert. Dort wo möglich wurden statische Variablen verwendet (Vorsicht bei Grossschreibung von Klassen). Es wurden ausserdem noch Helferfunktionen hinzugefügt und ein neues Kollisions-Tag.

- Kollisions-Tag `cave`: Neu gibt es die Möglichkeit mit Objekten vom Typ `cave` zu kollidieren. Als Antwort auf die Kollision kann zum Beispiel eine neue Karte geladen werden.

- Neue Karte laden: Die Klasse `Game` hat eine statische Funktion `loadMap(mapname)` erhalten. Damit kann eine neue Karte geladen werden.
**Achtung**: Der Spieler wird dabei neu erstellt, alle Änderungen während des Spiels gehen also verloren.

- `TileRegistry` und `CollisionDetector` haben eine Funktion `clear` erhalten. Damit können alle Tiles gelöscht werden. Dies ist praktisch, wenn Sie eine neue Karte laden.

- Weitere kleine Änderungen die keine grosse Auswirkung haben.