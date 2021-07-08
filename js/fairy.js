import { Sprite, Loader, Container, jsonSS } from './alias.js'

function fairy(cont, app) {
    let head      = new Sprite( Loader.shared.resources[jsonSS].textures['head.png'] ),
        headEC    = new Sprite( Loader.shared.resources[jsonSS].textures['headEC.png'] ),
        body      = new Sprite( Loader.shared.resources[jsonSS].textures['body.png'] ),
        hair      = new Sprite( Loader.shared.resources[jsonSS].textures['hair.png'] ),
        leftArm   = new Sprite( Loader.shared.resources[jsonSS].textures['leftArm.png'] ),
        leftFoot  = new Sprite( Loader.shared.resources[jsonSS].textures['leftFoot.png'] ),
        leftHand  = new Sprite( Loader.shared.resources[jsonSS].textures['leftHand.png'] ),
        leftWing  = new Sprite( Loader.shared.resources[jsonSS].textures['leftWing.png'] ),
        rightArm  = new Sprite( Loader.shared.resources[jsonSS].textures['rightArm.png'] ),
        rightFoot = new Sprite( Loader.shared.resources[jsonSS].textures['rightFoot.png'] ),
        rightHand = new Sprite( Loader.shared.resources[jsonSS].textures['rightHand.png'] ),
        rightWing = new Sprite( Loader.shared.resources[jsonSS].textures['rightWing.png'] )
    
    let fairyContainer = new Container

    let arr = [ leftWing, hair, rightWing, leftArm, leftHand, leftFoot, body, rightFoot, rightArm, rightHand, headEC, head ]
    for (let i in arr) {
        arr[i].scale.set(0.8, 0.8)
        fairyContainer.addChild( arr[i] )
    }

    leftHand.anchor.set(0, 0.5);
    rightWing.anchor.set(1, 0.5);

    [ head.x, head.y ] = [ 130, 610 ];
    [ headEC.x, headEC.y ] = [ head.x, head.y ];
    [ body.x, body.y ] = [ -5, 730 ];
    [ rightArm.x, rightArm.y ] = [ 118, 750 ];
    [ rightHand.x, rightHand.y ] = [ 118, 845 ];
    [ leftArm.x, leftArm.y ] = [ 210, 771 ];
    [ leftHand.x, leftHand.y ] = [ 268, 842 ];
    [ rightWing.x, rightWing.y ] = [ 150, 760 ];
    [ hair.x, hair.y ] = [ -38, 655 ];
    [ leftWing.x, leftWing.y ] = [ -10, 600 ];
    [ leftFoot.x, leftFoot.y ] = [ -110, 983];
    [ rightFoot.x, rightFoot.y ] = [ -130, 949];


    fairyContainer.scale.set(0.73)
    fairyContainer.x = 100
    fairyContainer.y = 167
    cont.addChild( fairyContainer )


    let flyHeight = 7,
        defaultFlyHeight = flyHeight,
        flySpeed = 0.07

    let fairyAnim = function(delta) {
        fairyContainer.y += flySpeed
        flyHeight -= flySpeed
        if (flyHeight <= 0) {
            flySpeed = -flySpeed
        }
        if (flyHeight > defaultFlyHeight) {
            flySpeed = -flySpeed
        }
    }

    let scaleLeft = 0.03,
        defaultScaleLeft = scaleLeft,
        scaleSpeedLeft = 0.0015
    let scaleRight = 0.02,
        defaultScaleRight = scaleRight,
        scaleSpeedRight = 0.001
    let rotRight = 0.03,
        defaultRotRight = rotRight,
        rotSpeedRight = 0.0015
    let fairyWingsAnim = function(delta) {
        leftWing.scale.set(leftWing.scale._x - scaleSpeedLeft, leftWing.scale._x - scaleSpeedLeft)
        scaleLeft -= scaleSpeedLeft
        if (scaleLeft <= 0) {
            scaleSpeedLeft = -scaleSpeedLeft
        }
        if (scaleLeft > defaultScaleLeft) {
            scaleSpeedLeft = -scaleSpeedLeft
        }

        rightWing.scale.set(rightWing.scale._x - scaleSpeedRight, rightWing.scale._x - scaleSpeedRight)
        scaleRight -= scaleSpeedRight
        if (scaleRight <= 0) {
            scaleSpeedRight = -scaleSpeedRight
        }
        if (scaleRight > defaultScaleRight) {
            scaleSpeedRight = -scaleSpeedRight
        }

        rightWing.rotation -= rotSpeedRight
        rotRight += rotSpeedRight
        if (rotRight <= 0) {
            rotSpeedRight = -rotSpeedRight
        }
        if (rotRight > defaultRotRight) {
            rotSpeedRight = -rotSpeedRight
        }
    }


    let timeForEC = 0,
        randDelta = 0

    let armRotation = 0.1, defaultArmRotation = armRotation, armRotationSpeed = 0.001
    let handRotation = 0.25, defaultHandRotation = handRotation, handRotationSpeed = 0.0025
    let handY = 4, dafaultHandY = handY, handSpeedY = 0.04
    let handX = 3, dafaultHandX = handX, handSpeedX = 0.03
    function fairyHandAnim(delta) {
        leftArm.rotation -= armRotationSpeed
        armRotation -= armRotationSpeed
        if(armRotation <= 0) {
            armRotationSpeed = -armRotationSpeed
        }
        if(armRotation > defaultArmRotation) {
            armRotationSpeed = -armRotationSpeed
        }

        leftHand.rotation -= handRotationSpeed
        handRotation -= handRotationSpeed
        if(handRotation <= 0) {
            handRotationSpeed = -handRotationSpeed
        }
        if(handRotation > defaultHandRotation) {
            handRotationSpeed = -handRotationSpeed
        }

        leftHand.y -= handSpeedY
        handY -= handSpeedY
        if(handY <= 0) {
            handSpeedY = -handSpeedY
        }
        if(handY > dafaultHandY) {
            handSpeedY = -handSpeedY
        }

        leftHand.x += handSpeedY
        handX -= handSpeedY
        if(handX <= 0) {
            handSpeedX = -handSpeedX
        }
        if(handX > dafaultHandX) {
            handSpeedX = -handSpeedX
        }
        
        timeForEC += app.ticker.deltaMS
        
        if (randDelta === 0) {
            randDelta = Math.round(Math.random() * 1000)
        }
        if (timeForEC >= 4000 + randDelta){
            head.alpha = 0
        }
        if (timeForEC >= 4200 + randDelta){
            head.alpha = 1
            timeForEC = 0
            randDelta = 0
        }
    }

    app.ticker.add(fairyAnim)
    app.ticker.add(fairyWingsAnim)
    app.ticker.add(fairyHandAnim)
}

export default fairy