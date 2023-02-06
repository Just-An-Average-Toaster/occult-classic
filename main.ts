namespace SpriteKind {
    export const Weapmon = SpriteKind.create()
    export const weapons = SpriteKind.create()
    export const Cursor = SpriteKind.create()
}
namespace StatusBarKind {
    export const Damage = StatusBarKind.create()
}
function moveBattleMenuSelection (direction: number) {
    if (Inbattle == 1) {
    	
    }
    if (direction == 0) {
        if (selectedMenuButton == dodgeMenuButton) {
            selectedMenuButton = fightMenuButton
        } else if (selectedMenuButton == itemsMenuButton) {
            selectedMenuButton = blockMenuButton
        }
    } else if (direction == 1) {
        if (selectedMenuButton == fightMenuButton) {
            selectedMenuButton = blockMenuButton
        } else if (selectedMenuButton == dodgeMenuButton) {
            selectedMenuButton = itemsMenuButton
        }
    } else if (direction == 2) {
        if (selectedMenuButton == fightMenuButton) {
            selectedMenuButton = dodgeMenuButton
        } else if (selectedMenuButton == blockMenuButton) {
            selectedMenuButton = itemsMenuButton
        }
    } else if (direction == 3) {
        if (selectedMenuButton == blockMenuButton) {
            selectedMenuButton = fightMenuButton
        } else if (selectedMenuButton == itemsMenuButton) {
            selectedMenuButton = dodgeMenuButton
        }
    }
    cursor.right = selectedMenuButton.left
    cursor.y = selectedMenuButton.y
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Inbattle == 1) {
        moveBattleMenuSelection(0)
    }
})
function destroyAllKind (kind: number) {
    for (let value of sprites.allOfKind(kind)) {
        value.destroy()
    }
}
function wildMoves () {
    animation.runMovementAnimation(
    otherWeapmon,
    animation.animationPresets(animation.easeLeft),
    animationTimer,
    false
    )
    pause(animationTimer)
    scene.cameraShake(2, 200)
    statusbars.getStatusBarAttachedTo(StatusBarKind.Health, Tomothymon).value += 0 - sprites.readDataNumber(otherWeapmon, "attack")
    animation.runMovementAnimation(
    otherWeapmon,
    animation.animationPresets(animation.easeRight),
    animationTimer,
    false
    )
    pause(animationTimer)
    checkBattleEnd()
}
function createMenuButtonSprite (text: string) {
    newMenuButton = textsprite.create(text, 12, 1)
    newMenuButton.setMaxFontHeight(8)
    newMenuButton.setBorder(0, 6, 1)
    return newMenuButton
}
function checkBattleEnd () {
    if (statusbars.getStatusBarAttachedTo(StatusBarKind.Health, Catmon).value == 0) {
        battleMenuIsOpen = false
        showOrHideWeapmon(Tomothymon, true)
        showOrHideWeapmon(Catmon, true)
        destroyAllKind(SpriteKind.Text)
        destroyAllKind(SpriteKind.Cursor)
        Inbattle = 0
        tiles.setCurrentTilemap(tilemap`temp map`)
        scene.cameraFollowSprite(Tomothy_Map)
        controller.moveSprite(Tomothy_Map)
        Tomothy_Map = sprites.create(assets.image`myImage0`, SpriteKind.Player)
        statusbars.getStatusBarAttachedTo(StatusBarKind.Health, Catmon).value = 20
    }
}
function weaponType (portrait: Image, name: string, dmg: number, attack: number) {
    weapons2 = sprites.create(portrait, SpriteKind.weapons)
    statusbar = statusbars.create(4 * attack, 4, StatusBarKind.Damage)
    statusbar.attachToSprite(weapons2, 1, 0)
    statusbar.positionDirection(CollisionDirection.Bottom)
    statusbar.setLabel("DMG", 12)
    statusbar.max = dmg
    statusbar.value = dmg
    textSprite = textsprite.create(name, 0, 12)
    textSprite.setMaxFontHeight(8)
    textSprite.top = weapons2.bottom + 8
    textSprite.left = weapons2.left - 9
    sprites.setDataSprite(weapons2, "label", textSprite)
    sprites.setDataString(weapons2, "name", name)
    sprites.setDataNumber(weapons2, "attack", attack)
    return weapons2
}
function SpawnEnemies () {
    for (let value2 of tiles.getTilesByType(assets.tile`myTile6`)) {
        CatMap = sprites.create(assets.image`myImage1`, SpriteKind.Enemy)
        tiles.placeOnTile(CatMap, value2)
        tiles.setTileAt(value2, assets.tile`myTile0`)
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (selectedMenuButton == fightMenuButton) {
        battleFight(currentWeapmon, otherWeapmon)
    } else if (selectedMenuButton == blockMenuButton) {
        battleBlock()
    } else if (selectedMenuButton == dodgeMenuButton) {
        battleDodge()
    } else if (selectedMenuButton == itemsMenuButton) {
        battleItems()
    }
})
function showOrHideWeapmon (theWeapmon: Sprite, shouldHide: boolean) {
    theWeapmon.setFlag(SpriteFlag.Invisible, shouldHide)
    sprites.readDataSprite(theWeapmon, "label").setFlag(SpriteFlag.Invisible, shouldHide)
    statusbars.getStatusBarAttachedTo(StatusBarKind.Health, theWeapmon).setFlag(SpriteFlag.Invisible, shouldHide)
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Inbattle == 1) {
        moveBattleMenuSelection(3)
    }
})
function battleDodge () {
	
}
function createWeapmon (portrait: Image, name: string, health: number, attack: number) {
    weapons2 = sprites.create(portrait, SpriteKind.Weapmon)
    statusbar = statusbars.create(32, 4, StatusBarKind.Health)
    statusbar.attachToSprite(weapons2, 1, 0)
    statusbar.positionDirection(CollisionDirection.Bottom)
    statusbar.setLabel("HP", 12)
    statusbar.max = health
    statusbar.value = health
    textSprite = textsprite.create(name, 0, 12)
    textSprite.setMaxFontHeight(8)
    textSprite.top = weapons2.bottom + 8
    textSprite.left = weapons2.left - 9
    sprites.setDataSprite(weapons2, "label", textSprite)
    sprites.setDataString(weapons2, "name", name)
    sprites.setDataNumber(weapons2, "attack", attack)
    return weapons2
}
function createBattleMenu () {
    fightMenuButton = createMenuButtonSprite("FIGHT")
    fightMenuButton.left = 10
    fightMenuButton.top = 60
    blockMenuButton = createMenuButtonSprite("BLOCK")
    blockMenuButton.left = 90
    blockMenuButton.top = 60
    dodgeMenuButton = createMenuButtonSprite("DODGE")
    dodgeMenuButton.left = 10
    dodgeMenuButton.top = 90
    itemsMenuButton = createMenuButtonSprite("ITEMS")
    itemsMenuButton.left = 90
    itemsMenuButton.top = 90
    battleMenuIsOpen = true
    selectedMenuButton = fightMenuButton
    cursor = sprites.create(assets.image`Cursor`, SpriteKind.Cursor)
    cursor.right = selectedMenuButton.left
    cursor.y = selectedMenuButton.y
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Inbattle == 1) {
        moveBattleMenuSelection(1)
    }
})
function moveWeapmon (theWeapmon: Sprite, x: number, y: number) {
    theWeapmon.setPosition(x, y)
    sprites.readDataSprite(theWeapmon, "label").top = weapons2.bottom + 8
    sprites.readDataSprite(theWeapmon, "label").left = weapons2.left - 9
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Inbattle == 1) {
        moveBattleMenuSelection(2)
    }
})
function battleBlock () {
	
}
function startBattle (myWeapmon: Sprite, enemyWeapmon: Sprite) {
    currentWeapmon = myWeapmon
    otherWeapmon = enemyWeapmon
    showOrHideWeapmon(enemyWeapmon, false)
    story.printDialog("A Wild " + sprites.readDataString(enemyWeapmon, "name") + " Appears!", 80, 90, 50, 150, 1, 12)
    story.printDialog("I Choose You " + sprites.readDataString(myWeapmon, "name") + "!", 80, 90, 50, 150, 1, 12)
    showOrHideWeapmon(myWeapmon, false)
    createBattleMenu()
}
function battleFight (weapmon: Sprite, enemy: Sprite) {
    animation.runMovementAnimation(
    Tomothymon,
    animation.animationPresets(animation.easeRight),
    animationTimer,
    false
    )
    pause(animationTimer)
    statusbars.getStatusBarAttachedTo(StatusBarKind.Health, enemy).value += 0 - sprites.readDataNumber(weapmon, "attack")
    animation.runMovementAnimation(
    Tomothymon,
    animation.animationPresets(animation.easeLeft),
    animationTimer,
    false
    )
    pause(animationTimer)
    wildMoves()
}
function changeWeap () {
    showOrHideWeapmon(Bat, false)
    pause(500)
    currentWeapmon = weaponsList[(weaponsList.indexOf(currentWeapmon) + 1) % weaponsList.length]
    showOrHideWeapmon(Bat, true)
}
function BattleTime () {
    scene.setBackgroundImage(assets.image`myImage`)
    animationTimer = 800
    tomothyHP = 20
    Inbattle = 1
    Bat = createWeapmon(img`
        . . 2 2 b b b b b . . . . . . . 
        . 2 b 4 4 4 4 4 4 b . . . . . . 
        2 2 4 4 4 4 d d 4 4 b . . . . . 
        2 b 4 4 4 4 4 4 d 4 b . . . . . 
        2 b 4 4 4 4 4 4 4 d 4 b . . . . 
        2 b 4 4 4 4 4 4 4 4 4 b . . . . 
        2 b 4 4 4 4 4 4 4 4 4 e . . . . 
        2 2 b 4 4 4 4 4 4 4 b e . . . . 
        . 2 b b b 4 4 4 b b b e . . . . 
        . . e b b b b b b b e e . . . . 
        . . . e e b 4 4 b e e e b . . . 
        . . . . . e e e e e e b d b b . 
        . . . . . . . . . . . b 1 1 1 b 
        . . . . . . . . . . . c 1 d d b 
        . . . . . . . . . . . c 1 b c . 
        . . . . . . . . . . . . c c . . 
        `, "Bat", tomothyHP, 6)
    moveWeapmon(Bat, 80, 20)
    Tomothymon = createWeapmon(assets.image`myImage0`, "Tomothy", tomothyHP, 4)
    scene.centerCameraAt(0, 0)
    tiles.setCurrentTilemap(tilemap`level3`)
    Inbattle = 1
    moveWeapmon(Tomothymon, 30, 20)
    Catmon = createWeapmon(assets.image`myImage1`, "Cat", 20, 3)
    moveWeapmon(Catmon, 130, 20)
    showOrHideWeapmon(Catmon, true)
    showOrHideWeapmon(Tomothymon, true)
    weaponsList = [Bat, Tomothymon]
    showOrHideWeapmon(Bat, true)
    startBattle(Tomothymon, Catmon)
}
function battleItems () {
    changeWeap()
    wildMoves()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    for (let value22 of sprites.allOfKind(SpriteKind.Enemy)) {
        if (Tomothy_Map.x < CatMap.x) {
            Tomothy_Map.x += -5
            Warningmeter += 1
        } else if (Tomothy_Map.x > CatMap.x) {
            Tomothy_Map.x += 5
            Warningmeter += 1
        }
        if (Angermeter == 0 && Warningmeter == 10) {
            story.spriteSayText(value22, "Hey man! Quit bumping into me!", 12)
            Warningmeter = 0
            Angermeter = 1
        } else if (Angermeter == 1 && Warningmeter == 10) {
            story.spriteSayText(value22, "Thats it! Bring it on!", 12)
            BattleTime()
        }
    }
})
let Angermeter = 0
let Warningmeter = 0
let tomothyHP = 0
let weaponsList: Sprite[] = []
let Bat: Sprite = null
let currentWeapmon: Sprite = null
let CatMap: Sprite = null
let textSprite: TextSprite = null
let statusbar: StatusBarSprite = null
let weapons2: Sprite = null
let battleMenuIsOpen = false
let Catmon: Sprite = null
let newMenuButton: TextSprite = null
let Tomothymon: Sprite = null
let animationTimer = 0
let otherWeapmon: Sprite = null
let cursor: Sprite = null
let blockMenuButton: TextSprite = null
let fightMenuButton: TextSprite = null
let itemsMenuButton: TextSprite = null
let dodgeMenuButton: TextSprite = null
let selectedMenuButton: TextSprite = null
let Inbattle = 0
let Tomothy_Map: Sprite = null
tiles.setCurrentTilemap(tilemap`temp map`)
SpawnEnemies()
Tomothy_Map = sprites.create(assets.image`myImage0`, SpriteKind.Player)
controller.moveSprite(Tomothy_Map)
scene.cameraFollowSprite(Tomothy_Map)
