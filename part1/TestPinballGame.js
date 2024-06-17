class TestPinballGame extends Phaser.Scene
{
    
    
    constructor() {
        super("TestMarbleGame");
        // super({ key: "TestGraphic" });
        
    }
    defR = 10;
    ballR = 5;
    ballShape = null;
    blockPolygons = null;
    blockTextrues = null;
    balls = null;
    preload(){
        this.balls = [];
        this.defR = this.game.canvas.width/12;
        this.ballR = Math.floor(this.defR/2*0.6);
        this.blockPolygons = []
        this.blockTextrues = {};
        this.blockPoints = [
            {key:'square',points:[0,0, this.defR,0, this.defR,this.defR, 0,this.defR], size:[this.defR,this.defR] }, 
            {key:'triangle_C',points:[this.defR/2,0, this.defR,this.defR, 0,this.defR], size:[this.defR,this.defR] }, 
            {key:'triangle_R',points:[0,0, this.defR,this.defR, 0,this.defR], size:[this.defR,this.defR] }, 
            {key:'triangle_L',points:[this.defR,0, this.defR,this.defR, 0,this.defR], size:[this.defR,this.defR] }, 
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
            this.blockTextrues[blockPoint.key] =  graphics.generateTexture(blockPoint.key, blockPoint.size[0], blockPoint.size[1]);
            graphics.destroy();
            console.log('created texture',blockPoint.key);
            console.log('created polygons',blockPoint.key);
        });


        {
            this.ballShape = new Phaser.Geom.Circle(this.ballR,this.ballR,this.ballR);
            var graphics = this.make.graphics().fillStyle(0x0000ff).setAlpha(0.5).fillCircleShape(this.ballShape);
            graphics.lineStyle(2,0xFF0000,1).beginPath().moveTo(this.ballR,this.ballR).lineTo(this.ballR,this.ballR*2).stroke().closePath()
            graphics.generateTexture("ball", this.ballR*2, this.ballR*2);
        }
    }
    
    addBlock(idxX,idxY,key,isStatic=false){
        let x =this.defR*idxX+this.defR/2;
        let y =this.defR*idxY+this.defR/2;
        console.log('addBlock',key)
        // let key = 'block_'+n;
        let block = this.matter.add.image(x,y,key)
            .setBounce(1)
            .setFriction(1)
            // .setOrigin(0);
        let body = this.matter.add.fromVertices(x,y,this.blockPolygons[key].points)
        block.setExistingBody(body);
        block.setSize(this.defR,this.defR)
        // block.setScale(0.5)
        block.setStatic(isStatic);
        

        console.log(block.body);
        return block
    }
    create(){
        this.matter.world.setBounds(); // game 화면 밖으로 벗어나지 못한다.

        // this.matter.world.drawDebug = false;
        this.matter.world.drawDebug = true;

        this.fpsbox = this.add.text(10,10,'FPS',{fontSize:'30px',fill:'#000',padding:{left:10,right:20,top:10,bottom:10}})
        
        const canDrag = this.matter.world.nextGroup();
        this.matter.add.mouseSpring({ length: 0, stiffness: 0, collisionFilter: { group: canDrag } })

        for(let i=0,m=3;i<m;i++){
            let ball = this.matter.add.image(this.defR*(2+i*2),this.defR*(2+i),'ball').setCircle(this.ballR).setVelocity((Math.random()*20-10),(Math.random()*20-10)).setBounce(0.99).setFriction(0.01).setRandomPosition()
            // ball.setFixedRotation(true)
            ball.setInteractive();
            this.input.setDraggable(ball);
            ball.setCollisionGroup(canDrag) //충돌그룹 설정

            

            this.balls.push(ball);
        }

        this.addBlock(2,6,'triangle_R',true);
        this.addBlock(4,6,'triangle_C',true);
        this.addBlock(6,6,'triangle_L',true);

        this.addBlock(8,6,'triangle_R',true);
        this.addBlock(10,6,'triangle_C',true);

        this.addBlock(1,3,'triangle_L',true);
        this.addBlock(3,3,'triangle_R',true);
        this.addBlock(5,3,'triangle_C',true);

        this.addBlock(7,3,'triangle_C',true);
        this.addBlock(9,3,'triangle_L',true);
        // this.addBlock(7,6,'triangle_L',true);

        this.addBlock(0,0,'square',true);
        this.addBlock(1,0,'square',true);
        this.addBlock(2,0,'square',true);
        this.addBlock(3,0,'square',true);
        this.addBlock(4,0,'square',true);
        this.addBlock(5,0,'square',true);
        this.addBlock(6,0,'square',true);
        this.addBlock(7,0,'square',true);
        this.addBlock(8,0,'square',true);
        this.addBlock(9,0,'square',true);
        this.addBlock(10,0,'square',true);
        this.addBlock(11,0,'square',true);
        this.addBlock(0,0,'square',true);
        this.addBlock(0,1,'square',true);
        this.addBlock(0,2,'square',true);
        this.addBlock(0,3,'square',true);
        this.addBlock(0,4,'square',true);
        this.addBlock(0,5,'square',true);
        this.addBlock(0,6,'square',true);
        this.addBlock(0,7,'square',true);
        this.addBlock(0,8,'square',true);
        this.addBlock(0,9,'square',true);
        this.addBlock(0,10,'square',true);
        this.addBlock(0,11,'square',true);
        this.addBlock(11,0,'square',true);
        this.addBlock(11,1,'square',true);
        this.addBlock(11,2,'square',true);
        this.addBlock(11,3,'square',true);
        this.addBlock(11,4,'square',true);
        this.addBlock(11,5,'square',true);
        this.addBlock(11,6,'square',true);
        this.addBlock(11,7,'square',true);
        this.addBlock(11,8,'square',true);
        this.addBlock(11,9,'square',true);
        this.addBlock(11,10,'square',true);
        this.addBlock(11,11,'square',true);
        this.addBlock(0,11,'square',true);
        this.addBlock(1,11,'square',true);
        this.addBlock(2,11,'square',true);
        this.addBlock(3,11,'square',true);
        this.addBlock(4,11,'square',true);
        this.addBlock(5,11,'square',true);
        this.addBlock(6,11,'square',true);
        this.addBlock(7,11,'square',true);
        this.addBlock(8,11,'square',true);
        this.addBlock(9,11,'square',true);
        this.addBlock(10,11,'square',true);
        this.addBlock(11,11,'square',true);
        

    }
  
    update(time, delta){
        this.fpsbox.text = `FPS:${this.game.loop.actualFps}`;

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
