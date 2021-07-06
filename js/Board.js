import { Sprite, Loader, Container, Text, Graphics } from './alias.js'
import { boardArray, orangeArray, heartArray, lockArray, daubArray, bingoData } from './data.js'

function Board(cvs) {
    let board = new Sprite( Loader.shared.resources['assets/ss.json'].textures['bingoboard.png'] )
    board.scale.set(1.1, 1.1)
    board.x = cvs.width/2 - board.width/2
    board.y = cvs.height/2 - board.height/2 - (cvs.height/100)*5

    let boardContainer = new Container()
    boardContainer.x = board.x
    boardContainer.y = board.y
    
    let coord = {
        x: 49,
        y: 92
    }
    let itemsArray = []
    for (let i = 0; i < 5; i++){
        for(let j = 0; j < 5; j++){
            let item = new Text( boardArray[i][j], {
                fontSize: 46,
                fontWeight: 600,
                padding: 5
            } )
            item.anchor.set(0.5, 0.5)
            item.x = coord.x
            item.y = coord.y
            if ( j === 1 ) {
                item.x += 1
            } else if ( j === 3 ) {
                item.x += 1
            } else if ( j === 4 ) {
                item.x += 1
            }
            item.interactive = true
            item.buttonMode = true

            itemsArray.push(item)

            coord.x += 78
            for (let k = 0; k < orangeArray.length; k++) {
                if (boardArray[i][j] === orangeArray[k]) {
                    let orangeFig = new Graphics()
                    orangeFig.lineStyle(4, 0xff7b00, 1)
                    orangeFig.drawCircle(item.x , item.y - 4, 30)
                    boardContainer.addChild(orangeFig)
                }
            }
            for (let k = 0; k < heartArray.length; k++) {
                if (boardArray[i][j] === heartArray[k]) {
                    let heartFig = new Sprite( Loader.shared.resources['assets/ss.json'].textures['heart.png'] )
                    heartFig.scale.set(0.85)
                    heartFig.anchor.set(0.5, 0.5)
                    heartFig.x = item.x
                    heartFig.y = item.y - 2
                    boardContainer.addChild(heartFig)
                }
            }
            for (let k = 0; k < lockArray.length; k++) {
                if (boardArray[i][j] === lockArray[k]) {
                    let lockFig = new Sprite( Loader.shared.resources['assets/ss.json'].textures['lock.png'] )
                    lockFig.scale.set(0.78)
                    lockFig.anchor.set(0.5, 0.5)
                    lockFig.x = item.x
                    lockFig.y = item.y - 6
                    boardContainer.addChild(lockFig)
                }
            }
            
            boardContainer.addChild(item)

            for (let k = 0; k < daubArray.length; k++) {
                if (boardArray[i][j] === daubArray[k]) {
                    let daubFig = new Sprite( Loader.shared.resources['assets/ss.json'].textures['daub.png'] )
                    daubFig.scale.set(0.55)
                    daubFig.anchor.set(0.5, 0.5)
                    daubFig.x = item.x
                    daubFig.y = item.y - 5
                    boardContainer.addChild(daubFig)
                }
            }
            if( j === 0 && i === 2 ) { bingoData['obj1'] = {item} }
            if( j === 1 && i === 2 ) { bingoData['obj2'] = {item} }
            if( j === 2 && i === 2 ) { bingoData['obj3'] = {item} }
            if( j === 3 && i === 2 ) { bingoData['obj4'] = {item} }
            if( j === 4 && i === 2 ) { bingoData['obj5'] = {item} }        
        }
        coord.x = 49
        coord.y += 79
    }
    
    return { board: board, boardContainer: boardContainer, itemsArray: itemsArray }
}
export default Board