import { Sprite, Loader, jsonSS } from './alias.js'

function Ball(src) {
    let ball = new Sprite( Loader.shared.resources[jsonSS].textures[src] )
    ball.anchor.set(0.5, 0.5)

    return ball
}
export default Ball