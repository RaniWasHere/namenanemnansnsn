input.onButtonPressed(Button.A, function () {
    if (!(game.isPaused())) {
        Bird.change(LedSpriteProperty.Y, 1)
    }
})
input.onButtonPressed(Button.B, function () {
    if (!(game.isPaused())) {
        Bird.change(LedSpriteProperty.Y, -1)
    }
})
function Pouse () {
    if (game.isPaused()) {
        music.playTone(659, music.beat(BeatFraction.Quarter))
        music.playTone(523, music.beat(BeatFraction.Quarter))
        music.playTone(659, music.beat(BeatFraction.Quarter))
        music.playTone(523, music.beat(BeatFraction.Eighth))
        while (game.isPaused()) {
            basic.pause(100)
        }
    }
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (game.isPaused()) {
        game.resume()
        music.playTone(659, music.beat(BeatFraction.Quarter))
        music.playTone(523, music.beat(BeatFraction.Quarter))
        music.playTone(659, music.beat(BeatFraction.Quarter))
        music.playTone(523, music.beat(BeatFraction.Quarter))
    } else {
        game.pause()
        music.playTone(659, music.beat(BeatFraction.Quarter))
        music.playTone(523, music.beat(BeatFraction.Quarter))
        music.playTone(659, music.beat(BeatFraction.Quarter))
        music.playTone(523, music.beat(BeatFraction.Quarter))
    }
})
let Timer2 = 0
let Score = 0
let Emtry_space = 0
let Spaces = 0
let Accrule_score = 0
let Bird: game.LedSprite = null
let Speed = 300
let Obsticals: game.LedSprite[] = []
Bird = game.createSprite(0, 2)
Bird.set(LedSpriteProperty.Blink, 300)
loops.everyInterval(500, function () {
    if (100 < Speed) {
        Speed += -1
    }
})
basic.forever(function () {
    Pouse()
    for (let index = 0; index < 5; index++) {
        if (Obsticals.length > 0 && Obsticals[0].get(LedSpriteProperty.X) == 0) {
            Obsticals.removeAt(0).delete()
        }
    }
    for (let value of Obsticals) {
        value.change(LedSpriteProperty.X, -1)
        if (value.get(LedSpriteProperty.Y) == Bird.get(LedSpriteProperty.Y) && value.get(LedSpriteProperty.X) == Bird.get(LedSpriteProperty.X)) {
            Accrule_score = Accrule_score / 2
            game.setScore(Accrule_score)
            game.gameOver()
        }
    }
    Spaces += 1
    if (Spaces == 2) {
        Emtry_space = randint(0, 4)
        for (let index = 0; index <= 4; index++) {
            if (Emtry_space != index) {
                Obsticals.push(game.createSprite(4, index))
            }
        }
        Spaces = 0
    }
    Score += 1
    if (Score > 5) {
        Accrule_score += 1
    }
    while (Speed >= Timer2) {
        Timer2 += 1
        basic.pause(1)
        for (let Vouly2 of Obsticals) {
            if (Vouly2.get(LedSpriteProperty.Y) == Bird.get(LedSpriteProperty.Y) && Vouly2.get(LedSpriteProperty.X) == Bird.get(LedSpriteProperty.X)) {
                Accrule_score = Accrule_score / 2
                game.setScore(Accrule_score)
                game.gameOver()
            }
        }
    }
    Timer2 = 0
})
