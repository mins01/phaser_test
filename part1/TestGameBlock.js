class TestGameBlock extends Phaser.Scene
{
    
    constructor() {
        super("TestGameBlock");
        // super({ key: "TestGameBlock" });
    }

    preload(){
        {
            // ㅁ
            let graphics = this.make.graphics().fillStyle(0xffff00).fillRect(0, 0, 50, 50);
            graphics.lineStyle(4,0xFF0000,1).beginPath().moveTo(25,25).lineTo(25,50).stroke().closePath()
            graphics.generateTexture("block_0", 50, 50);
            graphics.destroy();
        }
        {
            // ㅁㅁ
            let graphics = this.make.graphics().fillStyle(0xffff00).fillRect(0, 0, 100, 50);
            graphics.lineStyle(4,0xFF0000,1).beginPath().moveTo(50,25).lineTo(50,50).stroke().closePath()
            graphics.generateTexture("block_1", 100, 50);
            graphics.destroy();
        }
        {
            // ㅁㅁㅁ
            let graphics = this.make.graphics().fillStyle(0xffff00).fillRect(0, 0, 150, 50);
            graphics.lineStyle(4,0xFF0000,1).beginPath().moveTo(90,25).lineTo(90,50).stroke().closePath()
            graphics.generateTexture("block_2", 150, 50);
            graphics.destroy();
        }
        {
            // ㅁㅁ
            // ㅁ
            let graphics = this.make.graphics().fillStyle(0xffff00).fillRect(0, 0, 100, 50).fillRect(0, 50, 50, 50);
            // graphics.lineStyle(4,0xFF0000,1).beginPath().moveTo(50,25).lineTo(50,50).stroke().closePath()
            graphics.generateTexture("block_3", 100, 100);
            graphics.destroy();
        }
    }
    create(){
        this.matter.world.setBounds(); // game 화면 밖으로 벗어나지 못한다.

        // this.matter.world.drawDebug = false;
        this.matter.world.drawDebug = true;

        this.fpsbox = this.add.text(10,10,'FPS',{fontSize:'30px',fill:'#000',padding:{left:10,right:20,top:10,bottom:10}})
        this.textbox = this.add.text(10,40,'READY',{fontSize:'30px',fill:'#000',padding:{left:10,right:20,top:10,bottom:10}})      

        let n = 0;
        this.input.on('pointerdown',(pointer)=>{
            this.lastpointer = pointer;
            this.addBlock(pointer.position.x,pointer.position.y, n);
            n++;
            n = n%4;
        })
        this.input.on('pointerup',(pointer)=>{
            // console.log(pointer);

            // console.log(pointer.upX,pointer.upY);
            // this.addCircle(pointer.downX,pointer.downY)
            this.addingCircle= false;
            this.lastpointer = null;
        })
        this.input.on('pointermove',(pointer)=>{
            if(this.lastpointer){
                this.lastpointer = pointer;
                // console.log(pointer);
            }
        })
    }

    addBlock(x,y,n){
        console.log(n)
        let block = null;
        // block = this.matter.add.image(x,y,'block_'+n)
        //     .setBounce(0.1)
        //     .setFriction(0.1)
        //     .setBody({type:'fromPhysicsEditor'});
        

        if(n==3){
            block = this.matter.add.image(x,y,'block_'+n)
            .setBody({
                type:'fromVertices',
                width:100,height:100,
                flagInternal:true,
                removeCollinear:1,
                minimumArea:0,
                verts:[{x:0, y:0}, {x:100, y:0}, {x:100, y:50}, {x:50, y:50}, {x:50, y:100}, {x:0, y:100}]
            })
            // .setBounce(0)
            // .setFriction(0.1);

            // block = this.matter.add.fromVertices(x,y,[{x:0, y:0}, {x:100, y:0}, {x:100, y:50}, {x:50, y:50}, {x:50, y:100}, {x:0, y:100}],{},false,1,0);
            // block.setBounce(0).setFriction(0.1);
        }else{
            block = this.matter.add.image(x,y,'block_'+n)
            .setBounce(0.1)
            .setFriction(0.1)
            // .setBody({type:'fromPhysicsEditor'});   
        }
        
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
