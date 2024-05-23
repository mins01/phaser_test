class TestAnalogClock extends Phaser.Scene
{
    
    constructor() {
        super("TestAnalogClock");
        // super({ key: "TestAnalogClock" });
    }

    preload(){

    }

    create(){
        let cW = this.game.canvas.width
        let cH = this.game.canvas.height
        let posX = (cW)/2;
        let posY = (cH)/2;
        let lineW = cW/300;
        this.lineH = this.add.line(posX,posY,0,0,0,-1*cW*1/4,0x0000ff,1)
        this.lineH.setOrigin(0,0).setLineWidth(lineW*8).setDepth(8)
        this.lineM = this.add.line(posX,posY,0,0,0,-1*cW*1/3,0x00ff00,1)
        this.lineM.setOrigin(0,0).setLineWidth(lineW*4).setDepth(4)
        this.lineS = this.add.line(posX,posY,0,0,0,-1*cW*1/2.5,0xff0000,1)
        this.lineS.setOrigin(0,0).setLineWidth(lineW*2).setDepth(2)

        let circle = this.add.circle(posX,posY,-1*cW*1/2.3,0xFFFFFF,1)
        .setOrigin(0.5,0.5).setDepth(1)
        .setStrokeStyle(lineW*9, 0x1a65ac);
        let circle2 = this.add.circle(posX,posY,-1*cW*1/50,0x00CCFF,1)
        .setOrigin(0.5,0.5).setDepth(20)
        

        // window.requestAnimationFrame((timestamp)=>{ this.step(timestamp) });
        this.update();
    }

    drawClock(){
        let d = new Date();
        let h = (d.getHours()+12)%12;
        let m = d.getMinutes();
        let s = d.getSeconds();
        let degH = h/12*180;
        let degM = m/60*360;
        let degS = s/60*360;

        console.log('drawClock',h,m,s,degH,degM,degS);

        this.lineH.setAngle(degH)
        this.lineM.setAngle(degM)
        this.lineS.setAngle(degS)
    }
    // timestamp0 = 0;
    // step(timestamp){
    //     if(!this.timestamp0 || timestamp - this.timestamp0 > 500){
    //         this.timestamp0 = timestamp;
    //         this.drawClock() //500ms마다.
    //     }       
    //     window.requestAnimationFrame((timestamp)=>{ this.step(timestamp) });
    // }
    time0 = 0;
    update(time, delta){
        if(!this.time0 || time - this.time0 > 500){
            this.time0 = time;
            this.drawClock()
            // console.log(time, delta);
        }
    }

   
}
