import Game from "./game.js"

let game = new Game()
Game.start()
Game.playsound("Sounds/Wildest Dreams.mp3")





class Weapon {
    constructor (dmg, type) {
        this.dmg = 2 +  dmg
        this.type = type
    }
}

class Player {
    constructor(name, hp, dog) {
        this.name = name

        this.statsHp = 20 + hp
        this.statsArmor = 8
        this.statsDmg = 4 + dog
        this.statsMana = 100
        
        this.target = null
        
        watchElement(this)
    }

    actionAttack() {
        if (this.target == null) {
            errorLog("Es ist kein Ziel definiert.")
        }
        let doDmg = this.statsDmg

        if (this.weapon) {
            doDmg = doDmg + this.weapon.dmg
            if (this.weapon.type === "axe") {
                doDmg = doDmg * 2
        }
    }
        this.target.takeDamage(doDmg)
    }

    actionDie() {

        this.statsHP = 0

    }

    actionHeal () {
        this.statsHP = this.statsHP + 100
    }

    actionCastfireball () {
        if (this.statsMana >= 90) {
        this.takeDamage(20)
        this.target.takeDamage(50)
        this.statsMana -= 90
        } else {
            this.takeDamage(10)
        }

    }

    takeDamage(dmg) {
        let takeDmg = dmg
        this.statsHp = this.statsHp - takeDmg
    }
}

const p1 = new Player("a", 980, 4)
const enemy = new Player("j", 0, 0)


p1.target = enemy
enemy.target = p1


p1.weapon = new Weapon(24, "sword")
enemy.weapon = new Weapon (100, "fire")
