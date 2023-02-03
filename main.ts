namespace SpriteKind {
    export const Weapmon = SpriteKind.create()
    export const weapons = SpriteKind.create()
}
namespace StatusBarKind {
    export const Damage = StatusBarKind.create()
}
function moveBattleMenuSelection (direction: number) {
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
    moveBattleMenuSelection(0)
})
function createMenuButtonSprite (text: string) {
    newMenuButton = textsprite.create(text, 12, 1)
    newMenuButton.setMaxFontHeight(8)
    newMenuButton.setBorder(0, 6, 1)
    return newMenuButton
}
function weaponType (portrait: Image, name: string, dmg: number, attack: number) {
    weapons = sprites.create(portrait, SpriteKind.weapons)
    statusbar = statusbars.create(4 * attack, 4, StatusBarKind.Damage)
    statusbar.attachToSprite(weapons, 1, 0)
    statusbar.positionDirection(CollisionDirection.Bottom)
    statusbar.setLabel("DMG", 12)
    statusbar.max = dmg
    statusbar.value = dmg
    textSprite = textsprite.create(name, 0, 12)
    textSprite.setMaxFontHeight(8)
    textSprite.top = weapons.bottom + 8
    textSprite.left = weapons.left - 9
    sprites.setDataSprite(weapons, "label", textSprite)
    sprites.setDataString(weapons, "name", name)
    sprites.setDataNumber(weapons, "attack", attack)
    return weapons
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
    moveBattleMenuSelection(3)
})
function battleDodge () {
	
}
function createWeapmon (portrait: Image, name: string, health: number, attack: number) {
    weapons = sprites.create(portrait, SpriteKind.Weapmon)
    statusbar = statusbars.create(32, 4, StatusBarKind.Health)
    statusbar.attachToSprite(weapons, 1, 0)
    statusbar.positionDirection(CollisionDirection.Bottom)
    statusbar.setLabel("HP", 12)
    statusbar.max = health
    statusbar.value = health
    textSprite = textsprite.create(name, 0, 12)
    textSprite.setMaxFontHeight(8)
    textSprite.top = weapons.bottom + 8
    textSprite.left = weapons.left - 9
    sprites.setDataSprite(weapons, "label", textSprite)
    sprites.setDataString(weapons, "name", name)
    sprites.setDataNumber(weapons, "attack", attack)
    return weapons
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
    cursor = sprites.create(assets.image`Cursor`, SpriteKind.Player)
    cursor.right = selectedMenuButton.left
    cursor.y = selectedMenuButton.y
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    moveBattleMenuSelection(1)
})
function moveWeapmon (theWeapmon: Sprite, x: number, y: number) {
    theWeapmon.setPosition(x, y)
    sprites.readDataSprite(theWeapmon, "label").top = weapons.bottom + 8
    sprites.readDataSprite(theWeapmon, "label").left = weapons.left - 9
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    moveBattleMenuSelection(2)
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
    animationTimer = 800
    animation.runMovementAnimation(
    weapmon,
    animation.animationPresets(animation.easeRight),
    animationTimer,
    false
    )
    pause(animationTimer)
    statusbars.getStatusBarAttachedTo(StatusBarKind.Health, enemy).value += 0 - sprites.readDataNumber(weapmon, "attack")
    animation.runMovementAnimation(
    weapmon,
    animation.animationPresets(animation.easeLeft),
    animationTimer,
    false
    )
    pause(animationTimer)
    animation.runMovementAnimation(
    enemy,
    animation.animationPresets(animation.easeLeft),
    animationTimer,
    false
    )
    pause(animationTimer)
    scene.cameraShake(2, 200)
    statusbars.getStatusBarAttachedTo(StatusBarKind.Health, weapmon).value += 0 - sprites.readDataNumber(enemy, "attack")
    animation.runMovementAnimation(
    enemy,
    animation.animationPresets(animation.easeRight),
    animationTimer,
    false
    )
    pause(animationTimer)
}
function BattleTime () {
    scene.setBackgroundImage(assets.image`myImage`)
    Tomothymon = createWeapmon(assets.image`myImage0`, "Tomothy", 20, 4)
    moveWeapmon(Tomothymon, 30, 20)
    Catmon = createWeapmon(assets.image`myImage1`, "Cat", 20, 3)
    moveWeapmon(Catmon, 130, 20)
    Bat = weaponType(assets.image`myImage0`, "Bat", 1, 4)
    showOrHideWeapmon(Catmon, true)
    showOrHideWeapmon(Tomothymon, true)
    startBattle(Tomothymon, Catmon)
}
function battleItems () {
	
}
let Bat: Sprite = null
let Catmon: Sprite = null
let Tomothymon: Sprite = null
let animationTimer = 0
let battleMenuIsOpen = false
let otherWeapmon: Sprite = null
let currentWeapmon: Sprite = null
let textSprite: TextSprite = null
let statusbar: StatusBarSprite = null
let weapons: Sprite = null
let newMenuButton: TextSprite = null
let cursor: Sprite = null
let blockMenuButton: TextSprite = null
let fightMenuButton: TextSprite = null
let itemsMenuButton: TextSprite = null
let dodgeMenuButton: TextSprite = null
let selectedMenuButton: TextSprite = null
tiles.setCurrentTilemap(tilemap`temp map`)
let Tomothy_Map = sprites.create(assets.image`myImage0`, SpriteKind.Player)
controller.moveSprite(Tomothy_Map)
