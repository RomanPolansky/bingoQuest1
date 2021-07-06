import { Sprite, Loader } from './alias.js'
import { newBallColor } from './data.js'


function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}
  
function randColor() {
    let maxRand = 4
    let randArr = []
    let src

    for (let key in newBallColor) {
        if (newBallColor[key] < 2) {
            randArr.push(key)
        }
        if (newBallColor[key] >= 2) {
            maxRand--
        }
    }
    let randInt = randomInteger(0, maxRand-1)
    switch (randArr[randInt]) {
        case 'red':
            newBallColor.red++
            src = 'red.png'
            break;
        case 'orange':
            newBallColor.orange++
            src = 'orange.png'
            break;
        case 'yellow':
            newBallColor.yellow++
            src = 'yellow.png'
            break;
        case 'green':
            newBallColor.green++
            src = 'green.png'
            break;
    }
    return src
}

function Ball() {
    let src = randColor()

    let ball = new Sprite( Loader.shared.resources['assets/ss.json'].textures[src] )
    ball.anchor.set(0.5, 0.5)

    return ball
}
export default Ball