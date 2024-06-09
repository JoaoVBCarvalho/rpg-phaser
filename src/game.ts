import * as Phaser from "phaser";
import { createPlayer, loadPlayerSprites } from "./player";
import { createControls, configControls } from "./controls";
import { createEffect, loadEffectSprites } from "./effect";
import { createGolemAnimations, loadGolemSprites, createGolem } from "./golem";

export default class Demo extends Phaser.Scene {
    player;
    controls;
    water;
    golems = [];
    effects = [];

    constructor() {
        super("demo");
    }

    preload() {
        this.load.image("tiles", "./assets/map/grass.png");
        this.load.image("border", "./assets/map/water.png");
        this.load.tilemapTiledJSON("map", "./assets/map/map.json");
        loadPlayerSprites(this);
        loadEffectSprites(this);
        loadGolemSprites(this);
    }

    create() {
        const map = this.make.tilemap({ key: "map" });
        const tilesetGrass = map.addTilesetImage("grass", "tiles");
        const tilesetWater = map.addTilesetImage("water", "border");

        const ground = map.createLayer("grass", tilesetGrass, 0, 0);
        this.water = map.createLayer("water", tilesetWater, 0, 0);

        this.water.setCollisionByProperty({ collider: true });

        this.player = createPlayer(this);
        this.physics.add.collider(this.player, this.water);

        this.player.anims.play("player_idle", true);
        this.controls = createControls(this);

        createGolemAnimations(this);


        this.physics.add.collider(this.golems, this.water, this.golemCollision, null, this);

        this.time.addEvent({
            delay: 2000,
            callback: () => {
                const newGolem = createGolem(this);
                this.golems.push(newGolem);
            },
            loop: true
        });

        
        const newEffect = createEffect(this.player, this);
        this.effects.push(newEffect);

        
        this.physics.add.collider(this.golems, this.effects, this.effectCollision, null, this);
    }

    golemCollision(golem) {
        console.log("Golem colidiu com a água");
        if (golem.body.velocity.x > 0) {
            golem.setFlipX(false);
        } else {
            golem.setFlipX(true);
        }

        golem.setVelocityX(-golem.body.velocity.x);
    }

    effectCollision(golem, effect) {
        console.log("Colisão entre golem e efeito detectada!");
        golem.destroy(); 
        effect.destroy(); 
    }

    update() {
        configControls(this.player, this.controls, this);
    }
}

// Configuração do jogo
const config = {
    type: Phaser.AUTO,
    backgroundColor: "#125555",
    width: 800,
    height: 640,
    scene: Demo,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 }
        }
    }
};

const game = new Phaser.Game(config);
