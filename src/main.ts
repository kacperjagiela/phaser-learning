import * as Phaser from 'phaser';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'Game',
};

export class GameScene extends Phaser.Scene {
    private square: Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
    private obstacles: Phaser.Physics.Arcade.StaticGroup;
    private platform: Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };

    constructor() {
        super(sceneConfig);
    }

    public create() {
        this.square = this.add.rectangle(400, 400, 100, 100, 0xffffff) as any;
        this.platform = this.add.rectangle(600, 600, 40, 200, 0xfa3543) as any;
        this.obstacles = this.physics.add.staticGroup();

        this.obstacles.add(this.platform);
        this.physics.add.existing(this.square);
        this.physics.add.collider(this.square, this.obstacles);
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
