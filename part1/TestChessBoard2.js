class TestChessBoard2 extends Phaser.Scene
{
    // chessPieceChars = {
    //     'b_king':'♚',
    //     'b_queen':'♛',
    //     'b_rook':'♜',
    //     'b_bishop':'♝',
    //     'b_knight':'♞',
    //     'b_pawn':'♟',
    //     'w_king':'♔',
    //     'w_queen':'♕',
    //     'w_rook':'♖',
    //     'w_bishop':'♗',
    //     'w_knight':'♘',
    //     'w_pawn':'♙',
    // }
    chessPieceChars = {
        'king':'♚',
        'queen':'♛',
        'rook':'♜',
        'bishop':'♝',
        'knight':'♞',
        'pawn':'♟',
    }
    chessPieces = [];
    chessBlackPieces = [];
    chessWhitePieces = [];

    sizeDef = 50;

    boardContainer = null;

    initPieces = [
        {texture:'b_rook',boardIdx:0},
        {texture:'b_knight',boardIdx:1},
        {texture:'b_bishop',boardIdx:2},
        {texture:'b_queen',boardIdx:3},
        {texture:'b_king',boardIdx:4},
        {texture:'b_bishop',boardIdx:5},
        {texture:'b_knight',boardIdx:6},
        {texture:'b_rook',boardIdx:7},
        {texture:'b_pawn',boardIdx:8},
        {texture:'b_pawn',boardIdx:9},
        {texture:'b_pawn',boardIdx:10},
        {texture:'b_pawn',boardIdx:11},
        {texture:'b_pawn',boardIdx:12},
        {texture:'b_pawn',boardIdx:13},
        {texture:'b_pawn',boardIdx:14},
        {texture:'b_pawn',boardIdx:15},

        {texture:'w_pawn',boardIdx:48},
        {texture:'w_pawn',boardIdx:49},
        {texture:'w_pawn',boardIdx:50},
        {texture:'w_pawn',boardIdx:51},
        {texture:'w_pawn',boardIdx:52},
        {texture:'w_pawn',boardIdx:53},
        {texture:'w_pawn',boardIdx:54},
        {texture:'w_pawn',boardIdx:55},
        {texture:'w_rook',boardIdx:56},
        {texture:'w_knight',boardIdx:57},
        {texture:'w_bishop',boardIdx:58},
        {texture:'w_queen',boardIdx:59},
        {texture:'w_king',boardIdx:60},
        {texture:'w_bishop',boardIdx:61},
        {texture:'w_knight',boardIdx:62},
        {texture:'w_rook',boardIdx:63},
    ];

    constructor() {
        super("TestBoard");
        // super({ key: "TestGraphic" });
        
        
    }

    preload(){
        this.sizeDef = Math.min(this.game.canvas.width,this.game.canvas.height)/10;
        console.log(this.sizeDef);

        var squareRect = new Phaser.Geom.Rectangle(0,0,this.sizeDef,this.sizeDef);
        {
            var graphics = this.make.graphics().fillStyle(0xffcc99,0.5).setAlpha(1).lineStyle(2,0x333333,0.5).fillRectShape(squareRect).strokeRectShape(squareRect);
            graphics.generateTexture("square1", this.sizeDef, this.sizeDef);
            graphics.destroy();
        }
        {
            var graphics = this.make.graphics().fillStyle(0xcc9966,0.5).setAlpha(1).lineStyle(2,0x333333,0.5).fillRectShape(squareRect).strokeRectShape(squareRect);
            graphics.generateTexture("square2", this.sizeDef, this.sizeDef);
            graphics.destroy();
        }
        // squareRect.destroy()

        for(let k in this.chessPieceChars){
            let c = this.chessPieceChars[k];

            let pieceC = this.add.text(-100,-100,c)
                .setFont(Math.floor(this.sizeDef*0.8)+"px Arial").setAlign('center')
                .setColor('#ff0000').setSize(this.sizeDef,this.sizeDef).setOrigin(0).setPadding(10)
                // .setStroke('#999999',5);

            // black
            {
                pieceC.setColor('#222222').setShadow(3, 3, 'rgba(0,0,0,0.3)', 5);
                let renderTexture = this.add.renderTexture(0,0, this.sizeDef, this.sizeDef);
                renderTexture.draw(pieceC,(renderTexture.width-pieceC.width)/2,(renderTexture.height-pieceC.height)/2);
                renderTexture.saveTexture('b_'+k);
                renderTexture.destroy();
            }

            // white
            {
                pieceC.setColor('#ffffff').setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
                let renderTexture = this.add.renderTexture(0,0, this.sizeDef, this.sizeDef);
                renderTexture.draw(pieceC,(renderTexture.width-pieceC.width)/2,(renderTexture.height-pieceC.height)/2);
                renderTexture.saveTexture('w_'+k);
                renderTexture.destroy();
            }
            pieceC.destroy()
            
        }
        
        
        
        
    }
    create(){
        // this.add.image(100,100,'pawn');
        
        
        let squares = [];
        this.squares = squares;
        let group = this.make.group();
        let icnt = 0;
        let boardW = this.sizeDef*8;
        let boardH = this.sizeDef*8;
        let defX = (this.game.canvas.width-boardW)/2
        let defY = (this.game.canvas.height-boardH)/2


        let boardContainer = this.add.container(defX,defY)
        this.boardContainer = boardContainer;

        for(let iy = 0,my=8;iy<my;iy++){
            for(let ix = 0,mx=8;ix<mx;ix++){
                // let square = this.add.image(defX+ix*this.sizeDef,defY+iy*this.sizeDef,((ix+iy)%2===0)?'square':'square2').setOrigin(0);
                let square = this.add.image(ix*this.sizeDef,iy*this.sizeDef,((ix+iy)%2===0)?'square1':'square2').setOrigin(0);
                square.idx = iy*8+ix;
                squares.push(square);
                group.add(square);
                boardContainer.add(square)
            }
            icnt++;
        }
        
        /*
        0	1	2	3	4	5	6	7
        8	9	10	11	12	13	14	15
        16	17	18	19	20	21	22	23
        24	25	26	27	28	29	30	31
        32	33	34	35	36	37	38	39
        40	41	42	43	44	45	46	47
        48	49	50	51	52	53	54	55
        56	57	58	59	60	61	62	63
        */
        let pricesContainer = this.add.container(defX,defY)


        this.initPieces.forEach(p=>{
            // let ix = p.boardIdx % 8;
            // let iy = Math.floor(p.boardIdx / 8);
            // let square = squares[p.boardIdx]
            // let squarePos = square.getCenter([],false);            
            // let piece =  this.add.image(squarePos.x,squarePos.y,p.texture).setOrigin(0.5).setDepth(2); 
            let piece =  this.add.image(Math.random()*boardW,Math.random()*boardH,p.texture).setOrigin(0.5).setDepth(2); 
            piece.pieceName = p.texture
            // piece.square = square;
            piece.square = null;
            piece.setInteractive()
            

            pricesContainer.add(piece);
            this.chessPieces.push(piece);
            if(p.texture.indexOf('b_')===0){
                piece.gameColor = 'black';
                this.chessBlackPieces.push(piece);
            }else{
                piece.gameColor = 'white';
                this.chessWhitePieces.push(piece);
            }
        })
        setTimeout(()=>{
            this.resetPos();
        },500)



        this.input.setDraggable(this.chessPieces);

        let index = 0;
        this.input.on('dragstart', (pointer, gameObject) => {
            gameObject.setScale(1.5).setDepth(10)
            index = pricesContainer.getIndex(gameObject);
            pricesContainer.bringToTop(gameObject);

        });

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
            
        });

        this.input.on('dragend', (pointer, gameObject) => {
            gameObject.setScale(1).setDepth(2)
            pricesContainer.moveTo(gameObject, index);
            //-- 가장 가까운 보드 네모를 찾는다.
            let min = Number.MAX_SAFE_INTEGER
            let closestSquare = null;
            squares.forEach((square)=>{
                let d = Phaser.Math.Distance.BetweenPoints(gameObject.getCenter([],false),square.getCenter([],false));
                if(d < min && d < square.width/1.5){
                    closestSquare = square;
                    min = d;
                }
            })
            gameObject.square = closestSquare;
            if(closestSquare){
                console.log('closestSquare.idx',closestSquare.idx);
                let pos = closestSquare.getCenter([],false);
                this.add.tween({
                    targets: [gameObject],
                    ease: 'Sine.easeInOut',
                    duration: 200,
                    delay: 0,
                    x: {
                        // getStart: () => 1,
                        getEnd: () => pos.x
                    },
                    y: {
                        // getStart: () => 1,
                        getEnd: () => pos.y
                    },
                    onComplete: () => {
                        console.log('이동 완료');
                    }
                });

                // 같은 셀에 있는 피스 찾기
                pricesContainer.getAll().forEach((piece)=>{
                    if(gameObject === piece){
                        return;
                    }
                    if(piece.square !== null && piece.square === closestSquare){
                        piece.square = null;
                        this.add.tween({
                            targets: [piece],
                            ease: 'Sine.easeInOut',
                            duration: 200,
                            delay: 50,
                            y: {
                                // getStart: () => 1,
                                getEnd: () => piece.gameColor=='black'? this.sizeDef/2*-1:boardH+this.sizeDef/2
                            },
                            onComplete: () => {
                                console.log('보드 아웃',piece);
                            }
                        });
                    }
                })
            }
        });
        


        // chessPieces = [];
        // chessBlackPieces = [];
        // chessWhitePieces = [];
        // let pawn = this.add.image(defX+ix*50,defY+iy*50,'b_bishop').setOrigin(0).setDepth(2);

        // for(let ix = 0,mx=8;ix<mx;ix++){
        //     for(let iy = 0,my=8;iy<my;iy++){
        //         let pawn = this.add.image(defX+ix*50,defY+iy*50,'b_bishop').setOrigin(0).setDepth(2);
        //         // group.add(pawn);
        //     }
        //     icnt++;
        // }
        // group.setX(100)
        // group.setY(100)

        


        // let pawn = this.add.text(100,100,"♟️")
        // .setFont("20px Arial")
        // .setColor('#ff0000');

        // let renderTexture = this.add.renderTexture(100,100, 50, 50);
        // renderTexture.draw(pawn,0,0,0.5);
        // renderTexture.saveTexture('pawn')
        
    }

    resetPos(){
        // 위치 초기화
        this.initPieces.forEach((p,idx)=>{
            // let ix = p.boardIdx % 8;
            // let iy = Math.floor(p.boardIdx / 8);
            let square = this.squares[p.boardIdx]
            let squarePos = square.getCenter([],false);
            let piece = this.chessPieces[idx];
            piece.square = square;
            // piece.x = squarePos.x
            // piece.y = squarePos.y

            this.add.tween({
                targets: [piece],
                ease: 'Sine.easeInOut',
                duration: 200,
                delay: idx*50,
                x: {
                    // getStart: () => 1,
                    getEnd: () => squarePos.x
                },
                y: {
                    // getStart: () => 1,
                    getEnd: () => squarePos.y
                },
                onComplete: () => {
                    console.log('재설정',piece.pieceName);
                }
            });
        });
    }
    
    // update(time, delta){
        

    // }   
}
