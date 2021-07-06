import { Application, Container } from './alias.js'
import appTick from './tick.js'
import loaderAdd from './loader.js'
import Board from './Board.js'
import BallRack from './BallRack.js'
import Logo from './Logo.js'
import fairy from './fairy.js'

document.body.onload = () => {

const app = new Application({
    width: 640,
    height: 960,
    antialias: true,
    transparent: true
})

let board, ballRack, logo

loaderAdd(setup)

function setup(){
    const container = new Container()

    board = Board(app.view)
    container.addChild(board.board)
    container.addChild(board.boardContainer)

    ballRack = BallRack(app, board.board, container)
    logo = Logo(container, board.board)

    app.stage.addChild(container)
    
    fairy(container, app)
    appTick(app, container, ballRack, board)
    resize()

    document.body.style.display = 'block'
}


window.addEventListener('resize', (e) => {
    resize()
})
function resize() {
    let winW = window.innerWidth,
        winH = window.innerHeight
    let ratio = 1.5
    let styleW, styleH
    /* Вертикальная */
    if (winW <= winH) {
        if (winH/winW < ratio) {
            styleW = winH / ratio
            styleH = winH
        } else if (winH/winW >= ratio) {
            styleW = winW 
            styleH = winW * ratio
        }   
    }
    /* Горизонтальная */
    if (winW > winH) {
        styleW = winH / ratio
        styleH = winH
    }
    
    app.view.style.width = styleW + "px"
    app.view.style.height = styleH + "px"
}
app.view.classList.add('canvas')
document.getElementById('app').appendChild(app.view)
}