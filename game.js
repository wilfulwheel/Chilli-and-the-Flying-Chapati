const gameState = {};

const config = {
    type: Phaser.AUTO,
    width: 600,
    height: 600,
    backgroundColor: '#000000',
    physics: {
        default: 'arcade',
        arcade: {
            enableBody: true,
            debug: false
        }
    },
    scene: [Level1]
};

const game = new Phaser.Game(config);