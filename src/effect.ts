export const loadEffectSprites = (scene: Phaser.Scene) => {
    scene.load.image('effect', './assets/effect.png');
}

export const createEffect = (player: any, scene: Phaser.Scene) => {
    const x = player.flipX ? player.x - 60 : player.x + 60;
    const y = player.y + 18;

    const effect = scene.physics.add.image(x, y, 'effect').setScale(0.3);

    effect.setFlipX(player.flipX);

    if (player.flipX) {
        effect.angle = 30;
        effect.setVelocityX(-500);
    } else {
        effect.setVelocityX(500);
    }

    return effect;
}

