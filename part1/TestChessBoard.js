class TestChessBoard extends Phaser.Scene
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
        {
            var circleRect = new Phaser.Geom.Rectangle(0,0,50,50);
            var graphics = this.make.graphics().fillStyle(0xffcc99).setAlpha(0.5).lineStyle(1,0x333333,0.5).fillRectShape(circleRect).strokeRectShape(circleRect);
            graphics.generateTexture("rect", 50, 50);
            graphics.destroy();
        }
        {
            var circleRect = new Phaser.Geom.Rectangle(0,0,50,50);
            var graphics = this.make.graphics().fillStyle(0xcc9966).setAlpha(0.5).lineStyle(1,0x333333,0.5).fillRectShape(circleRect).strokeRectShape(circleRect);
            graphics.generateTexture("rect2", 50, 50);
            graphics.destroy();
        }
        // {
        //     // this.make.text 로 하면 정상 동작 안된다. 글자가 잘린다던지...
        //     let pawn = this.add.text(-100,-100,"♟️")
        //     .setFont("40px Arial").setAlign('center')
        //     .setColor('#ff0000').setSize(50,50).setOrigin(0).setPadding(10)

        //     let renderTexture = this.add.renderTexture(0,0, 50, 50);
        //     console.log(renderTexture);
        //     renderTexture.draw(pawn,(renderTexture.width-pawn.width)/2,(renderTexture.height-pawn.height)/2);
        //     renderTexture.saveTexture('pawn')
        //     renderTexture.destroy();
        //     pawn.destroy()

        // }
        for(let k in this.chessPieceChars){
            let c = this.chessPieceChars[k];

            let pieceC = this.add.text(-100,-100,c)
                .setFont("40px Arial").setAlign('center')
                .setColor('#ff0000').setSize(50,50).setOrigin(0).setPadding(10);

            // black
            {
                pieceC.setColor('#222222').setShadow(3, 3, 'rgba(0,0,0,0.3)', 5);
                let renderTexture = this.add.renderTexture(0,0, 46, 46);
                renderTexture.draw(pieceC,(renderTexture.width-pieceC.width)/2,(renderTexture.height-pieceC.height)/2);
                renderTexture.saveTexture('b_'+k);
                renderTexture.destroy();
            }

            // white
            {
                pieceC.setColor('#ffffff').setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
                let renderTexture = this.add.renderTexture(0,0, 46, 46);
                renderTexture.draw(pieceC,(renderTexture.width-pieceC.width)/2,(renderTexture.height-pieceC.height)/2);
                renderTexture.saveTexture('w_'+k);
                renderTexture.destroy();
            }
            pieceC.destroy()
            
        }
        
        
        
        
    }
    create(){
        // this.add.image(100,100,'pawn');
        
        let rects = [];
        let group = this.make.group();
        let icnt = 0;
        let boardW = 50*8;
        let boardH = 50*8;
        let defX = (this.game.canvas.width-boardW)/2
        let defY = (this.game.canvas.height-boardH)/2
        for(let ix = 0,mx=8;ix<mx;ix++){
            for(let iy = 0,my=8;iy<my;iy++){
                let rect = this.add.image(defX+ix*50,defY+iy*50,((ix+iy)%2===0)?'rect':'rect2').setOrigin(0);
                rects.push(rect);
                group.add(rect);
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
       this.matter.world.setBounds()
        const canDrag = this.matter.world.nextGroup();
        this.matter.add.mouseSpring({ length: 1, stiffness: 0.6, collisionFilter: { group: canDrag } })

        this.initPieces.forEach(p=>{
            // let ix = p.boardIdx % 8;
            // let iy = Math.floor(p.boardIdx / 8);
            let posB = rects[p.boardIdx].getCenter();            
            let piece =  this.matter.add.image(posB.y,posB.x,p.texture).setOrigin(0.5).setDepth(2); 
            piece.setFixedRotation()
            piece.setCollisionGroup(canDrag)
            // piece.setSensor(true)
            // piece.setVelocity(0, 0)
            // piece.setAngularVelocity(0)

            this.chessPieces.push(piece);
            if(p.texture.indexOf('b_')===0){
                this.chessBlackPieces.push(piece);
            }else{
                this.chessWhitePieces.push(piece);
            }
        })

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

    

    
    update(time, delta){
        

    }   
}
