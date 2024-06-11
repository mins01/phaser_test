class TestBoard extends Phaser.Scene
{
    
    constructor() {
        super("TestBoard");
        // super({ key: "TestGraphic" });
    }

    preload(){
        {
            var circleRect = new Phaser.Geom.Rectangle(0,0,50,50);
            var graphics = this.make.graphics().fillStyle(0xeeeeee).setAlpha(0.5).lineStyle(1,0x333333,0.5).fillRectShape(circleRect).strokeRectShape(circleRect);
            graphics.generateTexture("rect", 50, 50);
            graphics.destroy();
        }
        {
            var circleRect = new Phaser.Geom.Rectangle(0,0,50,50);
            var graphics = this.make.graphics().fillStyle(0x999999).setAlpha(0.5).lineStyle(1,0x333333,0.5).fillRectShape(circleRect).strokeRectShape(circleRect);
            graphics.generateTexture("rect2", 50, 50);
            graphics.destroy();
        }
        {
            let pawn = this.add.text(-100,-100,"♟️")
            .setFont("30px Arial").setAlign('center')
            .setColor('#ff0000').setSize(50,50).setOrigin(0).setPadding(10)
            

            

            let renderTexture = this.add.renderTexture(-100,-100, 100, 100);
            console.log(renderTexture);
            renderTexture.draw(pawn,0,0);
            renderTexture.saveTexture('pawn')
            renderTexture.destroy();
            pawn.destroy()

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
                group.add(rect);
            }
            icnt++;
        }

        for(let ix = 0,mx=8;ix<mx;ix++){
            for(let iy = 0,my=8;iy<my;iy++){
                let pawn = this.add.image(defX+ix*50,defY+iy*50,'pawn').setOrigin(0).setDepth(2);
                // group.add(pawn);
            }
            icnt++;
        }
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
