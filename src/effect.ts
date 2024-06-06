export const loadEffectSprites = (scene: Phaser.Scene) => {
    scene.load.image('effect', './assets/effect.png');
}

export const createEffect = (player, scene) => {
    const x = player.flipX ? player.x - 60 : player.x + 60;
    const y = player.y + 18;

    const effect = scene.physics.add.image(x, y, 'effect').setScale(0.3);

    // Espelha o efeito horizontalmente se o jogador estiver virado para a esquerda
    effect.setFlipX(player.flipX);

    // Ajuste adicional se necessário (por exemplo, rotação)
    if (player.flipX) {
        effect.angle = 30; // Gira o efeito 180 graus se necessário
    }
}
