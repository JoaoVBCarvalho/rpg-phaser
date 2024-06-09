import { Scene } from "phaser";

export const loadGolemSprites = (scene:Phaser.Scene): void => {
    scene.load.spritesheet('golem_idle', './assets/golem/idle.png', {
        frameWidth: 80,
        frameHeight: 95,
        spacing: 16,
    });
    
    scene.load.spritesheet('golem_walk', './assets/golem/walk.png', {
        frameWidth: 80,
        frameHeight: 95,
        spacing: 16,
    });
}

export const createGolemAnimations = (scene:Phaser.Scene): void => {
    scene.anims.create({
        key: "golem_idle",
        frames: scene.anims.generateFrameNumbers('golem_idle', {
            start: 0,
            end: 4,  
        }),
        frameRate: 8,
        repeat: -1,
    })

    scene.anims.create({
        key: "golem_walk",
        frames: scene.anims.generateFrameNumbers("golem_walk", {
          start: 0,
          end: 6,
        }),
        frameRate: 8,
        repeat: -1,
      });
}



export const createGolem = (scene:Phaser.Scene) => {
    
    let x = getRandomInt(50,750);
    let y = getRandomInt(50, 600);


    const golem = scene.physics.add.sprite(x, y, 'golem_idle').setScale(1);
    golem.anims.play('golem_idle', true); 

    golem.setVelocityX(100); 
    golem.anims.play('golem_walk', true);
    golem.body.onWorldBounds = true;

    scene.physics.world.on('worldbounds', (body) => {
        if (body.gameObject === golem) {
            golem.setVelocityX(-golem.body.velocity.x);
        }
    });

    return golem;

}
    
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

