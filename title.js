class title extends Phaser.Scene {
    constructor() {
        super({key: 'title'});
    }

    preload() {
        this.load.image('chilli', 'assets/chilli.png');
        this.load.image('onion', 'assets/onion.png');
        this.load.image('tikka', 'assets/tikka.png');
        this.load.image('knife', 'assets/knife.png');
    }

    create() {
        gameState.active = true;

        //background

        //title
        this.add.text(300, 200, 'Chilli & the Flying Chapati', {fontSize: '30px', fill: '#32a852'}).setOrigin(0.5);
        this.add.text(300, 300, 'Help Chilli find his friends so\nthey can make delicious curries.', {fontSize: '20px', fill: '#32a852'}).setOrigin(0.5);
        this.add.text(300, 400, 'Collect the ingredients    and spice    \n\nbut avoid the dangers    !', {fontSize: '20px', fill: '#32a852'}).setOrigin(0.5);
        this.add.image(360, 375, 'onion').setScale(0.7);
        this.add.image(510, 375, 'tikka').setScale(0.5);
        this.add.image(340, 420, 'knife').setScale(0.4);

        //player
        gameState.player = this.physics.add.sprite(100, 100, 'chilli').setScale(2);
        gameState.player.setCollideWorldBounds(true);
        gameState.cursors = this.input.keyboard.createCursorKeys();

        //camera

        //ingredients
        const ingredients = this.physics.add.group();
        ingredients.create(1000, 200, 'onion').setScale(1.5);

        const spice = this.physics.add.group();
        spice.create(1000, 900, 'tikka').setScale(2);

        //collect ingredients

        //collect spice

        //basket

        //win condition

        //dangers
        const dangers = this.physics.add.group();
        dangers.create(650, 200, 'knife').setScale(2);

        //lose condition

        //start game
        this.input.keyboard.on('keydown_SPACE', () => {
            this.scene.stop('title');
            this.scene.start('Level1');
        })

        this.time.addEvent({
            delay: 3000,
            callback: startInstruct,
            callbackScope: this
        });

        function startInstruct () {
            this.add.text(300, 500, 'Press spacebar to start', {fontSize: '20px', fill: '#32a852'}).setOrigin(0.5);
        }
    }

    update() {
    }
}