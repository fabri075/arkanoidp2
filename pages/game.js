var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },  
    scene: [scene1, scene2]
};

var game = new Phaser.Game(config);
var score = 0;
var scoreText;
var value;
var map;
var bricks;
var ball;