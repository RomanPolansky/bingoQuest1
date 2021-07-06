import { newDaubArray, bingoData } from './data.js'
import { Loader, Sprite, Container } from './alias.js'

function appTick(app, container, ballRack, board) {
    let time = 0
    app.ticker.add( ()=>{
        let deltaTime = app.ticker.deltaMS;
        time += deltaTime
        TWEEN.update(time)
    })

    let hc = 0
    let handObj
    let timeEnd
    let interval = setInterval(()=>{
        if (hc <= 2){
            handObj = new handSupport()
            hc++
        } else {
            pShot()
            clearInterval(interval)
        }
    }, 5000)
    

    let moveCount = 0
    let [step, defaultStep] = [ballRack.rickStep, ballRack.rickStep]
    let [lastStep, defaultLastStep] = [ballRack.lastStep, ballRack.lastStep]

    let isClicked = true
    let lastClick = true
    for(let i = 0; i < board.itemsArray.length; i++) {
        board.itemsArray[i].on('pointerdown', () => {
            if (board.itemsArray[i].text == newDaubArray[moveCount]){
                if ( isClicked && lastClick ) {
                    isClicked = false

                    clearInterval(interval)
                    if (handObj !== null && handObj !== undefined){
                        handObj.end()
                        handObj = null
                    }
                    if (timeEnd !== undefined && timeEnd !== null){
                        clearTimeout(timeEnd)
                    }
                    timeEnd = setTimeout(()=>{
                        pShot()
                    }, 10000)

                    let daubFig = new Sprite( Loader.shared.resources['assets/ss.json'].textures['daub.png'] )
                        daubFig.scale.set(0.1, 0.1)
                        daubFig.anchor.set(0.5, 0.5)
                        daubFig.x = board.itemsArray[i].x
                        daubFig.y = board.itemsArray[i].y - 4
                        board.boardContainer.addChild(daubFig)

                    new TWEEN.Tween(daubFig).to({ scale : { x : 0.55, y : 0.55 } }, 300).easing(TWEEN.Easing.Back.Out).start(time)

                    if (board.itemsArray[i].text === '3') {
                        lastClick = false
                        setTimeout(() => {
                            bingoAnim()
                        }, 300);
                    }
                    app.ticker.add(newBall)
                }
            }
        })
    }
    function newBall() {
        ballRack.ballsArray[0].x -= 4
        if (ballRack.ballsArray[0].alpha > 0) {
            ballRack.ballsArray[0].alpha -= 0.06
        }
        if (step > 0) {
            for (let i = 1; i < ballRack.ballsArray.length - 1; i++) {
                ballRack.ballsArray[i].x -= 3.2 
            }
            step -= 3.2
        }
        if (lastStep > 0) {
            ballRack.ballsArray[ballRack.ballsArray.length - 1].x -= 3.2

            let lastItemScale = ballRack.ballsArray[ballRack.ballsArray.length - 1].children[0]
            if (lastItemScale.scale._x > 0.36){
                new TWEEN.Tween(lastItemScale).to({ scale : { x : 0.36, y : 0.36 } }, 300).start(time)
            }
            lastStep -= 3.2
        }
        let lastNumScale = ballRack.ballsArray[ballRack.ballsArray.length - 1].children[1].scale
        if (lastNumScale._x >= 1) {
            lastNumScale.set(lastNumScale._x - 0.02, lastNumScale._y - 0.02)
        }
        if (step < 1 && lastStep < 1){
            app.ticker.remove(newBall)
            ballRack.ballsArray.splice(0, 1)
            step = defaultStep
            lastStep = defaultLastStep
            moveCount++
            ballRack.addNewBall(moveCount)

            if (ballRack.ballsArray.length === 6) {
                newBallScale() 
            }
        }
    }

    function newBallScale() {
        let lastRitem = container.children[container.children.length - 1].children
        let circleScale = lastRitem[0]
        let numScale = lastRitem[1]

        circleScale.scale.set(0)
        numScale.scale.set(0)

        new TWEEN.Tween(circleScale).to({ scale : { x : 0.44, y : 0.44 } }, 300).easing(TWEEN.Easing.Back.Out).start(time)
        new TWEEN.Tween(numScale).to({ scale : { x : 1, y : 1 } }, 300).easing(TWEEN.Easing.Back.Out).start(time)
        isClicked = true
    }


    function bingoAnim() {
        for (let i = 0; i < 5; i++) {
            let bingo = new Sprite( Loader.shared.resources['assets/ss.json'].textures['bingo.png'] )
            let item = bingoData['obj'+(i+1)].item
            bingo.anchor.set(0.5, 0.5)
            bingo.scale.set(0)
            bingo.x = item.x
            bingo.y = item.y - 4
            board.boardContainer.addChild(bingo)
            new TWEEN.Tween(bingo).to({ scale : { x : 0.34, y : 0.34 } }, 200).start(time)
            
        }
        let rect = new Sprite( Loader.shared.resources['assets/ss.json'].textures['rect.png'] )
        rect.scale.set(0)
        rect.alpha = 0.82
        rect.x = bingoData['obj3'].item.x + 2
        rect.y = bingoData['obj3'].item.y - 2
        board.boardContainer.addChild(rect)
        new TWEEN.Tween(rect).to({ scale : { x : 1.13, y : 1.13 } }, 200).delay(400).start(time)
        setTimeout(()=>{sparkAnim(rect)}, 700)
        
    }
    function sparkAnim(rect) {
        let spark_1 = new Sprite( Loader.shared.resources['assets/ss.json'].textures['spark.png'] ),
            spark_2 = new Sprite( Loader.shared.resources['assets/ss.json'].textures['spark.png'] ),
            spark_3 = new Sprite( Loader.shared.resources['assets/ss.json'].textures['spark.png'] )
        let cont = new Container()
        let centerX = rect.x - 5

        spark_1.scale.set(0.75)
        spark_2.scale.set(0.75)
        spark_3.scale.set(0.75)

        spark_1.alpha = 0
        spark_2.alpha = 0
        spark_3.alpha = 0

        spark_2.x = centerX
        spark_1.x = centerX - spark_1.width / 2
        spark_3.x = centerX + spark_3.width / 2

        spark_2.y = 250
        spark_1.y = 250
        spark_3.y = 250

        cont.addChild(spark_1)
        cont.addChild(spark_2)
        cont.addChild(spark_3)

        board.boardContainer.addChild(cont)
        app.ticker.add(()=>{
            spark_1.rotation += 0.01
            spark_2.rotation -= 0.01
            spark_3.rotation -= 0.01
        })
        new TWEEN.Tween(spark_1).to({ alpha : 0.85 }, 500).start(time)
        new TWEEN.Tween(spark_2).to({ alpha : 0.85 }, 500).start(time)
        new TWEEN.Tween(spark_3).to({ alpha : 0.85 }, 500).start(time)

        bigLogoAnim()
    }
    function bigLogoAnim() {
        let cont = new Container()
        let the_B = new Sprite( Loader.shared.resources['assets/ss.json'].textures['B.png'] ),
            the_I = new Sprite( Loader.shared.resources['assets/ss.json'].textures['I.png'] ),
            the_N = new Sprite( Loader.shared.resources['assets/ss.json'].textures['N.png'] ),
            the_G = new Sprite( Loader.shared.resources['assets/ss.json'].textures['G.png'] ),
            the_O = new Sprite( Loader.shared.resources['assets/ss.json'].textures['O.png'] )
        let letterArr = [ the_B, the_I, the_N, the_G, the_O ],
            gapArr = [45, 52, 80, 75]

        cont.x = 77
        cont.y = 248
       
        board.boardContainer.addChild(cont)

        for(let i in letterArr){
            letterArr[i].scale.set(0)
            letterArr[i].anchor.set(0.5)
            if (i === '0') {
                letterArr[i].x = 0
            } else {
                letterArr[i].x = letterArr[i-1].x + gapArr[i-1]
            }
            
            cont.addChild(letterArr[i])
            new TWEEN.Tween(letterArr[i]).to({ scale : { x : 0.8, y : 0.8 } }, 200).delay(i * 80).start(time)
        }
        setTimeout(()=>{pShot()}, 1200)
        
    }

    function pShot() {
        if (timeEnd !== undefined && timeEnd !== null){
            clearTimeout(timeEnd)
        }
        new TWEEN.Tween(container).to({ alpha : 0 }, 200).start(time).onComplete(() => {
            let bg = new Sprite( Loader.shared.resources['assets/ss.json'].textures['packshot.png'] )
            bg.alpha = 0
            bg.scale.set(0.47)
            bg.anchor.set(0.5)
            bg.x = app.view.width/2
            bg.y = 540
            app.stage.addChild(bg)
            new TWEEN.Tween(bg).to({ alpha : 1 }, 300).start(time)

            let logo = new Sprite( Loader.shared.resources['assets/ss.json'].textures['logo.png'] )
            logo.scale.set(0.8)
            logo.anchor.set(0.5)
            logo.x = app.view.width/2
            logo.y = 160
            app.stage.addChild(logo)

            let chestCont = new Container()

            let spark = new Sprite( Loader.shared.resources['assets/ss.json'].textures['spark.png'] )
            spark.x = -15
            spark.y = -20
            spark.alpha = 0.45
            spark.scale.set(1.9)
            spark.anchor.set(0.5)
            chestCont.addChild(spark)
            app.ticker.add(()=>{
                spark.rotation += 0.008
            })
            new TWEEN.Tween(spark).to({ alpha : 0.6 }, 300).yoyo(true).repeat(Infinity).start(time)

            let chest = new Sprite( Loader.shared.resources['assets/ss.json'].textures['chest.png'] )
            chest.alpha = 0
            chest.scale.set(0.47)
            chest.anchor.set(0.5)
            chestCont.addChild(chest)
            new TWEEN.Tween(chest).to({ alpha : 1 }, 300).start(time)

            let light = new Sprite( Loader.shared.resources['assets/ss.json'].textures['light.png'] )
            light.x = 30
            light.y = -120
            light.alpha = 0.8
            light.scale.set(0.47)
            light.anchor.set(0.5)
            chestCont.addChild(light)
            new TWEEN.Tween(light).to({ alpha : 1 }, 1000).yoyo(true).repeat(Infinity).start(time)

            chestCont.x = app.view.width/2
            chestCont.y = 440
            app.stage.addChild(chestCont)

            let button = new Sprite( Loader.shared.resources['assets/ss.json'].textures['buttonPS.png'] )
            button.alpha = 1
            button.scale.set(0.45)
            button.anchor.set(0.5)
            button.interactive = true
            button.buttonMode = true
            button.on('pointerdown', () => {console.log('скачать')})
            button.x = app.view.width/2
            button.y = 765
            app.stage.addChild(button)
            new TWEEN.Tween(button).to({ scale : { x : 0.5, y : 0.5 } }, 800).yoyo(true).repeat(Infinity).start(time)
            
            let tickToStart = 0
            app.ticker.add(() => {
                tickToStart += app.ticker.deltaMS
                if (tickToStart > 150) {
                    let x0 = 20,
                        y0 = -20
                    let xZ = (Math.random() > 0.5) ? 1 : -1 ,
                        yZ = (Math.random() > 0.5) ? 1 : -1
                    let x = 62 * Math.random() ,
                        y = 20 * Math.random()

                    let chestStar = new Sprite( Loader.shared.resources['assets/ss.json'].textures['chestStar.png'] )
                    chestStar.alpha = 0.8
                    chestStar.x = x0 + x*xZ
                    chestStar.y = y0 + y*yZ
                    chestStar.scale.set(0.25)
                    chestStar.anchor.set(0.5)
                    chestCont.addChild(chestStar)

                    new TWEEN.Tween(chestStar).to({ y : -250,
                                                x : Math.random()*200*xZ,
                                                scale : {x:0.3, y:0.3},
                                                alpha : 1
                    }, 1500).start(time).onComplete(() => {
                        chestStar.destroy()
                    })
                    tickToStart = 0
                }
            })
        
        }) 
    }

    function handSupport() {
        

        let handCont = new Container()
        let hand      = new Sprite( Loader.shared.resources['assets/hand.png'].texture ),
            handClick = new Sprite( Loader.shared.resources['assets/handClick.png'].texture )

        handClick.alpha = 0
        handCont.addChild(handClick)
        handCont.addChild(hand)
        handCont.scale.set(0.4)
        handCont.y = 300
        handCont.x = 535

        handCont.alpha = 0
        app.stage.addChild(handCont)
        
        new TWEEN.Tween(handCont).to({ alpha : 1 }, 400).start(time)
        new TWEEN.Tween(handCont).to({ y : 90, x : 530 }, 650).start(time).onComplete(()=>{
            new TWEEN.Tween(handCont).to({ y : 140 }, 300).yoyo(true).repeat(1).start(time).onComplete(()=>{
                new TWEEN.Tween(handCont).to({ y : 360, x : 315 }, 800).start(time).onComplete(()=>{
                    hand.alpha = !hand.alpha
                    handClick.alpha = !handClick.alpha
                    setTimeout(()=>{
                        hand.alpha = !hand.alpha
                        handClick.alpha = !handClick.alpha
                        new TWEEN.Tween(handCont).to({ y : 340, x : 335 }, 300).yoyo(true).repeat(1).start(time).onComplete(()=>{
                            hand.alpha = !hand.alpha
                            handClick.alpha = !handClick.alpha
                            setTimeout(()=>{
                                hand.alpha = !hand.alpha
                                handClick.alpha = !handClick.alpha
                                new TWEEN.Tween(handCont).to({ y : 340, x : 335, alpha : 0 }, 350).start(time).onComplete(()=>{handCont.destroy()})
                            }, 100)
                        })
                    }, 80)
                })
            })
        })
        //
        handSupport.prototype.end = () => { handClick.destroy(); hand.destroy() }
    }
}


export default appTick