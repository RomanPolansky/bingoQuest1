import { Sprite, Loader } from './alias.js'

function Logo(container, board) {
    let logo = new Sprite( Loader.shared.resources['assets/ss.json'].textures['logo.png'] )
    logo.anchor.set(0.5)
    logo.scale.set(0.4)
    logo.x = board.x + board.width/2 + logo.width/2
    logo.y = board.y + board.width + 50 + logo.height/2
    container.addChild(logo)
    let button = new Sprite( Loader.shared.resources['assets/ss.json'].textures['buttonPS.png'] )
    button.anchor.set(0.5)
    button.scale.set(0.4)
    button.x = logo.x
    button.y = logo.y + 120
    button.interactive = true
    button.buttonMode = true
    button.on('pointerdown', () => {console.log('скачать')})
    container.addChild(button)
    new TWEEN.Tween(button).to({ scale : { x : 0.44, y : 0.44 } }, 550).yoyo(true).repeat(Infinity).start()
}
export default Logo