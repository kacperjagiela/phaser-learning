import * as Phaser from 'phaser';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'Game',
};

export class GameScene extends Phaser.Scene {
    private square: Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
    private coins: Phaser.Physics.Arcade.Group;
    private scoreText: Phaser.GameObjects.Text;
    private timeText: Phaser.GameObjects.Text;
    private seconds: number;
    private score: number = 0;
    private coinGeneratingConfig: Phaser.Types.Time.TimerEventConfig = {
        delay: 1000,
        loop: true,
        callback: this.generateCoin,
        callbackScope: this,
    };

    constructor() {
        super(sceneConfig);
    }

    public generateCoin() {
        this.coins.add(
            this.add.circle(Math.random() * 10 * 100, Math.random() * 10 * 100, 50, 0xff0000),
        );
    }

    public secondsToMinutes(seconds) {
        return (
            Phaser.Math.FloorTo(seconds / 60) +
            ':' +
            ('0' + Phaser.Math.FloorTo(seconds % 60)).slice(-2)
        );
    }

    public collectCoin(player, coin) {
        coin.destroy();

        this.score += 100;
        this.scoreText.setText('Score: ' + this.score);
    }

    public create() {
        this.square = this.add.rectangle(400, 400, 100, 100, 0xffffff) as any;
        // generating coins
        this.coins = this.physics.add.group();
        this.coinGeneratingConfig = this.time.addEvent(this.coinGeneratingConfig);

        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: 'red' });
        this.timeText = this.add.text(16, 80, 'Ticks: 0', { fontSize: '32px', fill: 'red' });

        this.physics.add.existing(this.square);
        this.physics.add.overlap(this.square, this.coins, this.collectCoin, null, this);
    }

    public update() {
        // displaying time
        this.seconds = Phaser.Math.CeilTo(this.time.now / 1000);
        this.timeText.setText('Ticks: ' + this.secondsToMinutes(this.seconds));

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
