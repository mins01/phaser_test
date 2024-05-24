class TestMatter extends Phaser.Scene
{
    
    constructor() {
        super("TestMatter");
        // super({ key: "TestGraphic" });
    }

    preload(){
        {
            var graphics = this.make.graphics().fillStyle(0xffff00).fillRect(0, 0, 20, 20);
            graphics.lineStyle(4,0xFF0000,1).beginPath().moveTo(10,10).lineTo(10,20).stroke().closePath()
            graphics.generateTexture("rect", 20, 20);
            graphics.destroy();
        }
        
        {
            var circleShape = new Phaser.Geom.Circle(10,10,10);
            var graphics = this.make.graphics().fillStyle(0x0000ff).setAlpha(0.5).fillCircleShape(circleShape);
            graphics.lineStyle(4,0xFF0000,1).beginPath().moveTo(10,10).lineTo(10,20).stroke().closePath()
            graphics.generateTexture("circle", 20, 20);
            graphics.destroy();
        }
        this.circles = [];
        
    }
    textbox = null;
    rect = null;
    circles = null;

    addingCircle = false;
    lastpointer = null;
    create(){
        this.matter.world.setBounds(); // game 화면 밖으로 벗어나지 못한다.

        // this.matter.world.drawDebug = false;
        this.matter.world.drawDebug = true;

        this.fpsbox = this.add.text(10,10,'FPS',{fontSize:'30px',fill:'#000',padding:{left:10,right:20,top:10,bottom:10}})
        this.textbox = this.add.text(10,40,'READY',{fontSize:'30px',fill:'#000',padding:{left:10,right:20,top:10,bottom:10}})

        this.rect = this.matter.add.image(100,100,'rect');
        // this.rect.setCollideWorldBounds(true).setVelocity(-100,-300).setBounce(1,1).setDepth(10);
        this.rect.setVelocity((Math.random()*20-10),(Math.random()*20-10)).setBounce(0.8).setFriction(0.2).setDepth(10);

        // this.rect.setCollisionGroup(2)
        // this.rect.setCollisionCategory(1)
        // this.rect.setCollisionCategory(4)

        this.addCircle()

        this.input.on('pointerdown',(pointer)=>{
            // console.log(pointer);
            // console.log(pointer.downX,pointer.downY);
            // this.addCircle(pointer.downX,pointer.downY)
            // this.addingCircle= true;
            this.lastpointer = pointer;
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

    addCircle(x=100,y=100){
        // return;
        let circle = this.matter.add.image(x,y,'circle').setCircle(10).setVelocity((Math.random()*20-10),(Math.random()*20-10)).setBounce(1).setFriction(0.1);
        
        // circle.setFixedRotation(); // 총돌시 회전 금지
        // circle.setCollisionGroup(1)
        // circle.setCollidesWith(2)
        // circle.setCollidesWith([1,2,4])
        

        this.add.tween({
            targets: [circle],
            ease: 'liner',
            duration: 5000,
            delay: 0,
            alpha: {
              getStart: () => 1,
              getEnd: () => 0
            },
            onComplete: () => {
                if(this.circles.indexOf(circle)>-1){
                    this.circles.splice(this.circles.indexOf(circle),1);
                }
                circle.destroy()
                this.textbox.text = 'CIRCLE: '+this.circles.length

            }
          });

        this.circles.push(circle)
        this.textbox.text = 'CIRCLE: '+this.circles.length
    }

    
    update(time, delta){
        if(!this.time0 || time - this.time0 > 1){
            this.time0 = time;
            if(this.lastpointer){
                this.addCircle(this.lastpointer.position.x,this.lastpointer.position.y)
                this.addCircle(this.lastpointer.position.x,this.lastpointer.position.y)
                this.addCircle(this.lastpointer.position.x,this.lastpointer.position.y)
                this.addCircle(this.lastpointer.position.x,this.lastpointer.position.y)
                this.addCircle(this.lastpointer.position.x,this.lastpointer.position.y)
                this.addCircle(this.lastpointer.position.x,this.lastpointer.position.y)
                this.addCircle(this.lastpointer.position.x,this.lastpointer.position.y)
                this.addCircle(this.lastpointer.position.x,this.lastpointer.position.y)
                this.addCircle(this.lastpointer.position.x,this.lastpointer.position.y)
                this.addCircle(this.lastpointer.position.x,this.lastpointer.position.y)
            }

            // console.log(time, delta);
        }
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
