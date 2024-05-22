class TestClock extends Phaser.Scene
{
    textbox = null
    tm = null
    preload(){

    }

    create(){
        this.textbox = this.add.text(10,10,'READY',{fontSize:'30px',fill:'#000',padding:{left:10,right:20,top:10,bottom:10}})
        this.changeText(this.textbox.text);
    }

    changeText(text){
        this.textbox.text = text;
        const x = (this.game.canvas.width-this.textbox.displayWidth)/2
        const y = (this.game.canvas.height-this.textbox.displayHeight)/2
        this.textbox.x = x;
        this.textbox.y = y;
    }
    startClock(){
        if(this.tm){ throw new Error('이미 시계가 실행중')}
        this.tm = true;
        // this.tm = setInterval(()=>{this.drawClock()},500)
        window.requestAnimationFrame((timestamp)=>{ this.step(timestamp) });
    }
    stopCLock(){
        this.tm = false;
        // if(this.tm){ throw new Error('시계가 실행중이지 않음')}
        // clearInterval(this.tm);
        // this.tm = null
        this.changeText('STOP');
    }
    drawClock(){
        this.changeText((new Date()).toLocaleString());
    }
    timestamp0 = 0;
    step(timestamp){
        if(!this.timestamp0 || timestamp - this.timestamp0 > 500){
            this.timestamp0 = timestamp;
            this.drawClock() //500ms마다.
        }       
        
        if(this.tm)  window.requestAnimationFrame((timestamp)=>{ this.step(timestamp) });
    }
}
