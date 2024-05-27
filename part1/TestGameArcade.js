class TestGameArcade extends Phaser.Scene
{
    
    constructor() {
        super("TestGameArcade");
        // super({ key: "TestGameArcade" });
    }

    preload(){
        this.load.spritesheet('player','../assets/sprites/player60x60.png',{ frameWidth: 60, frameHeight: 60 })
        this.load.image('star','../assets/sprites/star60x60.png',)

        let graphics = this.make.graphics().fillStyle(0xffff00).fillRect(0, 0, 600, 30);
        graphics.generateTexture("platform0", 600, 30);
        graphics.generateTexture("platform1", 600/2, 30);
        graphics.generateTexture("platform2", 600/4, 30);
        graphics.generateTexture("platform3", 600/8, 30);
        graphics.destroy();


    }

    create(){
        
        
        this.physics.world.setBounds(0,0,600,600,true,true,true,true)
        let platforms = this.physics.add.staticGroup();
        platforms.create(600-300,600-30-120*0,'platform0');
        platforms.create(600-300,600-30-120*1,'platform1');
        platforms.create(600-300,600-30-120*2,'platform2');
        platforms.create(600-300,600-30-120*3,'platform3');

        let star = this.physics.add.staticImage(600-300,600-30-120*4,'star');


        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player',{frames:[0,1]}),
            frameRate: 2,
            repeat: -1
        });
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player',{frames:[2,3]}),
            frameRate: 2,
            repeat: -1
        });

        const player = this.physics.add.sprite(100,300,'player',)
        // player.setBounce(0.1);
        player.setBounce(0);

        player.setCollideWorldBounds(true);
        player.isRunning = false;
        

        this.physics.add.collider(player, platforms);

        player.lastJump = 0;
        player.readyJump = true;
        //  Event handler for when the animation completes on our sprite
        player.on(Phaser.Animations.Events.ANIMATION_STOP, function () {
            this.isRunning = false;

        }, this);
        // player.playWalk = function(){
        //     this.isRunning = true;
        //     this.play({ key: 'walk', randomFrame: false,  frameRate:24, showBeforeDelay: true });
        // }
        
        this.player = player;
        
        let collectStar = (player, star)=>{
            star.disableBody(true, true);
            this.textbox = this.add.text(0,0,"GAME OVER",{fontSize:60,'fontStyle':'bold'}).setAlign('center').setStroke(0xff0000, 5).setDepth(20);
            this.textbox.setX((600-this.textbox.displayWidth)/2)
            this.textbox.setY((600-this.textbox.displayHeight)/2)
        }
        this.physics.add.overlap(player, star, collectStar,null, this);
        



        this.cursors = this.input.keyboard.createCursorKeys();

    }
    update(time){
        if(this.cursors.up.isDown && this.player.body.touching.down && this.player.readyJump){
            this.player.setVelocityY(60*4*-1);
            this.player.readyJump = false;
        }
        if(this.player.body.touching.down && this.cursors.up.isUp){
            this.player.readyJump = true;
        }
        if(this.player.jumpStep==1 && this.cursors.up.isUp && this.player.body.touching.down){
            this.player.jumpStep = 0;
        }
        if(this.cursors.right.isDown){
            this.player.setVelocityX(60*2);
            this.player.play('right',true);
        }else if(this.cursors.left.isDown){
            this.player.setVelocityX(60*2*-1);
            this.player.play('left',true);
        }else{
            this.player.setVelocityX(0);
            this.player.stop();
        }

    }
   
}
