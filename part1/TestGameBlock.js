class TestGameBlock extends Phaser.Scene
{
    
    polygons = null;
    bodies = null

    constructor() {
        super("TestGameBlock");
        // super({ key: "TestGameBlock" });

        this.blockPoints = [];
        this.blockPolygons = {};
        this.blockTextrue = {};
    }

    
    preload(){
        
        this.blockPoints = [
            // {key:'block_0',points:[0,0], size:[0,0] }, // 0
            // ㅁ
            {key:'block_1',points:[0,0, 50,0, 50,50, 0,50], size:[50,50] }, 
            // ㅁㅁ
            {key:'block_2',points:[0,0, 100,0, 100,50, 0,50], size:[100,50] }, 
            // ㅁㅁㅁ
            {key:'block_3',points:[0,0, 150,0, 150,50, 0,50], size:[150,50] }, 
            // ㅁㅁ
            // ㅁ
            {key:'block_4',points:[0, 0, 100, 0, 100, 50, 50, 50, 50, 100, 0, 100], size:[100,100] }, 
        ]
        this.blockPoints.forEach((blockPoint,idx)=>{
            if(blockPoint.size[0]===0 || blockPoint.size[1]===0){ return; }
            // console.log(blockPoint);
            this.blockPolygons[blockPoint.key] = new Phaser.Geom.Polygon( blockPoint.points );
            let potins = this.blockPolygons[blockPoint.key].points
            console.log(blockPoint.key,this.blockPolygons[blockPoint.key]);
            let graphics = this.make.graphics()
            // .fillStyle(0x0000ff22).setAlpha(0.2).fillRect(0, 0, blockPoint.size[0], blockPoint.size[1])
            .setAlpha(1).fillStyle(0xffff00).fillPoints(potins,true,true);
            graphics.lineStyle(4,0xFF0000,1).beginPath().moveTo(blockPoint.size[0]/2,blockPoint.size[1]/2).lineTo(blockPoint.size[0]/2,blockPoint.size[0]).stroke().closePath();
            // console.log('xxx',blockPoint.points);
            this.blockTextrue[blockPoint.key] =  graphics.generateTexture(blockPoint.key, blockPoint.size[0], blockPoint.size[1]);
            graphics.destroy();
            console.log('created texture',blockPoint.key);
            console.log('created polygons',blockPoint.key);
        });

    }
    create(){
        this.matter.world.setBounds(); // game 화면 밖으로 벗어나지 못한다.

        // this.matter.world.drawDebug = false;
        this.matter.world.drawDebug = true;

        this.fpsbox = this.add.text(10,10,'FPS',{fontSize:'30px',fill:'#000',padding:{left:10,right:20,top:10,bottom:10}})
        this.textbox = this.add.text(10,40,'READY',{fontSize:'30px',fill:'#000',padding:{left:10,right:20,top:10,bottom:10}})      

        let n = 0;
        this.input.on('pointerdown',(pointer)=>{
            
            n = n%this.blockPoints.length;
            let key = this.blockPoints[n].key;
            this.lastpointer = pointer;
            this.addBlock(pointer.position.x,pointer.position.y, key);
            // console.log(key);
            n++;
        })
        this.input.on('pointerup',(pointer)=>{
            this.lastpointer = null;
        })
        this.input.on('pointermove',(pointer)=>{
            if(this.lastpointer){
                this.lastpointer = pointer;
                // console.log(pointer);
            }
        })
    }

    addBlock(x,y,key){
        console.log('addBlock',key)
        // let key = 'block_'+n;
        let block = this.matter.add.image(x,y,key)
            .setBounce(0.1)
            .setFriction(0.5);
        let body = this.matter.add.fromVertices(x,y,this.blockPolygons[key].points)
        block.setExistingBody(body);
        block.setScale(0.5)

        return block
    }
   

    
    update(time, delta){
       
        this.fpsbox.text = 'FPS:'+this.game.loop.actualFps

    }

    // time0 = 0;
    // update(time, delta){
    //     if(!this.time0 || time - this.time0 > 500){
    //         this.time0 = time;
    //         this.drawClock()
    //         // console.log(time, delta);
    //     }
    // }

   
}
