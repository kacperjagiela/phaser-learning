import * as Phaser from 'phaser';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'Game',
};

export class GameScene extends Phaser.Scene {
    private square: Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
    private coins: Phaser.Physics.Arcade.StaticGroup;
    private scoreText: Phaser.GameObjects.Text;
    private score: number = 0;

    constructor() {
        super(sceneConfig);
    }

    public collectCoin(player, coin) {
        coin.destroy();

        this.score += 100;
        this.scoreText.setText('Score: ' + this.score);
    }

    public create() {
        this.square = this.add.rectangle(400, 400, 100, 100, 0xffffff) as any;
        this.coins = this.physics.add.staticGroup();
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: 'red' });

        // Generate coins
        for (let i = 1; i <= 5; i++) {
            this.coins.add(this.add.circle(i * 100, i * 50, 50, 0x345345));
        }

        this.physics.add.existing(this.square);
        this.physics.add.overlap(this.square, this.coins, this.collectCoin, null, this);
    }

    public update() {
        // movement
        const cursorKeys = this.input.keyboard.createCursorKeys();

        if (cursorKeys.up.isDown) {
            this.square.body.setVelocityY(-500);
        } else if (cursorKeys.down.isDown) {
            this.square.body.setVelocityY(500);
        } else {
            this.square.body.setVelocityY(0);
        }

        if (cursorKeys.right.isDown) {
            this.square.body.setVelocityX(500);
        } else if (cursorKeys.left.isDown) {
            this.square.body.setVelocityX(-500);
        } else {
            this.square.body.setVelocityX(0);
        }
    }
}

const gameConfig: Phaser.Types.Core.GameConfig = {
    title: 'Learning',
    type: Phaser.AUTO,

    scale: {
        width: window.innerWidth,
        height: window.innerWidth,
    },

    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        },
    },

    scene: GameScene,
    parent: 'game',
    backgroundColor: '#000000',
};

export const game = new Phaser.Game(gameConfig);
