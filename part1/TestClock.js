class TestClock extends Phaser.Scene
{

    constructor() {
        super({ key: "TestClock" });
        // super();
    }

    textbox = null
    tm = null
    preload(){

    }

    create(){
        this.textbox = this.add.text(10,10,'READY',{fontSize:'30px',fill:'#000',padding:{left:10,right:20,top:10,bottom:10}})
        // this.changeText(this.textbox.text);
    }

    // stop(){
    //     console.log('STOP');
    // }

    changeText(text){
        this.textbox.text = text;
        const x = (this.game.canvas.width-this.textbox.displayWidth)/2
        const y = (this.game.canvas.height-this.textbox.displayHeight)/2
        this.textbox.x = x;
        this.textbox.y = y;
    }

    drawClock(){
        this.changeText((new Date()).toLocaleString());
        console.log('drawClock',(new Date()).toLocaleString());
    }
    timestamp0 = 0;
    update(timestamp,delta){
        if(!this.timestamp0 || timestamp - this.timestamp0 > 500){
            this.timestamp0 = timestamp;
            this.drawClock() //500ms마다.
        }       
        
    }

}
