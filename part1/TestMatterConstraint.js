class TestMatterConstraint extends Phaser.Scene
{
    
    constructor() {
        super("TestMatterConstraint");
        // super({ key: "TestGraphic" });
    }

    preload(){
        {
            var circleShape = new Phaser.Geom.Circle(10,10,10);
            var graphics = this.make.graphics().fillStyle(0x0000ff).setAlpha(0.5).fillCircleShape(circleShape);
            graphics.lineStyle(4,0xFF0000,1).beginPath().moveTo(10,10).lineTo(10,20).stroke().closePath()
            graphics.generateTexture("circle", 20, 20);
            graphics.destroy();
        }
        {
            var circleShape = new Phaser.Geom.Circle(20,20,20);
            var graphics = this.make.graphics().fillStyle(0x00ffff).setAlpha(0.5).fillCircleShape(circleShape);
            graphics.lineStyle(4,0xFFff00,1).beginPath().moveTo(20,20).lineTo(20,40).stroke().closePath()
            graphics.generateTexture("circle2", 40, 40);
            graphics.destroy();
        }
        
    }
   
    create(){
        // this.matter.world.setBounds(); // game 화면 밖으로 벗어나지 못한다.

        const circle = this.matter.add.image(300,300,'circle').setStatic(true).setCollidesWith(2)
        const circle2 = this.matter.add.image(300,100,'circle2').setStatic(false).setVelocityX(0).setVelocityY(-10).setAngularVelocity(1).setBounce(1);
        let distance = Phaser.Math.Distance.Between(circle.x,circle.y,circle2.x,circle2.y)/2
        let stiffness = 0.001
        this.matter.add.constraint(circle, circle2, distance, stiffness);

        this.input.on('pointerup',(pointer)=>{
            circle2.setVelocityY(-30).setVelocityX(Math.random()*60-30);
        })
    }

    

    
    update(time, delta){
        

    }   
}
