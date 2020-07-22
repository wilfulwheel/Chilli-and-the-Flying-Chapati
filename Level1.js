class Level1 extends Phaser.Scene {
    constructor() {
        super({key: 'Level1'});
    }

    preload() {
        this.load.image('background', 'assets/background.png');
        this.load.image('chilli', 'assets/chilli.png');
        this.load.image('onion', 'assets/onion.png');
        this.load.image('tomato', 'assets/tomato.png');
        this.load.image('mango', 'assets/mango.png');
        this.load.image('yoghurt', 'assets/yoghurt.png');
        this.load.image('chicken', 'assets/chicken.png');
        this.load.image('tikka', 'assets/tikka.png');
        this.load.image('knife', 'assets/knife.png');
        this.load.image('trap', 'assets/mousetrap.png')
    }

    create() {
        gameState.active = true;

        //background
        this.add.image(0, 0, 'background').setOrigin(0).setScale(1.5);

        //player
        gameState.player = this.physics.add.sprite(Math.random() * 1200, Math.random() * 1200, 'chilli');
        gameState.player.setCollideWorldBounds(true);
        gameState.cursors = this.input.keyboard.createCursorKeys();

        //camera
        this.cameras.main.setBounds(0, 0, 1200, 1200);
        this.physics.world.setBounds(0, 0, 1200, 1200);
        this.cameras.main.startFollow(gameState.player, true, 0.5, 0.5);

        //ingredients
        const ingredients = this.physics.add.group();

        const list = ['onion', 'tomato', 'mango', 'yoghurt', 'chicken'];
        list.forEach(element => ingredients.create((Math.random() * 1060) + 15, (Math.random() * 1060) + 15, element).setScale(1.5).setOrigin(0));

        const spice = this.physics.add.group();
        spice.create((Math.random() * 1110) + 15, (Math.random() * 1050) + 15, 'tikka').setScale(2).setOrigin(0);

        //collect ingredients
        this.physics.add.overlap(gameState.player, ingredients, collectIngredient, null, this);
        function collectIngredient (player, ingredient) {
            ingredient.disableBody(true, true);
            veg += 1;
            vegText.setText(`${veg}/5`);
            if (veg === 5 && seasoning === 1) {
                this.add.text(300, 400, 'Yay!\nChilli found all his friends.\n\nThey made a delicious\nchicken tikka masala.', {fontSize: '30px', fill: '#32a852'}).setOrigin(0.5).setScrollFactor(0);
                this.add.text(300, 525, 'Press spacebar to restart', {fontSize: '30px', fill: '#32a852'}).setOrigin(0.5).setScrollFactor(0);
                this.physics.pause();
                gameState.active = false;
                this.input.keyboard.on('keydown_SPACE', () => {
                    this.scene.restart();
                });
            }
        }

        //collect spice
        this.physics.add.overlap(gameState.player, spice, collectSpice, null, this);
        function collectSpice (player, spice) {
            spice.disableBody(true, true);
            seasoning += 1;
            seasoningText.setText(`${seasoning}/1`);
            if (veg === 5 && seasoning === 1) {
                this.add.text(300, 400, 'Yay!\nChilli found all his friends.\n\nThey made a delicious\nchicken tikka masala.', {fontSize: '30px', fill: '#32a852'}).setOrigin(0.5).setScrollFactor(0);
                this.physics.pause();
                gameState.active = false;
                this.input.keyboard.on('keydown_SPACE', () => {
                    this.scene.restart();
                })
            }
        }

        //basket
        let veg = 0;
        let seasoning = 0;

        this.add.image(50, 50, 'onion').setScrollFactor(0).depth = 2;
        let vegText = this.add.text(25, 85, '0/5', {fontSize: '30px', fill: '#32a852'}).setScrollFactor(0);
        vegText.depth = 2;
        this.add.image(125, 50, 'tikka').setScrollFactor(0).depth = 2;
        let seasoningText = this.add.text(100, 85, '0/1', {fontSize: '30px', fill: '#32a852'}).setScrollFactor(0);
        seasoningText.depth = 2;

        //win condition

        //dangers
        const dangers = this.physics.add.group();
        const dangersList = ['knife', 'knife', 'trap'];
        dangersList.forEach(element => dangers.create((Math.random() * 965) + 15, (Math.random() * 900) + 15, element).setScale(2).setOrigin(0));

        //lose condition
        this.physics.add.overlap(gameState.player, dangers, () => {
            this.physics.pause();
            gameState.active = false;
            this.add.text(300, 400, 'Game Over...\nPress spacebar to play again', {fontSize: '30px', fill: '#ff0000'}).setOrigin(0.5).setScrollFactor(0);
            this.input.keyboard.on('keydown_SPACE', () => {
                this.scene.restart();
            })
        })
    }

    update() {
        if (gameState.active) {
            if (gameState.cursors.left.isDown) {
                gameState.player.setVelocityX(-300);
                gameState.player.flipX = true;
            } else if (gameState.cursors.right.isDown) {
                gameState.player.setVelocityX(300);
                gameState.player.flipX = false;
            } else if (gameState.cursors.up.isDown) {
                gameState.player.setVelocityY(-300);
            } else if (gameState.cursors.down.isDown) {
                gameState.player.setVelocityY(300);
            } else {
                gameState.player.setVelocityX(0);
                gameState.player.setVelocityY(0);
            }
        }
    }
}