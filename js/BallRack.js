import { Sprite, Loader, Text, Container, jsonSS } from './alias.js'
import { daubArray, newDaubArray, ballColor, newBallColor } from './data.js'
import Ball from './Ball.js'

function BallRack(app, board, container) {
    let ballRack = new Sprite( Loader.shared.resources[jsonSS].textures['ballrack.png'] )
    let circleBar = new Sprite( Loader.shared.resources[jsonSS].textures['circleBar.png'] )

    ballRack.scale.set(0.8, 0.8)
    circleBar.scale.set(0.8, 0.8)

    let blockWidth = ballRack.width + (circleBar.width/100)*(100 - 40)

    ballRack.x = app.view.width/2 - blockWidth/2
    ballRack.y = board.y/2 - ballRack.height/2

    circleBar.x = ballRack.x + ballRack.width - (circleBar.width/100)*40
    circleBar.y = ballRack.y

    let rickStep = ballRack.width/6
    let lastStep = circleBar.x + circleBar.width/2 - (ballRack.x + rickStep*5)

    container.addChild(ballRack)
    container.addChild(circleBar)

    let ballsArray = []
    
    for (let i = 0; i < 6; i++) {
         
        if (i === 5){
            let cont = new Container()

            let ball = Ball(ballColor[i])
            ball.scale.set(0.44, 0.44)
            ball.x = circleBar.x + circleBar.width/2
            ball.y = ballRack.y + ballRack.height/2
            
            let ballNum = new Text( newDaubArray[0], { fontSize: 32, fontWeight: 700, padding: 3})
            ballNum.anchor.set(0.5, 0.5)
            ballNum.x = ball.x
            ballNum.y = ball.y + 3

            cont.addChild(ball)
            cont.addChild(ballNum)
            container.addChild(cont)
            ballsArray.push(cont)
        } else {
            let cont = new Container()

            let ball = Ball(ballColor[i])
            ball.scale.set(0.36, 0.36)
            ball.x = ballRack.x + rickStep * (i+1)
            ball.y = ballRack.y + ballRack.height/2

            let ballNum = new Text( daubArray[i], { fontSize: 28, fontWeight: 700, padding: 3 })
            ballNum.anchor.set(0.5, 0.5)
            ballNum.x = ball.x
            ballNum.y = ball.y + 3

            cont.addChild(ball)
            cont.addChild(ballNum)
            container.addChild(cont)
            ballsArray.push(cont)
        }
    }

    function addNewBall(moveCount) {
        if (newDaubArray[moveCount] !== undefined) {
            let cont = new Container()

            let ball = Ball(newBallColor[moveCount])
            ball.scale.set(0.44, 0.44)
            ball.x = circleBar.x + circleBar.width/2
            ball.y = ballRack.y + ballRack.height/2
            
            let ballNum = new Text( newDaubArray[moveCount], { fontSize: 32, fontWeight: 700, padding: 3 } )
            ballNum.anchor.set(0.5, 0.5)
            ballNum.scale.set(1, 1)
            ballNum.x = ball.x
            ballNum.y = ball.y + 3
            
            cont.addChild(ball)
            cont.addChild(ballNum)
            container.addChild(cont)
            ballsArray.push(cont)
        }
    }

    return { ballsArray: ballsArray, rickStep: rickStep, lastStep: lastStep, addNewBall: addNewBall }
}
export default BallRack